# Configurator Promotion Assets

此文件由 `npm run generate:promotion-assets` 產生，來源是 `src/data/configuratorSeoPages.ts` 與 `src/data/configuratorProductSeo.ts`。

## 使用方式

1. Google Ads 使用 `docs/configurator-promotion-keywords.csv` 做規劃，或使用 `docs/configurator-google-ads-editor-keywords.csv` 匯入 Google Ads Editor。
2. 搜尋廣告文案使用 `docs/configurator-search-ad-copy.csv`，此檔會標記 headline、description、path 長度是否合格。
3. LinkedIn、Email、業務開發使用 `docs/configurator-promotion-links.csv` 內的 UTM 連結。
4. 完整自然曝光文案使用 `docs/configurator-organic-posts.csv`，覆蓋每個 landing page 的技術、採購、詢價追蹤三種情境。
5. LinkedIn Campaign Manager URL tracking 參數使用 `docs/configurator-linkedin-url-parameters.csv`。
6. 所有推廣連結都保留 `utm_source`、`utm_medium`、`utm_campaign`、`utm_content`，搜尋廣告另保留 `utm_term`。
7. 實際投放前必須先在 Netlify 設定 GA4、GTM、Google Ads 或 LinkedIn 追蹤 ID。

## Priority Landing Pages

