#!/bin/bash
# DZS-OS 启动脚本 — 同时启动 NestJS 后端和 Next.js 前端

PROJECT_DIR="/root/projects/daozhiguang-fate-engine"
BACKEND_DIR="$PROJECT_DIR/packages/server"
FRONTEND_DIR="$PROJECT_DIR/apps/web-console"

echo "================================================"
echo "  DZS-OS · 道之光命理AI操作系统"
echo "  启动中..."
echo "================================================"

# 1. 清理缓存
echo ""
echo "[1/4] 清理缓存..."
rm -rf "$FRONTEND_DIR/.next" 2>/dev/null

# 2. 启动 NestJS 后端（后台）
echo "[2/4] 启动 NestJS 后端 (port 4000)..."
cd "$BACKEND_DIR"
nohup npx tsx src/main.ts > /tmp/dzs-backend.log 2>&1 &
BACKEND_PID=$!
echo "  PID: $BACKEND_PID"

# 3. 等待后端就绪
echo "[3/4] 等待后端就绪..."
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w '' http://localhost:4000/api/v1 2>/dev/null; then
    echo "  后端就绪 ✓"
    break
  fi
  sleep 1
done

# 4. 启动 Next.js 前端（后台）
echo "[4/4] 启动 Next.js 前端 (port 3333)..."
cd "$FRONTEND_DIR"
nohup npx next dev --port 3333 --hostname 0.0.0.0 > /tmp/dzs-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "  PID: $FRONTEND_PID"

echo ""
echo "================================================"
echo "  DZS-OS 已启动！"
echo "  后端: http://localhost:4000/api/v1 (PID: $BACKEND_PID)"
echo "  前端: http://localhost:3333 (PID: $FRONTEND_PID)"
echo "  Windows: http://172.31.138.38:3333"
echo "================================================"
echo ""
echo "查看日志:"
echo "  tail -f /tmp/dzs-backend.log"
echo "  tail -f /tmp/dzs-frontend.log"
echo ""
echo "停止服务:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
