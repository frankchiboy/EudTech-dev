import { useEffect, useRef, useState } from 'react';

// 這個組件會定期檢查 index.html 是否有更新
// 若有新版，會自動顯示提示並可自動刷新
const CHECK_INTERVAL = 60 * 1000; // 每 60 秒檢查一次

export default function VersionChecker() {
  const [show, setShow] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const currentHash = (document.querySelector('meta[name="version"]') as HTMLMetaElement)?.content;
    function checkVersion() {
      fetch(`/?t=${Date.now()}`, { cache: 'no-store' })
        .then(res => res.text())
        .then(html => {
          const match = html.match(/<meta name=\"version\" content=\"(.*?)\"/);
          if (match && match[1] && match[1] !== currentHash) {
            setShow(true);
          }
        });
    }
    timer.current = setInterval(checkVersion, CHECK_INTERVAL);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload(true);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-4">
      <span>有新版本可用，請重新整理頁面！</span>
      <button onClick={handleRefresh} className="bg-white text-yellow-700 px-3 py-1 rounded font-bold hover:bg-yellow-100 transition">
        {refreshing ? '重新整理中...' : '立即更新'}
      </button>
    </div>
  );
}
