from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from sqlalchemy import create_engine

from typing import AsyncGenerator, Generator

from core.config import get_settings

settings = get_settings()


class Base(DeclarativeBase):
    pass


# region --------------------- Async connection to database -------------------------
engine_async = create_async_engine(str(settings.async_database_uri))
async_session = async_sessionmaker(engine_async)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    try:
        async with async_session() as session:
            yield session
    finally:
        await session.close()


# endregion -------------------------------------------------------------------------

# region ----------------------- Sync connection to database ------------------------
engine_sync = create_engine(str(settings.sync_database_uri))
sync_session = sessionmaker(engine_sync)


def get_sync_session() -> Generator[Session, None, None]:
    try:
        with sync_session() as session:
            yield session
    finally:
        session.close()
# endregion -------------------------------------------------------------------------
