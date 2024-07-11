from common.repository.base_repository import BaseRepository
from backend.service.notifications.models import Notification
from sqlalchemy import select, func, insert, delete
from fastapi import HTTPException


class NotificationsRepository(BaseRepository):
    model = Notification

    async def post(self, data: dict) -> str:
        stmt = insert(self.model).values(**data)
        await self.session.execut(stmt)
        # result = (await self.session.execute(
        #     select(func.count('*'))
        #     .select_from(self.model)))
        # #     .where(self.model.student_id == data.get("student_id"))
        # # )
        # #           ).scalar()
        # return bool(result)
