"""
Vigilante de carpeta — TechPulse Auto Publisher
================================================
Monitoriza inbox/ en tu ordenador local.
Cuando detecta un archivo nuevo (PDF, TXT, DOCX, MD):
  1. Extrae el texto del archivo.
  2. Lo envía a la API (local o Railway) via POST /api/procesar-texto.
  3. La API extrae temas, genera artículos con IA, busca imágenes y publica.
  4. Mueve el archivo a procesados/ o errores/.

Uso:
    python watcher.py

Variables de entorno necesarias (en .env):
    API_URL          → URL del backend (http://localhost:8000 en local,
                        https://tu-app.railway.app en producción)
    API_KEY_SECRETA  → misma clave que tiene el backend
"""

import os
import sys
import time
import shutil
import logging
from pathlib import Path
from datetime import datetime

import httpx
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ── Configuración ─────────────────────────────────────────────────────────────

API_URL  = os.getenv("API_URL", "http://localhost:8000")
API_KEY  = os.getenv("API_KEY_SECRETA", "")

BASE_DIR   = Path(__file__).parent
INBOX_DIR  = BASE_DIR / "inbox"
PROC_DIR   = BASE_DIR / "procesados"
ERROR_DIR  = BASE_DIR / "errores"

for d in (INBOX_DIR, PROC_DIR, ERROR_DIR):
    d.mkdir(exist_ok=True)

EXTENSIONES = {".pdf", ".txt", ".docx", ".md"}

import lector_archivos


# ── Lógica principal ──────────────────────────────────────────────────────────

def procesar_archivo(ruta: Path) -> int:
    """
    Lee el archivo y lo manda a la API. Devuelve el número de artículos publicados.
    """
    logger.info("📄 Procesando: %s", ruta.name)

    texto = lector_archivos.leer_archivo(ruta)
    if not texto.strip():
        raise ValueError("El archivo está vacío o no contiene texto extraíble.")

    logger.info("📡 Enviando a la API (%s)...", API_URL)

    # Timeout alto porque la API puede tardar varios minutos (un Claude por artículo)
    with httpx.Client(timeout=600) as client:
        resp = client.post(
            f"{API_URL}/api/procesar-texto",
            json={"texto": texto},
            headers={"X-API-Key": API_KEY},
        )

    if resp.status_code == 201:
        data = resp.json()
        n = data["articulos_generados"]
        slugs = data.get("slugs", [])
        vercel = data.get("vercel_triggered", False)
        logger.info("✅ %d artículo(s) publicado(s):", n)
        for slug in slugs:
            logger.info("   → %s/es/blog/%s", API_URL.replace(":8000", ":3000"), slug)
        logger.info("🚀 Vercel notificado: %s", "✅" if vercel else "⚠️  no configurado")
        return n

    raise RuntimeError(f"La API devolvió error {resp.status_code}: {resp.text[:300]}")


def mover(ruta: Path, destino_dir: Path, sufijo: str = "") -> None:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    shutil.move(str(ruta), str(destino_dir / f"{ruta.stem}_{ts}{sufijo}{ruta.suffix}"))


def _procesar_y_mover(ruta: Path) -> None:
    try:
        n = procesar_archivo(ruta)
        mover(ruta, PROC_DIR)
        logger.info("📂 Movido a procesados/ (%d artículo(s))\n", n)
    except Exception as exc:
        logger.error("❌ Error: %s", exc)
        try:
            mover(ruta, ERROR_DIR, "_ERROR")
            logger.info("📂 Movido a errores/\n")
        except Exception:
            pass


def _archivos_inbox() -> list[Path]:
    return [f for f in INBOX_DIR.iterdir()
            if f.is_file() and f.suffix.lower() in EXTENSIONES]


# ── Bucle principal ───────────────────────────────────────────────────────────

def vigilar() -> None:
    logger.info("=" * 55)
    logger.info("  TechPulse — Vigilante de carpeta")
    logger.info("=" * 55)
    logger.info("  📡 API:      %s", API_URL)
    logger.info("  📁 Inbox:    %s", INBOX_DIR)
    logger.info("  📁 Listos:   %s", PROC_DIR)
    logger.info("  📁 Errores:  %s", ERROR_DIR)
    logger.info("  📄 Formatos: PDF, TXT, DOCX, MD")
    logger.info("=" * 55)
    logger.info("  Deja archivos en inbox/ y se publicarán solos.")
    logger.info("  Ctrl+C para detener.\n")

    # Procesa los que ya estaban al arrancar
    for f in _archivos_inbox():
        _procesar_y_mover(f)

    vistos: set[Path] = set()

    try:
        while True:
            actuales = set(_archivos_inbox())
            nuevos = actuales - vistos

            for archivo in sorted(nuevos):
                time.sleep(2)  # espera a que termine de copiarse
                if archivo.exists():
                    _procesar_y_mover(archivo)

            vistos = {f for f in actuales if f.exists()} - nuevos
            time.sleep(10)

    except KeyboardInterrupt:
        logger.info("\n🛑 Vigilante detenido.")
        sys.exit(0)


if __name__ == "__main__":
    if not API_KEY:
        logger.error("❌ API_KEY_SECRETA no está en el archivo .env")
        sys.exit(1)
    vigilar()
