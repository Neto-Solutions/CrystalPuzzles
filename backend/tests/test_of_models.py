import pytest
from fastapi.testclient import TestClient
from common.schema.base_user_schema import UserShortSchema

def test_user_short_schema():
    test_user = UserShortSchema(id=1, 
                         firstname="anytest_firstname", 
                         lastname="anytest_lastname", 
                         surname="anytest_surname", 
                         photo="any_photo")
    
    """ Краткая информация о пользователе """
    assert test_user.id == 1
    assert test_user.firstname == "anytest_firstname"
    assert test_user.lastname == "anytest_lastname"
    assert test_user.surname == "anytest_surname"
    assert test_user.photo == "any_photo"
