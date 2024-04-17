from service.group.repositories.group_repository import GroupRepository
from service.group.repositories.student_repository import StudentRepository
from service.group.services.group_service import GroupService
from service.group.services.student_service import StudentService


def group_service():
    return GroupService(GroupRepository)


def group_repository():
    return GroupRepository()


def student_service():
    return StudentService(StudentRepository)


def student_repository():
    return StudentRepository()


