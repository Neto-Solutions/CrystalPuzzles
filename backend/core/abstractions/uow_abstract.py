import abc
from typing import Type, TypeVar

from common.repository.base_repository import BaseRepository

TRepository = TypeVar("TRepository", bound=BaseRepository)


class AbstractUnitOfWork(abc.ABC):
    """Абстрактный класс для работы с транзакциями."""
    repo: Type[TRepository]

    @abc.abstractmethod
    def __init__(self) -> None:
        raise NotImplementedError

    @abc.abstractmethod
    async def __aenter__(self) -> TRepository:
        raise NotImplementedError

    @abc.abstractmethod
    async def __aexit__(self, *args) -> None:
        raise NotImplementedError

    @abc.abstractmethod
    async def commit(self) -> None:
        raise NotImplementedError

    @abc.abstractmethod
    async def rollback(self) -> None:
        raise NotImplementedError
