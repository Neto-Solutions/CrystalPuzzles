from fastapi import APIRouter, Depends, HTTPException, Response, WebSocket,  WebSocketDisconnect
from service.notification.schemas.notification_schemas import CreateNotificationSchema
from service.notification.repositories.notification_repository import NotificationsRepository
from service.notification.dependensies import NotificationServiceDep, NotificationUOWDep
from core.database import async_session

notification_router = APIRouter(
    prefix="/notification",
)


@notification_router.websocket("/ws")
async def notification_websocket(websocket: WebSocket,
                                 uow: NotificationUOWDep,
                                 notification_service: NotificationServiceDep):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            valid_data = CreateNotificationSchema.parse_raw(data)
            result = await notification_service.add(uow, valid_data)
            await websocket.send_text(str(result))
        except WebSocketDisconnect:
            await websocket.close()
            break
