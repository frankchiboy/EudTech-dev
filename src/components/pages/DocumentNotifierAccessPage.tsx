import React, { FormEvent, useMemo, useState } from 'react';
import { BellRing, CheckCircle2, ClipboardCheck, Download, FileKey2, LockKeyhole, MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
import { PageShell } from './SitePagePrimitives';

type Step = 'apply' | 'verify' | 'approved' | 'review';
const endpoint = '/.netlify/functions/document-notifier-access';
const domainEligible = (email: string) => /@[^\s@]+\.(gov|edu)\.tw$/i.test(email.trim());

const DocumentNotifierAccessPage: React.FC = () => {
  const [step, setStep] = useState<Step>('apply');
  const [requestId, setRequestId] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const releasePlan = useMemo(() => [
    ['01', '中性化', '移除公司、客戶、真實公文、帳號、憑證、內部路徑、部署設定與操作紀錄。'],
    ['02', '完整可檢視原始碼', '提供通知、未讀清單、PDF 與資料夾開啟、本機 SQLite、去重、重試、測試資料與資料夾監看來源。'],
    ['03', '限制存取連接器', 'WebJAgent、公文交換、憑證及正式收發功能採選用連接器，預設關閉並由使用機關自行設定。'],
    ['04', '安全發布', '每版執行機密與個人資料掃描、相依套件與授權檢查、測試、SBOM、SHA-256、簽章與人工範例檢查。']
  ], []);

  const requestAccess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setNotice('');
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '');
    if (!domainEligible(email)) { setNotice('申請信箱必須是實際結尾為 .gov.tw 或 .edu.tw 的機關信箱。'); setBusy(false); return; }
    try {
      const values = Object.fromEntries(form.entries());
      const response = await fetch(`${endpoint}?action=request`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, termsAccepted: form.get('termsAccepted') === 'true' }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || '申請暫時無法完成。');
      setRequestId(payload.requestId); setStep('verify'); setNotice('驗證碼已寄至申請信箱，驗證碼有效 10 分鐘。');
    } catch (error) { setNotice(error instanceof Error ? error.message : '申請暫時無法完成。'); }
    finally { setBusy(false); }
  };
  const verifyAccess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setNotice('');
    const code = String(new FormData(event.currentTarget).get('code') || '');
    try {
      const response = await fetch(`${endpoint}?action=verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId, code }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || '驗證暫時無法完成。');
      if (payload.status === 'approved') { setDownloadUrl(payload.downloadUrl); setStep('approved'); setNotice('申請已核准。下載連結只能使用一次，且會在 15 分鐘後失效。'); }
      else { setStep('review'); setNotice('申請已完成驗證，EudTech 將依安全規則完成人工審查。'); }
    } catch (error) { setNotice(error instanceof Error ? error.message : '驗證暫時無法完成。'); }
    finally { setBusy(false); }
  };

  return <PageShell title={{ zh: '公文通知系統｜政府與教育機構限制存取原始碼', en: 'Official Document Notifier | Restricted source access' }} description={{ zh: '政府與教育機構可申請取得中性化的公文通知系統限制存取原始碼。', en: 'Government and education institutions can request restricted source access to Official Document Notifier.' }} path="/official-document-notifier">
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-32 text-white"><div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_80%_115%_at_88%_15%,rgba(34,211,238,.56)_0%,rgba(14,165,233,.30)_34%,transparent_72%),radial-gradient(circle_at_14%_88%,rgba(37,99,235,.28)_0%,transparent_48%)]" /><div className="pointer-events-none absolute right-[8%] top-[12%] h-52 w-52 rounded-full bg-cyan-300/30 blur-3xl sm:h-80 sm:w-80" /><div className="relative mx-auto max-w-7xl px-6 lg:px-8"><p className="text-sm font-semibold tracking-[.16em] text-cyan-200">政府與教育機構限制存取原始碼</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">公文完成收取後，承辦人立即看見、立即開啟。</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">Official Document Notifier 是本機優先的公文通知系統。限制存取版本提供中性化完整原始碼，供符合資格的機關內部評估、研究與部署。</p><div className="mt-10 flex flex-wrap gap-3 text-sm"><span className="rounded-full border border-cyan-200/50 bg-cyan-300/20 px-4 py-2">本機 SQLite 事件紀錄</span><span className="rounded-full border border-cyan-200/50 bg-cyan-300/20 px-4 py-2">預設不傳送公文內容</span><span className="rounded-full border border-cyan-200/50 bg-cyan-300/20 px-4 py-2">發文與簽章預設關閉</span></div></div></section>
    <main className="mx-auto max-w-7xl space-y-20 px-6 py-16 lg:px-8"><section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{[[BellRing,'收取完成通知','Mac 選單列顯示未讀件數、最近公文與處理狀態。'],[FileKey2,'直接開啟文件','從通知開啟 PDF 或保存附件的資料夾，不需重複尋找。'],[RefreshCw,'去重與安全重送','以本機事件識別碼避免重複提醒，保存失敗重試紀錄。'],[LockKeyhole,'本機優先','公文、附件與機關憑證不會上傳至 EudTech 服務。']].map(([Icon,title,body]) => <article key={String(title)} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><Icon className="h-6 w-6 text-cyan-600" /><h2 className="mt-4 text-lg font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p></article>)}</section>
      <section className="grid gap-12 lg:grid-cols-[1fr_.9fr]"><div><p className="text-sm font-semibold tracking-[.15em] text-cyan-700 dark:text-cyan-300">中性化與發布範圍</p><h2 className="mt-3 text-3xl font-bold">完整列出可交付內容與安全界線</h2><div className="mt-8 space-y-4">{releasePlan.map(([number,title,body]) => <div key={number} className="flex gap-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900"><span className="text-lg font-bold text-cyan-700 dark:text-cyan-300">{number}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{body}</p></div></div>)}</div></div><aside className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8 dark:border-cyan-900 dark:bg-cyan-950/20"><ShieldCheck className="h-8 w-8 text-cyan-700 dark:text-cyan-300"/><h2 className="mt-5 text-2xl font-bold">限制授權範圍</h2><ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-200"><li>僅限完成申請的政府或教育機構內部評估、研究與部署。</li><li>禁止公開轉傳、轉售、重新發布及移除著作權或版本資訊。</li><li>禁止使用真實憑證進行未授權測試。</li><li>下載包包含申請編號、版本、SHA-256、SBOM、授權條款與發布紀錄。</li><li>下載紀錄保留申請編號、機關、信箱、IP、版本與下載結果。</li></ul></aside></section>
      <section id="apply" className="grid gap-10 rounded-3xl bg-slate-100 p-6 dark:bg-slate-900 lg:grid-cols-[.85fr_1.15fr] lg:p-10"><div><p className="text-sm font-semibold tracking-[.15em] text-cyan-700 dark:text-cyan-300">申請限制存取原始碼</p><h2 className="mt-3 text-3xl font-bold">使用機關信箱完成驗證</h2><ol className="mt-7 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300"><li className="flex gap-3"><MailCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-600"/>填寫姓名、機關、職稱、用途與 .gov.tw／.edu.tw 信箱。</li><li className="flex gap-3"><ClipboardCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-600"/>輸入一次性驗證碼；正常申請會自動核准。</li><li className="flex gap-3"><Download className="mt-1 h-5 w-5 shrink-0 text-cyan-600"/>取得限時一次性下載連結；異常申請會進入人工審查。</li></ol></div><div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">{step === 'apply' && <form className="grid gap-4" onSubmit={requestAccess}><Field label="姓名" name="applicantName" required/><Field label="機關或學校名稱" name="organization" required/><Field label="職稱" name="jobTitle" required/><Field label="公務或教育機構信箱" name="email" type="email" placeholder="name@agency.gov.tw" required/><label className="grid gap-2 text-sm font-semibold">使用目的<textarea name="purpose" required maxLength={1000} rows={3} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal dark:border-slate-700 dark:bg-slate-900" /></label><label className="flex gap-3 text-sm leading-6"><input name="termsAccepted" value="true" type="checkbox" required className="mt-1"/>我已閱讀並同意限制授權範圍與隱私資料處理說明。</label><button disabled={busy} className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">{busy ? '正在建立申請…' : '寄送驗證碼'}</button></form>}{step === 'verify' && <form className="grid gap-4" onSubmit={verifyAccess}><CheckCircle2 className="h-8 w-8 text-cyan-600"/><h3 className="text-xl font-bold">輸入一次性驗證碼</h3><p className="text-sm leading-7 text-slate-600 dark:text-slate-300">申請編號：{requestId}</p><Field label="6 位數驗證碼" name="code" inputMode="numeric" pattern="[0-9]{6}" required/><button disabled={busy} className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50">{busy ? '正在驗證…' : '完成驗證'}</button></form>}{step === 'approved' && <div className="space-y-4"><CheckCircle2 className="h-9 w-9 text-emerald-600"/><h3 className="text-xl font-bold">申請已核准</h3><p className="text-sm leading-7 text-slate-600 dark:text-slate-300">下載連結只能使用一次，並會在 15 分鐘後失效。</p><a href={downloadUrl} className="inline-flex rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950">下載限制存取原始碼</a></div>}{step === 'review' && <div className="space-y-4"><ShieldCheck className="h-9 w-9 text-amber-600"/><h3 className="text-xl font-bold">申請已送交人工審查</h3><p className="text-sm leading-7 text-slate-600 dark:text-slate-300">EudTech 將以申請資料與安全紀錄完成審查後通知申請機關。</p></div>}{notice && <p role="status" className="mt-5 rounded-lg bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 dark:bg-cyan-950/40 dark:text-cyan-100">{notice}</p>}</div></section>
      <section className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800"><h2 className="text-2xl font-bold">正式發布前檢查</h2><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{['機密資料、金鑰與個人資料掃描','相依套件漏洞與第三方授權檢查','自動化測試與全新設備安裝驗證','SHA-256、SBOM、版本與簽章產生','Mac 程式簽署與公證','虛構範例公文及畫面人工檢查'].map((item) => <p key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-900"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600"/>{item}</p>)}</div></section>
    </main></PageShell>;
};

const Field: React.FC<{ label: string; name: string; type?: string; placeholder?: string; required?: boolean; inputMode?: 'numeric'; pattern?: string }> = ({ label, ...props }) => <label className="grid gap-2 text-sm font-semibold">{label}<input {...props} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal dark:border-slate-700 dark:bg-slate-900" /></label>;
export default DocumentNotifierAccessPage;
