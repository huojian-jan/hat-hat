from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.article import LanguageType, DifficultyType

class ArticleBase(BaseModel):
    title: str
    content: str
    language: LanguageType
    difficulty: DifficultyType = DifficultyType.MEDIUM

class ArticleCreate(ArticleBase):
    pass

class ArticleResponse(ArticleBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
