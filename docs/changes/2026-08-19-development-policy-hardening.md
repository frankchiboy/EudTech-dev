# 2026-08-19 開發政策強化紀錄

## 原始指示

1. `@GitHub eudtech-dev 看一下專案知識是要怎麼做 開發政策`
2. `做`

## 解讀

依既有《開發中版本管理辦法》，「做」代表在獨立開發分支完成政策與工具修正，不代表正式發布、合併 `main` 或部署正式網域。

## 基準與分支

- Production source：`main`
- 開發分支：`codex/development-policy-hardening`
- 狀態：`預覽待確認`

## 更新範圍

- 將舊的長期 `Dev` promotion workflow 改為短期 `codex/*` Preview promotion。
- 正式 promotion 必須輸入明確發布口令、正式 Tag，並通過原始指示驗證與 production build。
- 新增 `Development Policy Check`，檢查指向 `main` 的 PR 來源分支及建置結果。
- 更新《開發中版本管理辦法》，加入專案知識讀取順序、技術強制、Preview 與 production 邊界。

## 不在範圍內

- 不修改官網產品內容或視覺。
- 不合併 `main`。
- 不建立正式版本 Tag。
- 不部署或重新指向 `eudaemonia.tech`。
- 不刪除既有 `dev`／`Dev` 歷史分支；只停止將其作為新開發與正式發布來源。

## 驗收條件

- `codex/*` push 與指向 `main` 的 PR 可執行政策檢查。
- Promotion workflow 拒絕非 `codex/*` 分支。
- Promotion workflow 拒絕缺少明確正式發布口令的執行。
- Promotion workflow 拒絕不符合 `vYYYY.MM.DD-NN` 的 Tag。
- Promotion 前必須通過 `npm run verify:original-prompts` 與 `npm run build`。
- 本次變更只存在於開發分支與 Preview／PR，不改變 production。
