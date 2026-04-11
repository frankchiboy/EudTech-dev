#!/bin/bash
# restart-dev.sh - 完全重啟開發環境，解決「更新不顯示」問題
# 這個腳本將終止所有 Vite 進程，清理快取，並重新啟動開發伺服器

# 顯示彩色訊息
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# 提示訊息
echo -e "${YELLOW}===== 全面重置開發環境 =====${NC}"

# 1. 終止所有 Vite 進程
echo -e "${BLUE}1. 終止所有 Vite 進程${NC}"
pkill -f "vite" || true
sleep 1

# 2. 清理所有快取
echo -e "${BLUE}2. 清理快取${NC}"
rm -rf node_modules/.vite
rm -rf dist/.vite
echo -e "${GREEN}✓ 快取已清理${NC}"

# 3. 清理瀏覽器特定的快取指令
echo -e "${RED}重要提示:${NC}"
echo -e "在瀏覽器中開啟 ${YELLOW}http://localhost:5175${NC} 後，請按下:"
echo -e "  • ${BLUE}Mac:${NC} ${YELLOW}Cmd+Shift+R${NC} (強制重新載入)"
echo -e "  • ${BLUE}Windows:${NC} ${YELLOW}Ctrl+F5${NC} (強制重新載入)"
echo -e ""

# 4. 啟動全新的開發伺服器
echo -e "${BLUE}4. 啟動全新的開發伺服器 (端口 5175)${NC}"
npm run dev -- --port=5175 --force

# 應該不會執行到這裡
echo -e "${GREEN}開發伺服器已停止${NC}"