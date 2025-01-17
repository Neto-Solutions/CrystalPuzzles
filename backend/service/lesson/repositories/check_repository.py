from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import insert, select, exists, delete
from sqlalchemy.orm import selectinload, joinedload

from common.repository.base_repository import BaseRepository
from service.lesson.models import Check, TrainingCheck, Lesson

from service.users.models import User


class CheckRepository(BaseRepository):
    model = Check

    async def __bind_training_check(self, training_check: dict):
        stmt = (
            insert(TrainingCheck)
            .values(**training_check)
            .returning(TrainingCheck)
        )
        await self.session.execute(stmt)

    async def __checks_exist(self, lesson_id: int):
        return (await self.session.execute(
            select(exists(self.model))
            .filter(self.model.lesson_id == lesson_id)
            .limit(1)
        )).scalar_one_or_none()

    async def __checks_student_exist(self, student_id: int):
        return (await self.session.execute(
            select(User)
            .filter(User.id == student_id)
            .limit(1)
        )).scalar_one_or_none()

    async def __checks_lesson_exist(self, lesson_id: int):
        return (await self.session.execute(
            select(Lesson)
            .filter(Lesson.id == lesson_id)
            .limit(1)
        )).scalar_one_or_none()

    async def get_by_filter(self, **kwargs):
        stmt = select(self.model)
        stmt = await self._add_filters(stmt, **kwargs)
        return (await self.session.execute(stmt)).scalar_one_or_none()

    async def add(self, data: dict) -> int:
        # Установить дату, если она отсутствует
        if "date_add" not in data:
            data["date_add"] = datetime.utcnow()
        if "date_update" not in data:
            data["date_update"] = datetime.utcnow()

        training_check_list = data.pop("training_check")
        check_id = await super().add(data)
        for training_check in training_check_list:
            training_check["check_id"] = check_id
            await self.__bind_training_check(training_check)
        data["training_check"] = training_check_list
        return check_id

    async def get_checks_by_filter(self, **filters):
        """
        Получение чек-листов с фильтрацией по lesson_id, student_id и другим параметрам.
        """
        stmt = select(self.model).options(
            joinedload(self.model.lesson),  # Загрузка связанного урока
            joinedload(self.model.student),  # Загрузка связанного студента
            joinedload(self.model.training_data)  # Загрузка данных тренировки
            .joinedload(TrainingCheck.training)  # Загрузка данных тренировок
        )

        # Применяем фильтры
        if "lesson_id" in filters:
            stmt = stmt.filter(self.model.lesson_id == filters["lesson_id"])
        if "student_id" in filters:
            stmt = stmt.filter(self.model.student_id == filters["student_id"])
        if "trainer_id" in filters:
            stmt = stmt.filter(self.model.lesson.has(trainer_id=filters["trainer_id"]))

        print(f"Filters applied: {filters}")
        result = await self.session.execute(stmt)
        return result.unique().scalars().all()

    async def get_check_by_id(self, check_id: int):
        """
        Получение чек-листа по идентификатору.
        """

        print(f'repository: check_id: {check_id}')

        stmt = select(self.model).options(
            joinedload(self.model.lesson),  # Подгрузка связанного урока
            joinedload(self.model.student),  # Подгрузка связанного студента
            joinedload(self.model.training_data)  # Подгрузка данных тренировки
        ).filter(self.model.id == check_id)

        result = await self.session.execute(stmt)
        return result.unique().scalar_one_or_none()

    # Добавление записи check в урок
    async def add_check_for_lesson(self, data: dict) -> bool:

        lesson_id = data.get("lesson_id")

        if not await self.__checks_exist(lesson_id):
            student_ids = data.pop("students_id")

            if await self.__checks_lesson_exist(lesson_id):
                print(f"Lesson found. lesson_id: {lesson_id}.")
            else:
                raise HTTPException(status_code=400, detail=f"The Lesson with id: {lesson_id} not exist.")

            for student_id in student_ids:

                print(f'student_id: {student_id}')

                data["student_id"] = student_id
                check_id = await self.add(data)

                print(f'check_id: {check_id}')

                # Проверка наличия студента в базе.
                if await self.__checks_student_exist(student_id):
                    print(f"Record found for student_id {student_id}.")
                else:
                    print(f"No record found for student_id {student_id}")
                    raise HTTPException(status_code=400, detail="No record found for student_id: {lesson_id}.")

            return True

        raise HTTPException(status_code=400, detail="Check exist")

    async def add_user_for_lesson(self, lesson_id, data: dict) -> bool:
        """Добавить пользователя в урок."""

        if await self.get_by_filter(student_id=data.get('student_id'), lesson_id=lesson_id):
            raise HTTPException(status_code=400, detail="Student already exist in lesson")

        training_data = (await self.session.execute(
            select(self.model)
            .options(
                selectinload(self.model.training_data)
            )
            .filter(
                self.model.lesson_id == lesson_id
            )
            .limit(1)
        )).scalar_one_or_none().training_data
        data["training_check"] = (
            {
                "training_id": training.training_id, "repetitions": training.repetitions
            } for training in training_data
        )
        data["lesson_id"] = lesson_id
        check_id = await self.add(data)
        return bool(check_id)

    async def delete_user_for_lesson(self, lesson_id, data: dict):
        """Удалить пользователя из урока."""
        check = await self.get_by_filter(student_id=data.get('student_id'), lesson_id=lesson_id)
        if not check:
            raise HTTPException(status_code=404, detail="Check not found")
        stmt = delete(TrainingCheck).filter(TrainingCheck.check_id == check.id)
        await self.session.execute(stmt)
        await self.delete_db(check.id)
