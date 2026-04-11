# Version Poller / Update Banner (Pseudo-code)

## 目標

監控部署版本是否更新，若偵測差異，提示使用者重新載入以取得新版本資源。

## 合約 (Contract)

- Input: `pollIntervalMs: number` (預設 60_000)、`getVersion: () => Promise<string | null>`
- State: `currentVersion`, `latestVersion`, `hasUpdate` (boolean)
- Output UI: Banner / Toast (含「Reload」按鈕 + 關閉/忽略暫時隱藏機制)
- Side Effects: 週期性 fetch 首頁 (或版本 endpoint)；視情況改為 HEAD / JSON metadata

## 可能的實作 API

```ts
interface UseVersionPollOptions {
  intervalMs?: number;
  fetcher?: () => Promise<string | null>; // 可注入以利測試
  suppressOnDev?: boolean; // dev 模式是否停用
}

interface VersionPollState {
  currentVersion: string | null;
  latestVersion: string | null;
  hasUpdate: boolean; // latestVersion 與 currentVersion 不同
  checking: boolean;  // 是否正在發出請求
  error: string | null;
  acknowledge: () => void; // 使用者已看到提示 (可先不 reload)
  reloadNow: () => void;  // 立即重新整理頁面
}

function useVersionPoll(opts?: UseVersionPollOptions): VersionPollState
```

## Pseudo-code

```ts
function defaultVersionFetcher(): Promise<string | null> {
  // 建議：版本寫在 <meta name="version" content="..."> 或 /meta.json
  return fetch(`/?t=${Date.now()}`, { cache: 'no-store' })
    .then(r => r.text())
    .then(html => {
      const m = /<meta[^>]*name=["']version["'][^>]*content=["']([^"']+)/i.exec(html);
      return m ? m[1] : null;
    })
    .catch(() => null);
}

function useVersionPoll({ intervalMs = 60_000, fetcher = defaultVersionFetcher, suppressOnDev = true }: UseVersionPollOptions = {}): VersionPollState {
  const [currentVersion] = useState<string | null>(() => {
    // 初始版本：從現有 DOM meta 讀取
    const el = document.querySelector('meta[name="version"]');
    return el?.getAttribute('content') || null;
  });
  const [latestVersion, setLatestVersion] = useState<string | null>(currentVersion);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ack, setAck] = useState(false); // 使用者已知曉但尚未 reload

  const hasUpdate = !!currentVersion && !!latestVersion && currentVersion !== latestVersion && !ack;

  useEffect(() => {
    if (suppressOnDev && import.meta.env.DEV) return; // 開發模式略過
    let cancelled = false;
    let timer: number | null = null;

    async function tick() {
      setChecking(true);
      try {
        const v = await fetcher();
        if (!cancelled && v) setLatestVersion(v);
        setError(null);
      } catch (e: any) {
        !cancelled && setError(e?.message || 'Version check failed');
      } finally {
        !cancelled && setChecking(false);
        if (!cancelled) timer = window.setTimeout(tick, intervalMs);
      }
    }

    timer = window.setTimeout(tick, intervalMs); // 延遲首輪避免首屏競爭
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [intervalMs, fetcher, suppressOnDev]);

  const acknowledge = useCallback(() => setAck(true), []);
  const reloadNow = useCallback(() => window.location.reload(), []);

  return { currentVersion, latestVersion, hasUpdate, checking, error, acknowledge, reloadNow };
}
```

## Update Banner UI 草稿

```tsx
function VersionUpdateBanner() {
  const { hasUpdate, latestVersion, reloadNow, acknowledge } = useVersionPoll();
  if (!hasUpdate) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 animate-fade-in">
      <span>新版本 {latestVersion} 已可使用</span>
      <button onClick={reloadNow} className="bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm">重載</button>
      <button onClick={acknowledge} className="text-white/70 hover:text-white text-sm">稍後</button>
    </div>
  );
}
```

## Edge Cases / 風險

- 無 meta/version：fetcher 回傳 null → `hasUpdate` 永遠 false；可加 fallback 日誌。
- 頻繁部署：使用者可能長時間停留；可加入對話框詢問是否自動更新。
- 緩存污染：確保 `cache: 'no-store'` 或附加 `Date.now()` query。
- 失敗重試：現在策略 = 下一輪間隔；可對錯誤加速回退 (exponential backoff)。

## 後續強化

- ETag / Last-Modified 對比 → 減少下載體積。
- 專用版本 endpoint: `/version.json` 返回 `{ version, buildTime }`。
- BroadcastChannel 協調多分頁只提示一次。
- Service Worker integration：由 SW 發出 message 通知。
