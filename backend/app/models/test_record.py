from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, DECIMAL
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.database import Base
from app.models.article import LanguageType

class TestRecord(Base):
    __tablename__ = "test_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    article_id = Column(Integer, ForeignKey("articles.id"), nullable=True)
    test_type = Column(Enum(LanguageType), nullable=False)
    wpm = Column(DECIMAL(5, 2), nullable=False)
    accuracy = Column(DECIMAL(5, 2), nullable=False)
    total_characters = Column(Integer, nullable=False)
    correct_characters = Column(Integer, nullable=False)
    incorrect_characters = Column(Integer, nullable=False)
    test_duration = Column(Integer, nullable=False)  # 秒
    test_date = Column(DateTime(timezone=True), server_default=func.now())
    
    # 关系
    user = relationship("User", back_populates="test_records")
    article = relationship("Article", back_populates="test_records")
