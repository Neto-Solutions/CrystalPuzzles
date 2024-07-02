import math
from datetime import datetime
from types import NoneType
from typing import Union, Optional, TypeVar, TypeAlias
from uuid import UUID

from sqlalchemy import (
    insert,
    select,
    delete,
    update,
    ScalarResult,
    Select,
    func
)
from sqlalchemy.ext.asyncio import AsyncSession

from common.model.base_model import Base
from common.schema.base_schemas import BaseModel, BaseFilterSchema
from core.abstractions.repository_abstract import AbstractRepository

TModel = TypeVar("TModel", bound=Base)
TSchema = TypeVar("TSchema", bound=BaseModel)
TFilter = TypeVar("TFilter", bound=BaseFilterSchema)

RegisterData: TypeAlias = dict[str, Union[str, datetime, bool, NoneType]]
EditData: TypeAlias = dict[str, Union[UUID, str, bool, datetime, int, None]]


class BaseRepository(AbstractRepository):
    """Базовый класс репозитория."""
    model: type[TModel]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    # region ------------------- Вспомагательные методы -----------------------

    async def _datetime_filter(
            self,
            stmt: Select,
            filters: TFilter
    ) -> Select:
        """Проверка на существование даты начала и окончания."""
        if filters.date_begin:
            stmt = stmt.filter(self.model.date_update >= filters.date_begin)
        if filters.date_end:
            stmt = stmt.filter(self.model.date_update <= filters.date_end)
        return stmt

    async def _get_count_records(self, stmt: Select) -> int:
        """Получить количество записей."""
        count_records = (await self.session.execute(
            select(func.count(stmt.c.id)))).scalar_one()
        return count_records

    async def _get_records(
            self,
            count_records: int,
            stmt: Select,
            filters: TFilter
    ) -> Optional[ScalarResult]:
        """Проверка на существование записи."""
        if count_records != 0:
            records = (await self.session.execute(
                stmt
                .order_by(self.model.date_update.desc())
                .offset(filters.page_number * filters.page_size)
                .limit(filters.page_size)
            )).unique().scalars()
            return records

    async def _add_filters(
            self,
            stmt: Select,
            **kwargs,
    ) -> Select:
        """Добавление дополнительных фильтров."""
        for key, value in kwargs.items():
            if value is not None:
                column = getattr(self.model, key)
                stmt = stmt.filter(column.__eq__(value))
        return stmt

    @staticmethod
    async def _convert_response(
            count_records: int,
            records: ScalarResult,
            filters: TFilter
    ) -> dict:
        """Конвертировать результат запроса в формат ответа."""
        response = {
            "page": filters.page_number,
            "max_page_count": math.ceil(count_records / filters.page_size) - 1,
            "count_records": count_records,
            "records": [row for row in records] if count_records != 0 else []
        }
        return response

    # endregion ---------------------------------------------------------------

    async def add(self, data: RegisterData) -> Union[str, int]:
        """Добавить данные в БД."""
        stmt = insert(self.model).values(**data).returning(self.model.id)
        res = await self.session.execute(stmt)
        return res.scalar_one()

    async def add_range(self, dataset: list[TSchema]) -> bool:
        """Добавить диапазон данных в БД."""
        self.session.add_all(
            [self.model(**(entity.model_dump())) for entity in dataset]
        )
        return True

    async def get(self, data_id: Union[int, UUID]) -> Optional[TModel]:
        """Получить данные из БД."""
        stmt = (
            select(self.model)
            .filter(
                self.model.id.__eq__(data_id),
                self.model.deleted.__eq__(False))
        )
        res = (await self.session.execute(stmt)).scalar_one_or_none()
        return res

    async def get_all(self) -> ScalarResult:
        """Получить все существующие данные из БД."""
        stmt = select(self.model).filter(self.model.deleted.__eq__(False))
        res = await self.session.execute(stmt)
        return res.scalars()

    async def delete(
            self,
            data_id: Union[int, UUID]
    ) -> Optional[Union[int, UUID]]:
        """Установить для текущих данных статус "удаленный" в БД."""
        stmt = (update(self.model)
                .filter(
            self.model.id.__eq__(data_id),
            self.model.deleted.__eq__(False))
                .values(deleted=True, date_update=datetime.now())
                .returning(self.model.id))
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    async def delete_db(self, data_id: Union[int, UUID]) -> bool:
        """Удалить текущие данные из БД."""
        stmt = (delete(self.model)
                .filter(self.model.id == data_id)
                .returning(self.model.id))
        res = (await self.session.execute(stmt)).scalar_one_or_none()
        return bool(res)

    # ToDo: Добваить функционал удаления массива элементов
    async def delete_range(self) -> bool:
        """Удалить массив элементов из БД."""
        pass

    async def edit(self, data: EditData) -> bool:
        """Изменить данные в БД."""
        data_id: Union[int, UUID] = data.pop("id")
        stmt = (update(self.model)
                .filter(
            self.model.id == data_id,
            self.model.deleted.__eq__(False))
                .values(**data)
                .returning(self.model.id))
        res = (await self.session.execute(stmt)).scalar_one_or_none()
        return bool(res)

    async def exist(self, data_id: int) -> bool:
        """Проверка на существование текущих данных в БД."""
        stmt = (
            select(self.model.id)
            .filter(
                self.model.id.__eq__(data_id),
                self.model.deleted.__eq__(False))
        )
        res = (await self.session.execute(stmt)).scalar_one_or_none()
        return bool(res)
