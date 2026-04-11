#!/bin/bash
# dev-start.sh - 增強版開發模式腳本
# 此腳本啟動優化過的開發環境，確保所有變更都能立即顯示

# 顯示彩色訊息
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# 1. 顯示歡迎訊息
echo -e "${YELLOW}===== 啟動增強版開發環境 =====${NC}"

# 2. 檢查並終止現有 Vite 進程
echo -e "${BLUE}1. 清理環境${NC}"
pkill -f "vite" || true
sleep 1

# 3. 清理所有快取
echo -e "${BLUE}2. 清理快取${NC}"
rm -rf node_modules/.vite
rm -rf dist/.vite
find . -name ".DS_Store" -delete
echo -e "${GREEN}✓ 快取已清理${NC}"

# 4. 更新 Service Worker 版本號，確保總是重新載入
echo -e "${BLUE}3. 更新 Service Worker 版本號${NC}"
NEW_VERSION=$(($(date +%s) % 100))
sed -i "" "s/eudtech-v[0-9]*/eudtech-v$NEW_VERSION/" sw.js
echo -e "${GREEN}✓ Service Worker 版本已更新為 v$NEW_VERSION${NC}"

# 5. 提示用戶開發伺服器準備啟動
echo -e "${BLUE}4. 準備開發伺服器${NC}"

# 6. 啟動增強版開發伺服器
echo -e "${BLUE}5. 啟動增強版開發伺服器${NC}"
echo -e "${GREEN}開發伺服器啟動中，請在瀏覽器中訪問 http://localhost:5173${NC}"
npm run dev