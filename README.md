# EudTech 網站架構

一個基於 React + TypeScript 的現代化企業網站，採用原子化設計系統和模組化架構。

## 🏗️ 架構概覽

### 技術棧
- **前端**: React 18.3 + TypeScript + Tailwind CSS
- **建置**: Vite 5.4
- **狀態管理**: Context API + Custom Hooks
- **路由**: React Router Dom
- **郵件服務**: EmailJS

### 設計系統層級

```
Atoms (原子) → Molecules (分子) → Organisms (有機體) → Templates (模板) → Pages (頁面)
```

## 📁 檔案結構

```
src/
├── components/
│   ├── pages/          # 頁面組件
│   │   └── CominoPage/ # Comino產品頁面
│   ├── atoms/           # 原子組件 - 最小的UI單元
│   │   ├── Icon/        # 圖標組件
│   │   ├── Image/       # 圖片組件  
│   │   ├── Avatar/      # 頭像組件
│   │   ├── Badge/       # 徽章組件
│   │   └── Chip/        # 標籤組件
│   ├── molecules/       # 分子組件 - 組合的功能單元
│   │   ├── SearchBox/   # 搜尋框
│   │   ├── Breadcrumb/  # 麵包屑導航
│   │   ├── StatCard/    # 統計卡片
│   │   └── ActionMenu/  # 操作選單
│   ├── organisms/       # 有機體 - 複雜的UI區塊
│   │   ├── Header/      # 頁首組件群
│   │   ├── ProductGrid/ # 產品網格
│   │   ├── HeroSection/ # 英雄區塊
│   │   └── ContactSection/ # 聯絡區塊
│   └── ui/              # 基礎UI系統
│       ├── Layout/      # 佈局組件
│       ├── Typography/  # 排版組件
│       ├── FormElements/ # 表單組件
│       └── Feedback/    # 反饋組件
├── hooks/               # 自訂Hook
│   ├── ui/              # UI相關Hook
│   ├── business/        # 業務邏輯Hook
│   └── performance/     # 性能優化Hook
├── utils/               # 工具函數
│   ├── animation/       # 動畫工具
│   ├── data/           # 數據處理
│   ├── form/           # 表單工具
│   └── api/            # API工具
├── data/               # 數據層
│   └── models/         # 數據模型
├── contexts/           # React Context
├── services/           # 外部服務
└── types/              # TypeScript類型
```

## 🧩 核心組件

### Layout 系統
```typescript
// 彈性佈局
<Flex direction="row" justify="center" align="center" gap="md">
  <div>項目1</div>
  <div>項目2</div>
</Flex>

// 垂直堆疊
<Stack spacing="lg" align="center">
  <Heading>標題</Heading>
  <Text>內容</Text>
</Stack>
```

### Typography 系統
```typescript
<Heading as="h1" size="3xl" gradient>主標題</Heading>
<Text size="lg" color="muted" truncate>長文字內容...</Text>
<Link href="/" external showIcon>外部連結</Link>
```

### Form 系統
```typescript
const { getFieldProps, handleSubmit } = useFormValidation({
  initialData: { email: '', name: '' },
  rules: { 
    email: { required: true, pattern: /email-regex/ },
    name: { required: true, minLength: 2 }
  }
});
```

## 🎨 設計標準

### 顏色系統
- **主色**: Blue 600-900 (EudTech品牌色)
- **輔色**: Teal 600-900, Purple 600-900 (Comino品牌色)
- **中性色**: Gray 50-900 (文字與背景)

### 間距系統
```css
/* 8px基準間距 */
xs: 4px   sm: 8px   md: 16px   lg: 24px   xl: 32px   2xl: 48px
```

### 動畫系統
```typescript
import { transitions } from '@/utils/animation/transitions';

// 基礎轉場
transitions.fade({ duration: 0.3 })
transitions.slide({ direction: 'up' })
transitions.scale({ easing: 'ease-out' })
```

## 🚀 開發指令

