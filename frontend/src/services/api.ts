import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 文章相关API
export const articleAPI = {
  // 获取文章列表
  getArticles: (language?: string, difficulty?: string) => 
    api.get('/api/articles/', { params: { language, difficulty } }),
  
  // 获取随机文章
  getRandomArticle: (language?: string, difficulty?: string) => 
    api.get('/api/articles/random', { params: { language, difficulty } }),
  
  // 获取指定文章
  getArticle: (id: number) => 
    api.get(`/api/articles/${id}`),
};

// 测试记录相关API
export const testAPI = {
  // 创建测试记录
  createTestRecord: (data: any) => 
    api.post('/api/tests/', data),
  
  // 获取测试记录
  getTestRecords: (userId?: number, testType?: string) => 
    api.get('/api/tests/', { params: { user_id: userId, test_type: testType } }),
  
  // 获取用户统计
  getUserStats: (userId: number) => 
    api.get(`/api/tests/stats/${userId}`),
};

// 用户相关API
export const userAPI = {
  // 创建用户
  createUser: (data: any) => 
    api.post('/api/users/', data),
  
  // 获取用户列表
  getUsers: () => 
    api.get('/api/users/'),
  
  // 获取指定用户
  getUser: (id: number) => 
    api.get(`/api/users/${id}`),
};

export default api;
