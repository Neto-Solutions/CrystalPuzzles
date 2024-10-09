import pytest

from httpx import AsyncClient
from httpx import ASGITransport
from main import app


@pytest.mark.asyncio 
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

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver/api/v1/user") as client:
        response = await client.post("/register", json=valid_user_data)
    
    assert response.status_code == 307

@pytest.mark.asyncio
async def test_register_user_invalid_password():
    """Тест регистрации с некорректным паролем"""    

    invalid_password_data = {
        "email": "testuser@example.com",
        "password": "123",  
        "firstname": "John",
        "lastname": "Doe",
        "surname": "Smith",
        "birthday": "1990-01-01T00:00:00",
        "is_man": True,
        "contact": "+123456789",
    }

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver/api/v1/user") as client:
        response = await client.post("/register/", json=invalid_password_data)

    assert response.status_code == 400
    assert response.json()["detail"]["error"] == "The password must be 6 or more characters long."

@pytest.mark.asyncio
async def test_register_user_missing_fields():
    """Тест регистрации с отсутствием обязательных полей"""
    
    invalid_data = {
        "password": "strongpassword123",
        "firstname": "John",
        "lastname": "Doe",
    }

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver/api/v1/user") as client:
        response = await client.post("/register/", json=invalid_data)

    assert response.status_code == 422  
    assert "email" in response.json()["detail"][0]["loc"]  
