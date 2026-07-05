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
      'desktop configurator background keeps high-resolution image width',
      /const\s+DESKTOP_CONFIGURATOR_IMAGE_WIDTH\s*=\s*3840;/.test(source)
    ),
    check(
      'mobile configurator background keeps reduced image width',
      /const\s+MOBILE_CONFIGURATOR_IMAGE_WIDTH\s*=\s*750;/.test(source)
    ),
    check(
      'desktop configurator background still exposes responsive srcSet',
      source.includes('srcSet={isMobile ? undefined : getConfiguratorBackgroundSrcSet(image.url)}')
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
