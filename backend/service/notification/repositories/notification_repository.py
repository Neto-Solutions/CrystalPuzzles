from common.repository.base_repository import BaseRepository
from service.notification.models import Notification
from sqlalchemy import select, func, insert, delete
from fastapi import HTTPException


class NotificationsRepository(BaseRepository):
    model = Notification

    # async def post(self, data: dict) -> None:
    #     stmt = insert(self.model).values(**data)
    #     session = self.session()
    #     await session.execute(stmt)

