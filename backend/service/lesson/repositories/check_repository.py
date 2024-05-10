import math

from datetime import datetime
from sqlalchemy import select, func

from core.database import async_session
from core.repository import BaseRepository
from service.group.models import Group
from service.identity.models import User
from service.lesson.models import Lesson, Check


class CheckRepository(BaseRepository):
    model = Check


