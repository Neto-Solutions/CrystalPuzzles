import os
from functools import lru_cache
from typing import Union, Optional, Any

from pydantic import Field, PostgresDsn, field_validator, HttpUrl
from pydantic_core.core_schema import FieldValidationInfo
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Настройки окружения."""
    # region ---------------------------- Database ----------------------------------
    pg_host: str = Field(env="PG_HOST")
    pg_user: str = Field(env="PG_USER")
    pg_password: str = Field(env="PG_PASSWORD")
    pg_database: str = Field(env="PG_DATABASE")
    pg_port: int = Field(env="PG_PORT")
    async_database_uri: Union[PostgresDsn, str] = Field(
        default="", env="ASYNC_DATABASE_URI",
    )
    sync_database_uri: Union[PostgresDsn, str] = Field(
        default="", env="ASYNC_DATABASE_URI",
    )
    # endregion ---------------------------------------------------------------------
    # region -------------------------------- Auth ----------------------------------
    # token_url: HttpUrl = Field(env="TOKEN_URL")
    # private_key_path: Path = Field(env="PRIVATE_KEY_PATH")
    # public_key_path: Path = Field(env="PUBLIC_KEY_PATH")
    secret_key: str = Field(env='SECRET_KEY', default="secret_key")
    refresh_secret_key: str = Field(env='REFRESH_SECRET_KEY', default="refresh_secret_key")
    access_token_expire_minutes: int = Field(env="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_minutes: int = Field(env="REFRESH_TOKEN_EXPIRE_MINUTES")
    algorithm: str = Field(env="ALGORITHM")
    # endregion ---------------------------------------------------------------------

    port: int = Field(env="PORT")

    openapi_url: str = Field(env="OPENAPI_URL", default="/swagger/docs/v1.0/crystal")

    base_path: str = Field(env="BASE_PATH")

    page_size: int = Field(env="PAGE_SIZE", default=10)


    @field_validator("async_database_uri")
    def assemble_db_async_connection(
            cls, value: Optional[str], info: FieldValidationInfo,
    ) -> Any:
        """Собственная схема для асинхронного подключения к БД."""
        if isinstance(value, str) and value == "":
            return PostgresDsn.build(
                scheme="postgresql+asyncpg",
                username=info.data["pg_user"],
                password=info.data["pg_password"],
                host=info.data["pg_host"],
                port=info.data["pg_port"],
                path=info.data["pg_database"],
            )
        return value

    @field_validator("sync_database_uri")
    def assemble_db_sync_connection(
            cls, value: Optional[str], info: FieldValidationInfo,
    ) -> Any:
        """Собственная схема для синхронного подключения к БД."""
        if isinstance(value, str) and value == "":
            return PostgresDsn.build(
                scheme="postgresql+psycopg2",
                username=info.data["pg_user"],
                password=info.data["pg_password"],
                host=info.data["pg_host"],
                port=info.data["pg_port"],
                path=info.data["pg_database"],
            )
        return value

    # @field_validator("private_key_path")
    # def specify_full_path_private_key(cls, private_key: Path) -> Path:
    #     """Указать полный путь к приватному ключу."""
    #     return Path(f"{Path(__file__).parent.parent}/{private_key}")
    #
    # @field_validator("public_key_path")
    # def specify_full_path_public_key(cls, public_key: Path) -> Path:
    #     """Указать полный путь к публичному ключу."""
    #     return Path(f"{Path(__file__).parent.parent}/{public_key}")


@lru_cache
def get_settings() -> Settings:
    """Возвращает настройки окружения. Запрос происходит один
    раз, во время запуска проекта."""
    return Settings()
