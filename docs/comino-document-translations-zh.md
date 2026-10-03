# Comino 繁體中文文件維護

翻譯版本：2026-10-04。中文網站優先連結 EudTech 繁體中文譯本，英文網站繼續連結原廠英文 PDF。中文頁另保留原廠英文來源。譯本不是原廠核發的中文版，也不是符合性聲明或測試報告。

## 原廠來源

- GRANDO Server / Rackable Workstation Datasheet v2.3，14 頁：[原廠 PDF](https://cdn.prod.website-files.com/627a9ed158f3430181d090ef/6a74300b1179991980fe39a8_datasheet_comino_grando_server.pdf)。原文 SHA-256：`9db136745881f6a197537732f0b0c665a22ff3e14397cfbeaaf6540179b0bf37`。
- GRANDO RM Quick Start Guide v2.0.2，2 頁：[原廠 PDF](https://cdn.prod.website-files.com/627a9ed158f3430181d090ef/69f34842fdbf063b82e8d27d_Grando_RM-M-CRPS_Quick_Start_Guide_EN.pdf)。原文 SHA-256：`8e4d4f0c9bb40d48acc95e66dfd0b08bd55caa1df06c039cdcad47605532c4c2`。

## 翻譯與版面原則

- 完整翻譯內文、表格、圖說、圖例與操作警示，保留 14／2 頁頁數，讓採購參考的頁碼連結與原文對應。
- 品牌、元件型號、單位、量測值、地址、網址與實際設備選單識別字保留，操作選單以中英文對照說明。產品實照與原廠軟體截圖保留實貌。
- 原廠數值及效益描述依原文翻譯。供電備援、最高值適用條件與未附測試條件的效益宣稱，另用「譯註」清楚區別補充說明。
- 頁面及每頁 PDF 標明 EudTech 繁體中文譯本、非原廠核發中文版，並以英文原文為準。原廠聯絡資訊、版權及 QR code 保留。

## 重建與驗證

翻譯與排版資料位於 `docs/comino-document-translations-zh.json`。執行 `python3 scripts/build-comino-chinese-documents.py`，需要 PyMuPDF、fontTools 及 Noto Sans CJK TC。可用 `COMINO_CJK_FONT` 指定字型檔。

產物同時寫入本機 `output/pdf/` 及網站 `public/vendor/comino/documents/`，網站建置不需要 Python 或字型。不要把本機輸出重複加入版本控制。

產生器先核對原文雜湊，再要求每個文字區塊皆明確翻譯或保留；寫出後重新讀取，逐段比對全文，避免文字遺失。規格書 230 個文字區塊、指南 53 個文字區塊皆有對應；另翻譯規格書第 7 頁圖像內的四個氣流／液流標籤。字型子集保留 CID 字形識別碼，原廠字型不重新子集化。

發布前仍須逐頁渲染並目視校對，尤其第 5、8、10、13 頁與快速指南兩頁；文字可擷取不能取代字形與版面驗證。確認原廠 URI 連結仍存在，中文及英文模式的下載、頁碼引用、進一步查證和資源中心入口均對應正確版本。執行網站建置、靜態頁檢查及部署資產檢查後，發布並從正式網域重新下載核對。
