from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass, sessionmaker, Session
from sqlalchemy import create_engine

from typing import AsyncGenerator, Generator

from core.config import settings


# class Base(MappedAsDataclass, DeclarativeBase):
#     pass

class Base(DeclarativeBase):
    pass


""" Async connection to database"""
DATABASE_URL_ASYNC = f"postgresql+asyncpg://{settings.PG_USER}:{settings.PG_PASSWORD}@{settings.PG_HOST}:{settings.PG_PORT}/{settings.PG_DATABASE}"
engine_async = create_async_engine(DATABASE_URL_ASYNC)
async_session = async_sessionmaker(engine_async)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    try:
        async with async_session() as session:
            yield session
    finally:
        await session.close()


"""Sync connection to database"""
DATABASE_URL_SYNC = f"postgresql+psycopg2://{settings.PG_USER}:{settings.PG_PASSWORD}@{settings.PG_HOST}:{settings.PG_PORT}/{settings.PG_DATABASE}"
engine_sync = create_engine(DATABASE_URL_SYNC)
sync_session = sessionmaker(engine_sync)


def get_sync_session() -> Generator[Session, None, None]:
    try:
        with sync_session() as session:
            yield session
    finally:
        session.close()
