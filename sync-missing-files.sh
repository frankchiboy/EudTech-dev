#!/bin/bash

# 設定目錄路徑
MISSING_DATA_DIR="./遺失的部署資料"
PUBLIC_DIR="./public"

# 確保公共目錄存在
mkdir -p "$PUBLIC_DIR"

# 複製遺失的部署資料中的所有文件到公共目錄
echo "正在同步遺失的部署資料到公共目錄..."
cp -r "$MISSING_DATA_DIR"/* "$PUBLIC_DIR/"

# 複製 _redirects 和 _headers 文件到項目根目錄
echo "正在同步 _redirects 和 _headers 文件到根目錄..."
cp "$MISSING_DATA_DIR/_redirects" ./
cp "$MISSING_DATA_DIR/_headers" ./

# 複製 sw.js 到項目根目錄
echo "正在同步 Service Worker 文件..."
cp "$MISSING_DATA_DIR/sw.js" ./

echo "同步完成！"