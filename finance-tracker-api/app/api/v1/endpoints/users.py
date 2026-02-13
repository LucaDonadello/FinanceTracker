from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import Token, UserCreate, UserRead, UserLogin
from app.crud.user import create_user, get_user_by_email
from app.db.session import get_db
from app.core.security import verify_password
from app.core.jwt import create_access_token
from app.api.dependencies import get_current_user

router = APIRouter()

# ------------------------------
# User registration
# ------------------------------
@router.post(
    "/",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED
)
def register_user(
    user_in: UserCreate,
    db: Session = Depends(get_db)
):
    # Check if user already exists
    existing_user = get_user_by_email(db, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    return create_user(db, user_in)


# ------------------------------
# User login
# ------------------------------
@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, user_in.email)
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


# ------------------------------
# Get current user
# ------------------------------
@router.get("/me", response_model=UserRead, tags=["Users"])
def read_current_user(current_user=Depends(get_current_user)):
    """
    Get the currently logged-in user.
    Requires Authorization: Bearer <token>
    """
    return current_user
