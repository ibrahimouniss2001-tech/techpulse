from datetime import datetime
from typing import Literal
from pydantic import BaseModel


# ── Entrada ──────────────────────────────────────────────────────────────────

class GenerarContenidoRequest(BaseModel):
    tema: str
    categoria: Literal["IA", "Móviles", "Ordenadores", "Software", "Gadgets"]
    url_afiliado: str | None = None


# ── Salida ───────────────────────────────────────────────────────────────────

class GuionTikTokOut(BaseModel):
    id: int
    texto_guion: str
    estado: str

    model_config = {"from_attributes": True}


class ArticuloListOut(BaseModel):
    id: int
    slug: str
    titulo: str
    categoria: str
    url_afiliado: str | None
    imagen_url: str | None
    imagen_alt: str | None
    fecha_publicacion: datetime
    estado: str

    model_config = {"from_attributes": True}


class ArticuloDetailOut(ArticuloListOut):
    contenido_html: str
    guiones: list[GuionTikTokOut] = []


class GenerarContenidoResponse(BaseModel):
    articulo: ArticuloDetailOut
    vercel_triggered: bool
    message: str
