from datetime import datetime

from core.service import BaseService
from service.identity.schemas import CreateUserSchema, UserFilterSchema, EditUserSchema
from service.identity.utils import hash_password, generated_code


class UserService(BaseService):
    create_schema = CreateUserSchema
    edit_schema = EditUserSchema

    async def add(self, user: create_schema):
        check = await self.repo.get_by_email(user.email)
        if check is None or check.deleted:
            data = user.model_dump()
            password = data.pop("password")
            data["hashed_password"] = hash_password(password)
            data["code"] = int(generated_code())
            return await self.repo.add(data)
        return None

    async def edit(self, user: create_schema):
        check = await self.repo.get_by_email(user.email)
        if check is None or check.deleted:
            return None
        return await super().edit(user)

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
