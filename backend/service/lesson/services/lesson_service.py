from core.service import BaseService
from service.lesson.schemas.lesson_schemas import CreateLessonSchema, LessonFilterSchema  #, EditLessonSchema
from service.lesson.schemas.lesson_schemas import LessonFilterSchema


class LessonService(BaseService):
    create_schema = CreateLessonSchema
    edit_schema = LessonFilterSchema
    async def add(self, lesson: create_schema):
        lesson.start = lesson.start.replace(tzinfo=None)
        check = await self.repo.get_by_start_time_and_space(lesson.space_id, lesson.start)
        if check is None or check.deleted:
            return await super().add(lesson)
        return None

    async def edit(self, lesson: edit_schema):
        lesson.start = lesson.start.replace(tzinfo=None)
        check = await self.repo.get_by_start_time_and_space(lesson.space_id, lesson.start)
        if check is None or (check.id == lesson.id and not check.deleted):
            return await super().edit(lesson)
        return None

    async def get(self, lesson_id: int):
        return await self.repo.get(lesson_id)


    async def get_all_by_filters(self, filters: LessonFilterSchema):
        return await self.repo.get_all_lesson_by_filter(filters.search_string, filters.page_number,
                                                        filters.page_size, filters.date_begin, filters.trainer)
