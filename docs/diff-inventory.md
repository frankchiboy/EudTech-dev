# Deployed vs Repository 差異盤點 (初版)

更新時間: 2025-09-29

## 目標

盤點目前 repo (`EudTech/`) 與線上部署產物 (`deployed/` 資料夾) 的差異，確認哪些原始碼仍在、哪些只剩 bundle，需要後續逆向或重建。

---

## 1. 關鍵檔案對照

| 類別 | Repo 位置 | Deployed 位置 | 差異狀態 | 備註 |
|------|-----------|---------------|----------|------|
| HTML 入口 | `index.html` (dev 用，引用 `/src/main.tsx`) | `index.html` (引用已編譯 bundle) | 差異 | Deployed 版已換成 hashed assets 載入 (`/assets/index-*.js`, `/assets/index-*.css`) 並包含 EmailJS 修復腳本引用。Repo 內 dev 版沒有 emailjs-fix.js。|
| Bundled JS | `assets/*.js` (同 deployed) | `assets/*.js` | 一致 | 目前 repo root 下存在同一批 bundle (疑似複製回來)。需要判斷是否要保留作為比對參考。|
| CSS | `assets/index-bhs9708k.css` | 同 | 一致 | Tailwind 產物（推測）。|
| Service Worker | `sw.js` (cache name v86 + dev mode 判斷) | `sw.js` (cache name v2 精簡版) | 差異 | 部署版本更精簡，repo 內版本較新（或尚未發佈）。需要決策採哪個為基準。|
| Netlify `_redirects` | `_redirects` | `_redirects` | 一致 | SPA fallback。|
| Netlify `_headers` | `_headers` | `_headers` | 一致 | Assets 設定 immutable。|
| 資產圖片 | `public/` + root | deployed 根層 | 多數一致 | 部分檔案在 repo `public/` 有額外 test/dev HTML。|
| EmailJS 修正腳本 | 無（僅有 `send-jobs.js`、`job-api.js`） | `emailjs-fix.js`, `emailjs-test.js`, `emailjs-diagnostic.html` | 缺失 | 需要分析並整合到重建的 services/email 模組。|

---

## 2. Bundle 與開發模式差異

- Repo `index.html` 直接載入 `/src/main.tsx` → 典型 Vite 開發入口。
- Deployed `index.html` 載入：
  - `<script type="module" crossorigin src="/assets/index-DwxAk0V1.js"></script>`
  - `<link rel="stylesheet" crossorigin href="/assets/index-Bhs9708k.css">`
  - 額外載入 `/emailjs-fix.js`。
- 代表打包流程在部署時會：
  1. 將開發版 `index.html` 模板化為 `index.template.html`（參照 `vite.config.ts` 中 manual input），輸出後 rename。
  2. 插入 version meta（`meta[name=version]`）。

---

## 3. Service Worker 差異分析

| 欄位 | Repo 版 (v86) | Deployed 版 (v2) | 推測 |
|------|---------------|------------------|------|
| Cache 名稱 | `eudtech-v86` | `eudtech-v2` | 版本號差距巨大，可能 repo 內先行演化但未重新部署。|
| 開發模式邏輯 | 有（偵測 localhost 並停用快取） | 無 | 部署版為極簡 Always Network。|
| Fetch 策略 | Dev: no-store; Prod: 直接 fetch | 直接 fetch | 現行策略幾乎不做離線。可重新指定策略或採 Workbox。|

決策建議：以 repo 中較新（具 dev 判斷）的 sw.js 為基礎，後續模組化。保留 deployed 版作為「最低需求」參考。

---

## 4. EmailJS 與表單相關遺失檔案

Deployed: `emailjs-fix.js`, `emailjs-test.js`, `emailjs-diagnostic.html`

Repo: 無對應原始碼（僅 `@emailjs/browser` 依賴與 `send-jobs.js`, `job-api.js`）。

行動：需要打開 `emailjs-fix.js` 逆向其 patch 與初始化邏輯（下一步納入資產分析）。

---

## 5. Build 設定摘要 (repo)

- 使用 Vite + React + TS。
- `manualChunks`: vendor (react, react-dom), router (react-router-dom)。
- 實際輸出只有一個主 bundle（且還有 lazy chunk？）目前 assets 看到 4~5 檔：
  - `index-dwxak0v1.js`
  - `aboutsection-27losfoy.js`
  - `contactsection-byyyswrd.js`
  - `productdetails-c4bx2cjd.js`
  - `index-bhs9708k.css`

推測：某些路由/區塊為 dynamic import。需從 bundle 內容佐證。

---

## 6. 需要釐清 / 未決事項

| 項目 | 狀態 | 待確認 |
|------|------|---------|
| Source maps 是否存在 | 未確認 | 線上 `https://eudaemonia.tech/assets/*.map` 嘗試存取（下一步）。|
| EmailJS 修正內容 | 未分析 | 讀取檔案後判斷是否 polyfill / race condition workaround。|
| `prepare-deploy.sh` 腳本行為 | 未讀取 | 可能生成 `index.template.html` 或 version meta。|
| `scripts/inject-version.cjs` | 未讀取 | 建立 `<meta name="version">`。|

---

## 7. 下一步建議 (對應 Todo)

1. (Todo #2) 進行線上站台快照 + 嘗試抓取 source maps。
2. (Todo #3) 針對 assets 建立對應表：bundle -> 功能/區塊。
3. (Todo #4) Prettify 主要 bundle，初步抽取 dynamic import 邊界。
4. 補紀錄 `prepare-deploy.sh` 與 `scripts/` 內容於此文件後續章節。

---

## 8. 初步結論

目前 repo 仍保有完整 React 原始碼（`src/` 結構健全），`deployed/` 僅提供一次打包輸出與幾個遺失在 repo 的 EmailJS 補丁檔。重建難度低於「完全遺失來源」情境；主要工作將轉為：

- 將 deployed 特殊行為（EmailJS 修復、版本 meta）回補到開發流程。
- 驗證 dynamic import 與 code splitting 是否如預期。
- 過版本化的 Service Worker 策略需統一與文件化。

---

(此文件會在後續任務持續擴充)
