import pytest
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.sql import text  # Импортируем функцию text для текстовых запросов
from sqlalchemy.exc import OperationalError

from core.config import Settings
# from core.config import assemble_db_async_connection

settings = Settings()

@pytest.mark.asyncio
async def test_direct_database_connection():
    """Тест для проверки прямого подключения к базе данных."""
    # Данные для подключения
    PG_HOST = "db"  # Используем localhost для подключения из теста

    async_database_uri = f"postgresql+asyncpg://{settings.pg_user}:{settings.pg_password}@{PG_HOST}:{settings.pg_port}/{settings.pg_database}"  # Преобразуем PostgresDsn в строку
    print(f'settings.async_database_uri: {async_database_uri}')

    # Создаем движок подключения
    engine = create_async_engine(async_database_uri)

    try:
        # Устанавливаем соединение и выполняем тестовый запрос
        async with engine.connect() as connection:
            result = await connection.execute(text("SELECT 1;"))  # Используем text() для запроса
            assert result.scalar() == 1, "База данных недоступна"
    except OperationalError as e:
        pytest.fail(f"Ошибка подключения к базе данных: {e}")
    finally:
        # Закрываем движок
        await engine.dispose()

