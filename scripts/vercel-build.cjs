// Vercel專用的構建腳本
const fs = require('fs');
const path = require('path');

// 檢查是否在 Vercel 環境中
if (process.env.VERCEL) {
  console.log('Running in Vercel environment, applying platform-specific settings...');
  
  // 複製 _redirects 和 _headers 到 dist 目錄
  try {
    const redirectsPath = path.resolve(__dirname, '_redirects');
    const headersPath = path.resolve(__dirname, '_headers');
    const distDir = path.resolve(__dirname, 'dist');
    
    // 確保 dist 目錄存在
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    if (fs.existsSync(redirectsPath)) {
      fs.copyFileSync(redirectsPath, path.resolve(distDir, '_redirects'));
      console.log('✓ Copied _redirects to dist/');
    }
    
    if (fs.existsSync(headersPath)) {
      fs.copyFileSync(headersPath, path.resolve(distDir, '_headers'));
      console.log('✓ Copied _headers to dist/');
    }
    
    // 檢查是否存在 index.template.html
    const templatePath = path.resolve(distDir, 'index.template.html');
    const indexPath = path.resolve(distDir, 'index.html');
    
    if (fs.existsSync(templatePath) && !fs.existsSync(indexPath)) {
      fs.copyFileSync(templatePath, indexPath);
      console.log('✓ Copied index.template.html to index.html');
    }
  } catch (error) {
    console.error('Error during Vercel deployment setup:', error);
  }
}

// 將版本號注入到 index.html
const version = Date.now().toString();
const indexPath = path.resolve(__dirname, 'dist/index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');
  html = html.replace('__BUILD_VERSION__', version);
  fs.writeFileSync(indexPath, html);
  console.log('Injected build version:', version);
}