from pydantic import Field

from datetime import datetime
from typing import Optional, List

from common.schema.base_schemas import BaseModel, PageSchema, BaseFilterSchema
from common.schema.base_user_schema import UserShortSchema
from service.training.models import Training


class TrainingCheck(BaseModel):
    """ Схема оценки выполнения упражнения """
    training_id: int
    repetitions: int = Field(ge=1)
    assessment: Optional[int] = Field(default=None, le=10, ge=1)


class ShortLessonCheck(BaseModel):
    """ Схема оценки выполнения упражнения """
    trainer_id: int


class TrainingSchema(BaseModel):
    name: str


class TrainingCheckResponseSchema(TrainingCheck):
    training: TrainingSchema


class CreateCheckSchema(BaseModel):
    """ 
    Схема создания моделей занятий 
    Описывает входные данные для создания чек-листа, используя Pydantic
    """
    student_ids: list[int] # Список ID студентов, которым относится чек-лист
    lesson_id: int # ID урока, для которого создаётся чек-лист
    training_check: list[TrainingCheck] # Список упражнений. Для каждого: training_id, repetitions
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class CheckSchemaForTable(BaseModel):
    """ 
    Схема деталей чек-листа 
    """
    id: int
    student: UserShortSchema
    comment: Optional[str]
    awards: Optional[int]
    training_data: List[TrainingCheckResponseSchema]


class CheckFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    id: int
    student: UserShortSchema
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
    comment: Optional[str]
    awards: Optional[int]
    training_data: List[TrainingCheckResponseSchema]


class CheckNoFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    pass

class ChecSchemaId(BaseFilterSchema):
    """ Фильтрация и пагинация """
    id: int
    lesson_id: int
    student_id: int
    student: UserShortSchema
    lesson: ShortLessonCheck
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
    comment: Optional[str]
    awards: Optional[int]

class CheckSimpleFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    id: int
    lesson_id: int
    student_id: int
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
    comment: Optional[str]
    awards: Optional[int]


class CheckViewSchemaForPage(PageSchema[CheckSimpleFilterSchema]):
    """ Постраничный вывод деталей чек-листа """
    pass


