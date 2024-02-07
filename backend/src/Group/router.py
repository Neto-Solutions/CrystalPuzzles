from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from starlette import status

from src.Group.models import Group
from src.Group.shemas import GroupViewModel, GroupResponseModel
from src.Users.models import User
from src.Users.utils import get_current_user, get_current_user_with_role
from src.database import get_sync_session


group_routers = APIRouter(
    prefix="/api/v1/group",
    tags=["Group"]
)


@group_routers.get("/{group_id}", response_model=GroupResponseModel)
async def get_group(group_id: int,
                    session: Session = Depends(get_sync_session),
                    user: str = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
                    ):
    """ Получение группы по id """
    item = Group.get(db=session, id=group_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@group_routers.get("/", response_model=List[GroupResponseModel])
async def get_all_group(
                    session: Session = Depends(get_sync_session),
                    user: str = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"]))
                    ):
    """ Получение всех групп """
    items = Group.get_all(db=session)
    if items is None:
        return List
    return items


@group_routers.post("/", response_model=GroupResponseModel)
async def create_group(model: GroupViewModel,
                       user: str = Depends(get_current_user_with_role(["admin", "supervisor"])),
                       session: Session = Depends(get_sync_session)):
    """ Создание группы """
    if not Group.trainer_exists(db=session, id=model.trainer_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Trainer field error")
    group_dict = model.model_dump()
    create_user = Group(**group_dict)
    item = create_user.create(session)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@group_routers.put("/{group_id}", response_model=GroupResponseModel)
async def edit_group(group_id: int,
                     model: GroupViewModel,
                     session: Session = Depends(get_sync_session),
                     user: str = Depends(get_current_user_with_role(["admin", "supervisor"]))
                     ):
    """ Изменение группы по id """
    if not Group.trainer_exists(db=session, id=model.trainer_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Trainer field error")
    item = Group.get(db=session, id=group_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item.update(db=session, **model.model_dump())
    return item


@group_routers.delete("/{group_id}")
async def delete_group(group_id: int,
                       session: Session = Depends(get_sync_session),
                       user: str = Depends(get_current_user_with_role(["admin", "supervisor"]))
                       ):
    """ Удаление группы по id """
    item = Group.get(db=session, id=group_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item.delete(db=session)
    return Response(status_code=204)


student_routers = APIRouter(
    prefix="/api/v1/group",
    tags=["StudentGroup"]
)


@student_routers.get("/select-student/{group_id}")
async def group_list(group_id: int, current_user: User = Depends(get_current_user)):
    pass


@student_routers.put("/add-student/{group_id}")
async def add_student_for_group(group_id: int, current_user: User = Depends(get_current_user)):
    pass


@student_routers.put("/delete-student/{group_id}")
async def delete_student_for_group(group_id: int, current_user: User = Depends(get_current_user)):
    pass
