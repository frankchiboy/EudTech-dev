# EudTech 網站 Product Design 稽核與修復紀錄

日期：2026-08-18

## 稽核範圍

- 公開網站：`https://eudaemonia.tech/`
- 本機預覽：`http://host.docker.internal:4174/`
- 主要流程：首頁 → 解決方案、首頁 → 聯絡、首頁 → GPU 配置器、手機導覽、合作品牌區
- 視窗：1440×1000、390×844；RWD 驗證另包含 1052、820、1280 寬度及中英文深色模式

## 現場發現

1. 公開首頁 Cyabra 合作品牌主圖 `/cyabra-detect-min.png` 回傳破圖，`naturalWidth=0`。
2. 首頁淺色模式兩個區段眉標使用過淺品牌色，對比為 1.45:1 與 1.52:1。
3. 手機選單宣告為 modal，但 Tab 會離開 dialog，Escape 不會關閉選單，焦點也不會回到觸發按鈕。
4. Hero 位於 `main` 內仍宣告 `role="banner"`，造成 landmark 重複。
5. 桌面下拉選單使用 `menu/menuitem` 語意，但沒有方向鍵互動模型。

## 已完成修復

- Cyabra 圖片改用現有且可解碼的 `/cyabra-images/cyabra-detect-min.png`。
- 淺色眉標改用 `text-cyan-700` 與 `text-emerald-700`，深色模式保留原有亮色。
- 手機導覽加入初始焦點、Escape 關閉、Tab／Shift+Tab 循環與關閉後焦點回復。
- 導覽按鈕、語言切換、主題切換及桌面連結加入鍵盤焦點樣式與必要語意。
- Hero 改用 `aria-labelledby="home-hero-heading"`；移除嵌套 banner landmark。
- 桌面下拉選單移除不相符的 `menu/menuitem` role。
- 全域加入 `prefers-reduced-motion: reduce` 支援。
- 移除 Hero 未使用匯入。

## 驗證結果

- `npx tsc --noEmit`：通過。
- `npm run build`：通過。
- 修改檔案 scoped ESLint：通過。
- `EUDTECH_BASE_URL=http://host.docker.internal:4174 node scripts/verify-home-partners-rwd.mjs`：8/8 通過。
- `node scripts/verify-product-design-interactions.mjs`：全部通過。
- 文字對比：`5.36:1`、`5.48:1`，均達普通文字 4.5:1 要求。
- 路由 200：首頁、解決方案、三個方案頁、產品、資源、關於、聯絡、職缺、隱私、配置器全部通過。
- 390×844：無橫向溢位；手機選單焦點循環、Escape 關閉與焦點回復通過。
- Cyabra 預覽圖片：`complete=true`、`naturalWidth=800`、`naturalHeight=600`。
- 公開網站 CTA：解決方案、聯絡、GPU 配置器均已實際操作並正確導向。

## 截圖證據

### 公開站稽核

![公開站首頁桌面](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/01-live-home-desktop.png)

![公開站手機首頁](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/02-live-home-mobile.png)

![公開站手機導覽](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/03-live-mobile-menu.png)

![公開站合作品牌破圖](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/09-live-home-partners-before-fix.png)

### 修復後本機預覽

![修復後首頁桌面](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/10-preview-home-desktop.png)

![修復後合作品牌區](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/11-preview-home-partners.png)

![修復後手機首頁](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/12-preview-home-mobile.png)

![修復後手機導覽](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/13-preview-mobile-menu.png)

![修復後解決方案目的頁](/Users/serverc/_軟體專案/EudTech-dev/reports/product-design-audit-2026-08-18/14-preview-solutions.png)

## 證據限制與部署狀態

- VoiceOver／NVDA、200% 瀏覽器縮放及聯絡表單提交未在本輪執行。
- 正式站尚未部署本輪修復；公開站的破圖截圖保留為部署前基準。
- 完整視覺矩陣腳本在第二個 CDP context 建立時失敗，因此以獨立 Playwright 驗證、8 組合作品牌 RWD 驗證、互動驗證與路由 200 驗證作為本輪接受條件。
