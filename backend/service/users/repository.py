import os
from datetime import datetime
from typing import Optional

import aiofiles
from fastapi import UploadFile
from sqlalchemy import select, update, or_, insert

from common.repository.base_repository import BaseRepository
from service.users.models import User, ExtendedData
from service.users.schemas import UserFilterSchema


class UserRepository(BaseRepository):
    model = User

    # region ------------------- Вспомагательные методы -----------------------

    async def __upload_file_command(
            self,
            file: UploadFile,
            user_id: int,
    ) -> bool:
        """ Private: Загрузка фото на сервер """
        base_path = "static/photo/"
        directory_to_file = f"{user_id}/"
        file_name = f"{datetime.now().strftime('%y-%m-%dT%H-%M-%S')}.{file.content_type.split('/')[-1]}"
        abs_path = os.getcwd()
        file_path = os.path.join(
            abs_path,
            base_path,
            directory_to_file,
            file_name
        )
        full_directory_path = os.path.join(
            os.getcwd(),
            base_path,
            directory_to_file
        )
        if not os.path.exists(full_directory_path):
            os.makedirs(full_directory_path)
        photo = (await self.session.execute(
            update(self.model)
            .filter(
                self.model.id == user_id,
                self.model.deleted.__eq__(False))
            .values(
                photo=f"/pages/photo/{directory_to_file}{file_name}",
                date_update=datetime.now()
            ).returning(self.model.photo))).scalar_one_or_none()

        if photo:
            async with aiofiles.open(file_path, 'wb') as out_file:
                content = await file.read()
                await out_file.write(content)
            list_dir = os.listdir(full_directory_path)
            list_dir.remove(file_name)
            for file in list_dir:
                file_path = os.path.join(full_directory_path, file)
                os.remove(file_path)
        return bool(photo)
    # endregion ---------------------------------------------------------------

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(self.model).filter(self.model.email == email)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def get_with_deleted(self, user_id: int) -> Optional[User]:
        stmt = select(self.model).filter(self.model.id == user_id)
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return result

    async def edit_user(self, data: dict):
        if extended_data := data.pop("extensions"):
            extended_id_exist = (
                await self.session.execute(
                    select(self.model.extended_id)
                    .where(self.model.id.__eq__(data['id']))
                )
            ).scalar_one_or_none()
            if extended_id_exist:
                await self.session.execute(
                    update(ExtendedData)
                    .where(ExtendedData.id.__eq__(extended_id_exist))
                    .values(**extended_data)
                )
            else:
                extended_data_id = (
                    await self.session.execute(
                        insert(ExtendedData)
                        .values(**extended_data)
                        .returning(ExtendedData.id)
                    )
                ).scalar_one_or_none()
                data["extended_id"] = extended_data_id
        return await super().edit(data)

    async def edit_with_deleted(
            self,
            data: dict
    ) -> bool:
        id = data.pop('id')
        stmt = (
            update(self.model)
            .where(self.model.id.__eq__(id))
            .values(**data)
            .returning(self.model.id)
        )
        result = (await self.session.execute(stmt)).scalar_one_or_none()
        return bool(result)

    async def get_all_user_by_filter(
            self,
            filters: UserFilterSchema,
            deleted: Optional[bool]
    ) -> dict:
        stmt = select(self.model)

        if filters.search_string:
            stmt = stmt.filter(
                or_(
                    self.model.email.ilike(f"%{filters.search_string}%"),
                    self.model.firstname.ilike(f"%{filters.search_string}%"),
                    self.model.lastname.ilike(f"%{filters.search_string}%"),
                    self.model.surname.ilike(f"%{filters.search_string}%")
                )
            )
        if deleted is not None:
            stmt = await self._add_filters(stmt, deleted=deleted)

        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response

    async def trainer_exists(self, trainer_id: int) -> bool:
        trainer = await self.get(trainer_id)
        if trainer and trainer.role == "trainer":
            return True
        return False

    async def student_exists(self, student_id: int) -> bool:
        trainer = await self.get(student_id)
        if trainer and trainer.role == "student":
            return True
        return False

    async def get_all_by_filter(
            self,
            filters: UserFilterSchema,
            role: str
    ):
        stmt = (
            select(self.model)
            .filter(
                self.model.deleted.__eq__(False),
                self.model.role.__eq__(role)
            )
        )
        if filters.search_string:
            stmt = stmt.filter(
                (self.model.email.ilike(f"%{filters.search_string}%")) |
                (self.model.firstname.ilike(f"%{filters.search_string}%")) |
                (self.model.lastname.ilike(f"%{filters.search_string}%")) |
                (self.model.surname.ilike(f"%{filters.search_string}%"))
            )
        count_records = await self._get_count_records(stmt)
        records = await self._get_records(count_records, stmt, filters)
        response = await self._convert_response(count_records, records, filters)
        return response

    async def set_photo(self, user_id: int, file: UploadFile) -> bool:
        return await self.__upload_file_command(file, user_id)

    async def delete_photo(self, user_id: int) -> bool:
        stmt = (
            update(self.model)
            .filter(
                self.model.id == user_id,
                self.model.deleted.__eq__(False)
            )
            .values(
                photo=None,
                date_update=datetime.now()
            )
        )
        await self.session.execute(stmt)
        abs_path = os.path.join(
            os.getcwd(),
            f"static/photo/{user_id}",
        )
        list_dir = os.listdir(abs_path)
        for file in list_dir:
            file_path = os.path.join(abs_path, file)
            os.remove(file_path)
