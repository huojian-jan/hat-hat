from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import users, articles, tests
from app.core.config import settings

app = FastAPI(
    title="Typing Practice API",
    description="维吾尔语、汉语拼音、英文打字练习API",
    version="1.0.0"
)

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(articles.router, prefix="/api/articles", tags=["articles"])
app.include_router(tests.router, prefix="/api/tests", tags=["tests"])

@app.get("/")
async def root():
    return {"message": "Typing Practice API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
