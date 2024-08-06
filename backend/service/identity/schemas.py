from pydantic import Field

from typing import Optional

from common.schema.base_schemas import BaseModel


# region ---------------------------------- Auth-------------------------------------
class AuthExceptionSchema(BaseModel):
    """ Схема ошибки """
    status_code: int
    detail: str
    headers: Optional[dict[str, str]] = Field(default=None)


class TokenInfoSchema(BaseModel):
    """Схема информации о токене."""
    access_token: str
    token_type: str = Field(default="Bearer")


class LogoutResponseSchema(BaseModel):
    """Ответ при выходе из учетной записи."""
    message: str = Field(default="Вы успешно вышли из учетной записи.")


# endregion -------------------------------------------------------------------------
