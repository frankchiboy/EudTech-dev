# Configurator 導入知識與接續準則

更新時間：2026-07-13 03:33 Asia/Taipei

本文件保存 Configurator 的系統邊界、已確認決策、運作規則與接續方式。狀態與外部授權以
[PROJECT_STATUS.md](PROJECT_STATUS.md) 為準；完整歷史實作項目保留於
[docs/configurator-exposure-checklist.md](docs/configurator-exposure-checklist.md)。

## 1. 讀取順序

1. 先讀 `PROJECT_STATUS.md`，確認 branch、production 與尚待授權事項。
2. 再讀本文件，確認不能破壞的產品與技術決策。
3. 依議題讀取實作檔案與相關驗證腳本；不要只依歷史截圖或舊 commit 推論目前行為。

## 2. 產品邊界與資料來源

| 項目 | 現況與規則 |
|---|---|
| EudTech 網站責任 | EudTech 擁有 `/configurator` 的導覽、頁面框架、詢價流程、追蹤、SEO 與正式站部署。 |
| 上游設定資料 | `src/services/api/grandoConfiguratorService.ts` 從 `https://prod.comino.com/devices/` 及 `/devices/:id/` 讀取產品、模組、選項與預設值。 |
| 上游視覺資產 | 相對路徑資產由 `https://configurator.grando.ai` 解析；`/media/` 資產由 `prod.comino.com` 解析。 |
| 原廠比對原則 | 以原廠 Configurator 的產品路由、設定參數與互動結果作為比對基準；不將原廠網站程式或未授權資產視為可複製來源。 |
| Customize 路由 | 原廠的 Customize 依不同裝置 ID 前往 `/configurator/{id}`；EudTech 對應 `/configurator/:pid`，不是所有按鈕導向同一台產品。 |

### 2.1 上游 API 依賴與同步責任

1. 上游 API 是 Configurator 執行時的單點資料依賴。若 `/devices/` 或 `/devices/:id/` 失效、回傳不相容 schema 或移除公開產品，實際配置頁不能保證可用。
2. 目前 UI 必須顯示既有 loading/error 狀態，不可用過期 SEO 文案假裝產品仍可配置；修復前應保留錯誤證據並檢查上游 API 回應。
3. SEO 產品資料是版本控制中的靜態資料，與即時 API 是兩套來源。產生器只保證 sitemap、RSS、static HTML 與社群圖彼此一致，**不會**自動驗證它們仍與上游 API 一致。
4. 上游產品新增、下架、名稱或路由調整時，先比對 API 與 `src/data/configuratorProductSeo.ts`，再更新 SEO source、重新產生資產、驗證所有 canonical URL。這是人工維護責任，不能跳過。

```mermaid
flowchart LR
  A[使用者: /configurator 或 /configurator/:pid] --> B[GrandoConfigurator]
  B --> C[Comino Devices API]
  B --> D[設定規則與相容性檢查]
  D --> E[Share: 含選項的 URL]
  D --> F[Get Quote 表單]
  F --> G[Netlify send-email]
  F --> H[Marketing events]
  G --> I[info@eudaemonia.tech]
```

## 3. 路由與網址契約

| 用途 | 正式 URL | 規則 |
|---|---|---|
| 產品總覽 | `https://eudaemonia.tech/configurator/` | 顯示可配置產品清單。 |
| 單一產品 | `https://eudaemonia.tech/configurator/{pid}/` | `pid` 必須是上游公開產品 ID。 |
| 直接開啟詢價 | `?request=true` | SEO CTA 與清單的「取得報價」使用此查詢參數。 |
| 已選設定分享 | 模組選項 ID 與值置於 query string | `applyQueryToSpec` 還原設定；保留既有參數格式，避免破壞既有分享連結。 |
| Canonical | 一律使用尾斜線 | canonical、sitemap、Open Graph、JSON-LD 與 CTA 必須一致；舊 alias 由 redirect/normalization 處理。 |

路由所有權在 `src/components/AppRoutes.tsx`：`/configurator` 與 `/configurator/:pid` 都由
`GrandoConfigurator` 處理；`/solutions` 與 `/solutions/:slug` 是曝光內容入口，不可取代實際配置頁。

