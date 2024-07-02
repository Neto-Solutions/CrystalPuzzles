from typing import Optional

from sqlalchemy import select, or_
from sqlalchemy.orm import joinedload

from common.repository.base_repository import BaseRepository
from service.group.models import Group, StudentGroup
from service.group.schemas import GroupFilterSchema
from service.users.models import User


class GroupRepository(BaseRepository):
    model = Group

    async def get_with_students(self, object_id: int) -> Optional[User]:
        stmt = (
            select(self.model)
            .options(joinedload(self.model.students).joinedload(StudentGroup.student))
            .filter(
                self.model.deleted.__eq__(False),
                self.model.id.__eq__(object_id)
                )
        )
        result = (await self.session.execute(stmt)).unique().scalar_one_or_none()
        return result

    async def get_by_name(self, name: str) -> Optional[Group]:
        stmt = (
            select(self.model)
            .filter(
                self.model.name.__eq__(name),
                self.model.deleted.__eq__(False)
            )
        )
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_all_group_by_filter(
            self,
            filters: GroupFilterSchema,
    ) -> dict:
        stmt = (
            select(self.model)
            .options(joinedload(self.model.trainer))
            .options(joinedload(self.model.students).joinedload(StudentGroup.student))
            .filter(self.model.deleted.__eq__(False))
        )
        if filters.search_string:
            stmt = stmt.filter(or_(
                (self.model.name.ilike(f"%{filters.search_string}%")),
                (self.model.students.any(StudentGroup.student.has(User.firstname.ilike(f"%{filters.search_string}%")))),
                (self.model.students.any(StudentGroup.student.has(User.lastname.ilike(f"%{filters.search_string}%")))),
                (self.model.students.any(StudentGroup.student.has(User.surname.ilike(f"%{filters.search_string}%"))))
            ))
        if filters.trainer:
            stmt = await self._add_filters(stmt, trainer_id=filters.trainer)

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response