| 類型 | 頁面 | 主要關鍵字 | URL |
|---|---|---|---|
| configurator | Comino Grando GPU 伺服器配置器 | Comino Grando 配置器, GPU 伺服器配置器, GPU 伺服器報價 | https://eudaemonia.tech/configurator/ |
| solution-hub | 配置器解決方案總覽 | 配置器解決方案, GPU 伺服器報價指南, AI 伺服器配置器 | https://eudaemonia.tech/solutions/ |
| configurator-product | INTEGRATION KIT 8x H200 配置器 | INTEGRATION KIT 8x H200, H200 整合套件, NVIDIA H200 GPU 伺服器, 8x H200 報價, AI GPU 伺服器配置器 | https://eudaemonia.tech/configurator/27/ |
| configurator-product | INTEGRATION KIT 8x PRO 6000 配置器 | INTEGRATION KIT 8x PRO 6000, RTX PRO 6000 整合套件, 8x PRO 6000 報價, AI GPU 整合套件 | https://eudaemonia.tech/configurator/36/ |
| configurator-product | SERVER 6xH200 GPU 伺服器配置器 | SERVER 6xH200, NVIDIA H200 GPU 伺服器, H200 伺服器報價, 6x H200 伺服器, AI GPU 伺服器配置器 | https://eudaemonia.tech/configurator/29/ |
| configurator-product | SERVER 4xH200 GPU 伺服器配置器 | SERVER 4xH200, NVIDIA H200 GPU 伺服器, 4x H200 伺服器報價, AI 訓練伺服器, GPU 伺服器配置器 | https://eudaemonia.tech/configurator/28/ |
| configurator-product | SERVER 8x PRO 6000 GPU 伺服器配置器 | SERVER 8x PRO 6000, RTX PRO 6000 GPU 伺服器, 8x PRO 6000 報價, AI 推論伺服器, GPU 渲染伺服器 | https://eudaemonia.tech/configurator/23/ |
| configurator-product | WORKSTATION 2x PRO 6000 AI 工作站配置器 | WORKSTATION 2x PRO 6000, RTX PRO 6000 工作站, AI 工作站報價, GPU 工作站配置器 | https://eudaemonia.tech/configurator/34/ |
| configurator-product | WORKSTATION 2xH200 AI 工作站配置器 | WORKSTATION 2xH200, H200 工作站, NVIDIA H200 工作站報價, AI 工作站配置器 | https://eudaemonia.tech/configurator/30/ |
| configurator-product | RACKABLE WS 6x R9700 配置器 | RACKABLE WS 6x R9700, AMD Radeon AI PRO R9700, 可上架工作站報價, AMD AI 工作站 | https://eudaemonia.tech/configurator/22/ |
| configurator-product | WORKSTATION 2x5090 AI 工作站配置器 | WORKSTATION 2x5090, RTX 5090 工作站, AI 工作站報價, GPU 工作站配置器 | https://eudaemonia.tech/configurator/13/ |
| configurator-product | RACKABLE WS 4x PRO 6000 配置器 | RACKABLE WS 4x PRO 6000, RTX PRO 6000 可上架工作站, 4x PRO 6000 報價, AI 工作站配置器 | https://eudaemonia.tech/configurator/5/ |
| configurator-product | RACKABLE WS 6x5090 配置器 | RACKABLE WS 6x5090, RTX 5090 可上架工作站, 6x RTX 5090 報價, AI 工作站配置器 | https://eudaemonia.tech/configurator/21/ |
| solution | NVIDIA H200 GPU 伺服器配置器 | NVIDIA H200 伺服器, H200 GPU 伺服器, AI 訓練伺服器, HPC GPU 伺服器, GPU 伺服器報價, 液冷 GPU 伺服器, 台灣 AI 伺服器 | https://eudaemonia.tech/solutions/nvidia-h200-server/ |
| solution | RTX PRO 6000 AI 工作站配置器 | RTX PRO 6000 工作站, AI 工作站, GPU 工作站報價, NVIDIA 工作站 台灣, 本地 AI 推論工作站 | https://eudaemonia.tech/solutions/rtx-pro-6000-workstation/ |
| solution | 台灣 AI 工作站配置器 | AI 工作站 台灣, GPU 工作站 台灣, AI 電腦報價, NVIDIA 工作站報價, 本地 AI 工作站 | https://eudaemonia.tech/solutions/ai-workstation-taiwan/ |
| solution | 液冷 GPU 伺服器配置器 | 液冷 GPU 伺服器, 液冷 AI 伺服器, Comino Grando, GPU 伺服器配置器, AI 伺服器報價 台灣 | https://eudaemonia.tech/solutions/liquid-cooled-gpu-server/ |
| solution | GPU 伺服器報價配置器 | GPU 伺服器報價, AI 伺服器報價, GPU 工作站報價, 伺服器配置器, EudTech 配置器 | https://eudaemonia.tech/solutions/gpu-server-quote/ |
| comparison | NVIDIA H200 與 RTX PRO 6000 GPU 伺服器比較 | H200 vs RTX PRO 6000, NVIDIA H200 伺服器比較, RTX PRO 6000 工作站比較, AI GPU 比較, GPU 伺服器採購 | https://eudaemonia.tech/solutions/h200-vs-rtx-pro-6000/ |
| checklist | AI 採購 GPU 伺服器 RFQ 檢核表 | GPU 伺服器 RFQ, AI 伺服器 RFQ 檢核表, GPU 伺服器採購檢核表, AI 基礎設施報價, 伺服器配置器報價 | https://eudaemonia.tech/solutions/gpu-server-rfq-checklist/ |
| guide | 液冷 AI 伺服器採購指南 | 液冷 AI 伺服器採購, 液冷 GPU 伺服器報價, AI 資料中心散熱, 高密度 GPU 伺服器, Comino 液冷 | https://eudaemonia.tech/solutions/liquid-cooling-ai-server-procurement/ |
| guide | GPU 伺服器電力規劃配置器 | GPU 伺服器電力規劃, GPU 伺服器冗餘電源, AI 伺服器電力容量, GPU 伺服器報價, 資料中心 GPU 電力 | https://eudaemonia.tech/solutions/gpu-server-power-planning/ |
| guide | 機架式 AI 伺服器部署配置器 | 機架式 AI 伺服器部署, 機架式 GPU 伺服器, AI 機架伺服器報價, GPU 伺服器機架規劃, AI 資料中心伺服器 | https://eudaemonia.tech/solutions/rack-ai-server-deployment/ |
| checklist | 台灣公部門 GPU 伺服器採購檢核表 | 台灣公部門 GPU 伺服器採購, 政府 GPU 伺服器報價, AI 伺服器採購 台灣, GPU 伺服器規格檢核表 | https://eudaemonia.tech/solutions/taiwan-public-procurement-gpu-server/ |
| comparison | Supermicro 與 Comino GPU 伺服器配置比較 | Supermicro GPU 伺服器比較, Comino GPU 伺服器, GPU 伺服器替代方案, AI 伺服器報價比較, GPU 伺服器配置器 | https://eudaemonia.tech/solutions/supermicro-comino-gpu-server-comparison/ |
| solution | 台灣 AI 推論伺服器配置器 | AI 推論伺服器 台灣, GPU 推論伺服器, 本地 AI 伺服器報價, LLM 推論伺服器, AI 伺服器配置器 台灣 | https://eudaemonia.tech/solutions/ai-inference-server-taiwan/ |

## Google Ads Search Groups

