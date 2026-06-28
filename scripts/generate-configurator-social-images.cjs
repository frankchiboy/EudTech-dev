const fs = require('fs');
const path = require('path');
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

function publicPath(assetPath) {
  const pathname = assetPath.startsWith('http://') || assetPath.startsWith('https://') ? new URL(assetPath).pathname : assetPath;
  return path.join(publicDir, decodeURIComponent(pathname.replace(/^\//, '')));
}

async function readImageInfo(filename) {
  const metadata = await sharp(filename).metadata();
  const { size } = fs.statSync(filename);
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size
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
    ...info
  };
}

async function main() {
  const routes = getConfiguratorSocialPreviewRoutes();
  const results = [];

  for (const route of routes) {
    results.push(await generateRouteImage(route));
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
