# 🔍 視覺驗證指南

## 快速開始

### 開啟對比視窗
1. **本地 Production Build**: http://localhost:4173/
2. **正式站**: https://eudaemonia.tech/

建議使用瀏覽器的「分割視窗」功能並排比對。

---

## 📱 響應式測試尺寸

### 手機測試 (< 640px)
- **iPhone SE**: 375 x 667
- **iPhone 12/13**: 390 x 844
- **iPhone 14 Pro Max**: 430 x 932
- **Android (Pixel)**: 393 x 851

### 平板測試 (640px - 1024px)
- **iPad Mini**: 768 x 1024
- **iPad Air**: 820 x 1180
- **iPad Pro 11"**: 834 x 1194

### 桌面測試 (> 1024px)
- **筆電**: 1280 x 720
- **桌面**: 1920 x 1080
- **寬螢幕**: 2560 x 1440

---

## ✅ 視覺驗證清單

### 1. Hero 區段
#### 桌面版
- [ ] 背景圖片完整顯示無裁切
- [ ] 標題「賦能未來」字體大小一致
- [ ] 副標題「透過AI創新」漸層效果相同
- [ ] 說明文案行高與間距一致
- [ ] 兩個 CTA 按鈕對齊、大小、間距相同
- [ ] Scroll indicator 動畫效果

#### 手機版
- [ ] 標題自動縮小適應螢幕
- [ ] CTA 按鈕垂直堆疊
- [ ] 背景圖片適當裁切保持焦點

---

### 2. EudTech 解決方案區段
#### 內容對比
- [ ] 標題「EUDTECH 解決方案」大小寫一致
- [ ] 子標題「我們的自有產品」粗細一致
- [ ] 引言文案完全相同
- [ ] 產品卡片網格佈局 (2列桌面，1列手機)

#### 產品卡片
- [ ] FinSight 卡片：圖片、標題、描述、CTA
- [ ] EudTech Select 卡片：圖片、標題、描述、CTA
- [ ] Hover 效果：陰影加深、輕微上移
- [ ] 卡片圓角與間距一致

---

### 3. 授權經銷商標題
- [ ] 標題「授權經銷商」居中
- [ ] **確認無引言文案**（已移除）
- [ ] **確認無分隔線**（已移除）
- [ ] 與下方 Comino 區段間距適當

---

### 4. Comino Grando 品牌區段

#### Logo 與標題
- [ ] Comino Grando logo 清晰、大小適中
- [ ] Logo 有 drop shadow 效果
- [ ] 「授權經銷商」小標題顏色（紫色）
- [ ] 「Comino Grando」主標題可點擊、有 underline

#### 描述區塊
- [ ] 經銷商授權文案完整
- [ ] 驗證徽章背景色（淡紫色）
- [ ] 「Comino經銷商頁面」連結可點擊
- [ ] AMD Partner 認證圖片顯示

#### Hero Image
- [ ] 液冷 GPU 設備圖片清晰
- [ ] 圖片高度：手機 288px, 平板 320px, 桌面 448px
- [ ] 左側漸層遮罩效果
- [ ] 標題「液冷多GPU設備」清晰可讀
- [ ] 描述「用於AI推論與訓練 - 圍繞液冷技術設計，最高支援8個GPU」

#### 特色區塊 (4項)
- [ ] 1. 以液冷技術為核心設計
- [ ] 2. 24/7全天候運作設計
- [ ] 3. 2024年StorageReview最佳獎
- [ ] 4. 極致效能
- [ ] 每項 icon 顏色不同（藍、黃、綠、紫）
- [ ] Hover 效果：紫色背景

#### 相容技術 Logos
- [ ] TensorFlow, PyTorch, Keras (第一排)
- [ ] NVIDIA, AMD, Comino (第二排)
- [ ] 所有 logo 清晰、大小一致
- [ ] Grayscale 效果，hover 變彩色

#### 客戶評價
- [ ] 3個評價卡片：Sentdex, Linus Tech Tips, Storage Review
- [ ] 頭像圖片顯示
- [ ] 引號圖示
- [ ] 評價內容完整
- [ ] 卡片陰影與 hover 效果

#### CTA 按鈕
- [ ] 「探索Comino產品」按鈕
- [ ] 紫色背景（bg-purple-700）
- [ ] 點擊跳轉到 #comino-products

---

### 5. Comino 產品區段
- [ ] 錨點 #comino-products 正確
- [ ] 產品列表顯示
- [ ] 網格佈局（響應式）

---

### 6. Cyabra 品牌區段

#### Logo 與標題
- [ ] Cyabra SVG logo 清晰
- [ ] 「授權經銷商」小標題顏色（藍色）
- [ ] 「Cyabra」主標題可點擊

#### Hero Image (新增)
- [ ] Dashboard 圖片顯示：`/cyabra-images/cyabra-activity-graph-min-300x225.png`
- [ ] 標題「揭露網路上的真相、風險和假訊息」
- [ ] 描述「先進的AI工具，用於檢測假資訊活動、假帳號，保護品牌聲譽」
- [ ] 漸層遮罩效果

#### 特色區塊 (4項)
- [ ] 1. 品牌保護
- [ ] 2. 即時警報
- [ ] 3. 假帳號偵測
- [ ] 4. 趨勢分析
- [ ] 所有 icon 藍色（#003daa）
- [ ] 白色卡片背景、hover 陰影

