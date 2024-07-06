from typing import Annotated

from fastapi import Depends

from core.abstractions.uow_abstract import AbstractUnitOfWork
from service.training.schemas import TrainingFilterSchema
from service.training.service import TrainingService
from service.training.unit_of_work import TrainingUOW

# region ------------------------------- Service ------------------------------------
TrainingServiceDep = Annotated[TrainingService, Depends(TrainingService)]
# endregion -------------------------------------------------------------------------


# region ---------------------------- Unit of work ----------------------------------
TrainingUOWDep = Annotated[AbstractUnitOfWork, Depends(TrainingUOW)]

# endregion -------------------------------------------------------------------------


# region ------------------------------- Filers -------------------------------------
TrainingFilterDep = Annotated[TrainingFilterSchema, Depends()]
# endregion -------------------------------------------------------------------------