1. Comino Grando GPU 伺服器配置器：Comino Grando 配置器、GPU 伺服器配置器、GPU 伺服器報價。落地頁：https://eudaemonia.tech/configurator/
2. 配置器解決方案總覽：配置器解決方案、GPU 伺服器報價指南、AI 伺服器配置器。落地頁：https://eudaemonia.tech/solutions/
3. INTEGRATION KIT 8x H200 配置器：INTEGRATION KIT 8x H200、H200 整合套件、NVIDIA H200 GPU 伺服器、8x H200 報價。落地頁：https://eudaemonia.tech/configurator/27/
4. INTEGRATION KIT 8x PRO 6000 配置器：INTEGRATION KIT 8x PRO 6000、RTX PRO 6000 整合套件、8x PRO 6000 報價、AI GPU 整合套件。落地頁：https://eudaemonia.tech/configurator/36/
5. SERVER 6xH200 GPU 伺服器配置器：SERVER 6xH200、NVIDIA H200 GPU 伺服器、H200 伺服器報價、6x H200 伺服器。落地頁：https://eudaemonia.tech/configurator/29/
6. SERVER 4xH200 GPU 伺服器配置器：SERVER 4xH200、NVIDIA H200 GPU 伺服器、4x H200 伺服器報價、AI 訓練伺服器。落地頁：https://eudaemonia.tech/configurator/28/
7. SERVER 8x PRO 6000 GPU 伺服器配置器：SERVER 8x PRO 6000、RTX PRO 6000 GPU 伺服器、8x PRO 6000 報價、AI 推論伺服器。落地頁：https://eudaemonia.tech/configurator/23/
8. WORKSTATION 2x PRO 6000 AI 工作站配置器：WORKSTATION 2x PRO 6000、RTX PRO 6000 工作站、AI 工作站報價、GPU 工作站配置器。落地頁：https://eudaemonia.tech/configurator/34/
9. WORKSTATION 2xH200 AI 工作站配置器：WORKSTATION 2xH200、H200 工作站、NVIDIA H200 工作站報價、AI 工作站配置器。落地頁：https://eudaemonia.tech/configurator/30/
10. RACKABLE WS 6x R9700 配置器：RACKABLE WS 6x R9700、AMD Radeon AI PRO R9700、可上架工作站報價、AMD AI 工作站。落地頁：https://eudaemonia.tech/configurator/22/
11. WORKSTATION 2x5090 AI 工作站配置器：WORKSTATION 2x5090、RTX 5090 工作站、AI 工作站報價、GPU 工作站配置器。落地頁：https://eudaemonia.tech/configurator/13/
12. RACKABLE WS 4x PRO 6000 配置器：RACKABLE WS 4x PRO 6000、RTX PRO 6000 可上架工作站、4x PRO 6000 報價、AI 工作站配置器。落地頁：https://eudaemonia.tech/configurator/5/

## LinkedIn Organic Drafts

### Comino Grando GPU 伺服器配置器

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/configurator/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_configurator&utm_content=technical

### SERVER 6xH200 GPU 伺服器配置器

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/configurator/29/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_configurator_29&utm_content=technical

### NVIDIA H200 GPU 伺服器配置器

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/solutions/nvidia-h200-server/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_nvidia_h200_server&utm_content=technical

### RTX PRO 6000 AI 工作站配置器

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/solutions/rtx-pro-6000-workstation/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_rtx_pro_6000_workstation&utm_content=technical

### GPU 伺服器報價配置器

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/solutions/gpu-server-quote/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_gpu_server_quote&utm_content=technical

### AI 採購 GPU 伺服器 RFQ 檢核表

技術與採購團隊可以先用配置器整理 GPU、CPU、記憶體、NVMe、電源與網路假設，再把配置連結交給 EudTech 追蹤報價。

https://eudaemonia.tech/solutions/gpu-server-rfq-checklist/?utm_source=linkedin&utm_medium=organic&utm_campaign=configurator_gpu_server_rfq_checklist&utm_content=technical

## Tracking Requirements

| 平台 | 必要設定 | 主要轉換 |
|---|---|---|
| GA4 / GTM | `VITE_GTM_ID` 或 `VITE_GA_MEASUREMENT_ID` | `configurator_lead_intent` |
| Google Ads | `VITE_GOOGLE_ADS_ID`、`VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` | `quote_submit_success` |
| LinkedIn Insight | `VITE_LINKEDIN_PARTNER_ID`、`VITE_LINKEDIN_QUOTE_CONVERSION_ID` | `quote_submit_success` |
| Search Console | sitemap 已提交後追蹤 query、page、impressions、clicks | 非即時，需等待 Google 收錄與曝光 |

## Platform Import Notes

1. Google Ads Editor CSV 使用英文欄位：`Campaign`、`Campaign type`、`Networks`、`Ad group`、`Keyword`、`Type`、`Final URL`、`Status`。
2. Google 搜尋廣告文案包遵守 headline 30、description 90、path 15 的長度上限；中文字元以雙寬字元計算。
3. LinkedIn Campaign Manager 可使用 static UTM 或 dynamic URL parameters；新階層參數可用 `AD_ID`，舊階層仍保留 `CREATIVE_ID` 供帳戶畫面對照。
