const path = require('path');

async function main() {
  const { manifestEntryMap, resolveIndexNowDelta } = await import(
    path.join(__dirname, '..', 'netlify', 'functions', 'indexnow-delta.mjs')
  );
  const host = 'eudaemonia.tech';
  const manifest = {
    version: 1,
    entries: {
      'https://eudaemonia.tech/configurator/28/': { hash: 'a'.repeat(64) },
      'https://eudaemonia.tech/solutions/gpu-server-quote/': { hash: 'b'.repeat(64) },
      'https://other.example/configurator/28/': { hash: 'c'.repeat(64) }
    }
  };
  const current = manifestEntryMap(manifest, host);
  const firstRun = resolveIndexNowDelta(current, {});
  const laterRun = resolveIndexNowDelta(
    { ...current, 'https://eudaemonia.tech/configurator/28/': 'd'.repeat(64) },
    { ...current, 'https://eudaemonia.tech/configurator/27/': 'e'.repeat(64) }
  );
  const errors = [];
  if (Object.keys(current).length !== 2) errors.push('manifest filtering should only retain valid URLs on the configured host.');
  if (firstRun.changedUrlCount !== 2 || firstRun.deletedUrlCount !== 0 || firstRun.urlList.length !== 2) errors.push('first run should submit every current URL once.');
  if (laterRun.changedUrlCount !== 1 || laterRun.deletedUrlCount !== 1 || laterRun.urlList.length !== 2) errors.push('later run should submit only changed and deleted URLs.');
  if (errors.length) {
    console.error(JSON.stringify({ ok: false, errors }, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, firstRun, laterRun }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exit(1);
});