```bash
npm run dev      # 開發伺服器
npm run build    # 建置生產版本
npm run build:netlify  # Netlify 建置，含靜態 SEO route HTML
npm run submit:indexnow  # 部署後提交 sitemap URL 到 IndexNow
npm run submit:search-console  # 提交 sitemap 到 Google Search Console
npm run inspect:search-console  # 檢查高意圖 URL 的 Google 索引狀態
npm run inspect:search-console -- --include-aliases  # 同時檢查無尾斜線 alias
npm run report:search-console  # 讀取 configurator/solutions 的搜尋曝光字詞與排名
npm run verify:live-exposure  # 驗證正式站 SEO/discovery/canonical/JSON-LD 是否可被 crawler 讀取
npm run monitor:sitemaps  # 檢查 Google Search Console sitemap errors/warnings
npm run exposure:postdeploy  # 部署後跑 live SEO、索引狀態與搜尋曝光報表
npm run exposure:strict  # 嚴格檢查：尚未索引或零曝光時失敗
npm run generate:promotion-assets  # 從 SEO 頁面產生關鍵字、UTM、LinkedIn/Email 推廣素材
npm run verify:promotion-assets  # 檢查推廣素材是否與 SEO 頁面同步
npm run verify:marketing-platform-env  # 檢查 GA/GTM/Ads/LinkedIn/Meta/Microsoft 環境變數格式
npm run verify:marketing-platform-env:strict:readonly  # 唯讀檢查外部平台 ID 是否完整
npm run verify:marketing-platform-env:strict  # 外部平台 ID 缺少或格式錯誤時失敗
npm run create:marketing-env-template  # 產生本機 marketing.env 範本；檔案已被 git 忽略
npm run sync:marketing-platform-env -- --env-file ./marketing.env --target netlify --dry-run --fail-on-missing  # 從 env 檔完整性檢查 Netlify 同步
npm run create:marketing-1password-template  # 產生 1Password item JSON 範本；檔案已被 git 忽略
npm run verify:marketing-1password-item  # 檢查 1Password Automation item 是否有必要欄位，不輸出 secret
npm run apply:marketing-platform-env:netlify -- --env-file ./marketing.env  # 驗證後寫入 Netlify production build env
npm run audit:external-platform-access  # 檢查 Netlify/Google/LinkedIn/Meta/Microsoft/GitHub/1Password 外部平台權限缺口
npm run audit:external-platform-access:strict  # 外部平台權限缺少時失敗
npm run audit:exposure-readiness  # 檢查搜尋、推廣素材、轉換事件、外部追蹤缺口
npm run audit:exposure-readiness:strict  # 外部追蹤 ID 缺少時也視為失敗
npm run audit:exposure-readiness:production  # 正式站第一方事件端點未上線時失敗
npm run verify:discovery  # 驗證 sitemap/RSS/llms/image sitemap URL 一致性
npm run verify:seo-html  # 驗證靜態 SEO HTML 的 JSON-LD 結構
npm run preview  # 預覽建置結果
npm run lint     # 代碼檢查
```

## 🔎 Configurator 曝光與 SEO

Configurator 曝光主線集中在以下入口：

| 類型 | 路徑 |
|---|---|
| 配置器首頁 | `/configurator` |
| 配置器解決方案總入口 | `/solutions` |
| INTEGRATION KIT 8x H200 | `/configurator/27` |
| INTEGRATION KIT 8x PRO 6000 | `/configurator/36` |
| SERVER 6xH200 | `/configurator/29` |
| SERVER 4xH200 | `/configurator/28` |
| SERVER 8x PRO 6000 | `/configurator/23` |
| WORKSTATION 2x PRO 6000 | `/configurator/34` |
| WORKSTATION 2xH200 | `/configurator/30` |
| RACKABLE WS 6x R9700 | `/configurator/22` |
| WORKSTATION 2x5090 | `/configurator/13` |
| RACKABLE WS 4x PRO 6000 | `/configurator/5` |
| RACKABLE WS 6x5090 | `/configurator/21` |
| GPU 伺服器報價 | `/solutions/gpu-server-quote` |
| NVIDIA H200 伺服器 | `/solutions/nvidia-h200-server` |
| RTX PRO 6000 工作站 | `/solutions/rtx-pro-6000-workstation` |
| 台灣 AI 工作站 | `/solutions/ai-workstation-taiwan` |
| 液冷 GPU 伺服器 | `/solutions/liquid-cooled-gpu-server` |
| H200 與 RTX PRO 6000 比較 | `/solutions/h200-vs-rtx-pro-6000` |
| GPU 伺服器 RFQ 檢核表 | `/solutions/gpu-server-rfq-checklist` |
| 液冷 AI 伺服器採購指南 | `/solutions/liquid-cooling-ai-server-procurement` |
| GPU 伺服器電力規劃 | `/solutions/gpu-server-power-planning` |
| 機架式 AI 伺服器部署 | `/solutions/rack-ai-server-deployment` |
| 台灣公部門 GPU 伺服器採購 | `/solutions/taiwan-public-procurement-gpu-server` |
| Supermicro 與 Comino GPU 伺服器比較 | `/solutions/supermicro-comino-gpu-server-comparison` |
| 台灣 AI 推論伺服器 | `/solutions/ai-inference-server-taiwan` |

