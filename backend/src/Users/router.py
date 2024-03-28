import base64
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy import update

from sqlalchemy.ext.asyncio import AsyncSession


from src.Users.models import User
from src.Users.schemas import UserCreateSchema, UserReadSchema, UserVerifiedEmailCode, UserChangePassword, \
    UserEditSchema, PhotoReadSchema
from src.Users.utils import get_user_by_email, hash_password, get_current_user, generated_code, verify_password
from src.database import get_async_session


users_routers = APIRouter(
    prefix="/api/v1/user",
    tags=["Users"]
)


@users_routers.post("/register/", response_model=UserReadSchema)
async def register(
        data: UserCreateSchema,
        session: AsyncSession = Depends(get_async_session)
):
    """ Регистрация пользователя """
    existing_user = await get_user_by_email(data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="This Email already exists")
    user_dict = data.model_dump()
    password = user_dict.pop("password")
    user_dict["hashed_password"] = hash_password(password)
    user_dict["code"] = int(generated_code())
    user_dict["DateAdd"] = datetime.now()
    user_dict["DateUpdate"] = datetime.now()
    # try:
    #     send_code_email_verified.delay(user_dict)
    # except (SMTPDataError, SMTPRecipientsRefused):
    #     raise HTTPException(status_code=400, detail="Email verification failed")
    create_user = User(**user_dict)
    session.add(create_user)
    await session.commit()
    return create_user


@users_routers.post('/verified/')
async def email_verify(
        data: UserVerifiedEmailCode,
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Ввести код, для верификации email """
    if user.code == data.code:
        stmt = update(User).where(User.email == user.email).values(is_verified=True, code=None)
        await session.execute(stmt)
        await session.commit()
        return {"status": "Success"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect code")


profile_routers = APIRouter(
    prefix="/api/v1/profile",
    tags=["Profile"]
)


@profile_routers.get("/", response_model=UserReadSchema)
async def account(current_user: User = Depends(get_current_user)):
    """ Возвращает данные пользователя """
    return current_user


@profile_routers.post('/change-password/')
async def change_password(
        data: UserChangePassword,
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Сменить пароль пользователя """
    if data.old_password == data.new_password:
        raise HTTPException(status_code=400, detail='Passwords may not be repeated')
    verified = verify_password(data.old_password, user.hashed_password)
    if verified:
        await session.execute(
            update(User).where(User.email == user.email).values(hashed_password=hash_password(data.new_password))
        )
        await session.commit()
    else:
        raise HTTPException(status_code=400, detail='You entered the wrong password')
    return {'status': 'Password updated successfully'}


@profile_routers.put('/edit/')
async def edit_account(
        data: UserEditSchema,
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Редактирование данных пользователя """
    user_dict = data.model_dump()
    user_dict["DateUpdate"] = datetime.now()
    await session.execute(
        update(User).where(User.email == user.email).values(**user_dict)
    )
    await session.commit()
    return {'status': 'Account updated successfully'}


@profile_routers.get('/edit/', response_model=UserEditSchema)
async def edit_account_view(current_user: User = Depends(get_current_user)):
    """ Редактирование данных пользователя """
    return current_user



@profile_routers.put('/remove/')
async def delete_account(
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Удаление данных пользователя """
    stmt = update(User).where(User.id == current_user.id).values(is_active=False)
    await session.execute(stmt)
    await session.commit()
    return {'status': 'Account deleted successfully'}


@profile_routers.put("/set-photo/")
async def set_photo(
        file: UploadFile = File(...),
        user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Установить фото пользователя """
    contents = await file.read()
    try:
        encoded_file = base64.b64encode(contents)
        await session.execute(update(User).where(User.id == user.id).values(photo=encoded_file))
        await session.commit()
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")
    return {'status': 'Photo updated'}



@profile_routers.put("remove-photo/")
async def remove_photo(
        current_user: User = Depends(get_current_user),
        session: AsyncSession = Depends(get_async_session)
):
    """ Удалить фото пользователя """
    await session.execute(update(User).where(User.id == current_user.id).values(photo=None))
    await session.commit()
    return "Photo removed"


@profile_routers.get("/get-photo/", response_model=PhotoReadSchema)
async def get_photo(current_user: User = Depends(get_current_user)):
    """ Получить фото пользователя """
    return current_user
