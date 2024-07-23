from fastapi import HTTPException
from sqlalchemy import select, func, insert, delete
from sqlalchemy.exc import IntegrityError

from common.repository.base_repository import BaseRepository
from service.group.models import StudentGroup


class StudentRepository(BaseRepository):
    model = StudentGroup

    async def add(self, data: dict) -> int:
        try:
            stmt = insert(self.model).values(**data)
            await self.session.execute(stmt)
            result = (await self.session.execute(
                select(func.count('*'))
                .select_from(self.model)
                .where(self.model.student_id == data.get("student_id"))
                )
            ).scalar()
            return bool(result)
        except IntegrityError:
            raise HTTPException(
                status_code=400,
                detail="Student belongs to group"
            )

    async def delete(self, data: dict) -> int:
        stmt = (
            delete(self.model)
            .where(self.model.student_id == data.get("student_id"))
            .where(self.model.group_id == data.get("group_id"))
        )
        await self.session.execute(stmt)
        result = (await self.session.execute(
            select(func.count('*'))
            .select_from(self.model)
            .where(self.model.student_id == data.get("student_id"))
            .where(self.model.group_id == data.get("group_id")))
        ).scalar_one_or_none()
        return bool(result)
