const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = new Set(process.argv.slice(2));
const failOnIssues = args.has('--fail-on-issues');
const writeReport = args.has('--write-report');
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const reportsDir = path.join(rootDir, 'reports');
const largeAssetBytes = Number(process.env.PUBLIC_ASSET_LARGE_BYTES || '5000000');

function walkFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(absolutePath);
    }
    if (!entry.isFile()) {
      return [];
    }
    return [absolutePath];
  });
}

function relativePublicPath(absolutePath) {
  return path.relative(publicDir, absolutePath).split(path.sep).join('/');
}

function sha256(absolutePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(absolutePath));
  return hash.digest('hex');
}

function findDuplicateGroups(files) {
  const bySize = new Map();
  files.forEach((file) => {
    const size = fs.statSync(file).size;
    if (size === 0) {
      return;
    }
    const group = bySize.get(size) || [];
    group.push(file);
    bySize.set(size, group);
  });

  const byHash = new Map();
  [...bySize.values()]
    .filter((group) => group.length > 1)
    .flat()
    .forEach((file) => {
      const digest = sha256(file);
      const group = byHash.get(digest) || [];
      group.push(file);
      byHash.set(digest, group);
    });

  return [...byHash.entries()]
    .map(([hash, group]) => ({ hash, files: group.map(relativePublicPath).sort() }))
    .filter((group) => group.files.length > 1)
    .sort((a, b) => b.files.length - a.files.length);
}

if (!fs.existsSync(publicDir)) {
  throw new Error(`Missing public directory: ${publicDir}`);
}

const files = walkFiles(publicDir);
const fileRecords = files.map((file) => {
  const relativePath = relativePublicPath(file);
  return {
    path: relativePath,
    bytes: fs.statSync(file).size
  };
});

const disallowedFiles = fileRecords.filter((file) =>
  file.path.endsWith('/.DS_Store') ||
  file.path === '.DS_Store' ||
  /\.png\.png$/i.test(file.path)
);
const oversizedFiles = fileRecords
  .filter((file) => file.bytes > largeAssetBytes)
  .sort((a, b) => b.bytes - a.bytes);
const duplicateGroups = findDuplicateGroups(files);
const largestFiles = [...fileRecords].sort((a, b) => b.bytes - a.bytes).slice(0, 25);
const totalBytes = fileRecords.reduce((total, file) => total + file.bytes, 0);
const errors = failOnIssues && (disallowedFiles.length || oversizedFiles.length || duplicateGroups.length)
  ? [
      ...(disallowedFiles.length ? [`public contains ${disallowedFiles.length} disallowed local or duplicated-extension files`] : []),
      ...(oversizedFiles.length ? [`public contains ${oversizedFiles.length} files larger than ${largeAssetBytes} bytes`] : []),
      ...(duplicateGroups.length ? [`public contains ${duplicateGroups.length} exact duplicate file groups`] : [])
    ]
  : [];

const result = {
  ok: errors.length === 0,
  failOnIssues,
  publicDir,
  fileCount: fileRecords.length,
  totalBytes,
  largeAssetBytes,
  disallowedFiles,
  oversizedFiles,
  duplicateGroups,
  largestFiles,
  errors
};

if (writeReport) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(path.join(reportsDir, 'public-assets-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
