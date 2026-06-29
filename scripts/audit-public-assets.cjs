const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = new Set(process.argv.slice(2));
const failOnIssues = args.has('--fail-on-issues');
const failOnSafeDuplicates = args.has('--fail-on-safe-duplicates');
const deleteSafeDuplicates = args.has('--delete-safe-duplicates');
const writeReport = args.has('--write-report');
const summaryOnly = args.has('--summary-only');
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const reportsDir = path.join(rootDir, 'reports');
const largeAssetBytes = Number(process.env.PUBLIC_ASSET_LARGE_BYTES || '5000000');
const textFileExtensions = new Set([
  '.cjs',
  '.css',
  '.csv',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.toml',
  '.ts',
  '.tsx',
  '.txt',
  '.xml',
  '.yaml',
  '.yml'
]);
const ignoredTextScanDirs = new Set([
  '.git',
  '.netlify',
  'dist',
  'node_modules',
  'reports'
]);

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

function relativeRootPath(absolutePath) {
  return path.relative(rootDir, absolutePath).split(path.sep).join('/');
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
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
    .map(([hash, group]) => ({
      hash,
      bytesPerFile: fs.statSync(group[0]).size,
      files: group.map(relativePublicPath).sort()
    }))
    .filter((group) => group.files.length > 1)
    .sort((a, b) => b.files.length - a.files.length);
}

function walkTextFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoredTextScanDirs.has(entry.name)) {
        return [];
      }
      return walkTextFiles(absolutePath);
    }
    if (!entry.isFile()) {
      return [];
    }

    return textFileExtensions.has(path.extname(entry.name).toLowerCase()) ? [absolutePath] : [];
  });
}

function referenceTokens(relativePath) {
  const normalizedPath = relativePath.split('/').filter(Boolean).join('/');
  const encodedPath = encodeURI(normalizedPath);
  const basename = path.posix.basename(normalizedPath);
  const encodedBasename = encodeURI(basename);
  const extension = path.posix.extname(basename);
  const basenameWithoutExtension = extension ? basename.slice(0, -extension.length) : basename;
  const withoutImagesPrefix = normalizedPath.startsWith('images/')
    ? normalizedPath.slice('images/'.length)
    : '';
  const tokenReferences = [
    normalizedPath,
    `/${normalizedPath}`,
    encodedPath,
    `/${encodedPath}`,
    `https://eudaemonia.tech/${normalizedPath}`,
    `https://eudaemonia.tech/${encodedPath}`,
    basename,
    encodedBasename,
    withoutImagesPrefix,
    withoutImagesPrefix ? `/${withoutImagesPrefix}` : ''
  ];

  if (
    normalizedPath.startsWith('images/configurator/devices/') ||
    /^[A-Za-z0-9_-]{12,}$/.test(basenameWithoutExtension)
  ) {
    tokenReferences.push(basenameWithoutExtension);
  }

  return unique(tokenReferences);
}

function contentIncludesToken(content, lowerContent, token) {
  return content.includes(token) || lowerContent.includes(token.toLowerCase());
}

function countReferences(relativePath, textFiles) {
  const tokens = referenceTokens(relativePath);
  return textFiles.reduce((matches, file) => {
    let content = '';
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch {
      return matches;
    }

    const lowerContent = content.toLowerCase();
    if (!tokens.some((token) => contentIncludesToken(content, lowerContent, token))) {
      return matches;
    }

    return matches + 1;
  }, 0);
}

function sortCandidatePaths(a, b) {
  const aInImages = a.path.startsWith('images/') ? 1 : 0;
  const bInImages = b.path.startsWith('images/') ? 1 : 0;
  if (a.references !== b.references) {
    return b.references - a.references;
  }
  if (aInImages !== bInImages) {
    return aInImages - bInImages;
  }
  if (a.path.length !== b.path.length) {
    return a.path.length - b.path.length;
  }
  return a.path.localeCompare(b.path);
}

function buildDuplicateCleanupSummary(duplicateGroups, textFiles) {
  const groups = duplicateGroups.map((group) => {
    const files = group.files
      .map((filePath) => ({
        path: filePath,
        bytes: group.bytesPerFile,
        references: countReferences(filePath, textFiles)
      }))
      .sort(sortCandidatePaths);
    const canonical = files[0];
    const safeDeleteCandidates = files
      .slice(1)
      .filter((file) => file.references === 0)
      .map((file) => file.path);

    return {
      hash: group.hash,
      bytesPerFile: group.bytesPerFile,
      canonicalPath: canonical.path,
      files,
      safeDeleteCandidates,
      estimatedSafeDeleteBytes: safeDeleteCandidates.length * group.bytesPerFile
    };
  });

  const safeDeleteCandidates = groups.flatMap((group) =>
    group.safeDeleteCandidates.map((filePath) => ({
      path: filePath,
      duplicateOf: group.canonicalPath,
      bytes: group.bytesPerFile
    }))
  );

  return {
    duplicateGroupsWithReferences: groups,
    safeDeleteCandidates,
    estimatedSafeDeleteBytes: safeDeleteCandidates.reduce((total, candidate) => total + candidate.bytes, 0)
  };
}

