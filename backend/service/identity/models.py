from datetime import datetime

from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa

from core.database import Base
from service.identity.schemas import UserSchemaForTable


class User(Base):
    __tablename__ = "Users"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    deleted: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    email: Mapped[str] = mapped_column(sa.String(254), nullable=False)
    hashed_password: Mapped[int] = mapped_column(sa.String(128), nullable=False)
    is_superuser: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(sa.Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(sa.Boolean, default=False, nullable=False)
    firstname: Mapped[str] = mapped_column(sa.String, nullable=True)
    lastname: Mapped[str] = mapped_column(sa.String, nullable=True)
    surname: Mapped[str] = mapped_column(sa.String, nullable=True)
    code: Mapped[int] = mapped_column(nullable=True)
    birthday: Mapped[datetime] = mapped_column(sa.DateTime, nullable=True)
    photo: Mapped[bytes] = mapped_column(BYTEA, nullable=True)
    role: Mapped[str] = mapped_column(sa.String, sa.ForeignKey("Roles.name"), nullable=True, default="student")
    is_man: Mapped[bool] = mapped_column(sa.Boolean, nullable=False, default=True)
    rank_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Ranks.id"), nullable=True)
    contact: Mapped[str] = mapped_column(sa.String, nullable=True)

    group = relationship("Group", back_populates="trainer", lazy="subquery")

    @property
    def is_student(self) -> bool:
        if self.role == "student":
            return True
        return False

    @property
    def to_read_model(self) -> UserSchemaForTable:
        return UserSchemaForTable(
            id=self.id,
            email=self.email,
            firstname=self.firstname,
            lastname=self.lastname,
            surnam=self.surname,
            birthday=self.birthday,
            is_man=self.is_man,
            contact=self.contact,
            date_add=self.date_add,
            date_update=self.date_update,
            date=self.date_update.strftime("%y.%m.%d %H:%M:%S"),
        )


class Role(Base):
    __tablename__ = "Roles"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False, unique=True)


class Rank(Base):
    __tablename__ = "Ranks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    task_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Tasks.id"))


class Task(Base):
    __tablename__ = "Tasks"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    date_add: Mapped[datetime] = mapped_column(sa.DateTime)
    date_update: Mapped[datetime] = mapped_column(sa.DateTime)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    description = mapped_column(sa.Text, nullable=True)
