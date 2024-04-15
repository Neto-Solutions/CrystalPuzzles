import random
import string

from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login/", scheme_name="JWT")


def hash_password(password: str) -> str:
    """ Хэширует пароль при регитсрации """
    return pwd_context.hash(password)


def generated_code():
    """ Генерация кода для верификации пользователя """
    code = ''.join(random.choice(string.digits) for _ in range(4))
    return code



