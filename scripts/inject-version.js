// 自動將 build 版本號寫入 index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../dist/index.html');
const version = Date.now().toString();

let html = fs.readFileSync(indexPath, 'utf-8');
html = html.replace('__BUILD_VERSION__', version);
fs.writeFileSync(indexPath, html);
console.log('Injected build version:', version);
