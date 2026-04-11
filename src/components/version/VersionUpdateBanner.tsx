import React from 'react';
import { useVersionPoll } from '../../hooks/useVersionPoll';

export interface VersionUpdateBannerProps {
  intervalMs?: number;
  className?: string;
  immediate?: boolean;
}

/**
 * 版本更新提示橫幅：偵測到新版時顯示 Reload / 稍後按鈕。
 * 可後續接入 i18n。
 */
export const VersionUpdateBanner: React.FC<VersionUpdateBannerProps> = ({ intervalMs, className = '', immediate }) => {
  const { hasUpdate, latestVersion, reloadNow, acknowledge } = useVersionPoll({ intervalMs, immediate });

  if (!hasUpdate) return null;

  return (
    <div
      className={
        'fixed bottom-4 right-4 z-50 max-w-sm rounded-lg shadow-lg px-4 py-3 text-sm bg-blue-600 text-white flex flex-col gap-2 animate-fade-in ' +
        className
      }
      role="status"
      aria-live="polite"
    >
      <div className="font-medium">有新版本可用</div>
      {latestVersion && (
        <div className="text-white/80 text-xs">版本: {latestVersion}</div>
      )}
      <div className="flex gap-2 mt-1">
        <button
          onClick={reloadNow}
          className="bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors px-3 py-1 rounded text-xs font-medium"
        >
          重新載入
        </button>
        <button
          onClick={acknowledge}
          className="text-white/70 hover:text-white transition-colors px-3 py-1 rounded text-xs font-medium"
        >
          稍後
        </button>
      </div>
    </div>
  );
};

export default VersionUpdateBanner;