建置時會先執行 `scripts/generate-discovery-files.cjs`，再執行 `scripts/generate-static-seo-pages.cjs`。`/configurator/{id}`、`/solutions` 與 `/solutions/*` 的頁面資料會同步產生 sitemap、RSS、llms.txt 與 route 專屬靜態 HTML。這些 HTML 會直接包含 title、description、canonical、Open Graph、Twitter Card、JSON-LD，以及至少 760 字的可見 fallback 內容，讓 crawler 在 JavaScript 執行前也能讀到配置說明、規格、適用情境、詢價檢核、FAQ 與相關內部連結。

公開發現檔案：

| 檔案 | 用途 |
|---|---|
| `/sitemap.xml` | 搜尋引擎 URL 發現 |
| `/sitemap-index.xml` | 一般 sitemap 與圖片 sitemap 索引 |
| `/image-sitemap.xml` | 產品圖與配置器圖片發現 |
| `/robots.txt` | crawler 規則與 sitemap 位置 |
| `/llms.txt` | AI/LLM 工具可讀的 configurator 摘要 |
| `/llms-full.txt` | AI/LLM 工具可讀的完整 configurator 產品、solution、FAQ 與詢價路徑清單 |
| `/feed.xml` | Configurator product and solution RSS feed |
| `/build-meta.json` | 正式站部署 commit 與 build metadata，用於確認 production 已更新到指定 commit |
| `/d6fd206f713cd936d87b58a6010aa751.txt` | IndexNow key 驗證 |
| `docs/configurator-promotion-assets.md` | 推廣素材總覽與 LinkedIn 貼文草稿 |
| `docs/configurator-promotion-keywords.csv` | Google Ads 關鍵字與落地頁矩陣 |
| `docs/configurator-promotion-links.csv` | LinkedIn、Email、業務開發 UTM 連結 |
| `docs/marketing-platform-onboarding.md` | GA/GTM、Google Ads、LinkedIn、Meta、Microsoft Ads、Netlify、GitHub Actions 欄位與官方來源 |

部署到正式站後執行：

```bash
npm run submit:indexnow
npm run submit:search-console
```

`submit:indexnow` 會先重產 discovery 檔案，再讀取 `public/sitemap.xml`，向 IndexNow 提交 `https://eudaemonia.tech` 的正式 URL 清單。提交前可用 `npm run submit:indexnow:dry-run` 只讀現有 sitemap 並檢查 payload，不會重新產生檔案。

`submit:indexnow:current` 只讀目前 `public/sitemap.xml` 並提交 IndexNow，不重產 discovery 檔案。只需要確認目前 sitemap 已是要提交的版本。

`submit:search-console` 會透過 Google Search Console API 提交 sitemap index、一般 sitemap 與圖片 sitemap。Search Console 腳本會明確使用 `https://www.googleapis.com/auth/webmasters` scope，並忽略壞掉的 `GOOGLE_APPLICATION_CREDENTIALS` 路徑；執行前仍需要本機 ADC 可用且 quota project 已啟用 `searchconsole.googleapis.com`。

