from typing import TYPE_CHECKING
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

# import transaction model at runtime so relationship resolution works
from app.db.models.transaction import UserTransaction

if TYPE_CHECKING:
    from app.db.models.account import Account
    from app.db.models.financial_report import FinancialReport


from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(tz=timezone.utc),
        nullable=False
    )

    account: Mapped["Account"] = relationship(
        "Account",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )
    
    # a user may have many financial reports
    financial_reports: Mapped[list["FinancialReport"]] = relationship(
        "FinancialReport",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    
    transactions: Mapped[list["UserTransaction"]] = relationship(
        UserTransaction,
        back_populates="user",
        cascade="all, delete-orphan"
    )
