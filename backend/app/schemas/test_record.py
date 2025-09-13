from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal
from app.models.article import LanguageType

class TestRecordBase(BaseModel):
    user_id: Optional[int] = None
    article_id: Optional[int] = None
    test_type: LanguageType
    wpm: Decimal
    accuracy: Decimal
    total_characters: int
    correct_characters: int
    incorrect_characters: int
    test_duration: int

class TestRecordCreate(TestRecordBase):
    pass

class TestRecordResponse(TestRecordBase):
    id: int
    test_date: datetime
    
    class Config:
        from_attributes = True
