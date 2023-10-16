from pydantic import BaseModel, EmailStr


class UserCreateSchema(BaseModel):
    """ Валидация регистрационных данных """
    email: EmailStr
    password: str


class UserReadSchema(BaseModel):
    """ Формирует ответ с деталями о пользователе """
    id: int
    email: EmailStr
    is_active: bool
    is_superuser: bool
    is_verified: bool


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None