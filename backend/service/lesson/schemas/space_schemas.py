from typing import List

from pydantic import Field

from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from pydantic import EmailStr, field_validator

from core.schemas.base import BaseModel, BaseFilterSchema


class CreateSpaceSchema(BaseModel):
    """ Схема создания моделей кабинетов """
    name: str = Field(max_length=255)
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class EditSpaceSchema(BaseModel):
    """ Схема изменения моделей кабинетов """
    id: int
    name: Optional[str] = None
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class SpaceSchemaForTable(BaseModel):
    """ Схема деталей моделей тренировок """
    id: int
    name: str


class SpaceViewSchemaForPage(BaseModel):
    """ Помтраничный вывод деталей моделей тренировок """
    page: int
    max_page_count: int
    count_records: int
    records: List[SpaceSchemaForTable]


class SpaceFilterSchema(BaseFilterSchema):
    """ Фильтрация """
    pass
