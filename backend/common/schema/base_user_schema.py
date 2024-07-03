from datetime import datetime
from typing import Optional

from pydantic import EmailStr

from common.schema.base_schemas import BaseModel


class BaseUserSchema(BaseModel):
    """ Формирует ответ с деталями о пользователе """
    id: int
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime]
    is_man: Optional[bool] = True
    contact: Optional[str] = None
    role: str
    avatar: Optional[int]
    photo: Optional[bytes]
