from sqlalchemy.orm import Session
from app.db.models.account import Account
from app.db.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from sqlalchemy.orm import Session
from sqlalchemy import select

def create_user(db: Session, user_in: UserCreate) -> User:
    try:
        # Create the user
        user = User(
            email=user_in.email,
            hashed_password=hash_password(user_in.password),
            is_active=user_in.is_active,
        )
        db.add(user)
        db.flush()  # assigns user.id without committing

        # Create linked account
        account = Account(user_id=user.id)
        db.add(account)

        # Everything ok -> commit
        db.commit()

        # Refresh to get all relationships and updated fields
        db.refresh(user)
        return user

    except Exception:
        db.rollback()  # undo any partial changes
        raise

# Get user by email for authentication and validation purposes
def get_user_by_email(db: Session, email: str) -> User | None:
    stmt = select(User).where(User.email == email)
    return db.execute(stmt).scalar_one_or_none()


# Get user by ID for authentication and validation purposes
def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()