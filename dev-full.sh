#!/bin/bash
# 強化版開發伺服器腳本
# 會執行 prepare-deploy.sh 並強制清理快取和重新載入

# 顯示彩色訊息
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

echo -e "${YELLOW}===== 啟動強化版開發伺服器 =====${NC}"

# 步驟 1: 終止所有運行中的 Vite 進程
echo -e "${BLUE}1. 終止現有 Vite 進程${NC}"
pkill -f "vite" || true

# 步驟 2: 清理快取
echo -e "${BLUE}2. 清理開發伺服器快取${NC}"
rm -rf node_modules/.vite

# 步驟 3: 執行 prepare-deploy.sh (如同生產構建前的步驟)
echo -e "${BLUE}3. 執行部署前準備腳本${NC}"
bash prepare-deploy.sh

# 步驟 4: 啟動強化版開發伺服器
echo -e "${BLUE}4. 啟動強化版開發伺服器${NC}"
echo -e "${GREEN}開發伺服器啟動中，使用強制重新載入模式...${NC}"
npm run dev -- --force

# 此腳本不太可能執行到這裡，因為開發伺服器會持續運行
echo -e "${GREEN}開發伺服器已停止${NC}"