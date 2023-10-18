import datetime

from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa
from src.database import Base


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
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
    photo: Mapped[str] = mapped_column(nullable=True)
    type_id: Mapped[int] = mapped_column(sa.ForeignKey("user_type.id"), nullable=True)
    gender: Mapped[str] = mapped_column(sa.String, nullable=True)
    group_id: Mapped[int] = mapped_column(sa.ForeignKey("user_group.id"), nullable=True)
    rank_id: Mapped[int] = mapped_column(sa.ForeignKey("user_rank.id"), nullable=True)
    contact: Mapped[str] = mapped_column(nullable=True)


class UserType(Base):
    __tablename__ = "user_type"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)


class UserGroup(Base):
    __tablename__ = "user_group"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("user.id", use_alter=True))


class UserRank(Base):
    __tablename__ = "user_rank"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    task_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("task.id"))


class Task(Base):
    __tablename__ = "task"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    description = mapped_column(sa.Text, nullable=True)


class Token(Base):
    __tablename__ = "token"
    user_id: Mapped[str] = mapped_column(sa.ForeignKey("user.id"), nullable=False)
    access_token: Mapped[str] = mapped_column(sa.String(450), primary_key=True)
    refresh_token: Mapped[str] = mapped_column(sa.String(450), nullable=False)
    status: Mapped[bool]
    created_date = mapped_column(sa.DateTime, default=datetime.datetime.now)