`inspect:search-console` 會透過 URL Inspection API 檢查高意圖 configurator canonical URL 在 Google 索引中的狀態。這個 API 回報的是 Google index 版本，不是即時 live URL 測試，也不會要求 Google 重新收錄。加上 `-- --include-aliases` 可同時檢查無尾斜線 alias 是否仍被 Google 視為不同網址。

`report:search-console` 會透過 Search Analytics API 讀取 configurator 與 solutions URL 的搜尋 query、page、clicks、impressions、CTR 與平均排名。預設查最近 28 天、每組 25 筆，可用 `-- --days=90`、`-- --start=2026-06-01 --end=2026-06-27`、`-- --row-limit=100`、`-- --start-row=100`、`-- --output=reports/search-console.json` 或 `-- --fail-on-empty` 調整。

`verify:live-exposure` 會直接檢查正式站的 `robots.txt`、sitemap index、一般 sitemap、圖片 sitemap、RSS、llms.txt、llms-full.txt、configurator route、solution route、canonical、Open Graph URL 與 JSON-LD，也會確認 discovery 檔、social preview 圖與 `/build-meta.json` 的 Netlify HTTP cache headers。`monitor:sitemaps` 會讀取 Google Search Console 的 sitemap health，要求 sitemap index、一般 sitemap 與圖片 sitemap 都存在，且 errors/warnings 為 0、近期曾被下載；剛提交後的 pending 狀態有 30 分鐘寬限，避免 Google 正常處理延遲誤擋自動化。`exposure:postdeploy` 則把正式站 SEO 檢查、Search Console sitemap health、URL Inspection 與 Search Analytics 報表串成部署後檢查流程，並輸出 `reports/search-console-latest.json`。`exposure:strict` 會在 canonical URL 尚未建立索引或 Search Analytics 零曝光時失敗，適合做週期性告警，不適合剛上線第一天當作 deploy gate。

GitHub Actions 內的 `Public Exposure Checks` 會每週一自動執行，也可手動觸發。這條流程只依賴公開網站與 repo 檔案，會建置 SEO assets、驗證 discovery/static SEO/live exposure，並重新送出 IndexNow URL 清單；不需要 Google Search Console 憑證。外部平台 ID 尚未填完整時會輸出 warning 與報告，不阻斷公開曝光主線；正式投放前仍要另外執行 `verify:marketing-platform-env:strict:readonly`、`audit:external-platform-access:strict` 與 `audit:external-exposure-status:strict`。

`generate:promotion-assets` 會從同一份 SEO 頁面資料產生 Google Ads exact/phrase keyword rows、LinkedIn organic UTM 連結與 Email outreach UTM 連結。`verify:promotion-assets` 會在 GitHub Actions 內檢查這些推廣素材是否與目前的 configurator SEO 頁面同步。

`verify:marketing-platform-env` 會檢查 GA/GTM、Google Ads、LinkedIn、Meta Pixel、Microsoft Ads UET 與第一方事件端點的環境變數格式，輸出會標示 `formatOk` 與 `readyForMarketingSync`。預設只擋格式錯誤，不擋尚未設定；`verify:marketing-platform-env:strict:readonly` 不寫報告，`verify:marketing-platform-env:strict` 會寫報告，兩者都會把缺少外部平台 ID 視為失敗，適合在正式投放前使用。

`apply:marketing-platform-env:netlify` 會先驗證 env 檔格式，再呼叫 Netlify CLI 寫入 production build environment。需要在執行程序環境中設定 `NETLIFY_AUTH_TOKEN`，且 token 必須有目標 site 的環境變數寫入權限。不要用命令列參數傳 token。可先用 `--dry-run --fail-on-missing` 檢查會寫入哪些 key；正式寫入時若外部平台 ID 尚未完整會預設失敗，只有刻意做部分同步時才加 `--allow-partial`。

`audit:external-platform-access` 會檢查目前 shell 是否具備外部平台閉環需要的權限：Netlify token/CLI、`GOOGLE_APPLICATION_CREDENTIALS` 是否壞路徑、Google ADC 是否有 Search Console、Analytics、Tag Manager、Google Ads scopes、LinkedIn API env、Meta API env、Microsoft Ads API env、GitHub repo 是否有行銷 variables/secrets、1Password Automation vault 是否看得到 Netlify/GA/Ads/LinkedIn/Meta/Microsoft Ads 相關 item。預設只產生報告；`:strict` 會在缺權限時失敗。

