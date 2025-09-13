from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db
from app.models.test_record import TestRecord
from app.schemas.test_record import TestRecordCreate, TestRecordResponse

router = APIRouter()

@router.post("/", response_model=TestRecordResponse)
async def create_test_record(
    test_record: TestRecordCreate,
    db: Session = Depends(get_db)
):
    """创建测试记录"""
    db_test_record = TestRecord(**test_record.dict())
    db.add(db_test_record)
    db.commit()
    db.refresh(db_test_record)
    return db_test_record

@router.get("/", response_model=List[TestRecordResponse])
async def get_test_records(
    user_id: int = None,
    test_type: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """获取测试记录列表"""
    query = db.query(TestRecord)
    
    if user_id:
        query = query.filter(TestRecord.user_id == user_id)
    if test_type:
        query = query.filter(TestRecord.test_type == test_type)
    
    test_records = query.offset(skip).limit(limit).all()
    return test_records

@router.get("/stats/{user_id}")
async def get_user_stats(user_id: int, db: Session = Depends(get_db)):
    """获取用户统计信息"""
    test_records = db.query(TestRecord).filter(TestRecord.user_id == user_id).all()
    
    if not test_records:
        return {
            "total_tests": 0,
            "average_wpm": 0,
            "average_accuracy": 0,
            "best_wpm": 0,
            "best_accuracy": 0
        }
    
    total_tests = len(test_records)
    average_wpm = sum(record.wpm for record in test_records) / total_tests
    average_accuracy = sum(record.accuracy for record in test_records) / total_tests
    best_wpm = max(record.wpm for record in test_records)
    best_accuracy = max(record.accuracy for record in test_records)
    
    return {
        "total_tests": total_tests,
        "average_wpm": round(average_wpm, 2),
        "average_accuracy": round(average_accuracy, 2),
        "best_wpm": float(best_wpm),
        "best_accuracy": float(best_accuracy)
    }
