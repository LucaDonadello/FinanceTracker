from sqlalchemy.orm import Session
from app.db.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from datetime import datetime, timezone

def create_user(db: Session, user_in: UserCreate) -> User:
    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        is_active=user_in.is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return user