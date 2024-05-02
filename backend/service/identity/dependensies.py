from typing import Annotated

from service.identity.repositories.user_repository import UserRepository
from service.identity.services.user_service import UserService
from service.identity.services.auth_service import AuthService


def user_service():
    return UserService(UserRepository)


def auth_service():
    return AuthService()


def user_repository():
    return UserRepository()
