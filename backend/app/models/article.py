from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.models.database import Base
import enum

class LanguageType(str, enum.Enum):
    UYGHUR = "uyghur"
    PINYIN = "pinyin"
    ENGLISH = "english"

class DifficultyType(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    language = Column(Enum(LanguageType), nullable=False)
    difficulty = Column(Enum(DifficultyType), default=DifficultyType.MEDIUM)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
