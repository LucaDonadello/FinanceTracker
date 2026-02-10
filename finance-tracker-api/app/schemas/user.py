from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True

class UserCreate(UserBase):
    password: str = Field(min_length=8)

class UserRead(UserBase):
    id: int
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }
    
    @field_validator('created_at', mode='before')
    def parse_datetime(cls, v):
        if isinstance(v, str):
            import re
            v = re.sub(r'([+-]\d{2})$', r'\1:00', v)
        return v
    