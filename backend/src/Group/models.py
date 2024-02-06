from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa

from src.Group.utils import ModelManager
from src.database import Base


class Group(Base, ModelManager):
    __tablename__ = "Groups"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Users.id", use_alter=True), nullable=True)
