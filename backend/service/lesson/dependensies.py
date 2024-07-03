from typing import Annotated

from fastapi import Depends

from core.abstractions.uow_abstract import AbstractUnitOfWork
from service.lesson.schemas.lesson_schemas import LessonFilterSchema
from service.lesson.schemas.space_schemas import SpaceFilterSchema
from service.lesson.services.check_service import CheckService
from service.lesson.services.lesson_service import LessonService
from service.lesson.services.space_service import SpaceService
from service.lesson.unit_of_work.check_uow import CheckUOW
from service.lesson.unit_of_work.lesson_uow import LessonUOW
from service.lesson.unit_of_work.space_uow import SpaceUOW


# region ------------------------------- Service ------------------------------------
LessonServiceDep = Annotated[LessonService, Depends(LessonService)]
SpaceServiceDep = Annotated[SpaceService, Depends(SpaceService)]
CheckServiceDep = Annotated[CheckService, Depends(CheckService)]
# endregion -------------------------------------------------------------------------


# region ---------------------------- Unit of work ----------------------------------
LessonUOWDep = Annotated[AbstractUnitOfWork, Depends(LessonUOW)]
SpaceUOWDep = Annotated[AbstractUnitOfWork, Depends(SpaceUOW)]
CheckUOWDep = Annotated[AbstractUnitOfWork, Depends(CheckUOW)]
# endregion -------------------------------------------------------------------------


# region ------------------------------- Filers -------------------------------------
LessonFilterDep = Annotated[LessonFilterSchema, Depends()]
SpaceFilterDep = Annotated[SpaceFilterSchema, Depends()]
# CheckFilterDep = Annotated[CheckFilterSchema, Depends()]
# endregion -------------------------------------------------------------------------
