from typing import Annotated

from fastapi import Depends

from core.abstractions.uow_abstract import AbstractUnitOfWork
from service.users.schemas import UserFilterSchema
from service.users.services.admin_service import AdminPanelService
from service.users.services.user_service import UserService
from service.users.unit_of_work import UserUOW


# region ------------------------------- Service ------------------------------------
UserServiceDep = Annotated[UserService, Depends(UserService)]
AdminPanelServiceDep = Annotated[UserService, Depends(AdminPanelService)]
# endregion -------------------------------------------------------------------------


# region ---------------------------- Unit of work ----------------------------------
UserUOWDep = Annotated[AbstractUnitOfWork, Depends(UserUOW)]
# endregion -------------------------------------------------------------------------


# region ------------------------------- Filers -------------------------------------
UserFilterDep = Annotated[UserFilterSchema, Depends()]
# endregion -------------------------------------------------------------------------
