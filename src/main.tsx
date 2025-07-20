import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 添加全局錯誤處理
window.addEventListener('error', (event) => {
  console.error('Global error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise
  });
  // 防止未處理的 Promise 拒絕導致頁面崩潰
  event.preventDefault();
});

// 確保 DOM 已載入
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

console.log('Starting React app...');

// 添加版本檢查，防止快取問題
const APP_VERSION = '1.0.0';
const STORAGE_KEY = 'eudtech_app_version';

try {
  const storedVersion = localStorage.getItem(STORAGE_KEY);
  if (storedVersion !== APP_VERSION) {
    console.log('App version changed, clearing cache...');
    // 清除可能的快取
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    localStorage.setItem(STORAGE_KEY, APP_VERSION);
    // 強制重新載入一次
    if (storedVersion) {
      window.location.reload();
      return;
    }
  }
} catch (error) {
  console.warn('Version check failed:', error);
}

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Failed to render React app:', error);
  
  // 降級顯示錯誤訊息
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif;">
      <div style="text-align: center; padding: 2rem;">
        <h1 style="color: #dc2626; margin-bottom: 1rem;">應用程式載入失敗</h1>
        <p style="color: #6b7280; margin-bottom: 1rem;">請重新整理頁面或聯繫技術支援</p>
        <button onclick="window.location.reload()" style="background: #2563eb; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">
          重新載入
        </button>
      </div>
    </div>
  `;
}
