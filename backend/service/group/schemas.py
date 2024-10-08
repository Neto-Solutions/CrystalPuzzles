from datetime import datetime
from typing import Optional, List

from fastapi import Query
from pydantic import Field

from common.schema.base_schemas import BaseModel, BaseFilterSchema


class StudentViewModel(BaseModel):
    """ Модель студента """
    id: int
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    is_man: bool
    birthday: Optional[datetime] = None
    avatar: Optional[int]


class StudentForGroupViewModel(BaseModel):
    student: StudentViewModel


class GroupResponseModel(BaseModel):
    """ Ответ на создание и редактирование групп """
    id: int
    name: str
    trainer_id: int
    students: List[StudentForGroupViewModel]


class StudentForGroupViewSchema(BaseModel):
    """ Добавление студента в группу """
    student_id: int
    group_id: int


class CreateGroupSchema(BaseModel):
    """ Создание группы """
    name: str
    trainer_id: Optional[int] = None
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)


class GroupFilterSchema(BaseFilterSchema):
    """ Фильтрация и пагинация """
    trainer: int | None = Query(default=None, description="Тренер")


class GroupViewSchemaForTable(BaseModel):
    id: int
    name: str
    trainer_id: int
    date_add: datetime
    date_update: datetime
    date: str


class GroupViewSchemaForPage(BaseModel):
    page: int
    max_page_count: int
    count_records: int
    records: List[GroupResponseModel]


class EditGroupSchema(BaseModel):
    id: Optional[int] = Field(default=None, hidden=True)
    name: str  # AllowEmpty
    trainer_id: Optional[int]
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
