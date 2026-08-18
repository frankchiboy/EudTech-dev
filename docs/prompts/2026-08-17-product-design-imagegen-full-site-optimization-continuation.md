# 2026-08-17 Product Design and Imagegen Full-site Optimization — continuation

原始目標：真正完成 EudTech 全站視覺最佳化：逐頁檢視並改善首頁、解決方案、產品與品牌、採購資源、公司介紹、聯絡、GPU 配置器、全部 GPU 專題頁與頁尾導覽的一致性；逐頁判斷現有幾何小圖示，將適合承擔品牌敘事或情境說明的圖示改為 Imagegen 統一風格品牌情境圖，功能操作與細節辨識圖示維持簡潔圖示；完成全站桌面、平板、手機、深淺色、雙語、互動、效能與正式預覽驗證，正式站僅在使用者確認後部署。

續作範圍：使用已選擇的第二個 Imagegen 視覺方向，將指定 home、gpu、social、procurement、delivery、consultation、careers 七張素材保留 PNG provenance 並產生 `eudtech-brand-*.webp`；擴充共用 PageHero；修正首頁及指定頁面視覺；AI Infrastructure 維持 Comino 原廠產品圖片；保留產品、Cyabra 原廠介面、操作與狀態 icon；修正 ProductDetails 載入 Cyabra product source 以支援 `/products/10` 與 `/products/11`；更新 Vite public allowlist；執行 changed-file lint、`npm run build:netlify`、`verify:original-prompts`。本續作不部署、不推送、不提交。
