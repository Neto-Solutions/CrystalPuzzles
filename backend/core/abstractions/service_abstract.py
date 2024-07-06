import abc
from typing import Union, Optional, TypeVar
from uuid import UUID

from sqlalchemy import ScalarResult

from common.model.base_model import Base
from common.schema.base_schemas import BaseModel, BaseFilterSchema
from common.unit_of_work.base_uow import BaseUnitOfWork

TModel = TypeVar("TModel", bound=Base)
TSchema = TypeVar("TSchema", bound=BaseModel)
TFilter = TypeVar("TFilter", bound=BaseFilterSchema)
TUnitOfWork = TypeVar("TUnitOfWork", bound=BaseUnitOfWork)


class AbstractService(abc.ABC):
    """Абстрактная класс сервиса."""

    @abc.abstractmethod
    async def add(self, uow: TUnitOfWork, obj: TSchema) -> Union[int, str]:
        pass

    @abc.abstractmethod
    async def add_all(self, uow: TUnitOfWork, objs: list[TSchema]) -> bool:
        pass

    @abc.abstractmethod
    async def get(
            self,
            uow: TUnitOfWork,
            obj_id: [int, UUID]
    ) -> Optional[TModel]:
        pass

    @abc.abstractmethod
    async def get_all(
            self, uow: TUnitOfWork, filters: Optional[TFilter],
    ) -> ScalarResult:
        pass

    @abc.abstractmethod
    async def delete(
            self, uow: TUnitOfWork, obj_id: int
    ) -> Optional[Union[int, UUID]]:
        pass

    @abc.abstractmethod
    async def delete_db(self, uow: TUnitOfWork, obj_id: int) -> bool:
        pass

    @abc.abstractmethod
    async def delete_range(self, uow: TUnitOfWork) -> bool:
        pass

    @abc.abstractmethod
    async def edit(self, uow: TUnitOfWork, obj: TSchema) -> bool:
        pass

    @abc.abstractmethod
    async def exist(self, uow: TUnitOfWork, obj_id: int) -> bool:
        pass
