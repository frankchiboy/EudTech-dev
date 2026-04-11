# Component & Logic Map (初稿)

> 來源：`assets/index-dwxak0v1.js` 粗略 prettified 版本 `reconstruction/pretty/index-main.pretty.js`
> 目標：識別核心 UI / 邏輯模組，為後續在 `src/` 重建提供切割依據。

## 命名慣例推導

- React 被縮寫為 `v`；jsx runtime 為 `l.jsx` / `l.jsxs`
- 多數內部函式/常數使用兩字母或混合 (e.g. `ox`, `Cg`, `vg`, `wg`)，判斷需以語意與呼叫模式分類
- 路由相關：`Ut` (推測為 Route 包裝或 createElement 產出)，`v.Suspense` 出現在動態頁面

## 已辨識區塊

| 暫定名稱 | 原始符號 | 功能推測 | 證據/特徵 | 重建建議檔案 |
|----------|----------|----------|-----------|--------------|
| ProgressiveImage (帶載入過渡的圖片元件) | `Cg` | 預先建立 `new Image()`, 使用 `useState`, 包含 overlay/div 背景樣式 | 內含 `new Image()`, 參數含 `src, alt, onLoad, onError` | `src/components/media/ProgressiveImage.tsx` |
| ImagePreloader (批次預載圖片 util) | `vg` / `wg` (需進一步確認兩者職責) | 接收圖片陣列並建立 `Image` 物件, console log 預載訊息 | 呼叫時傳入多個 `/*.jpg` | `src/utils/preloadImages.ts` |
| GlobalImagePreloadBootstrap | (匿名 IIFE 內 setTimeout + querySelectorAll) | 500ms 後掃描 DOM 所有 `img` 再次預載 + 嘗試抓 `/public-images-list.json` | `setTimeout(...,500)` + fallback console log | 併入 `ProgressiveImage` 或單獨 `src/bootstrap/imagePreload.ts` |
| VersionPoller / UpdateBanner | `ox` | 每分鐘 fetch 首頁 meta version, 顯示新版提示 UI, 提供 reload | 常數 `rx=60*1e3`, `meta[name="version"]`, 狀態 `useState` 兩組 (顯示/確認) | `src/features/version/VersionPoller.tsx` + `VersionUpdateBanner.tsx` |
| Routing Root | (wrap `<Ut path=...>` 列表) | 定義基礎路由 | 含 `/`, `/brands/comino`, `/brands/cyabra`, `/products/:id` | `src/routes/AppRoutes.tsx` |
| ProductDetails Lazy Chunk Boundary | `<Suspense fallback=...>` 包含 `Hg` | 動態產品頁 | Suspense 包裹 lazy component | `src/pages/products/ProductDetails.tsx` |
| Brand Pages | `Kg` (comino), `tx` (cyabra) | 品牌介紹頁 | 依路由 path 命名對應 | `src/pages/brands/CominoPage.tsx`, `src/pages/brands/CyabraPage.tsx` |
| Loader Spinner | `to` (size="lg") | 載入指示 | 在 Suspense fallback 出現 | `src/components/ui/Spinner.tsx` |

> 註：符號到語意對應會於 prettify 精細化後再驗證 (下一步將針對呼叫圖譜與 props 數量再校正)。

## 資料/服務層線索

| 類型 | 線索 | 描述 | 待確認 |
|------|------|------|--------|
| 版本檢查 | `fetch('/?t=timestamp', {cache:'no-store'})` | 解析 `<meta name="version">` | 是否需要改為 head request 或 ETag? |
| 圖片清單 | `fetch('/public-images-list.json')` | 可選預載策略 (失敗 fallback) | 該 JSON 是否存在於 deployed/ (需要建立生成腳本) |
| 產品資料 | (不直接在主 bundle grep 到 ID mapping) | 應在 lazy chunk 或現有 `productData.ts` 中 | 待對照 `src/productData.ts` |
| API / EmailJS | 尚未出現 `emailjs` 字串於主 bundle | 可能在 lazy chunk 或仍以 CDN 腳本注入 | 搜尋其他 chunks 下一步 |

## 拆分建議 (Phase 1 Rebuild)

1. `src/routes/AppRoutes.tsx` – 使用 react-router-dom v6 重建，集中 lazy import。
2. `src/features/version/` – `useVersionPoll.ts`, `VersionNotice.tsx` (Banner)；抽離輪詢間隔常數。
3. `src/components/media/ProgressiveImage.tsx` – 支援 onLoad/onError, skeleton overlay。
4. `src/utils/preloadImages.ts` – 提供 `preloadImages([...])` 與 `scanAndPreload()`。
5. `src/bootstrap/initPreload.ts` – 在 `main.tsx` 啟動時掛載全域預載行為（考慮使用 requestIdleCallback）。

## 風險 / 未決議題

- 目前 prettify 為簡單斷行，尚未還原縮排/邏輯區塊；深入語意需二次格式化 (可引入 `prettier` 或 `esbuild --format=esm` 進行)。
- 符號重新命名需確保 tree-shaking 不受影響；重建以語意為主不追求完全對齊 hash。
- 可能存在未被偵測的副作用模組 (e.g. web-vitals) — 需再 grep。

