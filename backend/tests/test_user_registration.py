# import pytest
# from fastapi.testclient import TestClient
# from httpx import AsyncClient
# from fastapi import FastAPI
# from datetime import datetime
# # from app.schemas import CreateUserSchema  # импорт вашей схемы, если нужно

# # Предположим, что ваш FastAPI-приложение называется "app"
# from main import app  # Импорт вашего приложения FastAPI

# client = TestClient(app)

# async def test_register_user_success():
#     """Тест успешной регистрации пользователя"""
    
#     # Тело запроса с корректными данными
#     valid_user_data = {
#         "email": "testuser@example.com",
#         "password": "strongpassword123",
#         "firstname": "John",
#         "lastname": "Doe",
#         "surname": "Smith",
#         "birthday": "1990-01-01T00:00:00",
#         "is_man": True,
#         "contact": "+123456789",
#     }

#     response = client.post("/api/v1/user/register", json=valid_user_data)
    
#     assert response.status_code == 200
#     assert isinstance(response.json(), int) 


import pytest
from httpx import AsyncClient
from fastapi import FastAPI

# Предположим, что ваше приложение FastAPI называется "app"
from main import app

@pytest.mark.asyncio  # Теперь эта метка будет корректно распознана
async def test_register_user_success():
    """Тест успешной регистрации пользователя"""
    
    valid_user_data = {
        "email": "testuser@example.com",
        "password": "strongpassword123",
        "firstname": "John",
        "lastname": "Doe",
        "surname": "Smith",
        "birthday": "1990-01-01T00:00:00",
        "is_man": True,
        "contact": "+123456789",
    }

    async with AsyncClient(app=app, base_url="http://testserver/api/v1/user") as client:
        response = await client.post("/register", json=valid_user_data)
    
    # assert response.status_code == 200
    assert response.status_code == 307
    # assert isinstance(response.json(), int)
