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
| GRANDO 機架式工作站 | `/configurator/28` |
| NVIDIA H200 GPU 伺服器 | `/configurator/29` |
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

建置時會先執行 `scripts/generate-discovery-files.cjs`，再執行 `scripts/generate-static-seo-pages.cjs`。`/solutions` 與 `/solutions/*` 的頁面資料會同步產生 sitemap、RSS、llms.txt 與 route 專屬靜態 HTML。這些 HTML 會直接包含 title、description、canonical、Open Graph、Twitter Card、JSON-LD，讓 crawler 在 JavaScript 執行前也能讀到正確內容。

公開發現檔案：

| 檔案 | 用途 |
|---|---|
| `/sitemap.xml` | 搜尋引擎 URL 發現 |
| `/sitemap-index.xml` | 一般 sitemap 與圖片 sitemap 索引 |
| `/image-sitemap.xml` | 產品圖與配置器圖片發現 |
| `/robots.txt` | crawler 規則與 sitemap 位置 |
| `/llms.txt` | AI/LLM 工具可讀的 configurator 摘要 |
| `/feed.xml` | Configurator solution RSS feed |
| `/d6fd206f713cd936d87b58a6010aa751.txt` | IndexNow key 驗證 |

部署到正式站後執行：

```bash
npm run submit:indexnow
npm run submit:search-console
```

`submit:indexnow` 會讀取 `public/sitemap.xml`，向 IndexNow 提交 `https://eudaemonia.tech` 的正式 URL 清單。提交前可用 `npm run submit:indexnow -- --dry-run` 檢查 payload。

`submit:search-console` 會透過 Google Search Console API 提交 sitemap index、一般 sitemap 與圖片 sitemap。執行前需要本機 ADC 具備 `https://www.googleapis.com/auth/webmasters` scope，且 quota project 已啟用 `searchconsole.googleapis.com`。

`inspect:search-console` 會透過 URL Inspection API 檢查高意圖 configurator canonical URL 在 Google 索引中的狀態。這個 API 回報的是 Google index 版本，不是即時 live URL 測試，也不會要求 Google 重新收錄。加上 `-- --include-aliases` 可同時檢查無尾斜線 alias 是否仍被 Google 視為不同網址。

`report:search-console` 會透過 Search Analytics API 讀取 configurator 與 solutions URL 的搜尋 query、page、clicks、impressions、CTR 與平均排名。預設查最近 28 天、每組 25 筆，可用 `-- --days=90`、`-- --start=2026-06-01 --end=2026-06-27` 或 `-- --row-limit=100` 調整。

行銷追蹤可用環境變數：

| 變數 | 用途 |
|---|---|
| `VITE_GTM_ID` | Google Tag Manager |
| `VITE_GA_MEASUREMENT_ID` | GA4 page view 與事件 |
| `VITE_GOOGLE_ADS_ID` | Google Ads tag |
| `VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL` | 詢價成功轉換 |
| `VITE_LINKEDIN_PARTNER_ID` | LinkedIn Insight |
| `VITE_LINKEDIN_QUOTE_CONVERSION_ID` | LinkedIn 詢價轉換 |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console 驗證 meta |
| `VITE_BING_SITE_VERIFICATION` | Bing Webmaster Tools 驗證 meta |

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
