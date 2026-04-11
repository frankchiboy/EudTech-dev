// Express API：前端可呼叫這個 API 來上傳職缺
// 需先安裝 express、google-auth-library、axios
// npm install express google-auth-library axios

const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());

const KEYFILE_PATH = path.join(__dirname, 'eudaidosearch-1734764995899-69a8da284a07.json');
const PROJECT_ID = 'eudaidosearch-1734764995899';
const TENANT_ID = 'YOUR_TENANT_ID'; // TODO: 改成你的實際 tenant id
const COMPANY_ID = 'YOUR_COMPANY_ID'; // TODO: 改成你的實際 company id
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

app.post('/api/jobs', async (req, res) => {
  const accessToken = await getAccessToken();
  const url = `https://jobs.googleapis.com/v4/projects/${PROJECT_ID}/tenants/${TENANT_ID}/jobs`;

  // 前端送來的職缺內容
  const job = {
    ...req.body,
    company: COMPANY_NAME
  };

  try {
    const response = await axios.post(url, job, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response ? error.response.data : error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Job API server running on port ${PORT}`);
});
