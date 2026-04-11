import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseVersionPollOptions {
  intervalMs?: number;
  fetcher?: () => Promise<string | null>;
  suppressOnDev?: boolean;
  immediate?: boolean; // 是否在掛載後立即檢查一次（預設 false -> 延遲一個 interval）
}

export interface VersionPollState {
  currentVersion: string | null;
  latestVersion: string | null;
  hasUpdate: boolean;
  checking: boolean;
  error: string | null;
  acknowledge: () => void;
  reloadNow: () => void;
}

// 預設的版本抓取：重新抓首頁 HTML 並 parse meta
async function defaultVersionFetcher(): Promise<string | null> {
  try {
    const res = await fetch(`/?t=${Date.now()}`, { cache: 'no-store' });
    const text = await res.text();
    const match = /<meta[^>]*name=["']version["'][^>]*content=["']([^"']+)/i.exec(text);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function useVersionPoll(options: UseVersionPollOptions = {}): VersionPollState {
  const { intervalMs = 60_000, fetcher = defaultVersionFetcher, suppressOnDev = true, immediate = false } = options;

  const initial = ((): string | null => {
    if (typeof document === 'undefined') return null;
    return document.querySelector('meta[name="version"]')?.getAttribute('content') || null;
  })();

  const [currentVersion] = useState<string | null>(initial);
  const [latestVersion, setLatestVersion] = useState<string | null>(initial);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ack, setAck] = useState(false);
  const timerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const hasUpdate = !!currentVersion && !!latestVersion && currentVersion !== latestVersion && !ack;

  useEffect(() => {
    if (suppressOnDev && import.meta.env.DEV) return; // dev 模式可停用
    cancelledRef.current = false;

    async function tick() {
      setChecking(true);
      try {
        const ver = await fetcher();
        if (!cancelledRef.current && ver) {
          setLatestVersion(ver);
        }
        setError(null);
      } catch (e: any) {
        if (!cancelledRef.current) setError(e?.message || 'Version check failed');
      } finally {
        if (!cancelledRef.current) {
          setChecking(false);
          timerRef.current = window.setTimeout(tick, intervalMs);
        }
      }
    }

    // 是否立即檢查或延遲一輪
    if (immediate) {
      tick();
    } else {
      timerRef.current = window.setTimeout(tick, intervalMs);
    }

    return () => {
      cancelledRef.current = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [intervalMs, fetcher, suppressOnDev, immediate]);

  const acknowledge = useCallback(() => setAck(true), []);
  const reloadNow = useCallback(() => window.location.reload(), []);

  return { currentVersion, latestVersion, hasUpdate, checking, error, acknowledge, reloadNow };
}
