from datetime import datetime
from typing import Optional, Generic, TypeVar

from pydantic import BaseModel as _BaseModel, Field

from core.config import get_settings

settings = get_settings()


class BaseModel(_BaseModel):
    class Config:
        @staticmethod
        def json_schema_extra(schema: dict, _):
            props = {}
            for k, v in schema.get('properties', {}).items():
                if not v.get("hidden", False):
                    props[k] = v
            schema["properties"] = props


TSchema = TypeVar("TSchema", bound=BaseModel)


class BaseFilterSchema(BaseModel):
    """Базовый фильтр-схема."""
    page_number: int = Field(ge=0, default=0, description="Номер страницы")
    page_size: int = Field(
        ge=1, le=100, default=settings.page_size, description="Размер страницы",
    )
    search_string: Optional[str] = Field(
        default=None,
        description="Строка поиска"
    )


class DataRangeBaseFilterSchema(BaseFilterSchema):
    """Схема базового фильтра диапазона данных."""
    date_begin: Optional[datetime] = Field(default=None, description="Дата начала")
    date_end: Optional[datetime] = Field(default=None, description="Дата конца")


class PageSchema(BaseModel, Generic[TSchema]):
    """Схема страницы."""
    count_records: int = Field(ge=0, default=0)
    page: int = Field(ge=0, default=0)
    max_page_count: int
    records: list[TSchema]


class Message(BaseModel):
    message: str