#### Why Cyabra 統計
- [ ] 四個統計數字：#1, $500B, 24/7, 89%
- [ ] 數字大、描述小
- [ ] 藍色數字顏色
- [ ] 網格佈局 2x2 (手機) / 1x4 (桌面)

#### 客戶見證
- [ ] 標題「行業領導者對Cyabra的評價」
- [ ] 4個見證：Jonny Bentwood, Todd Grossman, Vincent O'Brien, (Drew 在 CyabraTestimonials)
- [ ] 頭像 webp 圖片
- [ ] 職位與公司資訊
- [ ] 引述內容完整

#### CTA 按鈕
- [ ] 「探索Cyabra解決方案」按鈕
- [ ] 藍色背景
- [ ] 跳轉到 #cyabra-products

---

### 7. Cyabra 產品區段
- [ ] 錨點 #cyabra-products 正確
- [ ] 產品列表顯示

---

### 8. 關於我們區段

#### 左側內容
- [ ] 小標題「關於我們」(藍色)
- [ ] 主標題「優達盟資訊科技有限公司」
- [ ] 三段文案完整顯示
- [ ] CTA「探索我們的產品」連結

#### 右側圖片卡片
- [ ] 團隊圖片 (Pexels)
- [ ] 藍色漸層邊框
- [ ] 「我們的願景」標題
- [ ] 願景描述文案
- [ ] 統計數字「15+ AI解決方案」

---

### 9. 聯絡我們區段

#### 標題區
- [ ] 小標題「聯絡我們」
- [ ] 主標題「與我們聯繫」
- [ ] 說明「對我們的AI伺服器解決方案有疑問？我們的團隊隨時為您提供幫助。」

#### 左側（聯絡資訊）
- [ ] 藍色漸層背景
- [ ] 標題「聯絡資訊」
- [ ] 引言「填寫表格，我們的團隊將在24小時內回覆您。」
- [ ] Email: info@eudaemonia.tech
- [ ] Icon 與文字對齊

#### 右側（表單）
- [ ] 名字、姓氏欄位
- [ ] Email 欄位
- [ ] 公司欄位
- [ ] 訊息欄位
- [ ] 提交按鈕

---

### 10. Footer

#### Logo 與描述
- [ ] EudTech logo
- [ ] 描述文案：「為下一代智能應用開創人工智能基礎設施。」

#### 連結群組
##### 公司
- [ ] 關於我們 (可點擊)
- [ ] 職業機會 (可點擊)
- [ ] 新聞 (灰色未啟用)
- [ ] 部落格 (灰色未啟用)

##### 產品
- [ ] FinSight 金融AI系統
- [ ] Comino Grando

##### 法律
- [ ] 隱私政策 (未啟用)
- [ ] 服務條款 (未啟用)
- [ ] Cookie政策 (未啟用)

#### 版權
- [ ] 「© 2025 優達盟資訊科技有限公司 保留所有權利。」
- [ ] 公司名稱漸層效果

---

## 🎨 樣式細節檢查

### 顏色主題
- [ ] 主要藍色: #003daa
- [ ] Comino 紫色: purple-700/800
- [ ] 背景漸層效果一致

### Typography
- [ ] 標題字體粗細
- [ ] 行高與字間距
- [ ] 響應式字體大小

### 間距
- [ ] Section padding: xl (5rem 1.5rem)
- [ ] 卡片內距一致
- [ ] 元素間距統一

### 動畫效果
- [ ] Hover 狀態
- [ ] Transition 時長
- [ ] Transform 效果

---

## 🧪 互動測試

### 導航
- [ ] 點擊 Logo 回到頂部
- [ ] 導航選單錨點跳轉
- [ ] 手機版選單展開/收合

### CTA 按鈕
- [ ] Hero「探索產品」→ #eudtech-products
- [ ] Hero「聯絡我們」→ #contact
- [ ] Comino「探索Comino產品」→ #comino-products
- [ ] Cyabra「探索Cyabra解決方案」→ #cyabra-products

### 外部連結
- [ ] Comino logo → https://www.grando.ai/
- [ ] Comino 驗證連結 → https://www.comino.com/en/company
- [ ] Cyabra logo → https://www.cyabra.com/
- [ ] Cyabra 驗證連結 → https://cyabra.com/become-a-partner/

### 語言切換
- [ ] 切換到英文
- [ ] 所有文案更新
- [ ] 切換回中文

---

## 📊 Chrome DevTools 檢查

### Lighthouse 評分
```
在 Chrome DevTools 中:
1. 開啟 DevTools (F12)
2. 切換到 Lighthouse tab
3. 選擇 Desktop 或 Mobile
4. 點擊 "Generate report"
```

目標分數：
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Network 檢查
- [ ] 所有圖片成功載入 (200 status)
- [ ] 無 404 錯誤
- [ ] Bundle 大小合理

---

## ✅ 最終確認

完成所有檢查後，確認：
- [ ] 視覺與正式站完全一致
- [ ] 所有錨點正常運作
- [ ] 響應式在各尺寸正常
- [ ] 無 console 錯誤
- [ ] Lighthouse 分數達標

---

## 🚀 準備部署

全部通過後執行：
```bash
npm run build
netlify deploy --prod
# 或
vercel --prod
```

**狀態**: 🟡 視覺驗證中