## 下一步

- 對其他三個 lazy chunk 也做相同粗略 prettify 與元件映射表補全。
- 深入解析 `ox` 與 `Cg` 內部邏輯（轉為具名 hook + component 設計草圖）。
- 搜尋 email 相關字串於所有 chunk，若缺失即記錄於 manifest 缺口。

---
(此文件會在每次分析進展後迭代更新。)

## Lazy Chunks 深入映射 (v1)

### contactsection-byyyswrd

| 暫定名稱 | 原始符號/結構 | 功能 | 主要 Props/狀態 | 重建建議 |
|-----------|---------------|------|-----------------|-----------|
| ContactHeading | `A` | 區塊標題 (雙語) | `isEnglish` | `src/sections/contact/ContactHeading.tsx` |
| EmailService | `class Q` + 單例 `X` | 包裝 EmailJS (init/send/sendForm) | `publicKey/serviceId/templateId` | `src/services/email/EmailService.ts` (環境變數) |
| useContactForm | `ee()` hook | 表單狀態/驗證/送出 | `formData, errors, submitForm` | `src/sections/contact/useContactForm.ts` |
| TextInput | `v` | 一般輸入元件 | `label,error,helperText` | `src/components/forms/TextInput.tsx` |
| TextArea | `te` | 多行輸入 | 同上 | `src/components/forms/TextArea.tsx` |
| ErrorMessage | `re` | 錯誤提示 (含 icon) | `message` | `src/components/forms/ErrorMessage.tsx` |
| Checkbox | `se` | 勾選 + 錯誤/說明 | `label,checked` | `src/components/forms/Checkbox.tsx` |
| Stack | `ae` | 方向+間距 layout 容器 | `direction,spacing` | 可用簡單 flex utility 取代 |
| ContactForm | `ie` | 組合表單 UI | `onSubmit,isEnglish,isLoading` | `src/sections/contact/ContactForm.tsx` |
| ContactFormContainer | `oe` | hook 實例包裝 | `isEnglish` | `src/sections/contact/index.ts` |
| ContactInfoPanel | `le` | 左側聯絡資訊 + Email | `isEnglish` | `src/sections/contact/ContactInfoPanel.tsx` |
| ContactSection | `me` (default) | 主區塊 (id="contact") | `isEnglish` | `src/sections/contact/ContactSection.tsx` |

### aboutsection-27losfoy

| 暫定名稱 | 原始符號 | 功能 | 重建建議 |
|-----------|----------|------|-----------|
| AboutTextBlock | `l` | 公司標題與敘述 | `src/sections/about/AboutTextBlock.tsx` |
| VisionCard | `i` | 願景圖片卡 | `src/sections/about/VisionCard.tsx` |
| StatsGrid | `d` | 簡單統計 (map) | `src/components/metrics/StatsGrid.tsx` |
| AboutSection | `c` (default) | Layout + anchor(id=about) | `src/sections/about/AboutSection.tsx` |

### productdetails-c4bx2cjd

| 暫定名稱 | 原始符號 | 功能 | 條件/特化 | 重建建議 |
|-----------|----------|------|-----------|-----------|
| specsFieldMap | `p` 常數 | 規格欄位 i18n | 靜態 | `src/features/products/specFieldMap.ts` |
| AdditionalFeatures | `F` | 額外 Features 區塊 | id=5 或一般 | `src/features/products/AdditionalFeatures.tsx` |
| ProductGallery | `D` | 圖片集展示 | 有 images 且 id≠3 | `src/features/products/ProductGallery.tsx` |
| TechnicalOverviewTable | `T` | 規格表 (table) | 翻譯欄位 | `src/features/products/TechnicalOverviewTable.tsx` |
| SupportFinSightPromo | `A` | FinSight 支持卡 | 特定產品 | `src/features/finsight/SupportPromo.tsx` |
| ProductDeepDescription | `G` | 深度描述 (多分支) | id=3 特化 | `src/features/products/ProductDeepDescription.tsx` |
| ProductDetailsPage | `Z` (default) | 整體頁容器 | 讀 route param | `src/pages/products/ProductDetailsPage.tsx` |

### 重構要點

1. 以 `useI18n()` 取代 `isEnglish` boolean，集中字典管理。
2. 產品特化 (id magic number) 改為資料旗標，例如 `product.type` 或 `product.tags`。
3. 規格翻譯表與資料載入分離；提供型別 `SpecFieldKey` 確保覆蓋率。
4. 表單驗證訊息與多語放入 `i18n` 模組，不在 hook 內寫死。
5. 圖片展示統一 ProgressiveImage；gallery 使用 CSS grid + aspect-ratio。

### 待確認 / 缺口

- Product 資料來源：main bundle utilities 內之英/中清單函式尚未抽出；需映射至 `src/data/products.ts`。
- PayPal / Demo URL 應集中至 `src/config/links.ts`。
- 返回按鈕使用 router navigate + hash，而非直接 `window.location.href`。

---
（Lazy chunk 深入分析 v1 完成）
