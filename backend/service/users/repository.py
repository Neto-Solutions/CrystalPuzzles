from typing import Optional

from sqlalchemy import select, update, or_
from sqlalchemy.orm import joinedload

from common.repository.base_repository import BaseRepository
from service.users.models import User
from service.users.schemas import UserFilterSchema


class UserRepository(BaseRepository):
    model = User

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(self.model).filter(self.model.email == email)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_with_deleted(self, user_id: int) -> Optional[User]:
        stmt = select(self.model).filter(self.model.id == user_id)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def edit_with_deleted(
            self,
            data: dict
    ) -> bool:
        id = data.pop('id')
        stmt = (
            update(self.model)
            .where(self.model.id.__eq__(id))
            .values(**data)
            .returning(self.model.id)
        )
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return bool(result)

    async def get_all_user_by_filter(
            self,
            filters: UserFilterSchema,
            deleted: Optional[bool]
    ) -> dict:
        stmt = select(self.model)

        if filters.search_string:
            stmt = stmt.filter(
                or_(
                    self.model.email.ilike(f"%{filters.search_string}%"),
                    self.model.firstname.ilike(f"%{filters.search_string}%"),
                    self.model.lastname.ilike(f"%{filters.search_string}%"),
                    self.model.surname.ilike(f"%{filters.search_string}%")
                )
            )
        if deleted is not None:
            stmt = await self._add_filters(stmt, deleted=deleted)

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response

    async def trainer_exists(self, trainer_id: int) -> bool:
        trainer = await self.get(trainer_id)
        if trainer and trainer.role == "trainer":
            return True
        return False

    async def student_exists(self, student_id: int) -> bool:
        trainer = await self.get(student_id)
        if trainer and trainer.role == "student":
            return True
        return False

    async def get_all_by_filter(
            self,
            filters: UserFilterSchema,
            role: str
    ):
        stmt = (
            select(self.model)
            .filter(
                self.model.deleted.__eq__(False),
                self.model.role.__eq__(role)
            )
        )
        if filters.search_string:
            stmt = stmt.filter(
                (self.model.email.ilike(f"%{filters.search_string}%")) |
                (self.model.firstname.ilike(f"%{filters.search_string}%")) |
                (self.model.lastname.ilike(f"%{filters.search_string}%")) |
                (self.model.surname.ilike(f"%{filters.search_string}%"))
            )
        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response
