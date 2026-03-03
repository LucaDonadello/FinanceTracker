# This file will define the schema for the financial report end point

from pydantic import BaseModel
from datetime import datetime

# Post request body for creating a financial report
class FinancialReportCreate(BaseModel):
    report_name: str
    description: str | None = None
    
# GET request body for retrieving a financial report
class FinancialReportRead(BaseModel):
    id: int
    report_name: str
    description: str | None
    created_at: datetime

    class Config:
        from_attributes = True