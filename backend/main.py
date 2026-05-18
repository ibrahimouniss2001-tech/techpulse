import os
import logging
import time
from contextlib import asynccontextmanager

import httpx
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

load_dotenv()

from database import get_db, init_db
from models import Articulo, GuionTikTok
from schemas import (
    ArticuloDetailOut,
    ArticuloListOut,
    GenerarContenidoRequest,
    GenerarContenidoResponse,
)
import ia_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

API_KEY_SECRETA  = os.getenv("API_KEY_SECRETA", "")
VERCEL_DEPLOY_HOOK = os.getenv("VERCEL_DEPLOY_HOOK", "")


# ── Lifespan ──────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    logger.info("Base de datos inicializada.")
    yield


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="TechPulse Headless CMS",
    description="API de gestión de contenido SEO y guiones TikTok para TechPulse.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── Autenticación ─────────────────────────────────────────────────────────────

def verificar_api_key(x_api_key: str = Header(...)):
    if not API_KEY_SECRETA:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            "API_KEY_SECRETA no configurada en el servidor.")
    if x_api_key != API_KEY_SECRETA:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Clave de API inválida.")


# ── Helpers internos ──────────────────────────────────────────────────────────

def _slug_unico(db: Session, slug_base: str) -> str:
    slug, n = slug_base, 1
    while db.query(Articulo).filter(Articulo.slug == slug).first():
        slug = f"{slug_base}-{n}"
        n += 1
    return slug


def _guardar_articulo(db: Session, resultado: dict, categoria: str,
                      url_afiliado: str | None = None) -> Articulo:
    slug = _slug_unico(db, resultado["slug"])
    articulo = Articulo(
        slug=slug,
        titulo=resultado["titulo"],
        categoria=categoria,
        contenido_html=resultado["contenido_html"],
        url_afiliado=url_afiliado,
        imagen_url=resultado.get("imagen_url"),
        imagen_alt=resultado.get("imagen_alt"),
        estado="publicado",
    )
    db.add(articulo)
    db.flush()
    db.add(GuionTikTok(
        articulo_id=articulo.id,
        texto_guion=resultado["texto_guion"],
        estado="pendiente",
    ))
    db.commit()
    db.refresh(articulo)
    return articulo


async def _disparar_vercel() -> bool:
    if not VERCEL_DEPLOY_HOOK:
        logger.warning("VERCEL_DEPLOY_HOOK no configurado — se omite el rebuild.")
        return False
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(VERCEL_DEPLOY_HOOK)
            ok = resp.status_code in (200, 201)
            logger.info("Vercel deploy hook: HTTP %s", resp.status_code)
            return ok
    except Exception as exc:
        logger.warning("No se pudo disparar el deploy hook: %s", exc)
        return False


# ── Endpoints públicos ────────────────────────────────────────────────────────

@app.get("/api/articulos", response_model=list[ArticuloListOut], tags=["Contenido"])
def listar_articulos(db: Session = Depends(get_db)):
    """Lista todos los artículos publicados (usado por Next.js)."""
    return (
        db.query(Articulo)
        .filter(Articulo.estado == "publicado")
        .order_by(Articulo.fecha_publicacion.desc())
        .all()
    )


@app.get("/api/articulos/{slug}", response_model=ArticuloDetailOut, tags=["Contenido"])
def obtener_articulo(slug: str, db: Session = Depends(get_db)):
    """Devuelve un artículo publicado por su slug."""
    articulo = (
        db.query(Articulo)
        .filter(Articulo.slug == slug, Articulo.estado == "publicado")
        .first()
    )
    if not articulo:
        raise HTTPException(status_code=404, detail="Artículo no encontrado.")
    return articulo


# ── Endpoints protegidos ──────────────────────────────────────────────────────

@app.post(
    "/api/generar-contenido",
    response_model=GenerarContenidoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Control"],
    dependencies=[Depends(verificar_api_key)],
)
async def generar_contenido(payload: GenerarContenidoRequest, db: Session = Depends(get_db)):
    """Genera un artículo desde un tema manual y lo publica."""
    try:
        resultado = ia_service.generar_contenido(
            tema=payload.tema,
            categoria=payload.categoria,
            url_afiliado=payload.url_afiliado,
        )
    except Exception as exc:
        logger.error("Error IA: %s", exc)
        raise HTTPException(status.HTTP_502_BAD_GATEWAY, f"Error IA: {exc}")

    articulo = _guardar_articulo(db, resultado, payload.categoria, payload.url_afiliado)
    vercel_triggered = await _disparar_vercel()

    return GenerarContenidoResponse(
        articulo=ArticuloDetailOut.model_validate(articulo),
        vercel_triggered=vercel_triggered,
        message="Publicado. Vercel notificado." if vercel_triggered else "Publicado. Vercel no notificado.",
    )


# ── Nuevo: procesar texto/archivo completo ────────────────────────────────────

class ProcesarTextoRequest(BaseModel):
    texto: str


class ProcesarTextoResponse(BaseModel):
    articulos_generados: int
    slugs: list[str]
    vercel_triggered: bool


@app.post(
    "/api/procesar-texto",
    response_model=ProcesarTextoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Control"],
    dependencies=[Depends(verificar_api_key)],
)
async def procesar_texto(payload: ProcesarTextoRequest, db: Session = Depends(get_db)):
    """
    Recibe texto libre (contenido de un PDF/TXT/DOCX), extrae todos los temas
    automáticamente con IA y genera un artículo completo por cada uno.
    Es el endpoint que llama el watcher cuando detecta un archivo nuevo.
    """
    temas = ia_service.extraer_temas_de_texto(payload.texto)
    if not temas:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "No se encontraron temas de artículos en el texto.")

    logger.info("Procesando %d tema(s) desde archivo...", len(temas))
    slugs = []

    for i, tema_data in enumerate(temas, 1):
        logger.info("[%d/%d] Generando: %s", i, len(temas), tema_data["tema"][:60])
        try:
            resultado = ia_service.generar_contenido(
                tema=tema_data["tema"],
                categoria=tema_data["categoria"],
            )
            articulo = _guardar_articulo(db, resultado, tema_data["categoria"])
            slugs.append(articulo.slug)
            logger.info("  ✅ %s", articulo.slug)
        except Exception as exc:
            logger.error("  ❌ Error en tema %d: %s", i, exc)

        if i < len(temas):
            time.sleep(5)

    vercel_triggered = await _disparar_vercel() if slugs else False

    return ProcesarTextoResponse(
        articulos_generados=len(slugs),
        slugs=slugs,
        vercel_triggered=vercel_triggered,
    )


# ── Health check ──────────────────────────────────────────────────────────────

@app.get("/health", tags=["Sistema"])
def health():
    return {"status": "ok"}
