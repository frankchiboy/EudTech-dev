const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_MAX_BYTES,
  getConfiguratorSocialPreviewRoutes
} = require('./configurator-social-preview-routes.cjs');

const checkOnly = process.argv.includes('--check');
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const accentColors = ['#00c878', '#22d3ee', '#f59e0b', '#a855f7', '#ef4444', '#38bdf8'];

function publicPath(assetPath) {
  const pathname = assetPath.startsWith('http://') || assetPath.startsWith('https://') ? new URL(assetPath).pathname : assetPath;
  return path.join(publicDir, decodeURIComponent(pathname.replace(/^\//, '')));
}

async function readImageInfo(filename) {
  const metadata = await sharp(filename).metadata();
  const { size } = fs.statSync(filename);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size,
    hash
  };
}

function assertSocialImage(route, info) {
  if (info.width !== SOCIAL_IMAGE_WIDTH || info.height !== SOCIAL_IMAGE_HEIGHT) {
    throw new Error(`${route.socialImage} is ${info.width}x${info.height}, expected ${SOCIAL_IMAGE_WIDTH}x${SOCIAL_IMAGE_HEIGHT}.`);
  }

  if (info.size >= SOCIAL_IMAGE_MAX_BYTES) {
    throw new Error(`${route.socialImage} is ${info.size} bytes, expected below ${SOCIAL_IMAGE_MAX_BYTES}.`);
  }

  if (info.format !== 'jpeg') {
    throw new Error(`${route.socialImage} is ${info.format}, expected jpeg.`);
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizePreviewText(value, fallback, minUsefulChars = 8) {
  const ascii = String(value || '')
    .normalize('NFKD')
    .replace(/[^\x20-\x7e]+/g, ' ')
    .replace(/[<>]/g, ' ')
    .replace(/\s+([,.:/])/g, '$1')
    .replace(/([,.:/])(?=\S)/g, '$1 ')
    .replace(/(?:^|\s)[,.:]+(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const usefulChars = ascii.replace(/[^a-zA-Z0-9]/g, '').length;
  return usefulChars >= minUsefulChars ? ascii : fallback;
}

function wrapText(value, maxChars, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }

    current = word.length > maxChars ? word.slice(0, maxChars - 1) : word;

    if (lines.length === maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length === 0) {
    lines.push(value.slice(0, maxChars));
  }

  return lines.slice(0, maxLines);
}

function routeSlug(routePath) {
  if (routePath === '/') {
    return 'HOME';
  }

  return routePath
    .replace(/^\/|\/$/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' / ')
    .replace(/\s+\/\s+/g, ' / ')
    .toUpperCase();
}

function routeTopicLabel(routePath) {
  if (routePath === '/') {
    return 'AI GPU SERVER CONFIGURATOR';
  }

  const withoutPrefix = routePath
    .replace(/^\/solutions\//, '')
    .replace(/^\/configurator\//, 'CONFIGURATOR-')
    .replace(/^\/configurator$/, 'COMINO GRANDO CONFIGURATOR');

  return withoutPrefix
    .replace(/^\/|\/$/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function accentColorForRoute(routePath) {
  const digest = crypto.createHash('sha256').update(routePath).digest();
  return accentColors[digest[0] % accentColors.length];
}

function buildOverlaySvg(route) {
  const accent = accentColorForRoute(route.path);
  const slug = routeSlug(route.path);
  const topicLabel = routeTopicLabel(route.path);
  const title = normalizePreviewText(route.title, topicLabel, 10);
  const description = normalizePreviewText(route.description, `${topicLabel} GPU server quote and procurement guide`, 20);
  const pathLabel = route.path === '/' ? 'eudaemonia.tech' : `eudaemonia.tech${route.path}`;
  const titleLines = wrapText(title, 31, 3);
  const descriptionLines = wrapText(description, 52, 3);
  const titleTspans = titleLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`)
    .join('');
  const descriptionTspans = descriptionLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`)
    .join('');

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${SOCIAL_IMAGE_WIDTH}" height="${SOCIAL_IMAGE_HEIGHT}" viewBox="0 0 ${SOCIAL_IMAGE_WIDTH} ${SOCIAL_IMAGE_HEIGHT}">
  <defs>
    <linearGradient id="leftShade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#050708" stop-opacity="0.96"/>
      <stop offset="0.52" stop-color="#050708" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#050708" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="bottomShade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#050708" stop-opacity="0"/>
      <stop offset="1" stop-color="#050708" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <rect width="${SOCIAL_IMAGE_WIDTH}" height="${SOCIAL_IMAGE_HEIGHT}" fill="url(#leftShade)"/>
  <rect y="388" width="${SOCIAL_IMAGE_WIDTH}" height="242" fill="url(#bottomShade)"/>
  <rect x="0" y="0" width="14" height="${SOCIAL_IMAGE_HEIGHT}" fill="${accent}"/>
  <rect x="72" y="70" width="170" height="38" rx="19" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-opacity="0.9"/>
  <text x="98" y="95" fill="${accent}" font-size="18" font-weight="800" font-family="Arial, Helvetica, sans-serif" letter-spacing="1.8">CONFIGURATOR</text>
  <text x="72" y="170" fill="#f8fafc" font-size="52" font-weight="900" font-family="Arial, Helvetica, sans-serif">${titleTspans}</text>
  <text x="72" y="384" fill="#d1d5db" font-size="26" font-weight="600" font-family="Arial, Helvetica, sans-serif">${descriptionTspans}</text>
  <text x="72" y="536" fill="${accent}" font-size="26" font-weight="900" font-family="Arial, Helvetica, sans-serif">EudTech</text>
  <text x="72" y="574" fill="#e5e7eb" font-size="22" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(routeSlug(route.path))}</text>
  <text x="72" y="604" fill="#94a3b8" font-size="18" font-weight="600" font-family="Arial, Helvetica, sans-serif">${escapeXml(pathLabel)}</text>
  <rect x="1014" y="504" width="124" height="44" rx="22" fill="${accent}"/>
  <text x="1039" y="532" fill="#04100b" font-size="18" font-weight="900" font-family="Arial, Helvetica, sans-serif">QUOTE</text>
</svg>`);
}

async function generateRouteImage(route) {
  const sourcePath = publicPath(route.sourceImage);
  const outputPath = publicPath(route.socialImage);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing social image source for ${route.path}: ${route.sourceImage}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  if (!checkOnly) {
    await sharp(sourcePath)
      .rotate()
      .resize(SOCIAL_IMAGE_WIDTH, SOCIAL_IMAGE_HEIGHT, {
        fit: 'cover',
        position: 'attention'
      })
      .modulate({ brightness: 0.72, saturation: 0.88 })
      .composite([
        {
          input: buildOverlaySvg(route),
          top: 0,
          left: 0
        }
      ])
      .flatten({ background: '#0b0f12' })
      .jpeg({
        quality: 84,
        mozjpeg: true
      })
      .toFile(outputPath);
  }

  if (!fs.existsSync(outputPath)) {
    throw new Error(`Missing generated social image: ${route.socialImage}`);
  }

  const info = await readImageInfo(outputPath);
  assertSocialImage(route, info);
  return {
    path: route.path,
    sourceImage: route.sourceImage,
    socialImage: route.socialImage,
    hash: info.hash,
    ...info
  };
}

function duplicateImageGroups(results) {
  const groups = new Map();

  for (const result of results) {
    const group = groups.get(result.hash) || [];
    group.push(result);
    groups.set(result.hash, group);
  }

  return [...groups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([hash, group]) => ({
      hash,
      routes: group.map((item) => item.path),
      socialImages: group.map((item) => item.socialImage)
    }));
}

async function main() {
  const routes = getConfiguratorSocialPreviewRoutes();
  const results = [];

  for (const route of routes) {
    results.push(await generateRouteImage(route));
  }

  const duplicates = duplicateImageGroups(results);
  if (duplicates.length > 0) {
    throw new Error(`Social preview images must be route-differentiated. Duplicate groups: ${JSON.stringify(duplicates, null, 2)}`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        mode: checkOnly ? 'check' : 'write',
        width: SOCIAL_IMAGE_WIDTH,
        height: SOCIAL_IMAGE_HEIGHT,
        maxBytes: SOCIAL_IMAGE_MAX_BYTES,
        images: results.length,
        uniqueHashes: new Set(results.map((result) => result.hash)).size,
        largestImageBytes: Math.max(...results.map((result) => result.size))
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
