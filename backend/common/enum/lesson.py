from enum import Enum


class StatusTypeEnum(Enum):
    """Типы статусов занятия."""
    created = "created"
    in_editing = "in_editing"
    in_progress = "in_progress"
    finished = "finished"
