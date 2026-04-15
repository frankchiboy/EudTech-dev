// 獨立腳本：送出職缺到 Google Cloud
// 請先安裝 google-auth-library 和 axios
// npm install google-auth-library axios

import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_KEYFILE_PATH = path.join(__dirname, 'eudaidosearch-1734764995899-69a8da284a07.json');
const KEYFILE_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || DEFAULT_KEYFILE_PATH;
const PROJECT_ID = process.env.GOOGLE_JOBS_PROJECT_ID || 'eudaidosearch-1734764995899';
const TENANT_ID = process.env.GOOGLE_JOBS_TENANT_ID || '8449cf21-3152-4ffc-bda8-2f72695af68d';
const COMPANY_ID = process.env.GOOGLE_JOBS_COMPANY_ID || '218e3ccd-2278-4b3e-b1e5-864ed2806038';
// 公司資訊
const COMPANY_NAME = `projects/${PROJECT_ID}/tenants/${TENANT_ID}/companies/${COMPANY_ID}`;
const COMPANY_WEBSITE = 'https://www.eudaemonia.tech';
const COMPANY_CAREER_PAGE = 'https://www.eudaemonia.tech/careers';

const jobData = [
  {
    id: 1,
    title: '政府標案商務經理',
    description: '對政府機關與學校進行簡報、提案與標案推廣\n撰寫標案文件、管理投標流程與競爭策略\n負責中標後履約進度、業主聯繫與協調\n與銀行窗口洽談履約貸款與保證金安排\n準備並提交貸款相關文件（契約、財報、用途說明等）\n追蹤貸款核撥、撥款與履約金流狀況',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台灣（全遠端工作）'],
    responsibilities: [
      '對政府機關與學校進行簡報、提案與標案推廣',
      '撰寫標案文件、管理投標流程與競爭策略',
      '負責中標後履約進度、業主聯繫與協調',
      '與銀行窗口洽談履約貸款與保證金安排',
      '準備並提交貸款相關文件（契約、財報、用途說明等）',
      '追蹤貸款核撥、撥款與履約金流狀況'
    ],
    requirements: [
      '熟悉政府採購流程，具標案經驗',
      '有銀行貸款或授信協調經驗者佳',
      '具備提案簡報、商務談判與自主執行能力'
    ],
    workTime: '日班／一般工時（Regular time）',
  },
  {
    id: 2,
    title: '銀行授信協調經理',
    description: '與銀行建立合作關係，處理履約貸款、授信與保證金事務\n準備貸款申請所需文件（契約、財報、資金用途說明）\n與授信窗口溝通利率、還款條件、擔保安排等議題\n定期追蹤貸款進度，確保撥款與標案履約時程對齊\n探索多元融資管道，強化公司財務靈活性',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台灣（遠端工作）'],
    responsibilities: [
      '與銀行建立合作關係，處理履約貸款、授信與保證金事務',
      '準備貸款申請所需文件（契約、財報、資金用途說明）',
      '與授信窗口溝通利率、還款條件、擔保安排等議題',
      '定期追蹤貸款進度，確保撥款與標案履約時程對齊',
      '探索多元融資管道，強化公司財務靈活性'
    ],
    requirements: [
      '具銀行授信、融資申請、貸款協調實務經驗',
      '熟悉金融文件準備與貸款流程',
      '具良好溝通與談判能力，能獨立完成對外協商任務'
    ],
    workTime: '日班／一般工時',
  },
  {
    id: 3,
    title: '組織溝通經理',
    description: '作為創辦人與全體員工之間的主要溝通橋梁\n傳達公司決策、價值觀與目標，確保上下訊息一致\n彙整並回報員工意見、部門需求與潛在問題\n協助解決跨部門誤解、推進團隊共識與協作效率\n撰寫內部公告、會議摘要、組織溝通材料\n支援公司制度變動、文化活動與政策說明',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台灣（遠端工作）'],
    responsibilities: [
      '作為創辦人與全體員工之間的主要溝通橋梁',
      '傳達公司決策、價值觀與目標，確保上下訊息一致',
      '彙整並回報員工意見、部門需求與潛在問題',
      '協助解決跨部門誤解、推進團隊共識與協作效率',
      '撰寫內部公告、會議摘要、組織溝通材料',
      '支援公司制度變動、文化活動與政策說明'
    ],
    requirements: [
      '擅長跨部門溝通與協調，能快速理解並整合多方觀點',
      '具備清晰邏輯與文字表達能力，可獨立撰寫簡報與溝通稿件',
      '熟悉常用內部溝通工具（如Slack、Notion、Google Workspace）',
      '有高層幕僚、營運協調或溝通相關經驗尤佳'
    ],
    workTime: '日班／一般工時',
  },
  {
    id: 4,
    title: 'Comino 產品經理',
    description: '作為公司與 Comino 原廠之間的技術與產品窗口\n熟悉 Comino 液冷工作站 / 伺服器產品線，管理本地化資料與技術文檔\n協助企業端客戶進行需求評估、配置規劃與選型建議\n整合業務、技術與供應鏈資訊，定義導入流程與售後支援策略\n規劃產品推廣內容（如配置工具教學、教育訓練、技術簡報）\n支援報價、安規認證、物流進口、退換貨與保固流程',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台灣（全遠端工作）'],
    responsibilities: [
      '作為公司與 Comino 原廠之間的技術與產品窗口',
      '熟悉 Comino 液冷工作站 / 伺服器產品線，管理本地化資料與技術文檔',
      '協助企業端客戶進行需求評估、配置規劃與選型建議',
      '整合業務、技術與供應鏈資訊，定義導入流程與售後支援策略',
      '規劃產品推廣內容（如配置工具教學、教育訓練、技術簡報）',
      '支援報價、安規認證、物流進口、退換貨與保固流程'
    ],
    requirements: [
      '熟悉伺服器架構、GPU 應用與液冷散熱者尤佳',
      '具備硬體產品規格彙整、客戶需求訪談與技術簡報能力',
      '能跨部門協作推進銷售、交付與安裝流程',
      '英文讀寫佳，可溝通 Comino 原廠技術與商務團隊'
    ],
    workTime: '日班／一般工時',
  },
  {
    id: 5,
    title: '營運與專案助理',
    description: '協助日常營運、專案進度追蹤與跨部門溝通\n整理會議紀錄、需求文件與專案相關資料\n協助安排時程、確認交付節點與追蹤待辦事項\n處理主管交辦的行政與專案支援工作',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台北 / 遠端彈性'],
    responsibilities: [
      '協助日常營運、專案進度追蹤與跨部門溝通',
      '整理會議紀錄、需求文件與專案相關資料',
      '協助安排時程、確認交付節點與追蹤待辦事項',
      '處理主管交辦的行政與專案支援工作'
    ],
    requirements: [
      '細心、有條理，能同時處理多項任務',
      '具良好溝通能力與基本文字整理能力',
      '對專案協作、流程優化或營運支援有興趣',
      '熟悉 Excel / Google Sheets / 基本文書工具者佳'
    ],
    workTime: '全職，周一至周五，日班',
  },
  {
    id: 6,
    title: '技術專案助理',
    description: '協助技術專案的需求彙整、排程與進度追蹤\n整理技術文件、測試結果與專案交付資料\n協助工程、產品與客戶之間的溝通與確認\n支援專案上線前後的行政、測試與追蹤工作',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['frank.hsu@eudaemonia.tech'],
      uris: [COMPANY_CAREER_PAGE]
    },
    jobBenefits: ['MEDICAL', 'VACATION'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台北 / 遠端彈性'],
    responsibilities: [
      '協助技術專案的需求彙整、排程與進度追蹤',
      '整理技術文件、測試結果與專案交付資料',
      '協助工程、產品與客戶之間的溝通與確認',
      '支援專案上線前後的行政、測試與追蹤工作'
    ],
    requirements: [
      '邏輯清楚，願意學習技術相關流程與工具',
      '有良好溝通與協調能力，能追蹤細節',
      '對網站、系統、產品或專案管理有興趣',
      '具 Excel / Google Workspace / Notion 使用經驗者佳'
    ],
    workTime: '全職，周一至周五，日班',
  },
];

