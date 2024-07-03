from typing import Optional

from sqlalchemy import select, or_
from sqlalchemy.orm import joinedload

from common.repository.base_repository import BaseRepository
from service.lesson.schemas.space_schemas import SpaceFilterSchema
from service.users.models import User
from service.lesson.models import Space, Lesson


class SpaceRepository(BaseRepository):
    model = Space

    async def get_by_name(self, name: str) -> Optional[User]:
        stmt = select(self.model).where(self.model.name.__eq__(name))
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_all_spaces_by_filter(self, filters: SpaceFilterSchema):
        stmt = select(self.model).where(self.model.deleted.__eq__(False))
        if filters.search_string:
            stmt = stmt.filter(or_(
                self.model.name.ilike(f"%{filters.search_string}%"),
                self.model.id.ilike(f"%{filters.search_string}%")
                )
            )

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response