## 4. 設定、計算與相容性規則

1. `buildRecommendedSpec` 以 API 的 `recommended` 選項與產品預設值建立初始設定。
2. `applyQueryToSpec` 套用分享網址中的模組選項與 `gpu_value`、`cpu_value` 等數值參數。
3. `getConfiguratorValidation` 執行 GPU、CPU、PSU 等相容性檢查；不相容設定必須阻止使用者直接送出詢價，並要求先修正設定。
4. `getConfiguratorValidation` 目前涵蓋 CPU、GPU 數量、GeForce 與 PSU 功率限制。這些是程式內相容性保護規則，不應宣稱為完整原廠認證；高風險或特殊組合仍須由業務或原廠覆核。
5. `calculateConfiguratorPrice` 仍寫入內部 `spec.price`：將已選元件價格加總、四捨五入後乘以 `1.5`。它保留既有程式相容性，不是對外報價契約。
6. 對客戶的價格呈現決策已定：Configurator 以 **Get Quote／取得報價** 為唯一報價入口，不可自行重新顯示「預估價格」、貨幣價格或將內部 `spec.price` 當作正式售價。任何價格功能變更須先取得商務決策與原廠規則確認。

主要實作：`src/utils/configurator/calculations.ts`、
`src/components/configurator/GrandoConfigurator.tsx`、`src/types/configurator.ts`。

## 5. 視覺與載入效能決策

1. 桌面版維持高解析產品與背景圖，不能因手機效能需求降低桌面畫質。
2. 手機版以 `max-width: 767px` 的媒體規則使用較適合行動網路的產品圖片或尺寸；平板不屬於此手機降載範圍，仍以桌面品質策略處理。
3. `PRODUCT_IMAGE_ALIASES` 為少數產品提供本機 WebP mobile alias；桌面仍採高解析來源。新增產品時必須同時檢查 mobile/desktop fallback，避免出現空白圖片。
4. 背景圖與產品圖的來源、尺寸與品質邏輯位於 `GrandoConfigurator.tsx` 與 `src/utils/performance/imageOptimization.ts`。修改前先跑既有 performance 驗證，不可只以單一截圖判定問題已排除。

## 6. 詢價、寄信與識別碼流程

| 階段 | 實作與不變條件 |
|---|---|
| 表單開啟 | 建立 UUID `quote_request_id`；同一張表單重送沿用同一 ID。 |
| 表單欄位 | 必填：名字、姓氏、Email、留言；電話為前端表單既有必填欄位。 |
| 相容性 | 發送前先執行 Configurator validation；不可將不相容硬體設定送出為詢價。 |
| 郵件送出 | `src/services/emailService.ts` 呼叫 `/.netlify/functions/send-email`。Function 以 Gmail OAuth/Nodemailer 寄送。 |
| 收件人 | 前端傳送 `info@eudaemonia.tech`；Function 優先採 payload `toEmail`，其次 `QUOTE_RECIPIENT_EMAIL`，最後預設同一地址。不可在程式碼或文件寫入 OAuth secret。 |
| 成功條件 | 只有寄信 Function 回傳成功，UI 才能宣告詢價成功；Function 同時產生 sanitized `quote_email_sent` log。 |
| 回覆地址 | 寄件以客戶 Email 為 `replyTo`，便於業務直接回覆詢價。 |

正式端不應以真實客戶資料進行測試。寄信合約可用無效 UUID 的 POST probe 驗證 HTTP 400，確保沒有寄出測試信；完整信件投遞測試僅在取得明確授權後進行，並以實際收件匣與 Function 結果雙重確認。

### 6.1 詢價資料生命週期的已知界線

1. `quote_request_id` 可在詢價信、Function log 與第一方事件中交叉追溯；客服或業務接到個案時，應以此 ID 對照三者。
2. 現行實作沒有永久資料庫、正式匯出流程、明訂保存期限或後台查詢介面。不可宣稱已具備 CRM 等級的案件保存或漏斗報表。
3. 建立永久儲存前，任何報表都必須明確標示資料來源、涵蓋時間與可能遺漏；不得從暫存 `reports/` 或單次 Netlify log 推論完整轉換數。

