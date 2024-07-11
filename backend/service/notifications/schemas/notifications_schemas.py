from pydantic import Field

from typing import Optional

from fastapi import Query

from common.schema.base_schemas import BaseModel, BaseFilterSchema
from service.lesson.schemas.space_schemas import SpaceSchemaForTable


class CreateNotificationSchema(BaseModel):
    text: str
    status: bool

