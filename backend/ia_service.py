import os
import re
import json
import logging
import google.generativeai as genai
from buscador_imagenes import buscar_imagen

logger = logging.getLogger(__name__)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

_MODEL_PRO   = "gemini-2.0-flash"
_MODEL_FLASH = "gemini-2.0-flash"

ARTICLE_SYSTEM = (
    "Eres un redactor SEO experto en tecnología. Escribes en español de España. "
    "Genera únicamente el HTML del cuerpo del artículo — sin <!DOCTYPE>, <html>, <head> ni <body>. "
    "Usa solo <h2>, <h3>, <p>, <ul>, <li>, <strong> y <em>. "
    "El texto debe ser informativo, natural y optimizado para buscadores. "
    "Añade al final un párrafo con el id=\"afiliado-placeholder\" vacío: "
    "<p id=\"afiliado-placeholder\"></p>"
)

TIKTOK_SYSTEM = (
    "Eres un guionista de vídeos cortos virales para TikTok especializado en tecnología. "
    "Escribe en español de España con tono dinámico, directo y cercano. "
    "El guión debe durar exactamente 60 segundos al leerlo en voz alta (≈ 130-150 palabras). "
    "Estructura: gancho (0-5s) → desarrollo (5-50s) → llamada a la acción (50-60s). "
    "Devuelve solo el texto del guión, sin acotaciones ni marcas de tiempo."
)

EXTRACTOR_SYSTEM = (
    "Eres un analista de contenido SEO. Tu tarea es leer un documento y extraer todos los temas "
    "de artículos que se mencionan explícita o implícitamente. "
    "Para cada tema devuelve un objeto JSON con: "
    "\"tema\": descripción detallada del tema (2-4 frases) incluyendo el enfoque y ángulo SEO, "
    "\"categoria\": EXACTAMENTE una de estas: IA, Móviles, Ordenadores, Software, Gadgets. "
    "Devuelve SOLO un array JSON válido. Sin explicaciones, sin markdown, sin texto extra. "
    "Ejemplo: [{\"tema\": \"...\", \"categoria\": \"Móviles\"}, ...]"
)


def _slugify(text: str) -> str:
    text = text.lower().strip()
    for src, dst in [("á","a"),("à","a"),("ä","a"),("é","e"),("è","e"),("ë","e"),
                     ("í","i"),("ì","i"),("ï","i"),("ó","o"),("ò","o"),("ö","o"),
                     ("ú","u"),("ù","u"),("ü","u"),("ñ","n")]:
        text = text.replace(src, dst)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text[:80]


def _chat(system: str, user: str, model: str = _MODEL_PRO) -> str:
    m = genai.GenerativeModel(
        model_name=model,
        system_instruction=system,
    )
    response = m.generate_content(user)
    return response.text.strip()


def generar_contenido(tema: str, categoria: str, url_afiliado: str | None = None) -> dict:
    """
    Genera un artículo HTML + guión TikTok + imagen para el tema dado.
    Devuelve: titulo, slug, contenido_html, texto_guion, imagen_url, imagen_alt.
    """
    # 1. Artículo
    articulo_prompt = (
        f"Escribe un artículo completo sobre: {tema}\n"
        f"Categoría: {categoria}\n"
        "Incluye un título atractivo en la primera línea como texto plano "
        "(sin etiqueta HTML), y a continuación el cuerpo HTML."
    )
    raw_article = _chat(ARTICLE_SYSTEM, articulo_prompt, _MODEL_PRO)

    lines = raw_article.split("\n", 1)
    titulo = lines[0].strip().lstrip("#").strip()
    contenido_html = lines[1].strip() if len(lines) > 1 else raw_article

    if url_afiliado:
        afiliado_html = (
            f'<p id="afiliado-placeholder">'
            f'<a href="{url_afiliado}" rel="sponsored noopener" target="_blank">'
            f"Ver oferta →</a></p>"
        )
        contenido_html = contenido_html.replace(
            '<p id="afiliado-placeholder"></p>', afiliado_html
        )

    # 2. Guión TikTok
    texto_guion = _chat(TIKTOK_SYSTEM, f"Tema del vídeo: {tema}", _MODEL_FLASH)

    # 3. Imagen de Unsplash
    imagen_url, imagen_alt = buscar_imagen(titulo, categoria)

    return {
        "titulo": titulo,
        "slug": _slugify(titulo),
        "contenido_html": contenido_html,
        "texto_guion": texto_guion,
        "imagen_url": imagen_url,
        "imagen_alt": imagen_alt,
    }


def extraer_temas_de_texto(texto: str) -> list[dict]:
    """
    Analiza texto libre (de un PDF, TXT o DOCX) y devuelve una lista de temas
    en formato [{"tema": str, "categoria": str}, ...].
    """
    texto_recortado = texto[:8000]
    raw = _chat(
        EXTRACTOR_SYSTEM,
        f"Extrae los temas de artículos de este documento:\n\n{texto_recortado}",
        _MODEL_FLASH,
    )

    match = re.search(r"\[.*\]", raw, re.DOTALL)
    if not match:
        logger.warning("No se encontró JSON en la respuesta del extractor: %s", raw[:200])
        return []

    try:
        temas = json.loads(match.group())
        categorias_validas = {"IA", "Móviles", "Ordenadores", "Software", "Gadgets"}
        temas_validos = [
            t for t in temas
            if isinstance(t, dict)
            and t.get("tema")
            and t.get("categoria") in categorias_validas
        ]
        logger.info("Temas extraídos del archivo: %d", len(temas_validos))
        return temas_validos
    except json.JSONDecodeError as exc:
        logger.error("Error parseando JSON de temas: %s", exc)
        return []
