# 维吾尔语打字练习系统

一个支持维吾尔语、汉语拼音、英文三种输入方式的在线打字练习系统，采用前后端分离架构。

## 🏗️ 项目架构

```
typing-practice/
├── frontend/                 # React前端
│   ├── src/
│   │   ├── components/      # React组件
│   │   ├── services/        # API服务
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── backend/                  # FastAPI后端
│   ├── app/
│   │   ├── api/            # API路由
│   │   ├── core/           # 核心配置
│   │   ├── models/         # 数据模型
│   │   ├── schemas/        # Pydantic模式
│   │   └── services/       # 业务逻辑
│   ├── Dockerfile
│   └── requirements.txt
├── database/                 # MySQL数据库
│   └── init.sql
├── docker-compose.yml        # Docker编排
└── README.md
```

## 🚀 快速开始

### 使用Docker Compose（推荐）

1. 克隆项目
```bash
git clone <repository-url>
cd typing-practice
```

2. 启动所有服务
```bash
docker-compose up -d
```

3. 访问应用
- 前端：http://localhost:3000
- 后端API：http://localhost:8000
- API文档：http://localhost:8000/docs

### 手动启动

#### 后端启动
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### 前端启动
```bash
cd frontend
npm install
npm run dev
```

#### 数据库启动
```bash
# 使用Docker启动MySQL
docker run -d \
  --name typing-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=typing_practice \
  -e MYSQL_USER=typing_user \
  -e MYSQL_PASSWORD=typing_password \
  -p 3306:3306 \
  mysql:8.0
```

## 📋 功能特性

### 前端功能
- ✅ 三种输入方式：维吾尔语、汉语拼音、英文
- ✅ 键盘显示/隐藏切换
- ✅ 文本刷新功能
- ✅ 实时打字统计
- ✅ 响应式设计
- ✅ 夜间模式

### 后端功能
- ✅ RESTful API设计
- ✅ 用户管理
- ✅ 文章管理
- ✅ 测试记录存储
- ✅ 统计数据分析
- ✅ CORS支持

### 数据库功能
- ✅ 用户信息存储
- ✅ 文章内容管理
- ✅ 测试记录追踪
- ✅ 用户设置保存

## 🛠️ 技术栈

### 前端
- React 18
- TypeScript
- Vite
- Axios
- React Router

### 后端
- FastAPI
- SQLAlchemy
- MySQL
- Pydantic
- Uvicorn

### 部署
- Docker
- Docker Compose
- Nginx（可选）

## 📊 API文档

启动后端服务后，访问 http://localhost:8000/docs 查看完整的API文档。

### 主要API端点

#### 文章相关
- `GET /api/articles/` - 获取文章列表
- `GET /api/articles/random` - 获取随机文章
- `GET /api/articles/{id}` - 获取指定文章

#### 测试记录
- `POST /api/tests/` - 创建测试记录
- `GET /api/tests/` - 获取测试记录
- `GET /api/tests/stats/{user_id}` - 获取用户统计

#### 用户管理
- `POST /api/users/` - 创建用户
- `GET /api/users/` - 获取用户列表
- `GET /api/users/{id}` - 获取指定用户

## 🔧 开发指南

### 添加新的输入方式

1. 在 `backend/app/models/article.py` 中添加新的语言类型
2. 在 `frontend/src/components/TestConfig.tsx` 中添加新的测试类型选项
3. 更新相关的API和前端逻辑

### 添加新的统计功能

1. 在 `backend/app/api/tests.py` 中添加新的统计端点
2. 在 `frontend/src/services/api.ts` 中添加对应的API调用
3. 在前端组件中实现统计显示

## 📝 环境变量

### 后端环境变量
```env
DATABASE_URL=mysql://typing_user:typing_password@mysql:3306/typing_practice
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000,http://frontend:3000
```

### 前端环境变量
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 参考了 [在线打字测试网站](https://dazi.kukuw.com/) 的设计理念
- 感谢所有贡献者的支持