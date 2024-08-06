from __future__ import annotations

from core.abstractions.uow_abstract import AbstractUnitOfWork
from core.database import async_session


class BaseUnitOfWork(AbstractUnitOfWork):
    """Базовый класс для работы с транзакциями."""

    def __init__(self) -> None:
        self.__session_factory = async_session

    async def __aenter__(self) -> BaseUnitOfWork:
        """Вход в контекстного менеджера."""
        self._session = self.__session_factory()
        return self

    async def __aexit__(self, *args) -> None:
        """Выход из контекстного менеджера"""
        await self.rollback()
        await self._session.close()

    async def commit(self) -> None:
        """Фиксирование транзакции."""
        await self._session.commit()

    async def rollback(self) -> None:
        """Завершение транзакции."""
        await self._session.rollback()
