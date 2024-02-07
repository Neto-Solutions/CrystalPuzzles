from requests import Session
from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa

from src.modelmanager import ModelManager, AsyncModelManager
from src.Users.models import User
from src.database import Base


class Group(Base, ModelManager, AsyncModelManager):
    __tablename__ = "Groups"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(sa.String, nullable=False)
    trainer_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("Users.id", use_alter=True), nullable=True)

    @classmethod
    def trainer_exists(cls, db: Session, id) -> bool:
        if id in [None, 0] or User.get(db=db, id=id).role != "trainer":
            return False
        return True
