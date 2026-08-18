import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root = process.cwd();
const sourceFiles = [
  'src/components/HomeSolutionsSection.tsx',
  'src/components/CareersPage.tsx',
  'src/components/pages/AboutPage.tsx',
  'src/components/pages/AiAgentSolutionPage.tsx',
  'src/components/pages/ContactPage.tsx',
  'src/components/pages/ResourcesOverviewPage.tsx',
  'src/components/pages/SocialIntelligenceSolutionPage.tsx',
  'src/components/pages/SolutionsOverviewPage.tsx',
  'src/data/vendorEvidence.ts'
];
const forbiddenReferences = [
  '/brand-provenance/',
  '/ai-agent/micro-illustrations/',
  '/ai-agent/anthropic/managed-agents-hybrid-architecture.webp',
  '/ai-agent-evidence-chain-v1.webp'
];
const photos = [
  'workflow-design.webp',
  'private-infrastructure.webp',
  'operations-monitoring.webp',
  'solution-discovery.webp',
  'governance-review.webp',
  'career-conversation.webp'
];

const failures = [];
const sourceText = await Promise.all(sourceFiles.map(async (file) => [file, await readFile(path.join(root, file), 'utf8')]));

for (const [file, text] of sourceText) {
  for (const reference of forbiddenReferences) {
    if (text.includes(reference)) failures.push(`${file} still references ${reference}`);
  }
}

for (const photo of photos) {
  const file = path.join(root, 'public/editorial-photography', photo);
  const metadata = await sharp(file).metadata();
  const fileStat = await stat(file);
  if (metadata.format !== 'webp') failures.push(`${photo} is not WebP`);
  if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) failures.push(`${photo} is below 1200x800`);
  if (fileStat.size > 250_000) failures.push(`${photo} exceeds 250 KB`);
}

const registry = await readFile(path.join(root, 'src/data/editorialPhotography.ts'), 'utf8');
for (const photo of photos) {
  if (!registry.includes(photo)) failures.push(`registry is missing ${photo}`);
}
if (!registry.includes('alt:')) failures.push('photography registry is missing alt text');
if (!registry.includes("loading")) {
  // Loading is intentionally applied at component call sites; this line keeps the verifier explicit.
  const imageMarkup = sourceText.map(([, text]) => text).join('\n');
  if (!imageMarkup.includes('loading="lazy"')) failures.push('photography image markup is missing lazy loading');
}

const licenceRecord = await readFile(path.join(root, 'docs/assets/editorial-photography/README.md'), 'utf8');
for (const required of ['Unsplash License', 'Public Domain', '來源頁', '作者／來源']) {
  if (!licenceRecord.includes(required)) failures.push(`licence record is missing ${required}`);
}

const heroLocks = [
  'src/components/hero/HeroSection.tsx',
  'src/components/hero/HeroBackground.tsx',
  'src/components/hero/HeroContent.tsx',
  'src/data/content.ts'
];
const { execFileSync } = await import('node:child_process');
const heroDiff = execFileSync('git', ['diff', '--', ...heroLocks], { cwd: root, encoding: 'utf8' });
if (heroDiff.trim()) failures.push('homepage hero lock files changed');

const viteConfig = await readFile(path.join(root, 'vite.config.ts'), 'utf8');
if (!viteConfig.includes("'editorial-photography'")) failures.push('deploy allowlist is missing editorial-photography');
if (viteConfig.includes("  'brand-provenance',")) failures.push('deploy allowlist still exposes generated brand-provenance assets');
if (viteConfig.includes("  'ai-agent',")) failures.push('deploy allowlist still exposes the complete generated ai-agent asset directory');

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, checkedSourceFiles: sourceFiles.length, checkedPhotos: photos.length, homepageHeroUnchanged: true }, null, 2));
