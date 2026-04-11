// Google Cloud Talent Solution API 職缺上傳 Node.js 範例
// 請先安裝 google-auth-library 及 axios
// npm install google-auth-library axios

const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

// 請將此路徑改為你的服務帳戶金鑰 JSON 檔案名稱
const KEYFILE_PATH = path.join(__dirname, 'eudaidosearch-1734764995899-69a8da284a07.json');
const PROJECT_ID = 'eudaidosearch-1734764995899';
// TODO: 請將 YOUR_TENANT_ID 與 YOUR_COMPANY_ID 替換為你在 Cloud Talent Solution 建立的實際 ID
const TENANT_ID = 'YOUR_TENANT_ID';
const COMPANY_ID = 'YOUR_COMPANY_ID';
const COMPANY_NAME = `projects/${PROJECT_ID}/tenants/${TENANT_ID}/companies/${COMPANY_ID}`;

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: KEYFILE_PATH,
    scopes: ['https://www.googleapis.com/auth/jobs']
  });
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}

async function createJob() {
  const accessToken = await getAccessToken();
  const url = `https://jobs.googleapis.com/v4/projects/${PROJECT_ID}/tenants/${TENANT_ID}/jobs`;

  // 這裡填入你的職缺內容
  const job = {
    company: COMPANY_NAME,
    requisitionId: 'job-123',
    title: '軟體工程師',
    description: '負責開發與維護 Web 應用程式',
    languageCode: 'zh-TW',
    applicationInfo: {
      emails: ['hr@example.com']
    },
    jobBenefits: ['HEALTHCARE', 'PAID_TIME_OFF'],
    employmentTypes: ['FULL_TIME'],
    addresses: ['台北市信義區']
  };

  try {
    const response = await axios.post(url, job, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('職缺建立成功：', response.data);
  } catch (error) {
    console.error('建立職缺失敗：', error.response ? error.response.data : error.message);
  }
}

createJob();
