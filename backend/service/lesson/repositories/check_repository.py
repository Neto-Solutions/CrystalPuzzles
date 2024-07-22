from sqlalchemy import insert

from common.repository.base_repository import BaseRepository
from service.lesson.models import Check


class CheckRepository(BaseRepository):
    model = Check

    async def add(self, data: dict):
        stmt = insert(self.model).values(**data).returning(self.model.id)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result
