from fastapi import APIRouter, Depends, HTTPException, Response
from service.notifications.schemas.notifications_schemas import CreateNotificationSchema

notification_router = APIRouter(
    prefix="/api/v1/notifications",
    tags=["Notifications"]
)


@notification_router.post("/{create_router}",
                          status_code=201,
                          response_model=CreateNotificationSchema
                          )
def create_notification(text: str):
    return CreateNotificationSchema(text="Hello")
