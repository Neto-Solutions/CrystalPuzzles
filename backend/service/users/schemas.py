from enum import Enum
from typing import List

from pydantic import Field

from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from pydantic import EmailStr, field_validator

from common.schema.base_schemas import BaseModel, BaseFilterSchema
from common.schema.base_user_schema import BaseUserSchema


# region ------------------------------- Profile ------------------------------------

class CreateUserSchema(BaseModel):
    """ Валидация регистрационных данных """
    email: EmailStr
    password: str
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime] = None
    is_man: bool = True
    contact: Optional[str] = None
    date_add: datetime = Field(default_factory=datetime.now, hidden=True)
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)

    @field_validator('password')
    def validate_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value

    @field_validator('birthday')
    def validate_birthday(cls, value):
        if value is not None:
            return value.replace(tzinfo=None)


class EditViewSchema(BaseModel):
    """ Валидация редактирования данных пользователя """
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime] = None
    is_man: Optional[bool] = True
    contact: Optional[str] = None


class EditUserSchema(EditViewSchema):
    """ Валидация редактирования данных пользователя """
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)
    id: Optional[int] = Field(default=None, hidden=True)

    @field_validator('birthday')
    def validate_birthday(cls, value):
        if value is not None:
            return value.replace(tzinfo=None)


class UserFilterSchema(BaseFilterSchema):
    pass


class UserChangePasswordSchema(BaseModel):
    """ Валидирует старый и новый пароль """
    old_password: str
    new_password: str

    @field_validator('new_password')
    def validate_new_password(cls, value):
        if len(value) < 6:
            raise HTTPException(status_code=400, detail={"error": "The password must be 6 or more characters long."})
        else:
            return value


class PhotoReadSchema(BaseModel):
    """ Формирует ответ с деталями о фото пользователя """
    photo: Optional[bytes] = None


class AvatarSchema(BaseModel):
    avatar_id: int = Field(..., description="ID аватара", ge=1, le=8)


# endregion -------------------------------------------------------------------------

# region ----------------------------- AdminPanel -----------------------------------
class RoleEnum(str, Enum):
    admin = 'admin'
    supervisor = 'supervisor'
    trainer = 'trainer'
    student = 'student'


class UserSchemaForTable(BaseUserSchema):
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    deleted: bool
    date_add: datetime
    date_update: datetime
    avatar: Optional[int]
    # code: Optional[int]


class UserViewSchemaForPage(BaseModel):
    page: int
    max_page_count: int
    count_records: int
    records: List[UserSchemaForTable]


class UserShortViewSchemaForPage(BaseModel):
    page: int
    max_page_count: int
    count_records: int
    records: List[BaseUserSchema]


class AdminPanelEditSchema(BaseModel):
    """ Валидация редактирования данных пользователя """
    id: Optional[int] = Field(default=None, hidden=True)
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    surname: Optional[str] = None
    birthday: Optional[datetime] = None
    is_man: Optional[bool] = None
    contact: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None
    deleted: Optional[bool] = False
    role: Optional[RoleEnum] = None
    date_update: datetime = Field(default_factory=datetime.now, hidden=True)

    @field_validator('birthday')
    def validate_birthday(cls, value):
        if value is not None:
            return value.replace(tzinfo=None)


# endregion -------------------------------------------------------------------------

# region ------------------------------- Verified -----------------------------------
class UserVerifiedEmailCode(BaseModel):
    """ Валидация кода верификации email """
    code: int

    @field_validator("code")
    def validate_code(cls, value):
        if not int(value) > 4 or int(value) < 4:
            raise HTTPException(status_code=400, detail={"error": "Code must be 4 digits"})
        else:
            return value
# endregion -------------------------------------------------------------------------
