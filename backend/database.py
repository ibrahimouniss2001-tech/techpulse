import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# En local usa SQLite. En Railway usa PostgreSQL (DATABASE_URL viene de las variables de entorno).
_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./techpulse.db")

# Railway entrega la URL como "postgres://..." pero SQLAlchemy necesita "postgresql://..."
if _DATABASE_URL.startswith("postgres://"):
    _DATABASE_URL = _DATABASE_URL.replace("postgres://", "postgresql://", 1)

_connect_args = {"check_same_thread": False} if _DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(_DATABASE_URL, connect_args=_connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from models import Articulo, GuionTikTok  # noqa: F401
    Base.metadata.create_all(bind=engine)
