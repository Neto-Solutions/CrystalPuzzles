from pydantic import Field

from datetime import datetime
from typing import Optional, List

from fastapi import Query

from common.schema.base_schemas import BaseModel, BaseFilterSchema, PageSchema
from common.enum import lesson as enum
from common.schema.base_user_schema import UserShortSchema
from service.lesson.schemas.check_schema import CheckSchemaForTable
from service.lesson.schemas.space_schemas import SpaceSchemaForTable


# region --------------------------- POST ---------------------------------
class CreateLessonSchema(BaseModel):
    """ Схема создания моделей занятий """
    space_id: int
    trainer_id: int
    trainer_comments: Optional[str]
    start: datetime
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
# endregion --------------------------------------------------------------


# region --------------------------- PUT ----------------------------------

class EditLessonSchema(BaseModel):
    """ Схема изменения моделей занятий """
    id: int
    space_id: int
    trainer_id: int
    trainer_comments: Optional[str]
    start: datetime
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class UserForLessonSchema(BaseModel):
    """ Схема деталей пользователя """
    student_id: int
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class TrainingForLessonSchema(BaseModel):
    """ Схема деталей модели тренировки """
    training_id: int
    repetitions: int
# endregion --------------------------------------------------------------


# region --------------------------- GET ---------------------------------
class LessonShortSchema(BaseModel):
    """ Схема деталей занятия """
    id: int
    space: SpaceSchemaForTable
    status: enum.StatusTypeEnum
    trainer: UserShortSchema
    trainer_comments: Optional[str]
    start: datetime


class LessonSchemaForTable(LessonShortSchema):
    """ Схема деталей занятий в виде таблицы """
    check: List[CheckSchemaForTable]


class LessonViewSchemaForPage(PageSchema[LessonShortSchema]):
    """ Постраничный вывод деталей модели тренировок """
    pass


class LessonFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    start_date: datetime | None = Query(default=None, description="Дата начала занятия")
    end_date: datetime | None = Query(default=None, description="Дата окончания занятия")
    trainer: int | None = Query(default=None, description="Тренер")
# endregion --------------------------------------------------------------



# class TestChecksSchema:
#     student_id: int
#     trainig_id: int
#     repetitions: str
#     assessment: str
#
# class TestCreateLessonSchema(BaseModel):
#     """ Схема создания моделей занятий """
#     space_id: int
#     trainer_id: int
#     trainer_comments: Optional[str]
#     start: datetime
#     date_add: datetime = Field(default_factory=datetime.now, hidden=True)
#     date_update: datetime = Field(default_factory=datetime.now, hidden=True)
#     checks: List[TestChecksSchema]
