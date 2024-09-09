from datetime import datetime
from typing import Optional

from pydantic import EmailStr

from common.schema.base_schemas import BaseModel


class UserShortSchema(BaseModel):
    """ Краткая информация о пользователе """
    id: int
    firstname: Optional[str]
    lastname: Optional[str]
    surname: Optional[str]
    photo: Optional[str]


class BaseUserSchema(UserShortSchema):
    """ Формирует ответ с деталями о пользователе """
    email: EmailStr
    birthday: Optional[datetime]
    is_man: Optional[bool] = True
    contact: Optional[str] = None
    role: str
    avatar: Optional[int]

