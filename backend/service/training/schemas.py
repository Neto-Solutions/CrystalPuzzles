from typing import List

from pydantic import Field

from datetime import datetime
from typing import Optional

from common.schema.base_schemas import BaseModel, BaseFilterSchema


class CreateTrainingSchema(BaseModel):
    """ Схема создания моделей тренировок  """
    name: str
    description: Optional[str]
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class EditTrainingSchema(BaseModel):
    """ Схема изменения моделей тренировок """
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class TrainingSchemaForTable(BaseModel):
    """ Схема деталей моделей тренировок """
    id: int
    name: str
    description: Optional[str]


class TrainingViewSchemaForPage(BaseModel):
    """ Помтраничный вывод деталей моделей тренировок """
    page: int
    max_page_count: int
    count_records: int
    records: List[TrainingSchemaForTable]


class TrainingFilterSchema(BaseFilterSchema):
    """ Фильтрация """
    pass