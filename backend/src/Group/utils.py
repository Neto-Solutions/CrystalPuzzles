from datetime import datetime

import sqlalchemy as sa
from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.database import SessionLocal


class ModelManager:

    @classmethod
    def get(cls, db: Session, id: int):
        return db.query(cls).filter(cls.id == id).first()

    @classmethod
    def get_all(cls, db: Session):
        return db.query(cls).all()


    def create(self, db:Session):
        try:
            self.DateAdd = datetime.now()
            self.DateUpdate = datetime.now()
            db.add(self)
            db.commit()
            return self
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

    def update(self, db, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.DateUpdate = datetime.now()
        return self.save(db)

    def delete(self, db: Session):
        try:
            db.delete(self)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

