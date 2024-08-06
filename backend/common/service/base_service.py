from typing import Union, Optional, TypeVar
from uuid import UUID

from sqlalchemy import ScalarResult

from common.model.base_model import Base
from common.schema.base_schemas import BaseModel, BaseFilterSchema
from common.unit_of_work.base_uow import BaseUnitOfWork
from core.abstractions.service_abstract import AbstractService

TModel = TypeVar("TModel", bound=Base)
TSchema = TypeVar("TSchema", bound=BaseModel)
TFilter = TypeVar("TFilter", bound=BaseFilterSchema)
TUnitOfWork = TypeVar("TUnitOfWork", bound=BaseUnitOfWork)


class BaseService(AbstractService):
    """Базовый сервис."""

    async def add(
            self,
            uow: TUnitOfWork,
            obj: TSchema,
            *args
    ) -> Union[str, int]:
        """Добавить данные."""
        obj_dict = obj.model_dump()
        async with uow:
            obj_id = await uow.repo.add(obj_dict)
            await uow.commit()
            return obj_id

    async def add_all(self, uow: TUnitOfWork, objs: list[TSchema]) -> bool:
        """Добавить все данные."""
        async with uow:
            result = await uow.repo.add_range(objs)
            await uow.commit()
            return result

    async def get(
            self,
            uow: TUnitOfWork,
            obj_id: [int, UUID]
    ) -> Optional[TModel]:
        """Получить данные."""
        async with uow:
            obj = await uow.repo.get(obj_id)
            return obj

    async def get_all(
            self, uow: TUnitOfWork, filters: Optional[TFilter],
    ) -> ScalarResult:
        """Получить все данные."""
        async with uow:
            obj_seq = await uow.repo.get_all()
            return obj_seq

    async def delete(
            self,
            uow: TUnitOfWork,
            obj_id: Union[int, UUID],
    ) -> Optional[Union[int, UUID]]:
        """Обновить статус данных на "удаленный"."""
        async with uow:
            result = await uow.repo.delete(obj_id)
            await uow.commit()
            return result

    async def delete_db(
            self,
            uow: TUnitOfWork,
            obj_id: Union[int, UUID]
    ) -> bool:
        """Удалить данные."""
        async with uow:
            result = await uow.repo.delete_db(obj_id)
            await uow.commit()
            return result

    async def delete_range(
            self,
            uow: TUnitOfWork
    ) -> bool:  # TODO: Реализовать удаление массива данных
        """Удалить массив данных."""
        async with uow:
            odj_seq = await uow.repo.delete_range()
            await uow.commit()
            return odj_seq

    async def edit(self, uow: TUnitOfWork, obj: TSchema, *args) -> bool:
        """Обновить данные."""
        obj_dict = obj.model_dump()
        async with uow:
            result = await uow.repo.edit(obj_dict)
            await uow.commit()
            return result

    async def exist(self, uow: TUnitOfWork, obj_id: int) -> bool:
        """Проверка на наличие текущих данных."""
        async with uow:
            result = await uow.repo.exist(obj_id)
            return result
