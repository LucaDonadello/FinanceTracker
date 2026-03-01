from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user
from app.schemas.financial_report import FinancialReportCreate, FinancialReportRead
from app.db.models.financial_report import FinancialReport
from datetime import datetime
from app.api.dependencies import get_db
from app.schemas.user import UserRead

router = APIRouter()

@router.post("/report", response_model=FinancialReportRead)
def create_financial_report(report: FinancialReportCreate, db: Session = Depends(get_db), current_user: UserRead = Depends(get_current_user)):
    # This is just a test to verify the schema and table are working
    # Here you would add the logic to create a financial report in the database
    db_report = FinancialReport(
        id=1,
        user_id=current_user.id,
        report_name='Sample Report', # You can replace this with report_name.title when you implement the logic
        description='This is a sample financial report.', # You can replace this with report.description when you implement the logic
        created_at=datetime.now()
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    return db_report