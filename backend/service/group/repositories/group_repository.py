import math

from datetime import datetime
from typing import Optional

from sqlalchemy import select, func, or_
from sqlalchemy.orm import joinedload

from core.database import async_session
from core.repository import BaseRepository
from service.group.models import Group, StudentGroup
from service.identity.models import User


class GroupRepository(BaseRepository):
    model = Group

    async def get_with_students(self, object_id: int) -> Optional[User]:
        async with async_session() as session:
            stmt = (select(self.model)
                    .options(joinedload(self.model.students).joinedload(StudentGroup.student))
                    .filter(
                        self.model.deleted.__eq__(False),
                        self.model.id.__eq__(object_id)
                            ))
            res = (await session.execute(stmt)).unique().scalar_one_or_none()
            return res

    async def get_by_name(self, name: str) -> Optional[Group]:
        async with async_session() as session:
            stmt = (select(self.model)
                    .filter(self.model.name.__eq__(name),
                            self.model.deleted.__eq__(False)))
            return (await session.execute(stmt)).scalar_one_or_none()

    async def get_all_group_by_filter(self, search_string: str,
                                trainer: int, page_number: int, page_size: int):
        async with async_session() as session:
            stmt = (
                select(self.model)
                .options(joinedload(self.model.trainer))
                .options(joinedload(self.model.students).joinedload(StudentGroup.student))
                .filter(self.model.deleted.__eq__(False))
            )
            if search_string:
                stmt = stmt.filter(or_(
                    (self.model.name.ilike(f"%{search_string}%")),
                    (self.model.students.any(StudentGroup.student.has(User.firstname.ilike(f"%{search_string}%")))),
                    (self.model.students.any(StudentGroup.student.has(User.lastname.ilike(f"%{search_string}%")))),
                    (self.model.students.any(StudentGroup.student.has(User.surname.ilike(f"%{search_string}%"))))
                ))
            if trainer:
                stmt = stmt.filter(self.model.trainer_id.__eq__(trainer))

            count_records = (await session.execute(select(func.count(stmt.c.id)))).scalar_one()
            if count_records != 0:
                records = (await session.execute(
                    stmt.order_by(self.model.date_update.desc()).offset(page_number * page_size).limit(
                        page_size))).unique().scalars()
            response = {
                "page": page_number,
                "max_page_count": math.ceil(count_records / page_size) - 1,
                "count_records": count_records,
                "records": [record for record in records] if count_records != 0 else []
            }
        return response


