# 官網詢價事件分流

更新日期：2026-07-13

## 目的

官網 Configurator 的正式詢價信由 `frank.hsu@eudaemonia.tech` 送至 shared mailbox `info@eudaemonia.tech`，原信保留在 Inbox 或 Archive，事件服務只複製符合正式識別條件的郵件至 `Inbox/官網詢價`。

## 寄信合約

`netlify/functions/send-email.mjs` 使用現有 Entra 應用程式的 Graph app-only token：

1. 建立 `frank.hsu@eudaemonia.tech` 的 Graph draft。
2. 寫入 `info@eudaemonia.tech`、客戶 `replyTo`、UUID `Quote request ID`，以及 `x-eudtech-source: website-configurator`、`x-eudtech-quote-request-id`。
3. 送出 draft。

必要 Netlify Function environment variables：`QUOTE_SENDER_EMAIL`、`GRAPH_TENANT_ID`、`GRAPH_CLIENT_ID`、`GRAPH_CLIENT_SECRET`。機密只存 Netlify 或 Secret Manager，不進 repository。

## 事件分流與回填規則

Cloud Run worker 對 `info@/Inbox` 與 `info@/Archive` 的 Graph `created` notification 觸發 per-folder delta。它要求寄件者、收件者、主旨前綴、`Grando Configurator Quote Request` 內文、UUID 與來源標頭一致，並排除部署、Codex 和測試信。FireStore cursor 和 delivery ledger 依來源資料夾及 `internetMessageId` 去重。

歷史回填僅掃 Inbox 和 Archive，使用同一個嚴格條件，並保留原信；Deleted Items 不納入來源。

## 驗證

先執行 `npm run verify:quote-email-graph`。正式發布後，以唯一 UUID 的無客戶資料測試詢價驗證：Function HTTP 200、`info@` Inbox 原信、`Inbox/官網詢價` 副本、Graph subscription/worker log 和 Firestore ledger。驗證後永久刪除兩份測試信，並回讀資料夾筆數。
