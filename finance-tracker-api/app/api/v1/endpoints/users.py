from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserRead
from app.crud.user import create_user
from app.db.session import get_db

router = APIRouter()

@router.post(
    "/",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED
)

def register_user(
    user_in: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user_in)
