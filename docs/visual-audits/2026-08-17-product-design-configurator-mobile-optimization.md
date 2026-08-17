# Product Design｜手機版配置器產品圖片最佳化

日期：2026-08-17

範圍：`/configurator/` 的手機產品選擇流程；其他公開路由僅做核心動線回歸驗證。
基準：`codex/website-next-update` 預覽分支；正式網域未變更。

## 使用者可見問題

手機網路較慢時，配置器的多個產品卡片會同時要求高解析原始產品照片。畫面先出現產品卡片與文字，產品照片延後出現，造成選型流程的視覺中斷。

## 已完成調整

1. 以原始 Comino 產品照片產生三張 640px JPEG 衍生圖；沒有使用生成式圖片或改動產品外觀。
2. 手機寬度使用衍生圖，桌面維持原始產品照片與既有品質。
3. 首屏三張伺服器卡片維持優先載入；機架式工作站、桌面工作站與整合套件改為使用者捲動到區塊時才載入。
4. 產品選擇、報價動線、導覽、語言、深淺色與 AI Agent 場景互動維持原有行為。

## 本輪驗證

| 步驟 | 驗證結果 | 證據 |
| --- | --- | --- |
| 首頁、解決方案、產品、採購資源、公司、聯絡與配置器的桌面／手機核心動線 | 通過 | `/tmp/eudtech-product-design-core-audit-20260817-v2/` 的 20 張畫面與 `audit.json` |
| 手機配置器首屏伺服器 | 通過；3 張 640×427 實際產品照片已載入 | `/tmp/eudtech-product-design-configurator-scroll-evidence-20260817/01-grando-server.png` |
| 手機機架式工作站 | 通過；捲動後 3 張 640×360 實際產品照片已載入 | `/tmp/eudtech-product-design-configurator-scroll-evidence-20260817/02-grando-rackable-workstation.png` |
| 手機桌面工作站 | 通過；捲動後 3 張 640×455 實際產品照片已載入 | `/tmp/eudtech-product-design-configurator-scroll-evidence-20260817/03-grando-desktop-workstation.png` |
| 手機整合套件 | 通過；捲動後實際產品照片已載入 | `/tmp/eudtech-product-design-configurator-scroll-evidence-20260817/04-grando-integration-kit.png` |
| AI Agent 頁籤與 FAQ、導覽、語言、深淺色、主要 CTA | 通過 | `/tmp/eudtech-product-design-local-interactions-20260817/` |
| 型別與建置 | 通過 | `npx vite build`、`eslint src/components/configurator/GrandoConfigurator.tsx`、`npm run verify:original-prompts` |

## 限制

本輪截圖與互動驗證確認可見版面、圖片載入與主要動線。螢幕閱讀器朗讀、鍵盤逐元素焦點順序與真實低頻寬網路下的 Core Web Vitals 需要獨立無障礙與效能測試，不能由截圖單獨證明。
