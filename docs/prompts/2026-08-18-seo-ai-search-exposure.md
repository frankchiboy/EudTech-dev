# User Original Prompt — 2026-08-18 SEO 與 AI 搜尋曝光

目標：直接完成優達盟資訊科技正式網站 `https://eudaemonia.tech` 的 SEO 與 AI 搜尋曝光設定，讓 Google、Bing、ChatGPT Search 與其他主要 AI 搜尋服務能正確找到、讀取、理解及引用正式網站。

本次工作屬於正式站技術曝光設定。保持現有網站文字、圖片、版面、導覽、功能、網址及互動完全不變。所有設定直接以正式網域 `https://eudaemonia.tech` 為生效及驗證目標，不建立測試站版本。

執行要求：

1. 先查閱 Google Search Central、Microsoft Bing、IndexNow、OpenAI 官方最新文件，確認截至執行當日有效的搜尋爬蟲名稱、robots.txt 規則、結構化資料規範、網站提交方式及驗證方式。所有判斷以官方文件為準。

2. 檢查正式站目前狀態：

- `robots.txt`
- `sitemap.xml`
- `sitemap-index.xml`
- 圖片 sitemap
- RSS／JSON Feed
- canonical URL
- meta robots
- HTTP `X-Robots-Tag`
- Organization、WebSite、Service、Product、Breadcrumb、FAQ 等 JSON-LD
- 靜態 HTML 是否包含可被爬蟲直接讀取的主要文字
- CDN、WAF、Netlify Edge 或其他防護是否阻擋搜尋爬蟲
- 正式網站每個 sitemap 網址是否回傳 HTTP 200
- 社群預覽圖片是否回傳正確圖片格式

3. 正式站 `robots.txt` 應允許一般搜尋引擎及搜尋用途的 AI 爬蟲存取公開頁面。依官方最新文件明確處理：

- Googlebot
- Bingbot
- OAI-SearchBot
- ChatGPT-User
- 其他具有官方文件且確實用於搜尋或即時引用的主要 AI 爬蟲

搜尋曝光爬蟲與模型訓練爬蟲分開管理。正式網站以搜尋、引用及推薦曝光為目標。

4. 確認正式站所有公開頁面：

- 回傳 `index, follow`
- canonical 指向相同的 `https://eudaemonia.tech` 正式網址
- 網址格式一致
- sitemap、內部連結與 canonical 使用同一組正式網址
- 主要內容可在伺服器回傳的 HTML 中讀取
- JSON-LD 與頁面現有可見資訊一致
- 結構化資料不增加網站尚未公開呈現的服務、價格、案例、客戶或認證

5. 完成正式站 sitemap：

- 收錄所有應公開的正式頁面
- 移除失效網址、重複網址及錯誤網址
- 提供正確 `lastmod`
- sitemap index 正確連結一般 sitemap 與圖片 sitemap
- `robots.txt` 指向正式 sitemap
- 所有 sitemap 網址逐一驗證 HTTP 狀態、canonical 與收錄設定

6. 完成 OpenAI／ChatGPT Search 可讀性：

- 使用 OAI-SearchBot User-Agent直接讀取正式站首頁及代表性服務頁
- 確認正式站回傳 HTTP 200
- 確認正式站沒有回傳登入頁、驗證頁、CAPTCHA、403、空白頁或只有 JavaScript 外殼
- 確認正式站主要公司資訊、服務資訊與聯絡方式可由 HTML 直接取得
- 檢查 Netlify、CDN 與安全規則是否允許 OpenAI 官方公布的搜尋爬蟲流量

7. 完成 Google 搜尋提交與驗證：

- 使用 Google Search Console API
- 確認 `https://eudaemonia.tech` 網站資源所有權
- 提交 sitemap index、一般 sitemap 與圖片 sitemap
- 讀回 sitemap 提交狀態
- 使用 URL Inspection API檢查首頁及代表性服務頁
- 分別記錄「已提交」、「已擷取」、「已建立索引」三種狀態

8. 完成 Bing 與 IndexNow：

- 驗證正式站 IndexNow key
- 提交本次新增或更新的正式網址
- 讀回 HTTP 200 或 HTTP 202
- 將「IndexNow 已接收」與「搜尋引擎已建立索引」分開記錄
- 確認 sitemap 持續負責完整網址清單，IndexNow 負責變更通知

9. 修正正式站現有社群預覽圖片技術問題。逐一檢查 `/social/configurator/` 下的圖片網址。所有 `.jpg` 網址應回傳真正的 JPEG、正確 `Content-Type`、HTTP 200 與預期尺寸。優先確認先前回傳 HTML 的下列網址：

- `products.jpg`
- `resources.jpg`
- `solutions-ai-infrastructure.jpg`
- `solutions-social-intelligence.jpg`
- `about.jpg`
- `contact.jpg`
- `privacy.jpg`

10. 採事件驅動方式處理後續曝光：

- 正式內容新增、修改、刪除或重新導向時，自動觸發 sitemap 更新
- 正式內容完成部署後，自動提交 IndexNow
- 正式部署完成後，自動驗證 robots、canonical、sitemap、JSON-LD、代表性頁面與圖片
- 驗證失敗時產生明確紀錄，避免把未驗證狀態標記為完成

11. 使用既有 EudTech-dev 專案架構與部署流程。保存工作區內既有變更，所有修改限定於 SEO、AI 爬蟲、搜尋提交、結構化資料、曝光驗證及相關正式站技術設定。

12. 將本段使用者原始 Prompt 原文保存於 EudTech-dev repository 的內部 Prompt 紀錄。內部執行指示、稽核過程、權限資訊、憑證資訊及秘密資料不得出現在正式網站、公開頁面、sitemap、feed、JSON-LD 或其他對外文件。

13. 完成實作後執行完整驗證：

- 專案建置成功
- 既有頁面、文字、圖片、版面、導覽與功能保持一致
- 正式網域部署成功
- 正式網域版本資訊與部署版本一致
- robots、sitemap、canonical、JSON-LD 與圖片驗證通過
- OAI-SearchBot、Googlebot、Bingbot 代表性讀取通過
- IndexNow 提交結果已讀回
- Google Search Console sitemap 狀態已讀回
- 正式站主要頁面可由搜尋爬蟲取得完整文字

14. 最後提供白話結果，分別列出：

- 已設定完成
- 已部署正式站
- 已提交搜尋引擎
- 搜尋引擎已接收
- 搜尋引擎已建立索引
- AI 搜尋爬蟲已可讀取
- 尚需等待搜尋引擎處理的項目

直接執行到正式站完成並驗證，不只提供建議或操作步驟。
