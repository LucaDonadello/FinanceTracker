# This transaction schema will define how the transaction data will be validated and serialized when it is sent to the client or received from the client.

from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class TransactionCreate(BaseModel):
    amount: Decimal
    category: str
    description: str | None = None
    date: datetime

class TransactionRead(BaseModel):
    id: int
    amount: Decimal
    category: str
    description: str | None
    date: datetime

    class Config:
        from_attributes = True