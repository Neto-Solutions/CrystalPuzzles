from http import HTTPStatus

from fastapi import APIRouter, Response
from starlette.responses import JSONResponse

from common.dependensies import UserDep
from common.schema.base_schemas import Message
from service.users.dependensies import UserServiceDep, UserUOWDep
from service.users.schemas import CreateUserSchema, UserChangePasswordSchema

user_router = APIRouter(
    prefix="/api/v1/user",
    tags=["Users"]
)


@user_router.post(
    "/register/",
    summary="Регистрация пользователя",
    response_model=int,
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def register(
        data: CreateUserSchema,
        uow: UserUOWDep,
        user_service: UserServiceDep
):
    """ anyone """
    user_id = await user_service.add(uow, data)
    if user_id:
        return user_id
    return Response(status_code=HTTPStatus.CONFLICT.value)


# @user_router.post(  # ToDo: временно откючено для тестов
#     '/verified/',
#     summary="Верификация электронной почты",
#     responses={
#         200: {"description": "Успешная обработка данных"},
#         401: {"description": "Не авторизованный пользователь"},
#         400: {"model": Message, "description": "Некорректные данные"},
#         500: {"model": Message, "description": "Серверная ошибка"}},
# )
# async def email_verify(
#         data: UserVerifiedEmailCode,
#         user_service: Annotated[UserService, Depends(user_service)],
#         user: User = Depends(get_current_user(()))
# ):
#     """ authenticate """
#     try:
#         if user.code == data.code:
#             res = await user_service.verify(user.id)
#             if res:
#                 return Response(status_code=HTTPStatus.OK.value)
#         logger.error({"user_id": user.id, "message": "Incorrect code"})
#         return Response(status_code=HTTPStatus.BAD_REQUEST.value)
#     except Exception as e:
#         logger.error(e)
#         raise HTTPException(status_code=500)


@user_router.post(
    '/change-password/',
    summary="Смена пароля пользователя",
    responses={
        200: {"description": "Успешная обработка данных"},
        401: {"description": "Не авторизованный пользователь"},
        400: {"model": Message, "description": "Некорректные данные"},
        500: {"model": Message, "description": "Серверная ошибка"}},
)
async def change_user_password(
        data: UserChangePasswordSchema,
        uow: UserUOWDep,
        user_service: UserServiceDep,
        current_user: UserDep
):
    """ authenticate """
    if data.old_password != data.new_password:
        result = await user_service.change_password(uow, data, current_user)
        if result:
            return Response(status_code=HTTPStatus.OK.value)
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="You entered the wrong password")
    else:
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST.value, content="Passwords may not be repeated")