async function getAccessToken() {
  const authOptions = {
    scopes: ['https://www.googleapis.com/auth/jobs'],
  };

  if (fs.existsSync(KEYFILE_PATH)) {
    authOptions.keyFile = KEYFILE_PATH;
  }

  const auth = new GoogleAuth(authOptions);
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}

function buildPayload(job, companyName, existingJobName) {
  return {
    company: companyName,
    requisitionId: `job-${job.id}`,
    title: job.title,
    description: job.description,
    languageCode: job.languageCode,
    applicationInfo: job.applicationInfo,
    jobBenefits: job.jobBenefits,
    employmentTypes: job.employmentTypes,
    addresses: job.addresses,
    ...(existingJobName ? { name: existingJobName } : {}),
  };
}


// 補充：公司物件資訊（如需建立/更新公司時用）
// 若需自動建立公司，請用 Google Cloud Talent Solution 的 companies.create API，並帶入 websiteUri
// 例如：
// {
//   displayName: 'Eudaemonia Tech',
//   externalId: 'eudaemonia-tech',
//   websiteUri: 'https://www.eudaemonia.tech',
//   careerSiteUri: 'https://www.eudaemonia.tech/careers'
// }

async function updateJobsToGoogle() {
  const accessToken = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  
  // 先查詢所有現有職缺，使用正確的 filter
  const listUrl = `https://jobs.googleapis.com/v4/projects/${PROJECT_ID}/tenants/${TENANT_ID}/jobs`;
  try {
    const listResponse = await axios.get(listUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        filter: `companyName="${COMPANY_NAME}"`
      }
    });
    
    const existingJobs = listResponse.data.jobs || [];
    console.log(`找到 ${existingJobs.length} 個現有職缺`);

    let updatedCount = 0;
    let createdCount = 0;
    let failedCount = 0;

    for (const job of jobData) {
      // 根據 requisitionId 找到對應的現有職缺
      const existingJob = existingJobs.find(ej => ej.requisitionId === `job-${job.id}`);

      try {
        if (existingJob) {
          const payload = buildPayload(job, COMPANY_NAME, existingJob.name);
          const url = `https://jobs.googleapis.com/v4/${existingJob.name}`;
          const response = await axios.patch(url, payload, {
            headers,
            params: {
              updateMask: 'title,description,languageCode,applicationInfo,jobBenefits,employmentTypes,addresses'
            }
          });
          updatedCount += 1;
          console.log(`職缺 ${job.title} 更新成功：`, response.data.name);
        } else {
          const payload = buildPayload(job, COMPANY_NAME);
          const response = await axios.post(listUrl, payload, {
            headers,
          });
          createdCount += 1;
          console.log(`職缺 ${job.title} 建立成功：`, response.data.name);
        }
      } catch (error) {
        failedCount += 1;
        console.error(`職缺 ${job.title} 更新失敗：`, error.response ? error.response.data : error.message);
      }
    }

    console.log(`同步完成：更新 ${updatedCount} 筆，建立 ${createdCount} 筆，失敗 ${failedCount} 筆`);
  } catch (listError) {
    console.error('查詢職缺失敗：', listError.response ? listError.response.data : listError.message);
  }
}

updateJobsToGoogle();
