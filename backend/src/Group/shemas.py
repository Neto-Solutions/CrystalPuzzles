from typing import Optional

from pydantic import BaseModel


class GroupViewModel(BaseModel):
    """ Создание группы """
    name: str
    trainer_id: Optional[int] = None

class GroupResponseModel(BaseModel):
    """ Ответ на создание и редактирование групп """
    id: int
    name: str
    trainer_id: int

class AddStudentForGroupViewModel(BaseModel):
    """ Добавление студента в группу """
    student_id: int
    group_id: int