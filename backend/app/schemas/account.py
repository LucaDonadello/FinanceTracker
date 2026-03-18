from pydantic import BaseModel

class AccountRead(BaseModel):
    id: int
    user_id: int

    class Config:
        orm_mode = True