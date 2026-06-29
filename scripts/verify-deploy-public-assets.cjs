const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const writeReport = args.includes('--write-report');
const maxTotalMbArgIndex = args.indexOf('--max-total-mb');
const maxFileCountArgIndex = args.indexOf('--max-file-count');
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const reportsDir = path.join(rootDir, 'reports');
const maxTotalMb = maxTotalMbArgIndex >= 0 ? Number(args[maxTotalMbArgIndex + 1]) : 260;
const maxFileCount = maxFileCountArgIndex >= 0 ? Number(args[maxFileCountArgIndex + 1]) : 220;

const requiredFiles = [
  '_headers',
  '_redirects',
  'build-meta.json',
  'robots.txt',
  'sitemap.xml',
  'sitemap-index.xml',
  'image-sitemap.xml',
  'feed.xml',
  'llms.txt',
  'llms-full.txt',
  'logo.svg',
  'sw.js',
  'grando-8gpu-server.jpg',
  'social/configurator/configurator.jpg',
  'images/configurator/devices/comino-integration-kit-8x-pro-6000.webp',
  'images/configurator/devices/comino-rtx-pro-6000-workstation.webp',
  'cyabra-images/soc2-type-2-compliance-badge.webp'
];

const disallowedPatterns = [
  {
    name: 'mirrored public/images assets outside configurator devices',
    pattern: /^images\/(?!configurator\/devices\/)/
  },
  {
    name: 'unused high-number GRANDO DPR root photos',
    pattern: /^GRANDO DPR 4090-FT_6_(0[7-9]|[1-4][0-9]|5[0-3])\.jpg$/
  },
  {
    name: 'unused GRANDO rack server root photos',
    pattern: /^GRANDO_RM-M-CRPS_9004_8xGPU_(1[1-9]|2[2-3])\.jpg$/
  },
  {
    name: 'unused GRANDO workstation extra root photos',
    pattern: /^GRANDO WS TRP_4xA100_16 \(1\)\.jpg$/
  },
  {
    name: 'dev-only diagnostic pages',
    pattern: /^(dev|test-environment|emailjs-diagnostic)\.html$/
  }
];

function walk(dir, baseDir = dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath, baseDir, files);
      continue;
    }

    const relativePath = path.relative(baseDir, absolutePath).split(path.sep).join('/');
    const stat = fs.statSync(absolutePath);
    files.push({
      path: relativePath,
      bytes: stat.size
    });
  }

  return files;
}

function countFilesUnder(files, prefix) {
  return files.filter((file) => file.path.startsWith(prefix)).length;
}

function main() {
  const errors = [];

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ does not exist. Run npm run build:netlify first.');
  }

  const files = walk(distDir);
  const filePaths = new Set(files.map((file) => file.path));
  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
  const maxTotalBytes = maxTotalMb * 1024 * 1024;
  const missingRequiredFiles = requiredFiles.filter((file) => !filePaths.has(file));
  const disallowedFiles = [];

  for (const file of files) {
    for (const rule of disallowedPatterns) {
      if (rule.pattern.test(file.path)) {
        disallowedFiles.push({
          path: file.path,
          rule: rule.name,
          bytes: file.bytes
        });
      }
    }
  }

  const socialPreviewImages = countFilesUnder(files, 'social/configurator/');
  const configuratorDeviceImages = countFilesUnder(files, 'images/configurator/devices/');

  if (missingRequiredFiles.length) {
    errors.push(`Missing required deploy assets: ${missingRequiredFiles.join(', ')}`);
  }

  if (socialPreviewImages < 27) {
    errors.push(`Expected at least 27 social preview images, found ${socialPreviewImages}.`);
  }

  if (configuratorDeviceImages < 11) {
    errors.push(`Expected at least 11 configurator device images, found ${configuratorDeviceImages}.`);
  }

  if (totalBytes > maxTotalBytes) {
    errors.push(`dist total size ${totalBytes} bytes exceeds ${maxTotalMb} MiB.`);
  }

  if (files.length > maxFileCount) {
    errors.push(`dist file count ${files.length} exceeds ${maxFileCount}.`);
  }

  if (disallowedFiles.length) {
    errors.push(`Disallowed deploy assets found: ${disallowedFiles.map((file) => file.path).join(', ')}`);
  }

  const largestFiles = [...files]
    .sort((first, second) => second.bytes - first.bytes)
    .slice(0, 20);

  const report = {
    ok: errors.length === 0,
    distDir,
    fileCount: files.length,
    totalBytes,
    maxTotalMb,
    maxFileCount,
    socialPreviewImages,
    configuratorDeviceImages,
    missingRequiredFiles,
    disallowedFiles,
    largestFiles,
    errors
  };

  if (writeReport) {
    fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(path.join(reportsDir, 'deploy-public-assets.json'), `${JSON.stringify(report, null, 2)}\n`);
  }

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    process.exitCode = 1;
  }
}

main();
