import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseline = process.argv.find(arg => arg.startsWith('--baseline='))?.split('=')[1];
const outdir = path.join(root, 'tmp/hydration-regression', baseline ? 'baseline' : 'current');
await mkdir(outdir, { recursive: true });
await build({
  absWorkingDir: root, entryPoints: ['scripts/fixtures/theme-hydration.tsx'],
  bundle: true, outfile: path.join(outdir, 'test.js'), format: 'esm',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: baseline ? [{
    name: 'baseline-theme-hook', setup(builder) {
      builder.onLoad({ filter: /src\/hooks\/core\/useTheme\.ts$/ }, () => ({
        contents: execFileSync('git', ['show', `${baseline}:src/hooks/core/useTheme.ts`], { cwd: root, encoding: 'utf8' }),
        loader: 'ts', resolveDir: path.join(root, 'src/hooks/core')
      }));
    }
  }] : []
});
await writeFile(path.join(outdir, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Theme hydration regression</title></head><body>
<h1>Delayed-route theme hydration</h1>
<div id="root"><output id="theme-state">system:light</output><!--$--><p id="hydration-route">Hydrated route</p><!--/$--></div>
<pre id="result" aria-live="polite">Running a four-second hydration check…</pre><script type="module" src="./test.js"></script>
</body></html>`);
console.log(`Built ${baseline ? 'baseline' : 'current'} hydration regression fixture in ${outdir}`);
