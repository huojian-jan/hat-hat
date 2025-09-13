from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.database import get_db
from app.models.article import Article, LanguageType, DifficultyType
from app.schemas.article import ArticleResponse, ArticleCreate

router = APIRouter()

@router.get("/", response_model=List[ArticleResponse])
async def get_articles(
    language: Optional[LanguageType] = None,
    difficulty: Optional[DifficultyType] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """获取文章列表"""
    query = db.query(Article)
    
    if language:
        query = query.filter(Article.language == language)
    if difficulty:
        query = query.filter(Article.difficulty == difficulty)
    
    articles = query.offset(skip).limit(limit).all()
    return articles

@router.get("/random", response_model=ArticleResponse)
async def get_random_article(
    language: Optional[LanguageType] = None,
    difficulty: Optional[DifficultyType] = None,
    db: Session = Depends(get_db)
):
    """获取随机文章"""
    query = db.query(Article)
    
    if language:
        query = query.filter(Article.language == language)
    if difficulty:
        query = query.filter(Article.difficulty == difficulty)
    
    article = query.order_by(func.random()).first()
    if not article:
        raise HTTPException(status_code=404, detail="No articles found")
    
    return article

@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int, db: Session = Depends(get_db)):
    """获取指定文章"""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.post("/", response_model=ArticleResponse)
async def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    """创建新文章"""
    db_article = Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article
