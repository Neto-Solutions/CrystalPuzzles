
from service.identity.repositories.user_repository import UserRepository
from service.identity.services.admin_service import AdminService
from service.identity.services.user_service import UserService
from service.identity.services.auth_service import AuthService


def user_service():
    return UserService(UserRepository)


def auth_service():
    return AuthService()


def user_repository():
    return UserRepository()

def admin_service():
    return AdminService(UserRepository)
