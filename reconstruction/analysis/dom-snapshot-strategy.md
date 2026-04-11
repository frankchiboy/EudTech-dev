# DOM Snapshot Strategy (Component Tree Reconstruction)

## 目標

建立可靠方法萃取現行部署頁面之實際 DOM / 元件結構線索，用於：

- 驗證逆向出來的 React component 階層與語義
- 對照樣式 class（Tailwind utilities + 自訂 shadow/glow）
- 彙整圖片 / 連結 / 動態區塊（懸浮、Banner、Lazy 區域）

## 範圍頁面

1. 首頁 `/`
2. 品牌頁 `/brands/comino`, `/brands/cyabra`
3. 產品細節頁（挑至少兩種：id=3 特殊、一般 id=5） `/products/3`, `/products/5`
4. 聯絡區塊（首頁內部 anchor `#contact`）

## 捕捉時機

| 時機 | 描述 | 目的 |
|------|------|------|
| 初始載入 (DOMContentLoaded) | React hydration 完成前/後各一次 | 分析 SSR vs CSR 差異（若有） |
| 首屏穩定 (RAF * 3) | 連續三次 requestAnimationFrame 後 | 避免 layout 抖動/動畫初始狀態 |
| Idle 階段 | requestIdleCallback (timeout 2s) | 捕捉延遲載入圖片/懸浮元素 |
| 互動後 | 手動觸發：切換語言 / 切換暗色 / 打開產品頁 | 收集狀態差異 className |

## 收集內容

- `<body>` 下完整 innerHTML（壓縮空白）
- 所有 `<img>`：`src`, `loading`, `decoding`, 實際尺寸 `naturalWidth/Height`
- 所有具有 `id` / `data-*` 屬性節點：便於對應 anchor 與 JS 掛載點
- ClassName 統計：出現頻率排序（協助找出可抽象的樣式模式）
- Inline style 節點（若存在）
- `<meta name="version">` 當下 content

## 建議工具腳本

### bookmarklet（快速人工收集）

```js
javascript:(async()=>{const delay=ms=>new Promise(r=>setTimeout(r,ms));const snapPhase=async(label)=>{await delay(0);const imgs=[...document.images].map(i=>({src:i.currentSrc||i.src,w:i.naturalWidth,h:i.naturalHeight,loading:i.getAttribute('loading')||'',decoding:i.decoding||''}));const nodes=[...document.querySelectorAll('[id],[data-*]')].map(n=>({tag:n.tagName.toLowerCase(),id:n.id||null,dataAttrs:[...n.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value])}));const classes=[...document.querySelectorAll('*')].flatMap(n=>n.className&&typeof n.className==='string'?n.className.split(/\s+/):[]);const classFreq=Object.entries(classes.reduce((m,c)=>(m[c]=(m[c]||0)+1,m),{})).sort((a,b)=>b[1]-a[1]).slice(0,120);const metaVer=document.querySelector('meta[name="version"]')?.content||null;return {label,ts:Date.now(),url:location.href,metaVer,imgs,nodes,classFreqHtml:classFreq.map(([c,f])=>`${f}\t${c}`).join('\n')};};const phases=['initial','stable','idle'];const results=[];for(const ph of phases){if(ph==='stable') await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(r)))); if(ph==='idle' && 'requestIdleCallback' in window){await new Promise(r=>requestIdleCallback(r,{timeout:2000}));}results.push(await snapPhase(ph));}const blob=new Blob([JSON.stringify(results,null,2)],{type:'application/json'});const a=document.createElement('a');a.download=`dom-snapshot-${Date.now()}.json`;a.href=URL.createObjectURL(blob);a.click();})();
```
(拖曳到書籤列 → 各頁依指引執行並收集 JSON)

### 自動化（選擇性）

可考慮後續用 Playwright：

- 迭代目標 URL 陣列
- `page.waitForLoadState('networkidle')` 後執行與 bookmarklet 類似的 `evaluate` 腳本
- 生成 artifact 存入 `reconstruction/dom-snapshots/*.json`

## 分析流程

1. 將所有 snapshot JSON 合併 → 建立 className 出現頻率總表
2. 標記出高頻但語義不明的樣式組合（可能抽成原子組件 wrapper）
3. 比對 `contact`/`product` 頁面共用樣式 → 歸類 layout 模組（e.g. `Card`, `GradientSection`）
4. 交叉對照 prettified bundle 內出現之靜態 class 字串，定位對應 component 邊界

## 轉化為元件樹策略

- 依 anchor / 大型語義區塊 (section cards / hero / gallery / specs) 建立第一層
- 內部依重複模式（統計相等組合 class + 結構深度 < 3）抽象成子元件
- 若某區多處使用具相似 className 前綴 (e.g. `shadow-3d-...`) → 視為 style primitive

## 驗證標準 (Acceptance)

- 對每個頁面生成 `*.component-tree.json`：
  - 節點：`{ key, role, tag, classHash, children: [...] }`
  - `classHash` = 對 className 排序後 SHA1/短雜湊，利於 diff
- 復原後的 React 結構與記錄 JSON 階層深度誤差 <= 1 層（允許 wrapper 調整）
- 主要視覺模組（Hero / Gallery / Specs / ContactForm）在 React 來源檔對應一個獨立目錄

## 風險 / 注意事項

- Hydration 期間暫態 DOM（skeleton / loading）需標記 phase，避免誤判為固定結構
- `requestIdleCallback` 不保證一定觸發（Safari fallback → setTimeout）
- 頁面後續互動（例如語言切換）另行手動紀錄差異（可再產生 diff 文檔）

## 下一步

- 執行 bookmarklet 生成初始 snapshot
- 撰寫 `scripts/aggregate-dom-snapshots.mjs` 進行統計輸出
- 產出第一版 `homepage.component-tree.json` 做為重建對照基準