if (!fs.existsSync(publicDir)) {
  throw new Error(`Missing public directory: ${publicDir}`);
}

const files = walkFiles(publicDir);
const textFiles = walkTextFiles(rootDir);
const fileRecords = files.map((file) => {
  const relativePath = relativePublicPath(file);
  return {
    path: relativePath,
    bytes: fs.statSync(file).size
  };
});

const duplicateGroups = findDuplicateGroups(files);
const duplicateCleanup = buildDuplicateCleanupSummary(duplicateGroups, textFiles);
if (deleteSafeDuplicates) {
  for (const candidate of duplicateCleanup.safeDeleteCandidates) {
    fs.unlinkSync(path.join(publicDir, candidate.path));
  }
}
const finalFiles = deleteSafeDuplicates ? walkFiles(publicDir) : files;
const finalFileRecords = finalFiles.map((file) => {
  const relativePath = relativePublicPath(file);
  return {
    path: relativePath,
    bytes: fs.statSync(file).size
  };
});
const finalDuplicateGroups = deleteSafeDuplicates ? findDuplicateGroups(finalFiles) : duplicateGroups;
const finalDuplicateCleanup = deleteSafeDuplicates
  ? buildDuplicateCleanupSummary(finalDuplicateGroups, textFiles)
  : duplicateCleanup;
const finalTotalBytes = finalFileRecords.reduce((total, file) => total + file.bytes, 0);
const disallowedFiles = finalFileRecords.filter((file) =>
  file.path.endsWith('/.DS_Store') ||
  file.path === '.DS_Store' ||
  /\.png\.png$/i.test(file.path)
);
const oversizedFiles = finalFileRecords
  .filter((file) => file.bytes > largeAssetBytes)
  .sort((a, b) => b.bytes - a.bytes);
const largestFiles = [...finalFileRecords].sort((a, b) => b.bytes - a.bytes).slice(0, 25);
const totalBytes = fileRecords.reduce((total, file) => total + file.bytes, 0);
const errors = [
  ...(failOnIssues && (disallowedFiles.length || oversizedFiles.length || finalDuplicateGroups.length)
  ? [
      ...(disallowedFiles.length ? [`public contains ${disallowedFiles.length} disallowed local or duplicated-extension files`] : []),
      ...(oversizedFiles.length ? [`public contains ${oversizedFiles.length} files larger than ${largeAssetBytes} bytes`] : []),
      ...(finalDuplicateGroups.length ? [`public contains ${finalDuplicateGroups.length} exact duplicate file groups`] : [])
    ]
  : []),
  ...(failOnSafeDuplicates && finalDuplicateCleanup.safeDeleteCandidates.length
    ? [`public contains ${finalDuplicateCleanup.safeDeleteCandidates.length} safe exact duplicate delete candidates`]
    : [])
];

const result = {
  ok: errors.length === 0,
  failOnIssues,
  failOnSafeDuplicates,
  deleteSafeDuplicates,
  publicDir,
  textFilesScanned: textFiles.map(relativeRootPath).length,
  fileCount: fileRecords.length,
  finalFileCount: finalFileRecords.length,
  totalBytes,
  finalTotalBytes,
  largeAssetBytes,
  deletedSafeDuplicates: deleteSafeDuplicates ? duplicateCleanup.safeDeleteCandidates : [],
  deletedSafeDuplicateBytes: deleteSafeDuplicates ? duplicateCleanup.estimatedSafeDeleteBytes : 0,
  disallowedFiles,
  oversizedFiles,
  duplicateGroups: finalDuplicateGroups,
  duplicateCleanup: finalDuplicateCleanup,
  initialDuplicateCleanup: deleteSafeDuplicates ? duplicateCleanup : undefined,
  largestFiles,
  errors
};

if (writeReport) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(path.join(reportsDir, 'public-assets-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
}

if (summaryOnly) {
  console.log(JSON.stringify({
    ok: result.ok,
    failOnIssues: result.failOnIssues,
    failOnSafeDuplicates: result.failOnSafeDuplicates,
    deleteSafeDuplicates: result.deleteSafeDuplicates,
    fileCount: result.fileCount,
    finalFileCount: result.finalFileCount,
    totalBytes: result.totalBytes,
    finalTotalBytes: result.finalTotalBytes,
    deletedSafeDuplicates: result.deletedSafeDuplicates.length,
    deletedSafeDuplicateBytes: result.deletedSafeDuplicateBytes,
    remainingSafeDeleteCandidates: result.duplicateCleanup.safeDeleteCandidates.length,
    remainingSafeDeleteBytes: result.duplicateCleanup.estimatedSafeDeleteBytes,
    duplicateGroups: result.duplicateGroups.length,
    oversizedFiles: result.oversizedFiles.length,
    disallowedFiles: result.disallowedFiles.length,
    errors: result.errors
  }, null, 2));
} else {
  console.log(JSON.stringify(result, null, 2));
}

if (errors.length > 0) {
  process.exit(1);
}
