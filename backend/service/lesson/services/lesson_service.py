from datetime import datetime

from fastapi import HTTPException

from common.service.base_service import BaseService
from service.lesson.schemas.check_schema import CreateCheckSchema
from service.lesson.schemas.lesson_schemas import CreateLessonSchema, LessonFilterSchema, EditLessonSchema, \
    UserForLessonSchema
from service.lesson.services.check_service import CheckService
from service.lesson.services.space_service import SpaceService
from service.lesson.unit_of_work.check_uow import CheckUOW
from service.lesson.unit_of_work.lesson_uow import LessonUOW
from service.training.service import TrainingService
from service.users.services.user_service import UserService


class LessonService(BaseService):

    @staticmethod
    async def get_by_start_time_and_space(uow: LessonUOW, space_id: int, lesson_start_time: datetime):
        async with uow:
            result = await uow.repo.get_by_start_time_and_space(space_id, lesson_start_time)
            return result

    async def add(self, uow: LessonUOW, lesson: CreateLessonSchema, **kwargs):
        await UserService.trainer_check(kwargs.get("user_uow"), lesson.trainer_id)
        await SpaceService.space_exists(kwargs.get("space_uow"), lesson.space_id)
        lesson.start = lesson.start.replace(tzinfo=None)
        check = await self.get_by_start_time_and_space(uow, lesson.space_id, lesson.start)
        if check is None or check.deleted:
            result = await super().add(uow, lesson)
            return result
        return None

    async def edit(self, uow: LessonUOW, lesson: EditLessonSchema, **kwargs):
        lesson.start = lesson.start.replace(tzinfo=None)
        check = await self.get_by_start_time_and_space(uow, lesson.space_id, lesson.start)
        if check is None or (check.id == lesson.id and not check.deleted):
            result = await super().edit(uow, lesson)
            return result
        return None

    @staticmethod
    async def get_all_by_filters(uow: LessonUOW, filters: LessonFilterSchema, **kwargs):
        async with uow:
            if kwargs["user"].role.__eq__("student"):
                result = await uow.repo.get_all_lesson_by_filter(filters, student_id=kwargs["user"].id)
            else:
                result = await uow.repo.get_all_lesson_by_filter(filters)
            return result

    @staticmethod
    async def get(uow: LessonUOW, filters: LessonFilterSchema, **kwargs):
        async with uow:
            if kwargs["user"].role.__eq__("student"):
                result = await uow.repo.get(filters, student_id=kwargs["user"].id)
            else:
                result = await uow.repo.get(filters)
            return result

    async def add_check_for_lesson(self, uow: LessonUOW, model: CreateCheckSchema, **kwargs):
        # Проверка на наличие студента
        for student_id in model.student_ids:
            await UserService.student_check(kwargs.get("user_uow"), student_id)
        for training in model.training_check:
            # Проверка на наличинее тренировки
            await TrainingService.training_exist(kwargs.get("training_uow"), training.training_id)
        # Проверка на наличие занятия
        if await self.exist(uow, model.lesson_id):
            async with kwargs.get('check_uow') as check_uow:
                result = await check_uow.repo.add_check_for_lesson(model.model_dump())
                await check_uow.commit()
                return result
        raise HTTPException(status_code=400, detail="Lesson not exist")

    async def add_user(
            self,
            uow: LessonUOW,
            lesson_id: int,
            model: UserForLessonSchema,
            **kwargs
    ):
        await UserService.student_check(kwargs.get("user_uow"), model.student_id)
        if await self.exist(uow, lesson_id):
            return await CheckService.add_user_for_lesson(kwargs.get("check_uow"), lesson_id, model.model_dump())

    async def remove_user(self):
        pass

    async def add_training(self):
        pass

    async def delete_training(self):
        pass
