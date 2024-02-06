from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from jose import ExpiredSignatureError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src.Users.models import Token
from src.Users.utils import authenticate_user, create_access_token, create_refresh_token, \
    oauth2_scheme, jwt_access_decode, jwt_refresh_decode
from src.database import get_async_session

auth_routers = APIRouter(
    prefix="/api/v1/auth",
    tags=["Auth"]
)

@auth_routers.post("/login/")
async def login(data: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_async_session)):
    """ Войти в учетную запись """
    user = await authenticate_user(data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    # token_db = Token(user_id=user.id, access_token=access_token, refresh_token=refresh_token, status=True)
    # session.add(token_db)
    # await session.commit()
    return {"access_token": access_token, "token_type": "bearer"}

@auth_routers.get('/refresh-token/')
async def refresh_token(
        access_token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_async_session)
):
    """ Обновить access token """
    try:
        jwt_access_decode(access_token)
    except ExpiredSignatureError:
        query = await session.execute(select(Token).where(Token.access_token == access_token))
        token_db = query.scalar()
        try:
            jwt_refresh_decode(token_db.refresh_token)
        except ExpiredSignatureError:
            raise HTTPException(status_code=400, detail="Fail")
        else:
            new_access_token = create_access_token(data={"sub": token_db.user_id})
            token_db.access_token = new_access_token
            session.add(token_db)
            await session.commit()
            return {"access_token": new_access_token, "token_type": "bearer"}
    else:
        return {"message": "Token is fresh"}
