
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

// https://vitejs.dev/config/

// 自動複製 _redirects 到 dist 目錄
function copyRedirects() {
  return {
    name: 'copy-redirects',
    closeBundle() {
      const src = resolve(__dirname, '_redirects');
      const dest = resolve(__dirname, 'dist/_redirects');
      if (existsSync(src)) {
        try {
          copyFileSync(src, dest);
          console.log('Copied _redirects to dist/');
        } catch (e) {
          console.warn('Failed to copy _redirects:', e);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
  build: {
    rollupOptions: {
      output: {
        // 為每次建置生成唯一的檔案名稱
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    // 開發伺服器不快取
    headers: {
      'Cache-Control': 'no-store'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
