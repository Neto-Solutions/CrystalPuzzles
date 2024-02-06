from fastapi import APIRouter, Depends

from src.Users.models import User
from src.Users.utils import get_current_user

router = APIRouter(
    prefix="/api/v1/lesson",
    tags=["Lesson"]
)

@router.post("/")
async def create_lesson(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def edit_lesson(current_user: User = Depends(get_current_user)):
    pass

@router.delete("/")
async def delete_lesson(current_user: User = Depends(get_current_user)):
    pass

@router.get("/")
async def lesson_list(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def add_student_for_lesson(current_user: User = Depends(get_current_user)):
    pass

@router.put("/")
async def delete_student_for_lesson(current_user: User = Depends(get_current_user)):
    pass

@router.get("/")
async def get_lesson(current_user: User = Depends(get_current_user)):
    pass
