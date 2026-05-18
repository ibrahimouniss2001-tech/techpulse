from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, ForeignKey,
    Enum as SAEnum,
)
from sqlalchemy.orm import relationship
from database import Base

CategoriaEnum = SAEnum(
    "IA", "Móviles", "Ordenadores", "Software", "Gadgets",
    name="categoria_enum",
)

EstadoArticuloEnum = SAEnum("borrador", "publicado", name="estado_articulo_enum")

EstadoGuionEnum = SAEnum("pendiente", "grabado", name="estado_guion_enum")


class Articulo(Base):
    __tablename__ = "articulos"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    titulo = Column(String(500), nullable=False)
    categoria = Column(CategoriaEnum, nullable=False)
    contenido_html = Column(Text, nullable=False)
    url_afiliado = Column(String(2048), nullable=True)
    imagen_url = Column(String(2048), nullable=True)
    imagen_alt = Column(String(500), nullable=True)
    fecha_publicacion = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    estado = Column(EstadoArticuloEnum, default="borrador", nullable=False)

    guiones = relationship(
        "GuionTikTok", back_populates="articulo", cascade="all, delete-orphan"
    )


class GuionTikTok(Base):
    __tablename__ = "guiones_tiktok"

    id = Column(Integer, primary_key=True, index=True)
    articulo_id = Column(Integer, ForeignKey("articulos.id"), nullable=False)
    texto_guion = Column(Text, nullable=False)
    estado = Column(EstadoGuionEnum, default="pendiente", nullable=False)

    articulo = relationship("Articulo", back_populates="guiones")