`audit:exposure-readiness` 會把曝光拆成五層檢查：搜尋發現、可投放推廣素材、詢價轉換路徑、第一方事件紀錄、自動化監控。GA4、GTM、Google Ads、LinkedIn Insight、Meta Pixel 與 Microsoft Ads UET 這類外部平台 ID 會列為缺口，但預設不讓 CI 失敗；要把缺少外部追蹤也視為失敗時，使用 `audit:exposure-readiness:strict`。部署完成後可用 `audit:exposure-readiness:production` 檢查正式站第一方曝光事件端點是否已上線。

`audit:exposure-summary` 會執行同一套 readiness audit，但輸出人可讀的摘要表，並寫入 `reports/configurator-exposure-summary.md`。這個摘要只列狀態、缺口 key 與下一步，不輸出任何 secret 值。

`audit:public-assets` 會只讀檢查 `public/` 的資產數量、總大小、超大檔、完全重複檔、`.DS_Store` 與誤產生的 `.png.png` 檔。預設不刪檔、不改圖、不壓縮；`:strict` 會把這些治理問題視為失敗。

`verify:marketing-event-health` 只對正式站第一方曝光事件端點做 GET 健康檢查，不送出測試事件。`exposure:public:readonly` 會串接 discovery、社群圖、推廣素材、public 資產、正式站 live exposure、IndexNow dry-run 與 marketing endpoint health，是目前不需要外部平台憑證的公開曝光閉環。

Netlify 內的 `exposure-scheduled` Scheduled Function 會每週從正式站讀取 `sitemap.xml`，並把 URL 清單提交到 IndexNow。這條流程在已發布的 Netlify deploy 上執行，不依賴 Google Search Console 憑證。

行銷追蹤可用環境變數：

| 變數 | 用途 |
|---|---|
| `VITE_GTM_ID` | Google Tag Manager |
| `VITE_GA_MEASUREMENT_ID` | GA4 page view 與事件 |
| `VITE_GOOGLE_ADS_ID` | Google Ads tag |
| `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` | 詢價成功轉換 |
| `VITE_LINKEDIN_PARTNER_ID` | LinkedIn Insight |
| `VITE_LINKEDIN_QUOTE_CONVERSION_ID` | LinkedIn 詢價轉換 |
| `VITE_META_PIXEL_ID` | Meta Pixel page view、再行銷與詢價 Lead 事件 |
| `VITE_META_QUOTE_EVENT_NAME` | Meta 詢價事件名稱，預設 `Lead` |
| `VITE_MICROSOFT_UET_TAG_ID` | Microsoft Ads UET SPA `page_view`、再行銷與詢價事件 |
| `VITE_MICROSOFT_UET_QUOTE_EVENT` | Microsoft Ads 詢價事件名稱，預設 `quote_submit_success` |
| `VITE_MARKETING_EVENT_ENDPOINT` | 第一方曝光事件收集端點，預設 `/.netlify/functions/marketing-event` |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console 驗證 meta |
| `VITE_BING_SITE_VERIFICATION` | Bing Webmaster Tools 驗證 meta |

外部平台 ID 格式檢查：

| 變數 | 格式 |
|---|---|
| `VITE_GTM_ID` | `GTM-...` |
| `VITE_GA_MEASUREMENT_ID` | `G-...` |
| `VITE_GOOGLE_ADS_ID` | `AW-...` |
| `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` | Google Ads conversion label |
| `VITE_LINKEDIN_PARTNER_ID` | 數字 |
| `VITE_LINKEDIN_QUOTE_CONVERSION_ID` | 數字 |
| `VITE_META_PIXEL_ID` | 數字 |
| `VITE_META_QUOTE_EVENT_NAME` | 英文字母開頭的事件名 |
| `VITE_MICROSOFT_UET_TAG_ID` | 數字 |
| `VITE_MICROSOFT_UET_QUOTE_EVENT` | 英文字母開頭的事件名 |

