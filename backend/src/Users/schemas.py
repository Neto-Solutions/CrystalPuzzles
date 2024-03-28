from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from pydantic import BaseModel, EmailStr, field_validator


class UserCreateSchema(BaseModel):
    """ Валидация регистрационных данных """
    email: EmailStr
    password: str
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: datetime
    is_man: Optional[bool] = True
    contact: Optional[str] = None

    @field_validator('password')
    def validate_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value


class UserReadSchema(BaseModel):
    """ Формирует ответ с деталями о пользователе """
    id: int
    email: EmailStr
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: datetime
    is_man: Optional[bool] = True
    contact: Optional[str] = None


class UserChangePassword(BaseModel):
    """ Валидирует старый и новый пароль """
    old_password: str
    new_password: str

    @field_validator('new_password')
    def validate_new_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value


class UserVerifiedEmailCode(BaseModel):
    """ Валидация кода верификации email """
    code: int

    @field_validator("code")
    def validate_code(cls, value):
        if not int(value) > 4 or int(value) < 4:
            raise HTTPException(status_code=400, detail={"error": "Code must be 4 digits"})
        else:
            return value


class UserEditSchema(BaseModel):
    """ Валидация редактирования данных пользователя """
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: datetime
    is_man: Optional[bool] = True
    contact: Optional[str] = None


class PhotoReadSchema(BaseModel):
    """ Формирует ответ с деталями о фото пользователя """
    photo: Optional[bytes] = None



class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
