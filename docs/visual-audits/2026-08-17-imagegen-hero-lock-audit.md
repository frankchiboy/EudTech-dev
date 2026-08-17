# EudTech 首頁 Hero 固定與 Imagegen 視覺稽核

日期：2026-08-17

適用分支：`codex/website-next-update`

## 不可變更區

首頁 Hero 的權威基準是 `bcce662` 版本的
`src/components/hero/HeroBackground.tsx`。目前程式必須保持：

- 圖片：`/grando-8gpu-server.jpg`
- 替代文字：`AI Server Background`
- 既有的深色遮罩、內容、CTA 與互動不在 Imagegen 變更範圍內。

## 逐頁判斷結果

| 頁面或區塊 | 使用的視覺 | 判斷與維護規則 |
|---|---|---|
| 首頁 Hero | 原始 GPU 伺服器圖片 | 固定不變。 |
| 首頁方案路徑與交付步驟 | `public/ai-agent/micro-illustrations/` 六張 WebP | 屬服務概念敘事，使用 Imagegen 微型情境圖。 |
| 首頁匿名採購案例 | `brand-provenance/eudtech-brand-procurement.webp` | 屬採購情境敘事，使用 Imagegen 品牌圖片。 |
| AI Agent 痛點、角色、系統、治理、導入、方案與適用團隊 | `public/ai-agent/micro-illustrations/` 六張 WebP | 屬工作流程與治理概念敘事，使用 Imagegen 微型情境圖。 |
| 採購資源 | `brand-provenance/eudtech-brand-procurement.webp` | 使用採購與驗收情境圖。 |
| 社群情報 | `brand-provenance/eudtech-brand-social.webp` | 使用社群訊號、帳號關係與風險判斷情境圖；Cyabra 原廠畫面保留。 |
| 關於 EudTech | `brand-provenance/eudtech-brand-delivery.webp` | 使用交付、整合與驗收情境圖。 |
| 聯絡與諮詢 | `brand-provenance/eudtech-brand-consultation.webp` | 使用需求診斷與下一步安排情境圖。 |
| 職涯 | `brand-provenance/eudtech-brand-careers.webp` | 使用團隊協作與職涯情境圖。 |
| AI 運算基礎設施、產品詳情、GPU 配置器與 GPU 專題 | 原廠或實際產品圖片 | 涉及實體硬體、配置與規格，保留真實產品圖片，不使用生成圖片冒充產品證據。 |
| 隱私、靜態連結索引與頁尾 | 無情境圖片 | 屬資料揭露或導覽內容，不增加生成裝飾圖。 |

## 必須保留的功能圖示

下列圖示不視為品牌敘事圖，維持向量圖示以確保操作辨識與無障礙：

- 導覽列、語言切換、明暗模式、行動選單與 CTA。
- 場景步驟、核取、狀態、警示、表單、FAQ 展開與外部連結。
- 配置器的產品類型、選項、硬體規格與互動控制。

## 素材來源與驗證

- Imagegen 原始 PNG：`docs/assets/ai-agent-micro-illustrations/`。
- 網站使用 WebP：`public/ai-agent/micro-illustrations/`。
- 2026-08-17 公開預覽驗證：47 個公開路由的桌面中文淺色與手機中文深色，共 94 張全頁畫面；7 個含品牌情境圖頁面的桌面／平板／手機、中英文、深淺色共 84 個交叉案例。全部為零水平溢位、零破圖、零主題套用失敗與零單一 H1 失敗。
- 預覽版是 branch deploy；正式網域必須等待使用者明確批准才可變更。
