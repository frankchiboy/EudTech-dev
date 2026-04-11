# Image Preloader (Pseudo-code)

## 目標

提升首屏與互動後圖片載入體驗：

- 事前（非阻塞）預載關鍵資產（英雄區 / 品牌 / 產品卡圖）
- Idle 時批次預載剩餘圖片
- 提供 ProgressiveImage skeleton / 淡入效果

## 合約 (Contracts)

### Utility: preloadImages

```ts
function preloadImages(urls: string[], opts?: { concurrency?: number; timeoutMs?: number; signal?: AbortSignal }): Promise<{ ok: string[]; failed: string[] }>;
```

Behavior:

- 以 concurrency (預設 4~6) 控制同時建立 `Image()` 載入
- 個別 onload / onerror 收集結果；若 timeout 觸發則視為失敗

### Utility: scanDomImages

```ts
function scanDomImages(root: ParentNode = document): string[]; // 收集 <img src> 去重
```

### Hook / Manager: useImagePreloadManager

```ts
interface UseImagePreloadManagerOptions {
  eager: string[];        // 立即（微任務後）預載
  idle?: string[];        // requestIdleCallback 或 setTimeout 延遲
  scanDomAfterMs?: number;// 例如 500ms 再掃描 DOM 追加
  concurrency?: number;
  onProgress?: (p: { loaded: number; total: number }) => void;
}

interface ImagePreloadManagerState {
  phase: 'idle' | 'eager' | 'idle-preload' | 'dom-scan' | 'done';
  loaded: number;
  total: number;
  failures: string[];
}

function useImagePreloadManager(opts: UseImagePreloadManagerOptions): ImagePreloadManagerState;
```

## Pseudo-code

```ts
function preloadImages(urls: string[], { concurrency = 4, timeoutMs = 15000, signal }: { concurrency?: number; timeoutMs?: number; signal?: AbortSignal } = {}) {
  const unique = Array.from(new Set(urls));
  const ok: string[] = []; const failed: string[] = [];
  let active = 0; let idx = 0;

  return new Promise<{ ok: string[]; failed: string[] }>((resolve, reject) => {
    if (signal?.aborted) return resolve({ ok, failed: unique });
    const controller = new AbortController();
    signal?.addEventListener('abort', () => { controller.abort(); resolve({ ok, failed: unique.filter(u => !ok.includes(u))); });

    function next() {
      if (idx >= unique.length && active === 0) return resolve({ ok, failed });
      while (active < concurrency && idx < unique.length) load(unique[idx++]);
    }

    function load(src: string) {
      active++;
      const img = new Image();
      let done = false;
      const timer = setTimeout(() => finish(false), timeoutMs);

      function finish(success: boolean) {
        if (done) return; done = true; clearTimeout(timer);
        if (success) ok.push(src); else failed.push(src);
        active--; next();
      }

      img.onload = () => finish(true);
      img.onerror = () => finish(false);
      img.src = src; // 觸發載入
    }

    next();
  });
}
```

```ts
function useImagePreloadManager(opts: UseImagePreloadManagerOptions): ImagePreloadManagerState {
  const { eager, idle = [], scanDomAfterMs = 500, concurrency = 4, onProgress } = opts;
  const [state, setState] = useState<ImagePreloadManagerState>({ phase: 'idle', loaded: 0, total: eager.length + idle.length, failures: [] });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current = new AbortController();
    let cancelled = false;

    async function run() {
      setState(s => ({ ...s, phase: 'eager' }));
      const eagerRes = await preloadImages(eager, { concurrency, signal: abortRef.current!.signal });
      updateProgress(eagerRes);

      // Idle 階段
      setState(s => ({ ...s, phase: 'idle-preload' }));
      await runIdle(() => preloadImages(idle, { concurrency, signal: abortRef.current!.signal }).then(updateProgress));

      // DOM scan 追加
      setState(s => ({ ...s, phase: 'dom-scan' }));
      await delay(scanDomAfterMs);
      const domUrls = scanDomImages(document).filter(u => !eager.includes(u) && !idle.includes(u));
      if (domUrls.length) {
        const domRes = await preloadImages(domUrls, { concurrency, signal: abortRef.current!.signal });
        updateProgress(domRes);
      }

      if (!cancelled) setState(s => ({ ...s, phase: 'done' }));
    }

    function updateProgress(res: { ok: string[]; failed: string[] }) {
      setState(s => ({
        ...s,
        loaded: s.loaded + res.ok.length + res.failed.length, // 失敗也計入完成
        failures: [...s.failures, ...res.failed]
      }));
    }

    run();
    return () => { cancelled = true; abortRef.current?.abort(); };
  }, [eager.join(','), idle.join(','), scanDomAfterMs, concurrency]);

  useEffect(() => { onProgress?.({ loaded: state.loaded, total: state.total }); }, [state.loaded, state.total]);

  return state;
}
```

## ProgressiveImage 行為建議

- 初始：低透明度 / 模糊背景 placeholder (Tailwind `animate-pulse`)
- onload：淡入 + 移除模糊 (加 `transition-opacity duration-500`)
- onerror：顯示 fallback SVG icon / 背景顏色

## Edge Cases / 風險

- 大量圖片（>200）：Idle 階段應加上分批分段 (chunked) 策略
- 低速網路：timeout 應延長或改為動態（RTT 估計）
- 失敗重試：可針對失敗清單在下一個 requestIdleCallback 追加一次嘗試
- DOM 變動：若使用 infinite scroll，後續可暴露 `enqueue(url)` API

## 後續強化

- IntersectionObserver 與預載策略結合（接近 viewport 才預載）
- Service Worker cache warm-up
- 使用 `<link rel="preload" as="image">` 注入 head（需避免過量）
- 利用 LQIP / BlurHash 提供 placeholder 資料
