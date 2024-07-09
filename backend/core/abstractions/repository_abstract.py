from abc import ABC, abstractmethod
from datetime import datetime
from types import NoneType

from typing import Union, Optional, TypeVar, TypeAlias
from uuid import UUID

from sqlalchemy import ScalarResult

from common.model.base_model import Base
from common.schema.base_schemas import BaseModel

TModel = TypeVar("TModel", bound=Base)
TSchema = TypeVar("TSchema", bound=BaseModel)

RegisterData: TypeAlias = dict[str, Union[str, datetime, bool, NoneType]]
EditData: TypeAlias = dict[str, Union[UUID, str, bool, datetime, int, None]]


class AbstractRepository(ABC):
    """Абстрактная модель репозитория."""

    @abstractmethod
    async def add(self, data: RegisterData) -> Union[str, int]:
        pass

    @abstractmethod
    async def add_range(self, dataset: list[TSchema]) -> bool:
        pass

    @abstractmethod
    async def get(self, data_id: Union[int, UUID]) -> Optional[TModel]:
        pass

    @abstractmethod
    async def get_all(self) -> ScalarResult:
        pass

    @abstractmethod
    async def delete(self, data_id: int) -> Optional[Union[int, UUID]]:
        pass

    @abstractmethod
    async def delete_db(self, data_id: int) -> bool:
        pass

    @abstractmethod
    async def delete_range(self) -> bool:
        pass

    @abstractmethod
    async def edit(self, data: EditData) -> bool:
        pass

    @abstractmethod
    async def exist(self, obj_id: int) -> bool:
        pass