拿到外部平台 ID 後的 Netlify 寫入流程：

```bash
npm run create:marketing-env-template
npm run verify:marketing-platform-env:strict -- --env-file ./marketing.env
npm run sync:marketing-platform-env -- --env-file ./marketing.env --target env-file --dry-run --fail-on-missing
npm run sync:marketing-platform-env -- --env-file ./marketing.env --target github-actions --dry-run --fail-on-missing
npm run apply:marketing-platform-env:netlify -- --env-file ./marketing.env --dry-run --fail-on-missing
npm run apply:marketing-platform-env:netlify -- --env-file ./marketing.env
```

直接執行 `apply:marketing-platform-env:netlify` 時，`NETLIFY_AUTH_TOKEN` 必須先由安全來源注入目前程序環境；不要把 token 放在命令列參數、`marketing.env`、repo 或 shell history。`marketing.env`、`marketing.env.*` 與 `external-platform-access.env*` 已被 `.gitignore` 排除。

若平台 ID 與 token 已存成 1Password Automation vault item，且欄位名稱使用相同環境變數名稱，可改用：

```bash
npm run create:marketing-1password-template
op item create --vault Automation --template marketing-1password-item.json --dry-run
npm run verify:marketing-1password-item -- --op-item "EudTech Configurator Marketing Platforms"
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target env-file --output marketing.env
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target netlify --dry-run --fail-on-missing
npm run sync:marketing-platform-env -- --op-item "EudTech Configurator Marketing Platforms" --target github-actions --dry-run --fail-on-missing
```

`sync:marketing-platform-env` 只在結果中列出 key 名稱與缺口，不輸出 secret 值。GitHub Actions 寫入使用 `gh variable set` / `gh secret set` 的標準輸入；Netlify 寫入仍使用 Netlify CLI，並要求 `NETLIFY_AUTH_TOKEN` 來自目前程序環境或指定的 1Password item。
正式寫入 Netlify 或 GitHub Actions 時，若 GA/GTM、Google Ads、LinkedIn、Meta、Microsoft Ads 的必要追蹤值尚未完整，`sync:marketing-platform-env` 會預設失敗；只有刻意做部分同步時才加 `--allow-partial`。
若 1Password item 有 `NETLIFY_AUTH_TOKEN`、`GH_TOKEN` 或 `GITHUB_TOKEN` 欄位，`sync:marketing-platform-env` 會只注入該次子程序，不會寫入 repo 或輸出值。
`marketing-1password-item.json` 與 `marketing-1password-item.*.json` 已被 `.gitignore` 排除；填入實值後不要提交。

## 📦 模組使用

### 匯入方式
```typescript
// UI組件
import { Button, Card, Modal } from '@/components/ui';

// Hook
import { useTheme, useModal, useApi } from '@/hooks';

// 工具函數  
import { classNames, formatDate, validateEmail } from '@/utils';

// 原子組件
import { Icon, Image, Avatar } from '@/components/atoms';

// 分子組件
import { SearchBox, StatCard } from '@/components/molecules';
```

### 自訂Hook
```typescript
// 表單驗證
const form = useFormValidation({...});

// 鍵盤導航
const nav = useKeyboardNavigation(itemCount);

// 剪貼簿操作
const { copyToClipboard, hasCopied } = useClipboard();
```

## 🎯 核心特色

- **原子化設計** - 可組合、可重用的組件系統
- **TypeScript嚴格模式** - 完整的類型安全
- **響應式設計** - 支援所有設備尺寸  
- **深色模式** - 系統級主題切換
- **國際化** - 中英文語言切換
- **性能優化** - 懶載入、代碼分割、圖片優化
- **可訪問性** - 完整的a11y支援
- **SEO友好** - 結構化數據和meta標籤

## 📈 性能指標

- **LCP** < 2.5s - 大型內容繪製
- **FID** < 100ms - 首次輸入延遲
- **CLS** < 0.1 - 累計佈局偏移
- **Bundle Size** < 500KB - 主要包大小

---

**© 2024 優達盟資訊科技有限公司**# Updated Sun Sep 21 19:37:51 CST 2025
