@echo off
echo 複製並最佳化 Comino Grando Rackable Workstation 圖片

REM 建立目錄
mkdir "c:\Users\Frank\EudTech\public\grando-rackable"

REM 複製主要圖片（需先手動下載高品質圖片）
echo 請將以下圖片從雲端硬碟下載並優化後放入 public\grando-rackable 目錄:
echo 1. 主圖 (main.jpg): G:\共用雲端硬碟\EudTech共用硬碟\Comino共用硬碟\EudTech官網網站內容資料\Comino Grando Rackable Workstation\2023.02 GRANDO RACKABLE WORKSTATION RM-M-CRPS (TR PRO + 6x4090)\GRANDO DPR 4090-FT_6_45.jpg
echo 2. 正面 (front.jpg): G:\共用雲端硬碟\EudTech共用硬碟\Comino共用硬碟\EudTech官網網站內容資料\Comino Grando Rackable Workstation\2023.02 GRANDO RACKABLE WORKSTATION RM-M-CRPS (TR PRO + 6x4090)\GRANDO DPR 4090-FT_6_01.jpg
echo 3. 側面 (side.jpg): G:\共用雲端硬碟\EudTech共用硬碟\Comino共用硬碟\EudTech官網網站內容資料\Comino Grando Rackable Workstation\2023.02 GRANDO RACKABLE WORKSTATION RM-M-CRPS (TR PRO + 6x4090)\GRANDO DPR 4090-FT_6_18.jpg
echo 4. 背面 (back.jpg): G:\共用雲端硬碟\EudTech共用硬碟\Comino共用硬碟\EudTech官網網站內容資料\Comino Grando Rackable Workstation\2023.02 GRANDO RACKABLE WORKSTATION RM-M-CRPS (TR PRO + 6x4090)\GRANDO DPR 4090-FT_6_42.jpg

REM 暫時複製現有圖片
echo 暫時複製現有圖片作為替代...
if exist "c:\Users\Frank\EudTech\public\comino-grando-rackable\main.jpg" (
  copy "c:\Users\Frank\EudTech\public\comino-grando-rackable\main.jpg" "c:\Users\Frank\EudTech\public\grando-rackable\main.jpg"
)
if exist "c:\Users\Frank\EudTech\public\comino-grando-rackable\front.jpg" (
  copy "c:\Users\Frank\EudTech\public\comino-grando-rackable\front.jpg" "c:\Users\Frank\EudTech\public\grando-rackable\front.jpg"
)
if exist "c:\Users\Frank\EudTech\public\comino-grando-rackable\side.jpg" (
  copy "c:\Users\Frank\EudTech\public\comino-grando-rackable\side.jpg" "c:\Users\Frank\EudTech\public\grando-rackable\side.jpg"
)

echo 操作完成
echo 圖片優化建議:
echo 1. 使用 Adobe Photoshop 或線上工具如 TinyPNG 壓縮圖片
echo 2. 主圖建議寬度保持在 1200-1600px 之間
echo 3. 儲存為漸進式 JPG 以提高網頁載入速度
echo 4. 保持圖片檔案大小在 200-300KB 以下
echo 5. 確保所有圖片使用相同的寬高比
