import { useEffect, useRef, useState } from 'react';
import { useLanguageContext } from '../../contexts/LanguageContext';

// Check the small, uncached deployment manifest instead of downloading the
// full homepage. Five minutes is frequent enough for an update notice and
// avoids background traffic while the page is not visible.
const CHECK_INTERVAL = 5 * 60 * 1000;

export default function VersionChecker() {
  const { isEnglish } = useLanguageContext();
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentCommit = useRef<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkVersion() {
      if (document.visibilityState !== 'visible') return;
      try {
        const response = await fetch('/build-meta.json', { cache: 'no-store' });
        if (!response.ok) return;
        const metadata = await response.json() as { commit?: string; shortCommit?: string };
        const deployedCommit = metadata.commit || metadata.shortCommit || null;
        if (!deployedCommit || cancelled) return;
        if (currentCommit.current && currentCommit.current !== deployedCommit) {
            setShow(true);
        } else if (!currentCommit.current) {
          currentCommit.current = deployedCommit;
        }
      } catch {
        // A failed background check should not interrupt the current page.
      }
    }
    void checkVersion();
    timer.current = setInterval(checkVersion, CHECK_INTERVAL);
    return () => {
      cancelled = true;
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload(true);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-4">
      <span>{isEnglish ? 'A new version is available. Refresh to update.' : '有新版本可用，請重新整理頁面！'}</span>
      <button onClick={handleRefresh} className="bg-white text-yellow-700 px-3 py-1 rounded font-bold hover:bg-yellow-100 transition">
        {refreshing ? (isEnglish ? 'Refreshing…' : '重新整理中...') : (isEnglish ? 'Refresh now' : '立即更新')}
      </button>
    </div>
  );
}
