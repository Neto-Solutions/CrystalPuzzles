from datetime import datetime

from core.service import BaseService
from service.identity.models import User
from service.identity.schemas import CreateUserSchema, UserFilterSchema, EditUserSchema, UserChangePasswordSchema
from service.identity.security import hash_password, generated_code, verify_password


class UserService(BaseService):
    create_schema = CreateUserSchema
    edit_schema = EditUserSchema

    async def add(self, user: create_schema):
        check = await self.repo.get_by_email(user.email)
        if check is None or check.deleted:
            data = user.model_dump()
            password = data.pop("password")
            data["hashed_password"] = hash_password(password)
            # data["code"] = int(generated_code())  # ToDo: Реализовать после создания метода подтверждения почты
            data["is_verified"] = True
            data["is_active"] = True
            return await self.repo.add(data)
        return None

    async def edit(self, user: create_schema):
        check = await self.repo.get_by_email(user.email)
        if check is None or check.deleted:
            return None
        return await super().edit(user)

    async def change_password(self, data: UserChangePasswordSchema, user: User):  # ToDo: ???
        if verify_password(data.old_password, user.hashed_password):
            data = {
                    "id": user.id,
                    "hashed_password": hash_password(data.new_password),
                    "date_update": datetime.now()
                }
            res = await self.repo.edit(data)
            return res
        return None

    async def verify(self, user_id: int):
        data = {
            "id": user_id,
            "is_verified": True,
            "code": None,
            "date_update": datetime.now()
        }
        return await self.repo.edit(data)

    async def get_all_by_filters(self, filters: UserFilterSchema):
        return await self.repo.get_all_user_by_filter(filters.search_string, filters.page_number, filters.page_size)

    async def set_photo(self, photo, user_id: int):
        data = {
            "id": user_id,
            "photo": photo,
            "date_update": datetime.now()
        }
        return await self.repo.edit(data)

    async def delete_photo(self, user_id: int):
        data = {
            "id": user_id,
            "photo": None,
            "date_update": datetime.now()
        }
        return await self.repo.edit(data)

    async def get_photo(self, user_id: int):
        user = await self.repo.get(user_id)
        return user.photo
