"""
Lee el contenido de texto de archivos PDF, TXT y DOCX.
"""
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

EXTENSIONES_SOPORTADAS = {".pdf", ".txt", ".docx", ".md"}


def leer_archivo(ruta: str | Path) -> str:
    """
    Extrae el texto de un archivo. Soporta PDF, TXT, DOCX y MD.
    Lanza ValueError si la extensión no está soportada.
    """
    ruta = Path(ruta)
    ext = ruta.suffix.lower()

    if ext not in EXTENSIONES_SOPORTADAS:
        raise ValueError(f"Extensión no soportada: {ext}. Usa: {EXTENSIONES_SOPORTADAS}")

    if ext == ".pdf":
        return _leer_pdf(ruta)
    if ext in (".txt", ".md"):
        return _leer_texto(ruta)
    if ext == ".docx":
        return _leer_docx(ruta)

    return ""


def _leer_pdf(ruta: Path) -> str:
    try:
        from pypdf import PdfReader
        reader = PdfReader(str(ruta))
        paginas = [page.extract_text() or "" for page in reader.pages]
        texto = "\n\n".join(paginas).strip()
        logger.info("PDF leído: %d páginas, %d caracteres", len(reader.pages), len(texto))
        return texto
    except ImportError:
        raise ImportError("Instala pypdf: pip install pypdf")
    except Exception as exc:
        raise RuntimeError(f"Error leyendo PDF: {exc}") from exc


def _leer_texto(ruta: Path) -> str:
    try:
        texto = ruta.read_text(encoding="utf-8", errors="ignore").strip()
        logger.info("TXT/MD leído: %d caracteres", len(texto))
        return texto
    except Exception as exc:
        raise RuntimeError(f"Error leyendo archivo de texto: {exc}") from exc


def _leer_docx(ruta: Path) -> str:
    try:
        from docx import Document
        doc = Document(str(ruta))
        parrafos = [p.text for p in doc.paragraphs if p.text.strip()]
        texto = "\n\n".join(parrafos).strip()
        logger.info("DOCX leído: %d párrafos, %d caracteres", len(parrafos), len(texto))
        return texto
    except ImportError:
        raise ImportError("Instala python-docx: pip install python-docx")
    except Exception as exc:
        raise RuntimeError(f"Error leyendo DOCX: {exc}") from exc
