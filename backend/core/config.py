import os

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """ Database environment """
    PG_HOST: str = os.environ.get('POSTGRES_HOST')
    PG_USER: str = os.environ.get('POSTGRES_USER')
    PG_PASSWORD: str = os.environ.get('POSTGRES_PASSWORD')
    PG_DATABASE: str = os.environ.get('POSTGRES_DB_NAME')
    PG_PORT: str = os.environ.get('POSTGRES_PORT')

    """Pagination environment"""
    PAGE_SIZE: int = int(os.environ.get('PAGE_SIZE', 10))

    """ OpenAPI configuration """
    openapi_url: str = "/swagger/docs/v1.0/crystal"

    """ Other evironments """
    BASE_PATH: str = os.environ.get('BASE_PATH')
    PORT: int = int(os.environ.get('PORT', 8000))

    """ Identity enviroments """
    SECRET_KEY: str = os.environ.get('SECRET_KEY')
    REFRESH_SECRET_KEY: str = os.environ.get('REFRESH_SECRET_KEY')
    ALGORITHM: str = os.environ.get('ALGORITHM')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES'))
    REFRESH_TOKEN_EXPIRE_MINUTES: int = int(os.environ.get('REFRESH_TOKEN_EXPIRE_MINUTES'))

settings = Settings()
