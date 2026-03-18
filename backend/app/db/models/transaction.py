# This file will contain the definition of each row in the report file.
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy import Numeric
from decimal import Decimal
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import TYPE_CHECKING
from app.db.base import Base
if TYPE_CHECKING:
    from app.db.models.financial_report import FinancialReport
    from app.db.models.user import User

class UserTransaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    report_id: Mapped[int] = mapped_column(Integer, ForeignKey("financial_reports.id"), nullable=False, index=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    date: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    
    financial_report: Mapped["FinancialReport"] = relationship("FinancialReport", back_populates="transactions")
    user: Mapped["User"] = relationship("User", back_populates="transactions")
    
