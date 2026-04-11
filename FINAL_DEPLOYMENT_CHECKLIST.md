# 🚀 最終部署檢查清單

**部署前必須完成所有檢查項目！**

---

## ✅ 階段 1: 視覺驗證 (當前階段)

### 基本對比
- [ ] 開啟兩個瀏覽器分頁並排比對
  - 本地: http://localhost:4173/
  - 正式: https://eudaemonia.tech/
- [ ] 從頂部到底部逐一滾動檢查
- [ ] 記錄任何差異

### 關鍵區段檢查
- [ ] Hero 區段 - 標題、副標題、CTA
- [ ] EudTech 解決方案 - 產品卡片
- [ ] 授權經銷商 - 僅標題無引言
- [ ] Comino 品牌 - Logo、Hero Image、特色
- [ ] Cyabra 品牌 - Logo、Hero Image、統計
- [ ] 關於我們 - 文案、願景
- [ ] 聯絡我們 - 標題、表單
- [ ] Footer - 連結、版權

---

## ✅ 階段 2: 功能測試

### 導航測試
- [ ] 點擊 Logo 回到頂部
- [ ] 導航選單 - 首頁
- [ ] 導航選單 - 產品
- [ ] 導航選單 - 關於我們
- [ ] 導航選單 - 職業機會 (/careers)
- [ ] 導航選單 - 聯絡我們

### 錨點跳轉
- [ ] Hero「探索產品」→ #eudtech-products
- [ ] Hero「聯絡我們」→ #contact
- [ ] Comino「探索Comino產品」→ #comino-products
- [ ] Cyabra「探索Cyabra解決方案」→ #cyabra-products
- [ ] About「探索我們的產品」→ #eudtech-products

### 外部連結
- [ ] Comino Logo → https://www.grando.ai/ (新分頁)
- [ ] Comino 驗證 → https://www.comino.com/en/company (新分頁)
- [ ] Cyabra Logo → https://www.cyabra.com/ (新分頁)
- [ ] Cyabra 驗證 → https://cyabra.com/become-a-partner/ (新分頁)
- [ ] Footer 職業機會 → /careers

### 語言切換
- [ ] 切換到英文，確認所有文案更新
- [ ] 切換回中文，確認所有文案還原
- [ ] URL 錨點在切換語言後仍然有效

---

## ✅ 階段 3: 響應式測試

### 手機測試 (< 640px)
- [ ] iPhone SE (375x667) - 最小尺寸
- [ ] iPhone 12 Pro (390x844) - 常見尺寸
- [ ] 檢查項目：
  - [ ] 文字清晰可讀（無過小字體）
  - [ ] CTA 按鈕垂直堆疊
  - [ ] 圖片正確縮放
  - [ ] 無橫向滾動
  - [ ] 導航選單可展開/收合

### 平板測試 (640-1024px)
- [ ] iPad Mini (768x1024)
- [ ] iPad Air (820x1180)
- [ ] 檢查項目：
  - [ ] 產品卡片 2列排列
  - [ ] Hero Image 高度適中
  - [ ] 表單欄位寬度合理

### 桌面測試 (> 1024px)
- [ ] 筆電 (1280x720)
- [ ] 桌面 (1920x1080)
- [ ] 寬螢幕 (2560x1440)
- [ ] 檢查項目：
  - [ ] 產品卡片 2-3 列
  - [ ] 內容不會過寬（max-width 限制）
  - [ ] 背景圖片完整顯示

---

## ✅ 階段 4: 效能測試

### Lighthouse 測試（桌面）
```bash
# 在 Chrome DevTools Lighthouse tab 中執行
```
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 90

### Lighthouse 測試（手機）
- [ ] Performance: ≥ 85
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Network 分析
- [ ] 總載入時間 < 3s
- [ ] 無 404 錯誤
- [ ] 無 console 錯誤
- [ ] 所有圖片成功載入
- [ ] First Contentful Paint < 1.5s

---

## ✅ 階段 5: 瀏覽器相容性

### 主要瀏覽器
- [ ] Chrome (最新版)
- [ ] Safari (最新版)
- [ ] Firefox (最新版)
- [ ] Edge (最新版)