## 7. 分享與成效追蹤

1. Share 優先使用 Web Share API，否則複製網址；網址保留當前設定並附加
   `utm_source=share`、`utm_medium=referral`、`utm_campaign=configurator_{deviceId}`、`utm_content=share_button`。
2. `quote_request_id` 進入前端 `quote_submit_*` 事件、dataLayer、GA/GTM payload、第一方
   `marketing-event`、詢價信文字/HTML 與 `quote_email_sent` log。此 ID 為 UUID，不含個資。
3. 第一方事件也保存 UTM、click ID、landing page 與 referrer；不必等待外部廣告 tag 才能記錄基本漏斗。
4. `netlify/functions/marketing-event.mjs` 對 `quote_request_id` 使用專屬格式清理；不可將它交給電話遮罩邏輯處理。
5. 轉換、歸因、產品檢視與表單事件會另外寫入 Netlify Blobs 的 site-scoped `configurator-marketing-events-v1`，可跨 deploy 保留。只保存已清理的事件資料；不保存 user agent，且 page view 不寫入原始持久事件，以限制資料量與識別風險。
6. `npm run report:configurator-conversions -- --days=30` 使用既有 Automation vault 的 Netlify token 讀取 Blob，僅輸出每日、事件、來源與 campaign 匯總；不輸出 UUID、raw URL、referer 或 user agent。
7. 啟用 GA4 Data API 後，需以同一資料期間比對 GA4 漏斗與第一方彙總，再擴大資料使用。

## 8. SEO 與曝光內容操作模型

| 項目 | 單一來源或產生器 | 操作規則 |
|---|---|---|
| Solution landing pages | `src/data/configuratorSeoPages.ts` | 目前 17 頁；內容、CTA 與 URL 從此更新。 |
| Product SEO pages | `src/data/configuratorProductSeo.ts` | 目前覆蓋 11 個公開產品 route。 |
| Discovery 檔案 | `scripts/generate-discovery-files.cjs` | 產生 sitemap、image sitemap、RSS、JSON feed、LLM discovery 等。 |
| Static crawler fallback | `scripts/generate-static-seo-pages.cjs` | 讓 crawler 在 JavaScript 前取得路由內容與 metadata。 |
| Social preview | `scripts/generate-configurator-social-images.cjs` | 由 route source 產生；不手改輸出 JPEG。 |
| 推廣素材 | `scripts/generate-configurator-promotion-assets.cjs` | 由 SEO source 產生關鍵字、廣告文案、自然貼文與 UTM 表格。 |

目前公開 discovery 覆蓋 30 個頁面與 31 張社群預覽圖。修改 SEO source 後，必須重建並執行
相關 discovery、static SEO、social image 與 promotion asset 驗證；不可只修改生成後檔案。

自然曝光優先順序必須以可重複資料決定：固定讀取 Search Console 的 query、page、click、impression、CTR、average position，以及未來 GA4 的 Configurator engagement 與 quote funnel。每次決策應把資料區間、篩選條件、候選頁面與採用理由寫入新的 tracked 決策紀錄；未取得這些資料前，不可用主觀流量預測新增頁面或投入廣告。

2026-07-13 的第一份實際資料決策記錄為 `docs/configurator-search-console-decision-20260713.md`：以 90 天的 37 個 Search Console rows 優化既有 H200、H200 vs RTX PRO 6000 與通用 RFQ 頁，不新增 landing page；下一個 Search Console reporting cycle 必須以相同區間重新比較 CTR、impressions 與 average position。

## 9. 部署與驗證基準

1. 儲存庫：`frankchiboy/EudTech-dev`；production Netlify site：`website-eudtech`。
2. `main` push 觸發 Netlify 持續部署。不要以已建置的舊 `dist` 手動覆蓋 production。
3. 程式碼或 Configurator 內容變更後的最小驗證順序：

   ```bash
   npm run build
   npm run verify:original-prompts
   npm run verify:marketing-events-browser
   npm run verify:marketing-event-health
   npm run verify:live-exposure -- --expect-commit <實際commit> --wait-for-commit-ms 60000
   ```

4. 操作副作用矩陣：

