from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserRead
from app.crud.user import create_user
from app.db.session import get_db
from app.crud.user import get_user_by_email

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
    # Get user by email to check if it already exists
    existing_user = get_user_by_email(db, user_in.email)
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    return create_user(db, user_in)
