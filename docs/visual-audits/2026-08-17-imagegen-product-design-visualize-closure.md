# EudTech 全站視覺收斂

日期：2026-08-17  
分支：`codex/website-next-update`  
驗收版本：`5c1c151e4ba4ee713b3ec55668d08280321fac6f`

## 視覺素材規則

| 類型 | 網站使用位置 | 正式素材規則 |
|---|---|---|
| 操作與狀態圖示 | 導覽、主題、語言、表單、FAQ、CTA、配置器規格與選項 | 保留 Lucide 向量圖示，維持清楚操作語意與無障礙名稱。 |
| 品牌與流程情境 | 首頁解決方案、首頁交付步驟、AI Agent 角色與治理、採購資源、社群情報、公司介紹、聯絡與職涯 | 使用六張 `public/ai-agent/micro-illustrations/*.webp` 與六張 `public/brand-provenance/*.webp` Imagegen 圖像。 |
| 可驗證產品與平台能力 | Comino GPU 系統、GPU 配置器、技術選型矩陣、Cyabra 與 Microsoft 產品畫面 | 使用真實 Comino 產品照片或原廠公開畫面；不使用生成影像取代硬體或平台證據。 |

首頁 Hero 維持既有 `/grando-8gpu-server.jpg`、結構、文字、CTA 與互動。

## 資料視覺化判斷

網站只保留有明確資訊來源的 GPU 選型矩陣、流程步驟與原廠產品畫面。網站沒有足以公開呈現成效趨勢圖的已驗證客戶數據，因此不新增沒有資料來源的行銷圖表或儀表板。

## 畫面與互動驗證

| 驗證項目 | 結果 |
|---|---|
| 首頁、AI Agent、AI 運算基礎設施、社群情報、採購資源、產品與配置器；桌面中文淺色、桌面英文深色、平板中文深色、手機中文淺色 | 7 個路由 × 4 種狀態，共 28 張目前預覽畫面；0 個失敗、0 個破圖、0 個水平溢位、每頁 1 個 H1。 |
| AI Agent 場景頁籤、FAQ、語言、深淺色、主要 CTA、手機導覽與瀏覽器重大錯誤 | 全部通過。 |
| 手機 GPU 配置器 | 使用三張實際 Comino 衍生產品照片；產品卡片按區塊載入，維持既有詢價流程。 |

驗證輸出：

- `/tmp/eudtech-product-design-imagegen-visualize-final-20260817-v2/audit.json`
- `/tmp/eudtech-product-design-imagegen-visualize-interactions-20260817/interactions.json`

## 發布狀態

Netlify branch deploy `6a8317c3a32f1b000881db94` 已完成，分支 `codex/website-next-update`，commit `5c1c151`。正式網域仍使用 main commit `545cb57905adc314ac327e1122dbbac7e4a5e82a`。
