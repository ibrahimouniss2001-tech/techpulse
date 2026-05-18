"""
Genera los 10 artículos del PDF 'articulos_tecnologia_alto_potencial_2026'
llamando al endpoint POST /api/generar-contenido del backend local.

Uso:
    python generar_desde_pdf.py

Requisitos:
    - El backend debe estar corriendo en http://localhost:8000
    - El archivo .env debe tener API_KEY_SECRETA configurada
"""

import os
import time
import httpx
from dotenv import load_dotenv

load_dotenv()

API_BASE = "http://localhost:8000"
API_KEY = os.getenv("API_KEY_SECRETA", "")

ARTICULOS = [
    {
        "tema": "Galaxy S26 vs iPhone 17: diferencias reales y cuál merece más la pena en 2026. "
                "Comparativa directa para usuarios que quieren cambiar de móvil: pantalla, IA, "
                "batería, cámaras y recomendación final por perfil de usuario.",
        "categoria": "Móviles",
        "url_afiliado": None,
    },
    {
        "tema": "Los mejores móviles de 2026 para cámara, autonomía y creación de contenido. "
                "Roundup con los mejores smartphones del año clasificados por: mejor cámara, "
                "mejor batería, mejor para vídeo corto y mejor relación calidad-precio.",
        "categoria": "Móviles",
        "url_afiliado": None,
    },
    {
        "tema": "Qué es un AI PC en 2026 y cómo saber si de verdad te compensa. "
                "Explicación clara de qué es una NPU, qué tareas puede hacer localmente, "
                "diferencia frente a un portátil tradicional y cuándo compensa comprar uno. "
                "Microsoft define los Copilot+ PC por NPU de al menos 40 TOPS y 16 GB de RAM.",
        "categoria": "IA",
        "url_afiliado": None,
    },
    {
        "tema": "Intel Core Ultra o Snapdragon X2: cuál es mejor para portátil en 2026. "
                "Comparativa técnica accesible sobre rendimiento diario, batería, "
                "compatibilidad de apps y perfil ideal de usuario para cada procesador.",
        "categoria": "Ordenadores",
        "url_afiliado": None,
    },
    {
        "tema": "RTX 5000 en 2026: sigue siendo la mejor compra para gaming y creación. "
                "Análisis de qué mejora frente a generaciones anteriores, gaming a alta resolución, "
                "edición de vídeo y 3D, y cuándo esperar o cuándo comprar ya.",
        "categoria": "Ordenadores",
        "url_afiliado": None,
    },
    {
        "tema": "Smart rings en 2026: por qué cada vez más gente deja el smartwatch. "
                "Los anillos inteligentes pasan de nicho a categoría mainstream. "
                "Qué miden, ventajas frente al reloj, batería, comodidad y mejores opciones del momento.",
        "categoria": "Gadgets",
        "url_afiliado": None,
    },
    {
        "tema": "Mejores portátiles con IA de 2026 para estudiar, trabajar y crear contenido. "
                "Guía de compra con especificaciones mínimas recomendadas, mejores modelos "
                "para estudiantes, mejores para profesionales y errores que evitar al comprar.",
        "categoria": "Ordenadores",
        "url_afiliado": None,
    },
    {
        "tema": "7 errores que debes evitar al comprar móvil en 2026. "
                "Artículo evergreen con los errores más comunes: comprar por megapíxeles, "
                "ignorar años de actualizaciones, elegir solo por marca y pasar por alto la IA local.",
        "categoria": "Móviles",
        "url_afiliado": None,
    },
    {
        "tema": "Smartwatch, smart ring o earbuds: qué wearable comprar en 2026. "
                "Comparativa para público general sobre qué necesita cada tipo de usuario, "
                "ventajas y límites de cada formato, y cuál conviene para salud, deporte y productividad.",
        "categoria": "Gadgets",
        "url_afiliado": None,
    },
    {
        "tema": "Cómo lanzar una web de tecnología con potencial SEO real en 2026. "
                "Guía sobre cómo elegir categorías con demanda, crear comparativas y guías de compra, "
                "usar lenguaje simple y escaneable, y publicar alrededor de productos actuales.",
        "categoria": "Software",
        "url_afiliado": None,
    },
]


def generar_articulo(numero: int, articulo: dict) -> bool:
    print(f"\n[{numero}/10] Generando: {articulo['tema'][:60]}...")
    try:
        with httpx.Client(timeout=120) as client:
            resp = client.post(
                f"{API_BASE}/api/generar-contenido",
                json=articulo,
                headers={"X-API-Key": API_KEY},
            )

        if resp.status_code == 201:
            data = resp.json()
            slug = data["articulo"]["slug"]
            vercel = "✅ Vercel notificado" if data["vercel_triggered"] else "⚠️  Vercel no notificado"
            print(f"    ✅ Publicado → slug: {slug}")
            print(f"    {vercel}")
            return True
        else:
            print(f"    ❌ Error {resp.status_code}: {resp.text[:200]}")
            return False

    except httpx.ConnectError:
        print("    ❌ No se puede conectar al backend. ¿Está corriendo en http://localhost:8000?")
        return False
    except Exception as exc:
        print(f"    ❌ Error inesperado: {exc}")
        return False


def main():
    if not API_KEY:
        print("❌ API_KEY_SECRETA no está configurada en el archivo .env")
        return

    print("=" * 60)
    print("  Generador de artículos — TechPulse 2026")
    print("=" * 60)
    print(f"  Backend: {API_BASE}")
    print(f"  Artículos a generar: {len(ARTICULOS)}")
    print("=" * 60)

    exitosos = 0
    for i, articulo in enumerate(ARTICULOS, start=1):
        ok = generar_articulo(i, articulo)
        if ok:
            exitosos += 1
        # Pausa entre llamadas para no saturar la API de Anthropic
        if i < len(ARTICULOS):
            print("    ⏳ Esperando 5 segundos antes del siguiente...")
            time.sleep(5)

    print("\n" + "=" * 60)
    print(f"  Completado: {exitosos}/{len(ARTICULOS)} artículos generados")
    print("=" * 60)

    if exitosos > 0:
        print(f"\n  Ve a http://localhost:3000/es/blog para verlos en la web.")


if __name__ == "__main__":
    main()
