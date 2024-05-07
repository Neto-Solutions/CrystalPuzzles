import math
from typing import List

from pydantic import BaseModel

from core.abstractions.repository_abstract import AbstractRepository


class BaseService:
    def __init__(self, repo: AbstractRepository):
        self.repo: AbstractRepository = repo()

    create_schema = BaseModel
    edit_schema = BaseModel

    async def add(self, obj: create_schema):
        obj_dict = obj.model_dump()
        obj_id = await self.repo.add(obj_dict)
        return obj_id

    async def add_all(self, obj: List[create_schema]):
        result = await self.repo.add_range(obj)
        return result

    async def get(self, obj_id: int):
        obj = await self.repo.get_with_deleted(obj_id)
        return obj

    async def get_all(self):
        obj_list = await self.repo.get_all()
        return obj_list

    async def delete(self, obj_id: int):
        # TODO: not cascade
        result = await self.repo.delete(obj_id)
        return result

    async def delete_db(self, obj_id: int):
        result = await self.repo.delete_db(obj_id)
        return result

    async def delete_all(self):
        pass

    async def edit(self, obj: edit_schema) -> bool:
        obj_dict = obj.model_dump()
        res = await self.repo.edit(obj_dict)
        return res
