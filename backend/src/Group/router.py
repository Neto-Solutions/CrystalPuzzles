from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from starlette import status

from src.Group.models import Group
from src.Group.shemas import GroupViewModel, GroupResponseModel
from src.Users.models import User
from src.Users.utils import get_current_user, get_current_user_with_role
from src.database import get_async_session, get_sync_session


group_routers = APIRouter(
    prefix="/api/v1/group",
    tags=["Group"]
)

@group_routers.post("/")
async def create_group(model: GroupViewModel,
                       current_user: User = Depends(get_current_user),
                       session: Session = Depends(get_sync_session)):
    group_dict = model.model_dump()
    create_user = Group(**group_dict)
    item = create_user.create(session)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item



@group_routers.get("/{group_id}", response_model=GroupResponseModel)
async def get_group(group_id: int,
                    session: Session = Depends(get_sync_session),
                    user: str = Depends(get_current_user_with_role(["admin"]))
                    ):
    item = Group.get(db=session, id=group_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@group_routers.put("/{group_id}", response_model=GroupResponseModel)
async def edit_group(group_id: int, current_user: User = Depends(get_current_user)):
    pass

@group_routers.delete("/{group_id}")
async def delete_group(group_id: int, current_user: User = Depends(get_current_user)):
    pass


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


