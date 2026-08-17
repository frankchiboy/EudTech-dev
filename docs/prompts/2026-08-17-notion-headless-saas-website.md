# 原始需求與釐清｜Headless SaaS 官網服務概念

- 日期：2026-08-17
- 開發分支：`codex/website-next-update`
- 正式站發布：未授權；本次僅建立預覽版本。

## 使用者原始 Prompt

> @notion 結合 headless saas的服務概念在公司網站中

## 使用者後續釐清

> 跟notion無關 我是要你看notion的內容你看了嗎 先討論

> 修正

## 正確實作解讀

Notion 只是讀取 EudTech 公司知識的來源，不是官網對外銷售的服務主角。

官網服務定位為企業 Headless SaaS 與 AI Agent 導入：串接客戶既有 ERP、CRM、Microsoft 365、資料庫與 API，建立品牌化網站／客戶 Portal、事件驅動流程、受控 AI Agent、權限、人工核准、稽核與後續產品化服務。網站不得把尚未驗證的多租戶能力宣稱為已完成產品。

## 使用者合併指示

> 這兩個是同一件事情

使用者指出官網同時列出「AI Agent 導入」與「企業 Headless SaaS」造成重複。網站資訊架構必須將兩者合併為同一項「AI Agent 與 Headless SaaS 導入」服務；既有 `/solutions/headless-saas` 只保留相容導向，唯一主頁為 `/solutions/ai-agent`。
