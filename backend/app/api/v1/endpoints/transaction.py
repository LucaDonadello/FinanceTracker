# This file will contain the endpoints for creating, reading, updating, and deleting transactions.

from fastapi import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user
from app.api.dependencies import get_db
from app.schemas.user import UserRead
from app.schemas.transaction import TransactionCreate, TransactionRead
from app.db.models.transaction import UserTransaction
from app.db.models.financial_report import FinancialReport
from app.crud.transaction import get_transaction_filter

router = APIRouter()

# This endpoint will create multiple transactions at once, it will validate that all the report_ids belong to the current user before creating the transactions.
@router.post("", response_model=list[TransactionRead])
def create_transaction(transactions: list[TransactionCreate], db: Session = Depends(get_db), current_user: UserRead = Depends(get_current_user)):
    
    report = db.query(FinancialReport).filter(
        FinancialReport.id == transactions[0].report_id,
        FinancialReport.user_id == current_user.id
    ).first()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found or does not belong to the user"
        )

    db_transactions = [
        UserTransaction(
            user_id=current_user.id,
            report_id=t.report_id,
            amount=t.amount,
            category=t.category,
            description=t.description,
            date=t.date
        )
        for t in transactions
    ]
    db.add_all(db_transactions)
    db.commit()

    for t in db_transactions:
        db.refresh(t)

    return db_transactions

# This endpoint will filter transactions based on the provided query parameters. It will only return transactions that belong to the current user.
@router.get("/", response_model=list[TransactionRead])
def filter_transactions(
    skip: int = 0,
    limit: int = 100,
    start_date: str = None,
    end_date: str = None,
    min_amount: float = None,
    max_amount: float = None,
    report_id: int = None,
    category: str = None,
    search: str = None,
    db: Session = Depends(get_db),
    current_user: UserRead = Depends(get_current_user)
):
    return get_transaction_filter(
        db=db,
        user_id=current_user.id,
        skip=skip,
        limit=limit,
        start_date=start_date,
        end_date=end_date,
        min_amount=min_amount,
        max_amount=max_amount,
        report_id=report_id,
        category=category,
        search=search
    )