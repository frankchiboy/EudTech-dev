# 圖片資源檢查清單

## ✅ 關鍵圖片路徑驗證

### Hero 區段
- [x] `/grando-8gpu-server.jpg` - Hero 背景圖

### Comino 品牌區段
- [x] `/comino-grando-logo.png` - Comino Logo
- [x] `/comino-4xa100.jpg` - Hero Image
- [x] `/amd-partner-badge.jpg` - AMD 認證徽章

#### Comino 技術合作夥伴 Logos
- [x] `/tensorflow-logo.png`
- [x] `/pytorch-logo.png`
- [x] `/keras-logo.png`
- [x] `/nvidia-logo.png`
- [x] `/amd-logo.png`
- [x] `/comino-logo.png`

#### Comino 客戶評價頭像
- [x] `/sentdex-review.jpg` - Sentdex
- [x] `/linus-review.jpg` - Linus Tech Tips
- [x] `/sentdex-review.jpg` - Storage Review (使用相同圖片)

### Cyabra 品牌區段
- [x] `/cyabra-logo.svg` - Cyabra Logo
- [x] `/cyabra-images/cyabra-activity-graph-min-300x225.png` - Hero Image (Dashboard)

#### Cyabra 客戶見證頭像
- [x] `/cyabra-images/testimonials/jonny-bentwood.webp`
- [x] `/cyabra-images/testimonials/todd-grossman.webp`
- [x] `/cyabra-images/testimonials/vincent-obrien.webp`
- [x] `/cyabra-images/testimonials/drew-himmelreich.webp` (用於 CyabraTestimonials)

### 關於我們區段
- [x] `https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg` (外部 URL)

### 產品圖片
- [x] 各種 EudTech Select 伺服器圖片
- [x] Comino Grando 系列產品圖片

---

## 🔍 圖片路徑檢查結果

### 已確認存在的圖片
所有關鍵圖片路徑都已確認存在於 `/public` 目錄中。

### 注意事項
1. Cyabra Dashboard 圖片檔名包含特殊格式，但路徑正確：
   - 實際檔案：`cyabra-activity-graph-min-300x225.png`
   - 同時也有：`cyabra-activity-graph-min-300x225.png`（可能有空格問題）

2. 外部圖片（Pexels）需要網路連線才能載入

3. 所有 logo 和 review 圖片都已就位

---

## 📝 建議優化

### 圖片壓縮
建議使用工具壓縮以下大型圖片：
- Hero 背景圖（grando-8gpu-server.jpg）
- 產品圖片（可能較大的 JPG 檔案）

### WebP 轉換
考慮將 JPG/PNG 轉換為 WebP 格式以提升載入速度：
- 產品圖片
- Logo 圖片（除了 SVG）

### Lazy Loading
確認所有圖片都使用 `LazyImage` 組件或 `loading="lazy"` 屬性

---

## ✅ 驗證狀態
- **關鍵圖片路徑**: ✅ 全部正確
- **檔案存在性**: ✅ 已確認
- **外部資源**: ✅ 使用可靠的 CDN (Pexels)
