from typing import Annotated

from fastapi import Depends, Cookie
from fastapi.security import OAuth2PasswordRequestForm

from service.identity.service import AuthService


# region ------------------------------- Service ------------------------------------
AuthServiceDep = Annotated[AuthService, Depends(AuthService)]
# endregion -------------------------------------------------------------------------


# region ----------------------------- Auth form ------------------------------------
OAuth2PasswordDep = Annotated[OAuth2PasswordRequestForm, Depends()]
# endregion -------------------------------------------------------------------------


# region ------------------------------- Cookie -------------------------------------
RefreshDep = Annotated[str, Cookie(alias="refresh_token", include_in_schema=False)]
# endregion -------------------------------------------------------------------------
