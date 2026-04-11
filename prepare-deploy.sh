#!/bin/bash

# 統一的部署前腳本，處理各種平台的特殊需求

# 停止任何可能正在運行的開發服務器
echo "停止可能正在運行的開發服務器..."
pkill -f "vite.*dev" || true

# 設定目錄路徑
PUBLIC_DIR="./public"
ASSETS_DIR="$PUBLIC_DIR/assets"
DIST_DIR="./dist"

# 確保公共目錄和資產目錄存在
mkdir -p "$ASSETS_DIR"
mkdir -p "$DIST_DIR"

# 更新版本號 (Unix timestamp)
TIMESTAMP=$(date +%s)
echo "設定新版本號: $TIMESTAMP"

# 更新 index.html 中的版本號（如果檔案存在）
if [ -f "index.html" ]; then
  sed -i "" "s/content=\"__BUILD_VERSION__\"/content=\"$TIMESTAMP\"/" index.html 2>/dev/null || true
fi

# 更新 sw.js 中的版本號（如果檔案存在）
if [ -f "sw.js" ]; then
  sed -i "" "s/eudtech-v[0-9]*/eudtech-v$((TIMESTAMP % 100))/" sw.js 2>/dev/null || true
fi

# 判斷部署平台
if [ "$VERCEL" = "1" ]; then
  echo "=== 正在為 Vercel 部署準備構建環境 ==="
  
  # 確保 _redirects 和 _headers 文件都存在於根目錄
  echo "確保 _redirects 和 _headers 文件準備好給 Vercel 使用..."
  
  # 不需要操作，vercel.json 會處理路由
  
elif [ "$NETLIFY" = "true" ]; then
  echo "=== 正在為 Netlify 部署準備構建環境 ==="
  # Netlify 已有自動處理機制，但需要確保文件存在於根目錄
  
  echo "確保 _redirects 和 _headers 文件準備好給 Netlify 使用..."
  # 已經在 vite.config.ts 的 copyNetlifyFiles 插件中處理
  
else
  echo "=== 正在為本地環境準備構建 ==="
  # 本地構建步驟
  
  # 確保 _redirects 和 _headers 文件都存在於 public 目錄
  echo "確保 _redirects 和 _headers 文件存在於 public 目錄..."
  cp _redirects $PUBLIC_DIR/ 2>/dev/null || echo "警告: _redirects 文件未找到"
  cp _headers $PUBLIC_DIR/ 2>/dev/null || echo "警告: _headers 文件未找到"
fi

# 確保 sw.js 存在於 public 目錄
echo "確保 sw.js 文件存在於 public 目錄..."
cp sw.js $PUBLIC_DIR/ 2>/dev/null || echo "警告: sw.js 文件未找到"

echo "部署準備完成！現在可以執行 'npm run build' 並將生成的 dist 目錄部署到 Netlify、Vercel 或其他服務。"