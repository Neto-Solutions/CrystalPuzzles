from fastapi import HTTPException
from sqlalchemy import insert, select, exists, delete
from sqlalchemy.orm import selectinload

from common.repository.base_repository import BaseRepository
from service.lesson.models import Check, TrainingCheck


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

    async def get_by_filter(self, **kwargs):
        stmt = select(self.model)
        stmt = await self._add_filters(stmt, **kwargs)
        return (await self.session.execute(stmt)).scalar_one_or_none()

    async def add(self, data: dict) -> int:
        training_check_list = data.pop("training_check")
        check_id = await super().add(data)
        for training_check in training_check_list:
            training_check["check_id"] = check_id
            await self.__bind_training_check(training_check)
        data["training_check"] = training_check_list
        return check_id

    async def add_check_for_lesson(self, data: dict) -> bool:
        if not await self.__checks_exist(data.get("lesson_id")):
            student_ids = data.pop("student_ids")
            for student_id in student_ids:
                data["student_id"] = student_id
                await self.add(data)
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
            {"training_id": training.training_id, "repetitions": training.repetitions} for training in training_data
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