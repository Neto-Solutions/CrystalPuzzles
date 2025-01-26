from datetime import datetime
from pprint import pprint
from fastapi import HTTPException
import sqlalchemy as sa
from sqlalchemy import insert, select, exists, delete
from sqlalchemy.orm import selectinload, joinedload

from common.repository.base_repository import BaseRepository
from service.lesson.models import Check, TrainingCheck, Lesson

from service.lesson.schemas.check_schema import CreateCheckSchema
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
            .filter(self.model.id == lesson_id)
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
            .where(Lesson.id == lesson_id)
            .limit(1)
        )).scalar_one_or_none()
    
    async def get_all_check(self, filters):
        stmt = select(self.model).where(self.model.deleted.__eq__(False))
        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)

        for record in response['records']:
            pprint(vars(record))

        return response

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
            joinedload(self.model.lesson),               
            joinedload(self.model.student),              
            joinedload(self.model.training_data)         
            .joinedload(TrainingCheck.training)          
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
            joinedload(self.model.lesson),        
            joinedload(self.model.student),       
            joinedload(self.model.training_data)  
        ).filter(self.model.id == check_id)

        result = await self.session.execute(stmt)
        print(result)
        pprint(result)

        return result.unique().scalar_one_or_none()

    # Добавление записи check в урок
    async def add_check_for_lesson(self, data: CreateCheckSchema) -> bool:       

        data = data.model_dump()

        lesson_id = data["lesson_id"]
        print(f'lesson_id: {lesson_id}')
        
        if not await self.__checks_exist(lesson_id):
            student_ids = data["student_ids"]
            print(f"Student IDs: {student_ids}")

            if await self.__checks_lesson_exist(lesson_id):
                print(f"Lesson found. lesson_id: {lesson_id}.")
            else:
                print(f"Lesson NOT found. lesson_id: {lesson_id}.")
                raise HTTPException(status_code=400, detail=f"The Lesson with id: {lesson_id} not exist.")  

            for student_id in student_ids:
                
                print(f'student_id: {student_id}')

                if await self.__checks_student_exist(student_id):
                    print(f"Record found for student_id {student_id}.")
                else:
                    print(f"No record found for student_id {student_id}")
                    raise HTTPException(status_code=400, detail="No record found for student_id: {lesson_id}.") 

                check_data = {
                    "student_id": student_id,
                    "lesson_id": lesson_id,
                    "comment": data.get("comment"),
                    "awards": data.get("awards"),
                    "date_add": data.get("date_add"),
                    "date_update": data.get("date_update"),
                    "deleted": data.get("deleted", False),
                    "training_check": data.get("training_check"),
                }

                print(f'training_check: {data["training_check"]}')

                # Добавляем запись в базу
                check_id = await self.add(check_data)
                print(f"Check created with ID: {check_id}")                     

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

    async def update_check_by_id(self, check_id: int, data: dict):
        """
        Обновление чек-листа по ID.
        """
        stmt = (
            select(self.model)
            .filter(self.model.id == check_id)
        )
        check = await self.session.execute(stmt)
        check = check.scalar_one_or_none()

        if not check:
            return

        # Обновляем данные
        for key, value in data.items():
            if hasattr(check, key):
                setattr(check, key, value)

        await self.session.commit()

    async def delete_check_by_id(self, check_id: int):
        """
        Удаление чек-листа по ID.
        """
        stmt = delete(self.model).filter(self.model.id == check_id)
        await self.session.execute(stmt)
        await self.session.commit()

    async def mark_check_as_deleted(self, check_id: int):
        """
        Обновление поля deleted для чек-листа.
        """
        stmt = (
            sa.update(Check)
            .where(Check.id == check_id)
            .values(deleted=True, date_update=datetime.utcnow())  # Обновляем поле deleted и дату обновления
        )
        await self.session.execute(stmt)
        await self.session.commit()