from fastapi import HTTPException

from common.service.base_service import BaseService
from service.notification.schemas.notification_schemas import CreateNotificationSchema
from service.notification.unit_of_work.notification_uow import NotificationUOW


class NotificationService(BaseService):
    # async def add(self, uow: NotificationUOW, notification: CreateNotificationSchema, **kwargs):
    #     check = await self.get_by_name(uow, notification.name)
    #     if check is None or check.deleted:
    #         result = await super().add(uow, space)
    #         return result
    #     return None
    pass


