import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, renameSync, readdirSync } from 'fs';

// https://vitejs.dev/config/

function formatTaipeiDate(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

process.env.VITE_BUILD_DATE = process.env.VITE_BUILD_DATE || formatTaipeiDate(new Date());

// 自動複製 _redirects 和 _headers 到 dist 目錄，並重命名 template 檔案
function copyDeployFiles() {
  return {
    name: 'copy-deploy-files',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const publicDir = resolve(__dirname, 'public');
      
      // 確保 dist 目錄存在
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      
      // 重命名 index.template.html 為 index.html
      const templateSrc = resolve(distDir, 'index.template.html');
      const indexDest = resolve(distDir, 'index.html');
      if (existsSync(templateSrc)) {
        try {
          renameSync(templateSrc, indexDest);
          console.log('✓ Renamed index.template.html to index.html');
        } catch (e) {
          console.warn('⚠ Failed to rename template file:', e);
        }
      }
      
      // 複製 _redirects
      const redirectsSrc = resolve(__dirname, '_redirects');
      const redirectsDest = resolve(distDir, '_redirects');
      if (existsSync(redirectsSrc)) {
        try {
          copyFileSync(redirectsSrc, redirectsDest);
          console.log('✓ Copied _redirects to dist/');
        } catch (e) {
          console.warn('⚠ Failed to copy _redirects:', e);
        }
      } else {
        console.warn('⚠ _redirects file not found at:', redirectsSrc);
      }
      
      // 複製 _headers
      const headersSrc = resolve(__dirname, '_headers');
      const headersDest = resolve(distDir, '_headers');
      if (existsSync(headersSrc)) {
        try {
          copyFileSync(headersSrc, headersDest);
          console.log('✓ Copied _headers to dist/');
        } catch (e) {
          console.warn('⚠ Failed to copy _headers:', e);
        }
      }
      
      // 複製 public 目錄中的所有檔案 (排除目錄和特殊檔案)
      if (existsSync(publicDir)) {
        try {
          const files = readdirSync(publicDir, { withFileTypes: true });
          for (const file of files) {
            // 只複製檔案，跳過目錄和特殊檔案
            if (file.isFile() && !file.name.startsWith('.')) {
              const srcPath = resolve(publicDir, file.name);
              const destPath = resolve(distDir, file.name);
              // 避免覆蓋已存在的檔案
              if (!existsSync(destPath)) {
                try {
                  copyFileSync(srcPath, destPath);
                  console.log(`✓ Copied ${file.name} to dist/`);
                } catch {
                  // 跳過無法複製的檔案
                }
              }
            }
          }
        } catch (e) {
          console.warn('⚠ Failed to copy some public files:', e);
        }
      }
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), copyDeployFiles()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // 啟用 HMR 但使用預設配置，避免頻繁重新載入
    hmr: {
      overlay: true,
    },
    // 監視檔案變更但不使用輪詢以避免頻繁重新載入
    watch: {
      usePolling: false,
    },
    // 禁用快取
    fs: {
      strict: false,
      allow: ['.'],
    },
    // 發送不快取的響應標頭
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
