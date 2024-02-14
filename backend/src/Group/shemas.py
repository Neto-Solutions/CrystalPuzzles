from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel


class GroupViewModel(BaseModel):
    """ Создание группы """
    name: str
    trainer_id: Optional[int] = None


class StudentViewModel(BaseModel):
    """ Модель студента """
    id: int
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    is_man: bool
    birthday: Optional[datetime] = None


class StudentForGroupViewModel(BaseModel):
    student: StudentViewModel


class GroupResponseModel(BaseModel):
    """ Ответ на создание и редактирование групп """
    id: int
    name: str
    trainer_id: int
    students: Optional[List[StudentForGroupViewModel]]


class StudentForGroupViewModel(BaseModel):
    """ Добавление студента в группу """
    student_id: int
    group_id: int


