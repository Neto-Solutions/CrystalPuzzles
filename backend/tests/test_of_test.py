import pytest
from fastapi.testclient import TestClient
from main import app  # Импортируем app из нового файла
# from backend.main import app


client = TestClient(app)

def test_test():
    assert 2 + 2 == 4
