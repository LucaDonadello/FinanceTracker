from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }
    
    @field_validator('created_at', mode='before')
    def parse_datetime(cls, v):
        if isinstance(v, str):
            # Fix malformed timezone: +00, +01, -05 etc. -> +00:00, +01:00, -05:00
            import re
            # Match pattern like +00 or -05 at the end (without colon)
            v = re.sub(r'([+-]\d{2})$', r'\1:00', v)
        return v