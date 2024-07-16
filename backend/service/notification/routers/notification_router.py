from fastapi import APIRouter, Depends, HTTPException, Response
from service.notification.schemas.notification_schemas import CreateNotificationSchema
from service.notification.repositories.notification_repository import NotificationsRepository
from service.notification.dependensies import NotificationServiceDep, NotificationUOWDep
from core.database import async_session

notifications_router = APIRouter(
    prefix="/api/v1/notification",
    tags=["Notifications"]
)


@notifications_router.post("/{create_notification}",
                           status_code=201,
                           response_model=int,
                           )
async def create_notification(text: CreateNotificationSchema,
                              uow: NotificationUOWDep,
                              notification_service: NotificationServiceDep):
    # repository = NotificationsRepository(async_session())
    # result = await repository.add(text.model_dump())
    result = await notification_service.add(uow, text)
    return result
