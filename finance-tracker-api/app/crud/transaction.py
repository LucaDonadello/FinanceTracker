from sqlalchemy.orm import Session
from app.db.models.transaction import UserTransaction

def get_transaction_filter(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        start_date: str = None,
        end_date: str = None,
        min_amount: float = None,
        max_amount: float = None,
        report_id: int = None,
        category: str = None,
        search: str = None
):
    # This function will return a set of transactions based on a filter
    query = db.query(UserTransaction).filter(UserTransaction.user_id == user_id)
    if start_date:
        query = query.filter(UserTransaction.date >= start_date)
    if end_date:
        query = query.filter(UserTransaction.date <= end_date)
    if min_amount:
        query = query.filter(UserTransaction.amount >= min_amount)
    if max_amount:
        query = query.filter(UserTransaction.amount <= max_amount)
    if report_id:
        query = query.filter(UserTransaction.report_id == report_id)
    if category:
        query = query.filter(UserTransaction.category == category)
    if search:
        query = query.filter(UserTransaction.description.ilike(f"%{search}%"))

    # skip and limit for pagination
    return query.offset(skip).limit(limit).all()