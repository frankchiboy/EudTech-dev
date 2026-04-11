export interface PreloadResult {
  ok: string[];
  failed: string[];
}

export interface PreloadOptions {
  concurrency?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
  onProgress?: (info: { loaded: number; total: number; current?: string }) => void;
}

/**
 * 批次預載圖片（不插入 DOM），支援並行限制與逾時。
 */
export function preloadImages(urls: string[], opts: PreloadOptions = {}): Promise<PreloadResult> {
  const { concurrency = 4, timeoutMs = 15000, signal, onProgress } = opts;
  const unique = Array.from(new Set(urls.filter(Boolean)));
  const ok: string[] = [];
  const failed: string[] = [];
  let active = 0;
  let index = 0;
  let loaded = 0;

  return new Promise<PreloadResult>((resolve) => {
    if (!unique.length) return resolve({ ok, failed });
    if (signal?.aborted) return resolve({ ok, failed: unique });

    signal?.addEventListener('abort', () => {
      // 不再啟動新載入；完成中的允許結束
      index = unique.length; // 阻止新任務
    });

    function next() {
      if (index >= unique.length && active === 0) {
        return resolve({ ok, failed });
      }
      while (active < concurrency && index < unique.length) {
        const src = unique[index++];
        loadOne(src);
      }
    }

    function loadOne(src: string) {
      active++;
      let done = false;
      const img = new Image();
      const timer = window.setTimeout(() => finish(false), timeoutMs);

      function finish(success: boolean) {
        if (done) return;
        done = true;
        window.clearTimeout(timer);
        if (success) ok.push(src); else failed.push(src);
        active--;
        loaded++;
        onProgress?.({ loaded, total: unique.length, current: src });
        next();
      }

      img.onload = () => finish(true);
      img.onerror = () => finish(false);
      img.src = src;
    }

    next();
  });
}

/**
 * 掃描當前 DOM 取得所有 <img> 的 src（去重）。
 */
export function scanDomImages(root: ParentNode = document): string[] {
  return Array.from(root.querySelectorAll('img'))
    .map((n) => (n as HTMLImageElement).currentSrc || (n as HTMLImageElement).src)
    .filter(Boolean);
}
