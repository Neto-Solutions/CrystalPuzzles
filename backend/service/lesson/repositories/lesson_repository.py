import math

from datetime import datetime
from sqlalchemy import select, func, or_
from sqlalchemy.orm import joinedload

from core.database import async_session
from core.repository import BaseRepository
from service.identity.models import User
from service.lesson.models import Lesson, Space


class LessonRepository(BaseRepository):
    model = Lesson

    async def get_by_start_time_and_space(self, space: int, startime: datetime) -> Lesson | None:
        async with async_session() as session:
            stmt = select(self.model).where(self.model.space_id == space).where(self.model.start == startime)
            res = await session.execute(stmt)
            return res.scalar_one_or_none()

    async def get_all_lesson_by_filter(self, search_string: str, page_number: int, page_size: int,
                                       date_begin: datetime, trainer: int):
        async with async_session() as session:
            stmt = (
                select(self.model)
                .options(joinedload(self.model.trainer))
                .options(joinedload(self.model.space))
                .filter(self.model.deleted.__eq__(False))
            )
            if search_string:
                stmt = stmt.filter(or_(
                    (self.model.space.has(Space.name.ilike(f"%{search_string}%"))),
                    (self.model.trainer.has(User.firstname.ilike(f"%{search_string}%"))),
                    (self.model.trainer.has(User.lastname.ilike(f"%{search_string}%"))),
                    (self.model.trainer.has(User.surname.ilike(f"%{search_string}%")))
                    )
                )
            if date_begin:
                stmt = stmt.filter(self.model.date_update >= date_begin.date())
            if trainer:
                stmt = stmt.filter(self.model.trainer_id == trainer)

            count_records = (await session.execute(select(func.count(stmt.c.id)))).scalar_one()
            if count_records != 0:
                records = (await session.execute(
                    stmt.order_by(self.model.date_update.desc()).offset(page_number * page_size).limit(
                        page_size))).scalars()
            response = {
                "page": page_number,
                "max_page_count": math.ceil(count_records / page_size) - 1,
                "count_records": count_records,
                "records": records if count_records != 0 else []
            }
        return response

    async def add_lesson(self):
        ...
