from pydantic import Field

from datetime import datetime
from typing import Optional, List

from common.schema.base_schemas import BaseModel
from common.schema.base_user_schema import UserShortSchema


class TrainingCheck(BaseModel):
    """ Схема оценки выполнения упражнения """
    training_id: int
    repetitions: int = Field(ge=1)
    assessment: Optional[int] = Field(default=None, le=10, ge=1)


class CreateCheckSchema(BaseModel):
    """ Схема создания моделей занятий """
    student_ids: list[int]
    lesson_id: int
    training_check: list[TrainingCheck]
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class CheckSchemaForTable(BaseModel):
    """ Схема деталей чек-листа """
    id: int
    student: UserShortSchema
    comment: Optional[str]
    awards: Optional[int]
    training_data: List[TrainingCheck]

# class EditLessonSchema(BaseModel):
#     """ Схема изменения моделей занятий """
#     id: int
#     space_id: int
#     trainer_id: int
#     trainer_comments: Optional[str]
#     start: datetime
#
#
# class TrainerShortSchema(BaseModel):
#     id: int
#     firstname: Optional[str] = None
#     lastname: Optional[str] = None
#     surname: Optional[str] = None
#
#
# class LessonSchemaForTable(BaseModel):
#     """ Схема деталей занятия """
#     id: int
#     space: SpaceSchemaForTable
#     trainer: TrainerShortSchema
#     trainer_comments: Optional[str]
#     start: datetime
#
#
# class LessonViewSchemaForPage(BaseModel):
#     """ Помтраничный вывод деталей моделей тренировок """
#     page: int
#     max_page_count: int
#     count_records: int
#     records: List[LessonSchemaForTable]
#
#
# class LessonFilterSchema(BaseFilterSchema):
#     """ Фильтрация и пагинация """
#     date_begin: datetime | None = Query(default=None, description="Дата начала занятия")
#     trainer: int | None = Query(default=None, description="Тренер")
