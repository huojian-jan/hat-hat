from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # 数据库配置
    DATABASE_URL: str = "mysql://typing_user:typing_password@mysql:3306/typing_practice"
    
    # 安全配置
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS配置
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://frontend:3000"]
    
    # 应用配置
    PROJECT_NAME: str = "Typing Practice API"
    VERSION: str = "1.0.0"
    
    class Config:
        env_file = ".env"

settings = Settings()
