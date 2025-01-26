from pprint import pprint

from fastapi import HTTPException
from common.service.base_service import BaseService
from service.lesson.unit_of_work.check_uow import CheckUOW

from service.users.services.user_service import UserService
from service.training.service import TrainingService
# from service.lesson.services.lesson_service import LessonService

from service.lesson.schemas.check_schema import CreateCheckSchema

class CheckService(BaseService):
    """
    Сервисный слой, который содержит бизнес-логику работы с чек-листами.
    """
    @staticmethod
    async def add_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        # Открываем контекст uow, чтобы начать транзакцию
        async with uow:
            # Вызываем репозиторий uow.repo.add_user_for_lesson, чтобы добавить данные пользователя к уроку
            result = await uow.repo.add_user_for_lesson(lesson_id, data)
            # Фиксируем изменения через uow.commit()
            await uow.commit()
            return result

    @staticmethod
    async def delete_user_for_lesson(uow: CheckUOW, lesson_id, data: dict):
        async with uow:
            result = await uow.repo.delete_user_for_lesson(lesson_id, data)
            await uow.commit()
            return result

    @staticmethod
    async def add_check_for_lesson(
        model: CreateCheckSchema,
        # lesson_uow,
        check_uow,
        user_uow,
        training_uow,
        **kwargs):

        # Проверка на наличие студента
        for student_id in model.student_ids:
            print(f'check in servise if student {student_id} exist')
            await UserService.student_check(user_uow, student_id)
        for training in model.training_check:
            # Проверка на наличинее тренировки
            print(f'check in servise if training {training} exist')
            await TrainingService.training_exist(training_uow, training.training_id)
        
        # Проверка на наличинее урока
        # await LessonService.lesson_exist(lesson_uow, model.lesson_id)
        

        async with check_uow:
            result = await check_uow.repo.add_check_for_lesson(model)
            await check_uow.commit()
            return result
        
        return True
    
    @staticmethod
    async def get_all_check(uow: CheckUOW, filters):
        """
        Получение всех чек-листов.
        """
        async with uow:
            check = await uow.repo.get_all_check(filters)

            print(f'check: {check}')
        return check
    
    @staticmethod
    async def get_check_by_id(uow: CheckUOW, check_id: int):
        """
        Получение чек-листа по идентификатору.
        """

        print(f'staticmethod: check_id: {check_id}')
        async with uow:
            check = await uow.repo.get_check_by_id(check_id)
        return check
    
    @staticmethod
    async def update_check_by_id(uow: CheckUOW, check_id: int, data: dict) -> bool:
        """
        Обновление чек-листа по ID.
        """
        async with uow:
            # Проверяем, существует ли чек-лист
            existing_check = await uow.repo.get_check_by_id(check_id)
            if not existing_check:
                return False

            print(f"Existing check found: {existing_check}")

            # Обновляем данные чек-листа
            await uow.repo.update_check_by_id(check_id, data)
            await uow.commit()
            return True

    @staticmethod
    async def delete_check_by_id(uow: CheckUOW, check_id: int) -> bool:
        """
        Удаление чек-листа по ID.
        """
        async with uow:
            # Проверяем, существует ли чек-лист
            existing_check = await uow.repo.get_check_by_id(check_id)
            if not existing_check:
                return False

            print(f"Deleting check: {existing_check}")

            # Удаляем чек-лист
            await uow.repo.delete_check_by_id(check_id)
            await uow.commit()
            return True
        
    @staticmethod
    async def mark_check_as_deleted(uow: CheckUOW, check_id: int) -> bool:
        """
        Логическое удаление чек-листа.
        """
        async with uow:
            # Проверяем, существует ли чек-лист
            existing_check = await uow.repo.get_check_by_id(check_id)
            if not existing_check:
                raise HTTPException(status_code=404, detail="Чек-лист не найден")

            # Отмечаем как удалённый
            await uow.repo.mark_check_as_deleted(check_id)
            await uow.commit()
            return True