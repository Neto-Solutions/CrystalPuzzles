from datetime import datetime

from core.service import BaseService
from service.identity.models import User
from service.identity.schemas import CreateUserSchema, UserFilterSchema, EditUserSchema, UserChangePasswordSchema, \
    AdminPanelEditSchema
from service.identity.security import hash_password, generated_code, verify_password
from service.identity.services.user_service import UserService


class AdminService(UserService):
    edit_schema = AdminPanelEditSchema

    async def get_with_deleted(self, user_id: edit_schema):
        return await self.repo.get_with_deleted(user_id)

    async def edit(self, user: edit_schema):
        check = await self.repo.get_with_deleted(user.id)
        if check is None:
            return None
        updated_data = user.model_dump()
        for key, value in updated_data.copy().items():
            if value is None:
                updated_data.pop(key)
        return await self.repo.edit_with_deleted(updated_data)
