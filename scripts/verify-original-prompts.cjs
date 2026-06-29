const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const requiredFiles = [
  {
    path: 'USER_ORIGINAL_PROMPTS.md',
    requiredSnippets: [
      '現在要怎麼推廣configurator',
      '關鍵字最佳化之類？',
      '你懂我所謂曝光的意思嗎',
      '導入一切曝光configurator對策'
    ]
  },
  {
    path: 'docs/USER_ORIGINAL_PROMPTS.md',
    requiredSnippets: [
      'https://configurator.grando.ai/',
      '把這個搬進我們的網站',
      '最重要是裡面的計算邏輯要保留',
      '送出表單後要寄到info@eudaemonia.tech',
      '比照原廠的機制',
      '導入一切曝光configurator對策'
    ]
  }
];
const forbiddenPatterns = [
  /(?:api[_-]?key|access[_-]?token|refresh[_-]?token|client[_-]?secret|password|passwd)\s*[:=]\s*['"]?[A-Za-z0-9_./+=-]{12,}/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /AIza[0-9A-Za-z_-]{35}/,
  /ya29\.[0-9A-Za-z_-]+/,
  /ghp_[0-9A-Za-z]{30,}/,
  /github_pat_[0-9A-Za-z_]+/
];

function readRelative(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return { exists: false, content: '' };
  }

  return {
    exists: true,
    content: fs.readFileSync(absolutePath, 'utf8')
  };
}

const files = requiredFiles.map((entry) => {
  const file = readRelative(entry.path);
  const missingSnippets = entry.requiredSnippets.filter((snippet) => !file.content.includes(snippet));
  const forbiddenMatches = forbiddenPatterns
    .map((pattern) => pattern.test(file.content) ? String(pattern) : '')
    .filter(Boolean);

  return {
    path: entry.path,
    exists: file.exists,
    requiredSnippets: entry.requiredSnippets.length,
    missingSnippets,
    forbiddenMatches
  };
});

const errors = files.flatMap((file) => {
  const fileErrors = [];
  if (!file.exists) {
    fileErrors.push(`${file.path} is missing.`);
  }
  if (file.missingSnippets.length > 0) {
    fileErrors.push(`${file.path} is missing required prompt snippets: ${file.missingSnippets.join(', ')}`);
  }
  if (file.forbiddenMatches.length > 0) {
    fileErrors.push(`${file.path} appears to contain secret-like values.`);
  }
  return fileErrors;
});

const result = {
  ok: errors.length === 0,
  files,
  errors
};

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
