# 線上站台快照蒐集計畫

更新: 2025-09-30

## 目的

保存當前線上 <https://eudaemonia.tech> 之實際渲染輸出 (HTML / 資產引用 / 主要圖片 / 可能的 source maps) 以供重建與回歸比對。

## 目錄結構

```text
reconstruction/snapshots/
  raw-html/           # 直接抓取回來的原始 HTML
  network-manifest/    # 每次快照的資源清單 JSON (JS/CSS/IMG/FONT)
  assets-probed/       # 嘗試下載的 source map 或額外腳本
  screenshots/         # 後續自動化測試截圖 (保留)
  notes.md             # 臨時觀察紀錄
```

## 需抓取路徑 (初版)

| 類型 | 路徑 | 說明 |
|------|------|------|
| Page | `/` | 首頁 (含大多數 sections) |
| Page | `/careers` | Careers Page |
| Page | `/components-demo` | 元件示範頁 (開發/測試用途) |
| Dynamic Product | `/products/<id>` | 需跑多個 id；以實際 product data source 探索 |

### Product IDs 來源

查看 `src/components/productData.ts` 或 `data/` 內的產品列表 (後續補入此計畫)。

目前蒐集到的 Product IDs (依資料來源函式聚類)：

```text
EudTech (getEudTechProducts): 3, 1
Comino (getCominoProducts): 5, 6, 7
Cyabra (getCyabraProducts): 10, 11
```

建議動態頁快照至少挑選：

```text
/products/1
/products/3
/products/5
/products/7
/products/10
```

（其餘可視需求擴充；若頁面為同 index.html 回傳則仍記錄。）

## 抓取指令範例 (手動)

**HTML 快照**：

```bash
# 建議在專案根目錄執行
mkdir -p reconstruction/snapshots/raw-html
curl -L -o reconstruction/snapshots/raw-html/index.html https://eudaemonia.tech/
curl -L -o reconstruction/snapshots/raw-html/careers.html https://eudaemonia.tech/careers
curl -L -o reconstruction/snapshots/raw-html/components-demo.html https://eudaemonia.tech/components-demo
```

**嘗試抓 product 動態頁 (替換實際 id)**：

```bash
curl -L -o reconstruction/snapshots/raw-html/product-example.html https://eudaemonia.tech/products/example-id
```

(若為前端路由，會返回同一份 index.html；仍保留。)

## 資源清單擷取建議

1. 使用 Chrome DevTools → Network → "Save all as HAR" → 轉存為 `network-manifest/<timestamp>.har`。
2. 轉 HAR 为簡化 JSON：可編寫 node 腳本 parse。

## Source Map 探測

根據已知 bundle：

```text
/assets/index-DwxAk0V1.js
/assets/aboutsection-27losfoy.js
/assets/contactsection-byyyswrd.js
/assets/productdetails-c4bx2cjd.js
```

嘗試：

```text
https://eudaemonia.tech/assets/index-DwxAk0V1.js.map
https://eudaemonia.tech/assets/aboutsection-27losfoy.js.map
... (其餘同理)
```

若 404 則記錄於 `assets-probed/probe-log.txt`。

## 自動化腳本草案 (未實作)

可建立 `scripts/fetch-snapshot.mjs`：

1. 定義 routes 陣列
2. 逐一 curl 下載
3. 解析首頁 `<script src>` 與 `<link rel="stylesheet">` 自動 probe `.map`
4. 生成 `network-manifest/<date>.json`

補充：`prepare-deploy.sh` 會：

1. 注入 build timestamp 至 `index.template.html`（最終 rename 成 `index.html`）
2. 重寫 `sw.js` 版本號（取 timestamp % 100）
3. 視環境 (VERCEL / NETLIFY) 決定是否複製 `_redirects` / `_headers` 到 `public/`
4. 複製 `sw.js` 到 public

=> 因此快照中 `<meta name="version">` 與 `sw.js` 版本號需一併紀錄；若還原歷史版本行為，需把版本邏輯抽象為可重複。

## 後續擴充

- 加入 Playwright 腳本：擷取完整頁面長截圖。
- 加入 DOM hash 計算，檢測 drift。
- 將 version meta (`<meta name="version">`) 抽取記錄。

## 初始任務待辦

- [ ] 補產品 ID 清單
- [ ] 建立 probe 腳本
- [ ] HAR 轉 JSON 腳本
- [ ] 截圖自動化流程

---

(此文件將隨進度更新)
