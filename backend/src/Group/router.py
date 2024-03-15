from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from starlette import status

from src.Group.models import Group
from src.Group.shemas import GroupViewModel, GroupResponseModel, StudentForGroupViewModel
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
    for person in item.students:
        person.delete(db=session)
    item.delete(db=session)
    return Response(status_code=204)


student_routers = APIRouter(
    prefix="/api/v1/group",
    tags=["StudentGroup"]
)


@student_routers.post("/add-student/")
async def add_student_for_group(items: StudentForGroupViewModel,
                                user: str = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"])),
                                session: Session = Depends(get_sync_session)
                                ):
    """ Добавление студента в группу """
    group = Group.get(db=session, id=items.group_id)
    user = User.get(db=session, id=items.student_id)
    if group is None or not user.is_student():
        raise HTTPException(status_code=404, detail="Item not found")
    result = group.add_student(db=session, student_id=user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return Response(status_code=201)


@student_routers.delete("/delete-student/")
async def delete_student_for_group(
                                items: StudentForGroupViewModel,
                                user: str = Depends(get_current_user_with_role(["admin", "supervisor", "trainer"])),
                                session: Session = Depends(get_sync_session)
                                ):
    """ Удаление студента из группы """
    group = Group.get(db=session, id=items.group_id)
    user = User.get(db=session, id=items.student_id)
    if group is None or not user.is_student():
        raise HTTPException(status_code=404, detail="Item not found")
    result = group.delete_student(db=session, student_id=user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return Response(status_code=204)
