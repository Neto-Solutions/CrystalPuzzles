import datetime

from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa

from src.modelmanager import ModelManager
from src.database import Base


class User(Base, ModelManager):
    __tablename__ = "Users"
    email: Mapped[int] = mapped_column(sa.String(254), nullable=False)
    hashed_password: Mapped[int] = mapped_column(sa.String(128), nullable=False)
    is_superuser: Mapped[bool] = mapped_column(default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    firstname: Mapped[str] = mapped_column(sa.String(50), nullable=True)
    lastname: Mapped[str] = mapped_column(sa.String(50), nullable=True)
    surname: Mapped[str] = mapped_column(sa.String(50), nullable=True)
    code: Mapped[int] = mapped_column(nullable=True)
    birthday = mapped_column(sa.Date, nullable=True)
    photo: Mapped[bytes] = mapped_column(nullable=True)
    role: Mapped[str] = mapped_column(sa.ForeignKey("Roles.name"), nullable=True)
    is_man: Mapped[bool] = mapped_column(sa.Boolean, nullable=False, default=True)
    rank_id: Mapped[int] = mapped_column(sa.ForeignKey("Ranks.id"), nullable=True)
    contact: Mapped[str] = mapped_column(nullable=True)

    def is_student(self) -> bool:
        if self.role == "student":
            return True
        return False

class Role(Base, ModelManager):
    __tablename__ = "Roles"
    name: Mapped[str] = mapped_column(sa.String, nullable=False, unique=True)

class Rank(Base, ModelManager):
    __tablename__ = "Ranks"
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    task_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Tasks.id"))

class Task(Base, ModelManager):
    __tablename__ = "Tasks"
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    description = mapped_column(sa.Text, nullable=True)

class Token(Base, ModelManager):
    __tablename__ = "Tokens"
    user_id: Mapped[str] = mapped_column(sa.ForeignKey("Users.id"), nullable=False)
    access_token: Mapped[str] = mapped_column(sa.String(450), primary_key=True)
    refresh_token: Mapped[str] = mapped_column(sa.String(450), nullable=False)
    status: Mapped[bool]
    created_date = mapped_column(sa.DateTime, default=datetime.datetime.now)
