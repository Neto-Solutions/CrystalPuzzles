import pytest
from fastapi.testclient import TestClient
from main import app  


client = TestClient(app)

def test_default_route():
    response = client.get("/swagger/docs/v1.0/crystal")
    response_json = response.json()

    # Проверка кода ответа
    assert response.status_code == 200  # Ожидаем успешный ответ

    # Проверяем, что в ответе есть ключ "openapi"
    assert "openapi" in response_json
    assert response_json["openapi"] == "3.1.0"  # Убедимся, что версия OpenAPI корректна

    # Проверяем, что в ответе есть информация о "title" и "version"
    assert "info" in response_json
    assert response_json["info"]["title"] == "Crystal Puzzles"  # Название API
    assert response_json["info"]["version"] == "1.0"  # Версия API

    # Проверяем, что маршруты присутствуют в "paths"
    assert "/api/v1/auth/login/" in response_json["paths"]  # Проверяем наличие пути для авторизации
    assert "/api/v1/auth/refresh-token/" in response_json["paths"]  # Проверяем наличие пути для обновления токена
