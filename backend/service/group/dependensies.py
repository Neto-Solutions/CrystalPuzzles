from typing import Annotated

from fastapi import Depends

from core.abstractions.uow_abstract import AbstractUnitOfWork
from service.group.schemas import GroupFilterSchema
from service.group.services.group_service import GroupService
from service.group.services.student_service import StudentService
from service.group.unit_of_work.group_uow import GroupUOW
from service.group.unit_of_work.student_uow import StudentUOW

# region ------------------------------- Service ------------------------------------
GroupServiceDep = Annotated[GroupService, Depends(GroupService)]
StudentServiceDep = Annotated[StudentService, Depends(StudentService)]
# endregion -------------------------------------------------------------------------


# region ---------------------------- Unit of work ----------------------------------
GroupUOWDep = Annotated[AbstractUnitOfWork, Depends(GroupUOW)]
StudentUOWDep = Annotated[AbstractUnitOfWork, Depends(StudentUOW)]

# endregion -------------------------------------------------------------------------


# region ------------------------------- Filers -------------------------------------
GroupFilterDep = Annotated[GroupFilterSchema, Depends()]
# endregion -------------------------------------------------------------------------
