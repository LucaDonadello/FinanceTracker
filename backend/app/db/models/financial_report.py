# This will contain the definition of the report upload model, which will be used to store the uploaded financial reports in the database.

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, relationship
from typing import TYPE_CHECKING
from app.db.base import Base
if TYPE_CHECKING:
    from app.db.models.user import User
    from app.db.models.transaction import UserTransaction


class FinancialReport(Base):
    __tablename__ = "financial_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    report_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(tz=timezone.utc))
    
    user: Mapped["User"] = relationship("User", back_populates="financial_reports")
    transactions: Mapped[list["UserTransaction"]] = relationship("UserTransaction", back_populates="financial_report", cascade="all, delete-orphan")