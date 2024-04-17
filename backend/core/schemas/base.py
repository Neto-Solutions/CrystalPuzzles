from fastapi import Query
from pydantic import AfterValidator
from typing_extensions import Annotated
from pydantic import BaseModel as _BaseModel

from core.config import settings


class ExtendedTypes:

    @staticmethod
    def validate_int16(value: int) -> int:
        if value > 32767 or value <= 0:
            raise ValueError("Value must be of type int16 and not 0")
        return value

    Int16 = Annotated[int, AfterValidator(validate_int16)]

    @staticmethod
    def validate_int64(value: int) -> int:
        if value > 9223372036854775807 or value <= 0:
            raise ValueError("Value must be of type int64 and not 0")
        return value

    Int64 = Annotated[int, AfterValidator(validate_int64)]


class BaseModel(_BaseModel):
    class Config:
        @staticmethod
        def json_schema_extra(schema: dict, _):
            props = {}
            for k, v in schema.get('properties', {}).items():
                if not v.get("hidden", False):
                    props[k] = v
            schema["properties"] = props


class Message(BaseModel):
    message: str


class BaseFilterSchema(BaseModel):
    page_number: int = Query(ge=0, default=0, description="Номер страницы")
    page_size: int = Query(ge=1, le=100, default=settings.PAGE_SIZE, description="Размер страницы")
    search_string: str | None = Query(default=None, description="Строка поиска")