### 行動瀏覽器
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Samsung Internet

---

## ✅ 階段 6: 構建驗證

### 檢查構建產物
```bash
npm run build
```
- [ ] 構建成功無錯誤
- [ ] 無 TypeScript 錯誤
- [ ] 無 ESLint 警告（critical）
- [ ] Bundle 大小合理
  - [ ] main.js < 150 KB (gzipped)
  - [ ] vendor.js < 150 KB (gzipped)
  - [ ] main.css < 15 KB (gzipped)

### Preview 測試
```bash
npm run preview
```
- [ ] 本地 preview 正常運作
- [ ] 所有頁面可訪問
- [ ] 所有資源正確載入

---

## ✅ 階段 7: SEO 檢查

### Meta Tags
- [ ] Title tag 存在且正確
- [ ] Meta description 存在
- [ ] Open Graph tags (社交分享)
- [ ] Favicon 顯示

### 可訪問性
- [ ] 所有圖片有 alt 屬性
- [ ] 正確的標題層級 (h1 → h6)
- [ ] 表單 label 關聯正確
- [ ] ARIA 屬性適當使用
- [ ] 鍵盤導航可用

### 結構化資料
- [ ] 公司資訊標記
- [ ] 產品資訊標記（如適用）

---

## ✅ 階段 8: 最終確認

### 內容檢查
- [ ] 所有文案正確無誤字
- [ ] 聯絡資訊正確
  - [ ] Email: info@eudaemonia.tech
  - [ ] 公司名稱：優達盟資訊科技有限公司
- [ ] 版權年份正確 (2025)
- [ ] 所有外部連結正確

### 法律合規
- [ ] 隱私政策連結（即使未啟用）
- [ ] 服務條款連結（即使未啟用）
- [ ] Cookie 政策連結（即使未啟用）

### 備份確認
- [ ] Git commit 所有變更
- [ ] 推送到遠端倉庫
- [ ] 建立部署前的 tag

---

## 🚀 部署執行

### Pre-deployment
```bash
# 1. 最後一次完整測試
npm run build
npm run preview

# 2. 確認 Git 狀態
git status
git add .
git commit -m "chore: pre-deployment - homepage alignment complete"
git push origin copilot/vscode1759184591503

# 3. 建立 tag
git tag -a v1.0.0-homepage-aligned -m "Homepage fully aligned with eudaemonia.tech"
git push origin v1.0.0-homepage-aligned
```

### Netlify 部署
```bash
# Preview deployment
netlify deploy

# 檢查 preview URL，確認一切正常

# Production deployment
netlify deploy --prod
```

### Vercel 部署
```bash
# Preview
vercel

# Production
vercel --prod
```

### 部署後驗證
- [ ] 訪問正式域名確認
- [ ] 測試關鍵功能
- [ ] 檢查 Analytics 是否追蹤
- [ ] 檢查 SSL 憑證

---

## 📋 回滾計劃

如果部署後發現問題：

### Netlify
```bash
# 在 Netlify dashboard 中點擊 "Rollback to this deploy"
```

### Vercel
```bash
# 在 Vercel dashboard 中選擇先前的部署並 "Promote to Production"
```

### Git
```bash
git revert HEAD
git push origin main
```

---

## ✅ 完成確認

**所有檢查項目完成後打勾：**

- [ ] 階段 1: 視覺驗證
- [ ] 階段 2: 功能測試
- [ ] 階段 3: 響應式測試
- [ ] 階段 4: 效能測試
- [ ] 階段 5: 瀏覽器相容性
- [ ] 階段 6: 構建驗證
- [ ] 階段 7: SEO 檢查
- [ ] 階段 8: 最終確認

**部署執行：**

- [ ] Pre-deployment 準備
- [ ] 執行部署
- [ ] 部署後驗證

---

## 🎉 部署完成

**恭喜！首頁已成功部署並與 eudaemonia.tech 完全一致！**

---

**最後更新**: 2025年10月8日  
**檢查人員**: _______  
**部署時間**: _______  
**部署URL**: _______
