from datetime import datetime
from typing import AsyncGenerator, Generator

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session, Mapped, mapped_column

from src.config import DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER

import sqlalchemy as sa

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)
    DateAdd: Mapped[datetime] = mapped_column(sa.DateTime)
    DateUpdate: Mapped[datetime] = mapped_column(sa.DateTime)


""" Async session"""
DATABASE_URL_ASYNC = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DATABASE_URL_ASYNC)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

""" Sync session"""
DATABASE_URL_SYNC = f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


engine = create_engine(DATABASE_URL_SYNC)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)


def get_sync_session() -> Generator[Session, None, None]:
    try:
        with SessionLocal() as db:
            yield db
    finally:
        db.close()
