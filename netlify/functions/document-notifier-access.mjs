import { getStore } from '@netlify/blobs';

const STORE_NAME = 'document-notifier-access-v1';
const REQUEST_TTL_MS = 10 * 60 * 1000;
const DOWNLOAD_TTL_MS = 15 * 60 * 1000;
const DAILY_LIMIT = 3;
const REQUIRED_ENV = ['QUOTE_SENDER_EMAIL', 'GRAPH_TENANT_ID', 'GRAPH_CLIENT_ID', 'GRAPH_CLIENT_SECRET', 'DOCUMENT_NOTIFIER_ACCESS_SECRET'];

const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const getEnv = (key) => globalThis.Netlify?.env?.get?.(key) || process.env?.[key] || '';
const normalize = (value, length = 500) => typeof value === 'string' ? value.trim().slice(0, length) : '';
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value);
const allowedInstitutionEmail = (email) => /\.(gov|edu)\.tw$/i.test(email.split('@')[1] || '');
const b64url = (bytes) => Buffer.from(bytes).toString('base64url');
const randomToken = (bytes = 32) => b64url(crypto.getRandomValues(new Uint8Array(bytes)));
const safeEqual = (left, right) => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
};

async function digest(value, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return Buffer.from(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))).toString('hex');
}

function clientIp(request) {
  return normalize(request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for')?.split(',')[0], 100) || 'unavailable';
}

async function graphToken(env) {
  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(env.GRAPH_TENANT_ID)}/oauth2/v2.0/token`, {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.GRAPH_CLIENT_ID, client_secret: env.GRAPH_CLIENT_SECRET, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' })
  });
  if (!response.ok) throw new Error('Graph token request failed');
  const payload = await response.json();
  if (!payload.access_token) throw new Error('Graph token response did not include an access token');
  return payload.access_token;
}

async function sendVerificationEmail(env, { email, code, requestId }) {
  const token = await graphToken(env);
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.QUOTE_SENDER_EMAIL)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject: '公文通知系統限制存取原始碼｜電子郵件驗證碼',
        body: { contentType: 'Text', content: `您的驗證碼為：${code}\n\n驗證碼將於 10 分鐘後失效。申請編號：${requestId}\n\n此郵件只用於確認申請信箱的控制權。` },
        toRecipients: [{ emailAddress: { address: email } }]
      },
      saveToSentItems: true
    })
  });
  if (!response.ok) throw new Error('Verification email could not be sent');
}

function assessReview({ country, dailyCount, ipDailyCount }) {
  return dailyCount > DAILY_LIMIT || ipDailyCount > DAILY_LIMIT || (country && country !== 'TW');
}

async function createRequest(request, store, env, context) {
  let payload;
  try { payload = await request.json(); } catch { return json(400, { error: '申請資料不是有效 JSON。' }); }
  const applicantName = normalize(payload.applicantName, 120);
  const organization = normalize(payload.organization, 180);
  const jobTitle = normalize(payload.jobTitle, 120);
  const purpose = normalize(payload.purpose, 1000);
  const email = normalize(payload.email, 320).toLowerCase();
  if (!applicantName || !organization || !jobTitle || !purpose || !validEmail(email) || !allowedInstitutionEmail(email) || payload.termsAccepted !== true) {
    return json(400, { error: '請填寫完整資料、使用 .gov.tw 或 .edu.tw 信箱，並同意限制授權與隱私說明。' });
  }

  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const emailHash = await digest(email, env.DOCUMENT_NOTIFIER_ACCESS_SECRET);
  const ipHash = await digest(clientIp(request), env.DOCUMENT_NOTIFIER_ACCESS_SECRET);
  const emailRateKey = `rates/email/${day}/${emailHash}.json`;
  const ipRateKey = `rates/ip/${day}/${ipHash}.json`;
  const [emailRate, ipRate] = await Promise.all([store.get(emailRateKey, { type: 'json' }), store.get(ipRateKey, { type: 'json' })]);
  const dailyCount = (emailRate?.count || 0) + 1;
  const ipDailyCount = (ipRate?.count || 0) + 1;
  const country = normalize(context?.geo?.country?.code || request.headers.get('x-nf-country'), 8).toUpperCase();
  const requestId = crypto.randomUUID();
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, '0');
  const reviewRequired = assessReview({ country, dailyCount, ipDailyCount });
  const record = {
    requestId, applicantName, organization, jobTitle, purpose, email,
    emailDomain: email.split('@')[1], status: 'verification_pending', reviewRequired,
    requestedAt: new Date(now).toISOString(), verificationCodeHash: await digest(`${requestId}:${code}`, env.DOCUMENT_NOTIFIER_ACCESS_SECRET),
    verificationExpiresAt: new Date(now + REQUEST_TTL_MS).toISOString(), verificationFailures: 0,
    country: country || 'unavailable', dailyCount, ipDailyCount, version: '0.1.0'
  };
  await Promise.all([
    store.setJSON(`requests/${requestId}.json`, record),
    store.setJSON(emailRateKey, { count: dailyCount, updatedAt: new Date(now).toISOString() }),
    store.setJSON(ipRateKey, { count: ipDailyCount, updatedAt: new Date(now).toISOString() })
  ]);
  try { await sendVerificationEmail(env, { email, code, requestId }); }
  catch { return json(502, { error: '驗證碼郵件尚未送出，請稍後重新申請。' }); }
  return json(202, { ok: true, requestId, expiresInSeconds: REQUEST_TTL_MS / 1000 });
}

async function verifyRequest(request, store, env) {
  let payload;
  try { payload = await request.json(); } catch { return json(400, { error: '驗證資料不是有效 JSON。' }); }
  const requestId = normalize(payload.requestId, 80);
  const code = normalize(payload.code, 6);
  if (!/^[0-9a-f-]{36}$/i.test(requestId) || !/^\d{6}$/.test(code)) return json(400, { error: '申請編號或驗證碼格式錯誤。' });
  const key = `requests/${requestId}.json`;
  const record = await store.get(key, { type: 'json' });
  if (!record || record.status !== 'verification_pending') return json(404, { error: '找不到可驗證的申請。' });
  if (Date.parse(record.verificationExpiresAt) < Date.now()) return json(410, { error: '驗證碼已失效，請重新申請。' });
  const expected = await digest(`${requestId}:${code}`, env.DOCUMENT_NOTIFIER_ACCESS_SECRET);
  if (!safeEqual(expected, record.verificationCodeHash)) {
    const failures = (record.verificationFailures || 0) + 1;
    await store.setJSON(key, { ...record, verificationFailures: failures, reviewRequired: record.reviewRequired || failures >= 5 });
    return json(400, { error: '驗證碼錯誤。' });
  }
  const downloadToken = randomToken();
  const approved = !record.reviewRequired;
  const next = {
    ...record, status: approved ? 'approved' : 'manual_review', verifiedAt: new Date().toISOString(),
    downloadTokenHash: approved ? await digest(downloadToken, env.DOCUMENT_NOTIFIER_ACCESS_SECRET) : undefined,
    downloadExpiresAt: approved ? new Date(Date.now() + DOWNLOAD_TTL_MS).toISOString() : undefined
  };
  await store.setJSON(key, next);
  return json(200, approved
    ? { ok: true, status: 'approved', requestId, downloadUrl: `/.netlify/functions/document-notifier-access?requestId=${encodeURIComponent(requestId)}&token=${encodeURIComponent(downloadToken)}`, expiresInSeconds: DOWNLOAD_TTL_MS / 1000 }
    : { ok: true, status: 'manual_review', requestId });
}

async function download(request, store, env) {
  const url = new URL(request.url);
  const requestId = normalize(url.searchParams.get('requestId'), 80);
  const token = normalize(url.searchParams.get('token'), 200);
  if (!/^[0-9a-f-]{36}$/i.test(requestId) || !token) return json(400, { error: '下載連結格式錯誤。' });
  const key = `requests/${requestId}.json`;
  const record = await store.get(key, { type: 'json' });
  if (!record || record.status !== 'approved' || Date.parse(record.downloadExpiresAt) < Date.now() || !safeEqual(await digest(token, env.DOCUMENT_NOTIFIER_ACCESS_SECRET), record.downloadTokenHash || '')) {
    return json(410, { error: '下載連結已失效或已使用。' });
  }
  const release = await store.get(`releases/official-document-notifier-${record.version}.zip`, { type: 'arrayBuffer' });
  if (!release) return json(503, { error: '限制存取原始碼封包尚未發布。' });
  await store.setJSON(key, { ...record, status: 'downloaded', downloadedAt: new Date().toISOString(), downloadTokenHash: undefined });
  return new Response(release, { headers: { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="official-document-notifier-${record.version}.zip"`, 'Cache-Control': 'no-store' } });
}

export default async function documentNotifierAccess(request, context) {
  const env = Object.fromEntries(REQUIRED_ENV.map((key) => [key, getEnv(key)]));
  const missing = REQUIRED_ENV.filter((key) => !env[key]);
  if (missing.length) return json(503, { error: '下載服務尚未完成正式設定。' });
  const store = getStore({ name: STORE_NAME });
  if (request.method === 'GET') return download(request, store, env);
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });
  const action = new URL(request.url).searchParams.get('action');
  if (action === 'request') return createRequest(request, store, env, context);
  if (action === 'verify') return verifyRequest(request, store, env);
  return json(400, { error: '不支援的申請動作。' });
}
