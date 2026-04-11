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
npm run preview  # 預覽建置結果
npm run lint     # 代碼檢查
```

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
