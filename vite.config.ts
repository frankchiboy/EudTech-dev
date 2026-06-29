import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, cpSync, existsSync, mkdirSync, renameSync, statSync } from 'fs';

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

const PUBLIC_FILE_ALLOWLIST = [
  'robots.txt',
  'sitemap.xml',
  'sitemap-index.xml',
  'image-sitemap.xml',
  'feed.xml',
  'configurator-links.html',
  'llms.txt',
  'llms-full.txt',
  'd6fd206f713cd936d87b58a6010aa751.txt',
  'sw.js',
  'logo.svg',
  'icon.svg',
  'amd-logo.png',
  'amd-partner-badge.jpg',
  'comino-4xa100.jpg',
  'comino-facility-1.jpg',
  'comino-facility-2.jpg',
  'comino-facility-3.jpg',
  'comino-grando-logo.png',
  'comino-h100-server.jpg',
  'comino-logo.png',
  'comino-workstation-front.png',
  'cyabra-dashboard.jpg',
  'cyabra-dashboard.svg',
  'cyabra-logo.svg',
  'EudTech-Select-server-front.png',
  'EudTech-Select-server-back.png',
  'EudTech-Select-server-inside.png',
  'grando-8gpu-server.jpg',
  'grando-desktop-01.jpg',
  'grando-rackable-01.jpg',
  'grando-rackable-02.jpg',
  'grando-rackable-03.jpg',
  'grando-rackable-04.jpg',
  'grando-rackable-05.jpg',
  'grando-rackable-06.jpg',
  'GRANDO DPR 4090-FT_6_01.jpg',
  'GRANDO DPR 4090-FT_6_02.jpg',
  'GRANDO DPR 4090-FT_6_03.jpg',
  'GRANDO DPR 4090-FT_6_04.jpg',
  'GRANDO DPR 4090-FT_6_05.jpg',
  'GRANDO DPR 4090-FT_6_06.jpg',
  'GRANDO WS TRP_4xA100_01.jpg',
  'GRANDO WS TRP_4xA100_02.jpg',
  'GRANDO WS TRP_4xA100_03.jpg',
  'GRANDO WS TRP_4xA100_04.jpg',
  'GRANDO WS TRP_4xA100_05.jpg',
  'GRANDO WS TRP_4xA100_06.jpg',
  'GRANDO WS TRP_4xA100_07.jpg',
  'GRANDO WS TRP_4xA100_08.jpg',
  'GRANDO WS TRP_4xA100_09.jpg',
  'GRANDO WS TRP_4xA100_10.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_01.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_02.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_03.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_04.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_05.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_06.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_07.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_08.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_09.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_10.jpg',
  'GRANDO_RM-M-CRPS_9004_8xGPU_21.jpg',
  'keras-logo.png',
  'linus-review.jpg',
  'nvidia-logo.png',
  'pytorch-logo.png',
  'sentdex-review.jpg',
  'tensorflow-logo.png'
];

const PUBLIC_DIRECTORY_ALLOWLIST = [
  'cyabra-images',
  'images/configurator/devices',
  'social'
];

function copyPublicAsset(publicDir: string, distDir: string, relativePath: string) {
  const normalizedPath = relativePath.replace(/^\/+/, '');
  const srcPath = resolve(publicDir, normalizedPath);
  const destPath = resolve(distDir, normalizedPath);

  if (!existsSync(srcPath)) {
    console.warn(`⚠ Skipped missing public asset: ${normalizedPath}`);
    return false;
  }

  mkdirSync(resolve(destPath, '..'), { recursive: true });

  const stat = statSync(srcPath);
  if (stat.isDirectory()) {
    cpSync(srcPath, destPath, { recursive: true });
  } else {
    copyFileSync(srcPath, destPath);
  }

  return true;
}

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
      
      // 僅複製 production 實際需要的 public 資產，避免把素材庫完整送到正式站。
      if (existsSync(publicDir)) {
        const copiedFiles = PUBLIC_FILE_ALLOWLIST.filter((assetPath) => copyPublicAsset(publicDir, distDir, assetPath)).length;
        const copiedDirectories = PUBLIC_DIRECTORY_ALLOWLIST.filter((assetPath) => copyPublicAsset(publicDir, distDir, assetPath)).length;
        console.log(`✓ Copied ${copiedFiles} public files and ${copiedDirectories} public directories to dist/`);
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
    copyPublicDir: false,
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