| 命令或動作 | 副作用 | 使用原則 |
|---|---|---|
| `npm run build`、`npm run verify:original-prompts`、`npm run verify:marketing-events-browser` | 本機讀取/建置，可能寫入可刪除建置產物 | 可作為程式變更的第一輪驗證。 |
| `npm run verify:marketing-event-health` | 對正式 `marketing-event` POST 一筆不含個資事件 | 不寄信，但非唯讀；僅在需要 production health 證據時執行。 |
| `npm run verify:live-exposure` | 讀取正式站 | 先確認 production commit，再作為 crawler surface 驗證。 |
| `npm run audit:*`、Search Console report/inspect | 可能在 git-ignore 的 `reports/` 寫入稽核結果；部分命令也會讀取外部服務 | 報告只作暫存證據，結論必須回填 tracked 文件。 |
| `npm run exposure:postdeploy`、`npm run submit:indexnow`、`npm run submit:search-console` | 向搜尋引擎提交 sitemap/URL | 僅在 discovery 資產改變且正式站已部署後執行。 |

5. `verify:live-exposure` 前必須先由 production `build-meta.json` 確認 Netlify 已部署本次 commit。文件-only commit 也會更新 build metadata，但不代表 Configurator 行為改變。
6. `npm run lint` 目前包含舊 reconstruction/legacy source 的既有錯誤，不能單獨作為本工作 release gate；以本節 focused checks 為準，另行處理 lint baseline。

## 10. 外部權限與未完成事項

| 項目 | 現況 | 接續前提 |
|---|---|---|
| GA4 Data API | GCP project `eudaemonia-vault-20260203` 尚未啟用 `analyticsdata.googleapis.com`。 | 使用者明確同意接受 Google APIs Terms 後才能啟用並讀取 property `543891100`。 |
| GA4 權限清理 | 未使用的 `eudvoice-play-publisher` Viewer 尚未成功撤銷。 | 以 access-management 清單回讀確認結果；不可透過改變使用者電子郵件偏好繞過 UI。 |
| Paid tracking | Google Ads、LinkedIn、Meta、Microsoft Ads 的 ID/轉換值尚未齊備。 | 使用者明確授權帳戶、平台條款與必要付款設定後，才可設定環境變數與投放。 |
| Quote funnel reporting | 有第一方事件與 Email ID，但無長期分析儲存。 | 先取得 GA4 報表存取，再以實際 Search Console + GA4 資料決定內容或投放優先順序。 |

任何外部服務條款、廣告帳戶、付款方式、追蹤 ID 或權限變更均不得自行執行。憑證僅可在既有 1Password automation 流程中使用，不得寫入 Git、輸出或文件。

## 11. 下一個 Session 的決策流程

1. **使用者要求產品行為修改**：先讀第 3 至 7 節，確認是否影響分享網址、設定驗證、價格呈現、寄信或追蹤；再改碼並按第 9 節驗證。
2. **使用者要求曝光或 SEO 修改**：先讀第 8 節，從 data source 修改並重新產生資產；以 production verifier 確認，不以猜測新增頁面。
3. **使用者要求真正成效報告**：先確認第 10 節 GA4 授權是否已完成；未完成時只能回報第一方 endpoint 健康與 Search Console 可得資料，不能宣稱轉換成效。
4. **使用者要求真實寄信測試**：先取得明確授權與測試收件人，送出後確認 Function response、收件匣與 `quote_request_id` 三者一致。
5. **使用者要求效能修改**：先分辨手機、平板、桌面；桌面高解析要求為既定約束，不能用全面壓縮處理手機問題。

## 12. 不可省略的交接資料

1. 更新 `PROJECT_STATUS.md` 的最新行為 commit、production 驗證與授權狀態。
2. 將新的原始使用者要求同步追加至 `USER_ORIGINAL_PROMPTS.md` 與 `docs/USER_ORIGINAL_PROMPTS.md`，不得包含 secret。
3. 將新的系統決策補充到本文件；將逐項歷史實作留在 exposure checklist。
4. 不將 `reports/` 作為唯一證據，因為它被 git-ignore；可重現資訊必須留在 tracked 文件、程式或驗證腳本。
