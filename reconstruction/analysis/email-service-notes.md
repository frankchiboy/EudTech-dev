# Email Service Reverse Engineering Notes

來源 chunk: `contactsection-byyyswrd.js` (prettified: `reconstruction/pretty/contactsection-byyyswrd.pretty.js`)

## 摘要

此 lazy chunk 內直接內嵌 `@emailjs/browser` (版本跡象：lib_version = 4.4.1)，並包裝成一個自訂 `EmailService` 類別（縮寫成 `class Q`）。

## 關鍵常數 (目前硬編碼)

| 名稱 | 值 | 推測用途 | 重建建議 |
|------|----|----------|----------|
| publicKey | `NQwR0JNR9LtmNzV7O` | EmailJS user/public key | 改為讀取 `import.meta.env.VITE_EMAIL_PUBLIC_KEY` |
| serviceId | `service_9bxmxjj` | EmailJS service ID | 改為 `VITE_EMAIL_SERVICE_ID` |
| templateId | `template_bhwkpw9` | EmailJS template ID | 改為 `VITE_EMAIL_TEMPLATE_ID` |
| lib_version | `4.4.1` | SDK 版本上報 | 可保留常數或自動從 package 取得 |

## 流程（sendForm）

1. lazy chunk 載入 → `new Q()` (或等價邏輯) 建立服務單例
2. `init()` 呼叫底層 `w.init(publicKey)` 完成 SDK 初始化（具備冪等保護 `isInitialized`）
3. `sendForm(formElement)`：
   - 若尚未初始化 → `await init()`
   - 呼叫 `w.sendForm(serviceId, templateId, formElement, publicKey)`
   - 驗證回傳 `status === 200`，否則 throw; 成功時 log 成功訊息
   - 捕捉例外：log 並 rethrow

## 反濫用 / 驗證邏輯

SDK 封裝包括：

- Headless / bot 檢測：`navigator.webdriver` 或缺少 `languages` → 451
- BlockList：監看特定變數 + 黑名單命中 → 403
- LimitRate：`throttle` + localStorage provider → 429
- 表單驗證：第三參數需為 FORM 或 selector，轉為 `FormData`


## 異常與錯誤類型

| HTTP-like | 類別 / 狀態 | 條件 | 意義 |
|-----------|-------------|------|------|
| 451 | `Unavailable For Headless Browser` | bot/headless 環境 | 阻擋自動化 |
| 403 | `Forbidden` | BlockList 命中 | 被封鎖 |
| 429 | `Too Many Requests` | 節流命中 | 超出速率限制 |
| 0   | `Network Error` | fetch 失敗 | 一般失敗 |

## 拆分重建建議

```ts
src/services/email/EmailService.ts
  export interface EmailConfig { publicKey: string; serviceId: string; templateId: string; }
  export class EmailService { init(); sendForm(form: HTMLFormElement): Promise<void>; }
  // 讀取環境：
  const cfg: EmailConfig = {
    publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY!,
    serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID!,
    templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID!,
  };
```

## 需補環境變數 (.env)

```dotenv
VITE_EMAIL_PUBLIC_KEY=
VITE_EMAIL_SERVICE_ID=
VITE_EMAIL_TEMPLATE_ID=
```
(部署前由 Netlify / Vercel secret 注入)

## 額外安全考量


## 待確認事項

| 項目 | 狀態 | 後續 |
|------|------|------|
| 是否有多模板需求 | 未知 | 若後續新增表單 (Career/Support) 要擴充 config |
| 是否需要附件上傳 | 未知 | 若要上傳需檢查 EmailJS 限制與安全性 |
| 現在 UI 是否提供送出成功/錯誤提示 | 待解析 Contact React 元件 | 重建時加入 toast/snackbar |

(文件將隨後續 contact component 解析更新)
