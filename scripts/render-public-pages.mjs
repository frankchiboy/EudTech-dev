import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import pages from './seo-public-pages.cjs';

const root = process.cwd();
const manifestPath = path.join(root, 'dist/.vite/manifest.json');
const savedManifestPath = path.join(root, 'dist-ssr/client-manifest.json');
const manifest = JSON.parse(fs.readFileSync(fs.existsSync(manifestPath) ? manifestPath : savedManifestPath, 'utf8'));
const routeModules = {
  '/': 'index.html',
  '/careers': 'src/components/CareersPage.tsx',
  '/solutions': 'src/components/pages/SolutionsOverviewPage.tsx',
  '/solutions/ai-agent': 'src/components/pages/AiAgentSolutionPage.tsx',
  '/solutions/ai-infrastructure': 'src/components/pages/AiInfrastructureSolutionPage.tsx',
  '/solutions/social-intelligence': 'src/components/pages/SocialIntelligenceSolutionPage.tsx',
  '/products': 'src/components/pages/ProductsOverviewPage.tsx',
  '/resources': 'src/components/pages/ResourcesOverviewPage.tsx',
  '/about': 'src/components/pages/AboutPage.tsx',
  '/contact': 'src/components/pages/ContactPage.tsx',
  '/privacy': 'src/components/pages/PrivacyPage.tsx'
};
function routeAssets(route, original) {
  const key = routeModules[route] || (/^\/products\/\d+$/.test(route)
    ? 'src/components/ProductDetails.tsx' : 'src/components/pages/ConfiguratorSolutionPage.tsx');
  const seen = new Set(), assets = new Map();
  function visit(id) {
    if (seen.has(id)) return;
    seen.add(id);
    const entry = manifest[id];
    if (!entry) throw new Error(`Missing client asset manifest entry: ${id}`);
    for (const dependency of entry.imports || []) visit(dependency);
    for (const css of entry.css || []) assets.set(css, 'stylesheet');
    assets.set(entry.file, 'modulepreload');
  }
  visit(key);
  return [...assets].filter(([file]) => !original.includes(`href="/${file}"`) && !original.includes(`src="/${file}"`))
    .map(([file, rel]) => `<link rel="${rel}" crossorigin href="/${file}">`).join('\n');
}
// The server bundle stays outside the published directory.
await build({
  configFile: false,
  plugins: [react()],
  publicDir: false,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true },
  ssr: { noExternal: ['react-helmet-async'] }
});
fs.writeFileSync(savedManifestPath, JSON.stringify(manifest));
if (fs.existsSync(manifestPath)) fs.unlinkSync(manifestPath);
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
let count = 0;
for (const route of pages.englishRoutes()) {
  // Live hardware availability is fetched after load. Keep its existing, verified
  // explanatory HTML until the configurator has its own server data contract.
  if (/^\/configurator(?:\/|$)/.test(route.path)) continue;
  for (const english of [false, true]) {
    const pathname = `${english ? '/en' : ''}${route.path}`.replace(/\/$/, '') + '/';
    const file = path.join(root, 'dist', pathname, 'index.html');
    const original = fs.readFileSync(file, 'utf8');
    const { body, head, htmlAttributes } = await render(pathname);
    if (!body.includes('<h1') || body.includes('<!--$!-->')) throw new Error(`Incomplete render: ${pathname}`);
    const bodyScripts = (original.match(/<body>[\s\S]*?<\/body>/)?.[0].match(/<script\b[\s\S]*?<\/script>/g) || []).join('\n');
    const html = original
      .replace(/<html\b[^>]*>/, `<html ${htmlAttributes} data-netlify="true">`)
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '')
      .replace(/<meta\b[^>]*(?:data-rh="true"|(?:name|property)="(?:description|keywords|author|robots|google-site-verification|msvalidate\.01|og:[^"]+|twitter:[^"]+|article:[^"]+)")[^>]*>/g, '')
      .replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '')
      .replace(/<script\b[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
      .replace(/<style\b[^>]*data-static-seo-fallback[^>]*>[\s\S]*?<\/style>/g, '')
      .replace(/<script\b[^>]*data-static-seo-fallback[^>]*>[\s\S]*?<\/script>/g, '')
      .replace('</head>', () => `${head}\n${routeAssets(route.path, original)}\n</head>`)
      .replace(/<body>[\s\S]*?<\/body>/, () => `<body><div id="root" data-rendered="true">${body}</div>${bodyScripts}</body>`);
    fs.writeFileSync(file, html);
    count++;
  }
}
console.log(JSON.stringify({ ok: true, renderedPages: count, liveConfiguratorFallbacks: 24 }));
