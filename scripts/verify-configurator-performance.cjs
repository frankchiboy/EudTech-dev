const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'src/components/configurator/GrandoConfigurator.tsx');

function check(name, ready, details = {}) {
  return {
    name,
    ready,
    ...details
  };
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing configurator source: ${sourcePath}`);
  }

  const source = fs.readFileSync(sourcePath, 'utf8');
  const checks = [
    check(
      'desktop background slider does not render every background image at once',
      !/return\s+images\.map\(\(image,\s*index\)\s*=>\s*\(\{\s*image,\s*index\s*\}\)\);/.test(source)
    ),
    check(
      'background slider preserves a previous slide only for fade-out',
      source.includes('previousIndex') && source.includes('setPreviousIndex')
    ),
    check(
      'background slider preloads only the next image after the active image',
      source.includes('const nextIndex = (activeIndex + 1) % images.length') &&
        source.includes('const preloadImage = new Image()')
    ),
    check(
      'configurator background uses the locally shipped official Comino image',
      /const\s+LOCAL_COMINO_CONFIGURATOR_BACKGROUND\s*=\s*['"]\/grando-8gpu-server\.jpg['"]/.test(source)
    ),
    check(
      'unavailable legacy Grando background URLs resolve to the local image',
      source.includes('return LOCAL_COMINO_CONFIGURATOR_BACKGROUND;')
    ),
    check(
      'background rendering contains an image failure guard',
      source.includes('failedImages.has(image.url)') && source.includes('setFailedImages')
    )
  ];

  const report = {
    ok: checks.every((item) => item.ready),
    source: path.relative(rootDir, sourcePath),
    checks
  };

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    process.exitCode = 1;
  }
}

main();
