import os
import logging
import httpx

logger = logging.getLogger(__name__)

UNSPLASH_KEY = os.getenv("UNSPLASH_ACCESS_KEY", "")
UNSPLASH_SEARCH = "https://api.unsplash.com/search/photos"

# Imagen de fallback si no hay clave de Unsplash configurada
FALLBACK = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop"

# Palabras clave por categoría para mejorar la búsqueda
KEYWORDS_CATEGORIA = {
    "IA": "artificial intelligence technology",
    "Móviles": "smartphone mobile phone",
    "Ordenadores": "laptop computer technology",
    "Software": "software code programming",
    "Gadgets": "tech gadget device wearable",
}


def buscar_imagen(titulo: str, categoria: str = "") -> tuple[str, str]:
    """
    Busca una imagen relevante en Unsplash.
    Devuelve (imagen_url, imagen_alt).
    Si no hay clave de Unsplash usa una imagen genérica de tecnología.
    """
    if not UNSPLASH_KEY:
        logger.warning("UNSPLASH_ACCESS_KEY no configurada — usando imagen por defecto.")
        return FALLBACK, titulo

    # Combina palabras del título con keywords de la categoría
    palabras_titulo = " ".join(titulo.split()[:4])
    query = f"{palabras_titulo} {KEYWORDS_CATEGORIA.get(categoria, 'technology')}"

    try:
        resp = httpx.get(
            UNSPLASH_SEARCH,
            params={
                "query": query,
                "per_page": 3,
                "orientation": "landscape",
                "client_id": UNSPLASH_KEY,
            },
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()

        if data.get("results"):
            # Elige la foto con más descargas (más relevante)
            foto = max(data["results"], key=lambda p: p.get("downloads", 0))
            url = foto["urls"]["regular"]
            # Forzamos dimensiones óptimas para og:image
            url = url.split("?")[0] + "?w=1200&h=630&fit=crop&q=80"
            alt = foto.get("alt_description") or titulo
            logger.info("Imagen encontrada: %s", url)
            return url, alt

    except Exception as exc:
        logger.warning("Error buscando imagen en Unsplash: %s", exc)

    return FALLBACK, titulo
