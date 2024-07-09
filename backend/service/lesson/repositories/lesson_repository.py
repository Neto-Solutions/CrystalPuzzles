import math

from datetime import datetime
from typing import Optional

from sqlalchemy import select, or_
from sqlalchemy.orm import joinedload

from common.repository.base_repository import BaseRepository
from service.lesson.schemas.lesson_schemas import LessonFilterSchema
from service.users.models import User
from service.lesson.models import Lesson, Space


class LessonRepository(BaseRepository):
    model = Lesson

    async def get(self, lesson_id: int):
        stmt = (
            select(self.model)
            .filter(
                self.model.id == lesson_id,
                self.model.deleted.__eq__(False))
            .options(
                joinedload(self.model.trainer),
                joinedload(self.model.space)
            )
        )
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_by_start_time_and_space(self, space: int, startime: datetime) -> Optional[Lesson]:
        stmt = (
            select(self.model)
            .where(self.model.space_id == space)
            .where(self.model.start == startime)
        )
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_all_lesson_by_filter(self, filters: LessonFilterSchema):
        stmt = (
            select(self.model)
            .options(joinedload(self.model.trainer))
            .options(joinedload(self.model.space))
            .filter(self.model.deleted.__eq__(False))
        )
        if filters.search_string:
            stmt = stmt.filter(or_(
                self.model.space.has(Space.name.ilike(f"%{filters.search_string}%")),
                self.model.trainer.has(User.firstname.ilike(f"%{filters.search_string}%")),
                self.model.trainer.has(User.lastname.ilike(f"%{filters.search_string}%")),
                self.model.trainer.has(User.surname.ilike(f"%{filters.search_string}%"))
                )
            )
        if filters.start_date:
            stmt = stmt.filter(self.model.start >= filters.start_date.date())
        if filters.trainer:
            stmt = await self._add_filters(stmt, trainer_id=filters.trainer)

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response
