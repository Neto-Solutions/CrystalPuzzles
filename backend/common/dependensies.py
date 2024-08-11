from typing import Annotated

from fastapi import Depends

from service.identity.security import get_current_user
from service.users.models import User

# region --------------------------------- Auth -------------------------------------
UserDep = Annotated[User, Depends(get_current_user())]
AdminDep = Annotated[User, Depends(get_current_user(("admin",)))]
SupervisorDep = Annotated[User, Depends(get_current_user(("supervisor",)))]
TrainerDep = Annotated[User, Depends(get_current_user(("trainer",)))]
TrainerSupervisorAdminDep = Annotated[User, Depends(get_current_user(("trainer", "admin", "supervisor")))]
SupervisorAdminDep = Annotated[User, Depends(get_current_user(("admin", "supervisor")))]
# endregion -------------------------------------------------------------------------
