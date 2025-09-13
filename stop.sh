#!/bin/bash

# 维吾尔语打字练习系统停止脚本

echo "🛑 停止维吾尔语打字练习系统..."

# 停止所有服务
docker-compose down

echo "✅ 服务已停止！"
echo ""
echo "🗑️  清理数据（可选）："
echo "   docker-compose down -v  # 删除数据卷"
echo "   docker system prune     # 清理未使用的Docker资源"
