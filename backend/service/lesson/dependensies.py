from service.group.repositories.group_repository import GroupRepository
from service.group.repositories.student_repository import StudentRepository
from service.group.services.group_service import GroupService
from service.group.services.student_service import StudentService
from service.lesson.repositories.check_repository import CheckRepository
from service.lesson.repositories.lesson_repository import LessonRepository
from service.lesson.repositories.space_repository import SpaceRepository
from service.lesson.repositories.training_check_repository import TrainingCheckRepository
from service.lesson.services.check_service import CheckService
from service.lesson.services.lesson_service import LessonService
from service.lesson.services.space_service import SpaceService
from service.lesson.services.training_check_service import TrainingCheckService


def lesson_service():
    return LessonService(LessonRepository)

def space_service():
    return SpaceService(SpaceRepository)

def check_service():
    return CheckService(CheckRepository)

def training_check_service():
    return TrainingCheckService(TrainingCheckRepository)





