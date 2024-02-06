from typing import Optional

from fastapi import HTTPException
from pydantic import BaseModel, EmailStr, field_validator


class GroupViewModel(BaseModel):
    """ Создание группы """
    name: str
    trainer_id: int

class GroupResponseModel(BaseModel):
    """ Ответ на создание и редактирование групп """
    id: int
    name: str
    trainer_id: int
