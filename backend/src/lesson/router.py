from fastapi import APIRouter, Depends

from src.auth.models import User
from src.auth.utils import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["Group"]
)

@router.post("/")
async def create_group(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def edit_group(current_user: User = Depends(get_current_user)):
    pass

@router.delete("/")
async def delete_group(current_user: User = Depends(get_current_user)):
    pass

@router.get("/")
async def group_list(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def add_student_for_group(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def delete_student_for_group(current_user: User = Depends(get_current_user)):
    pass

@router.get("/")
async def get_group(current_user: User = Depends(get_current_user)):
    pass
