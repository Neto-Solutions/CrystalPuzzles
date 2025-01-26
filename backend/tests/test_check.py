import pytest
from fastapi.testclient import TestClient
from main import app
import jwt
from datetime import datetime, timedelta

# Секретный ключ для генерации JWT
SECRET_KEY = "secret_key"
ALGORITHM = "HS256"

@pytest.fixture
def auth_token():
    """Создаёт фиктивный JWT токен для тестового пользователя."""
    # Данные для токена
    payload = {
        "sub": "supervisor@crystal.com",  # Email пользователя
        "type": "access",
        "exp": datetime.utcnow() + timedelta(minutes=15),  # Время истечения токена
    }
    # Генерация токена
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token  # Возвращаем токен

# @pytest.mark.asyncio
# async def test_get_all_checks_with_test_client(auth_token):
#     """Тест для получения чек-листов с использованием TestClient."""
#     client = TestClient(app)

#     # Отправляем запрос
#     response = client.get(
#         "/api/v1/check/",
#         headers={"Authorization": f"Bearer {auth_token}"},  # Используем фиктивный токен
#         params={"page": 1, "per_page": 10},  # Параметры пагинации
#     )

#     # Проверяем статус-код
#     assert response.status_code == 200, f"Неверный статус-код: {response.status_code}"

#     data = response.json()
#     print(f"Response JSON: {data}")

#     # Проверяем структуру ответа
#     assert "count_records" in data, "Отсутствует поле count_records в ответе"
#     assert "page" in data, "Отсутствует поле page в ответе"
#     assert "max_page_count" in data, "Отсутствует поле max_page_count в ответе"
#     assert "records" in data, "Отсутствует поле records в ответе"
