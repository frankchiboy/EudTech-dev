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
      'configurator background uses the site-hosted Comino image',
      source.includes("const LOCAL_COMINO_CONFIGURATOR_BACKGROUND = '/grando-8gpu-server.jpg';")
    ),
    check(
      'configurator background does not depend on the unavailable Grando image CDN',
      source.includes('return LOCAL_COMINO_CONFIGURATOR_BACKGROUND;')
    ),
    check(
      'background slider still renders only the active image',
      source.includes('src={getConfiguratorBackgroundUrl(image.url)}')
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
