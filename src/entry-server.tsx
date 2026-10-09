import { StrictMode } from 'react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import type { HelmetServerState } from 'react-helmet-async';
import { PassThrough } from 'node:stream';
import App from './App';
import { isEnglishPath } from './utils/seo/languageUrl';

export function render(initialPath: string): Promise<{ body: string; head: string; htmlAttributes: string }> {
  const context: { helmet?: HelmetServerState } = {};
  return new Promise((resolve, reject) => {
    let body = '';
    let renderError: unknown;
    const output = new PassThrough();
    output.resume();
    output.on('error', reject);
    output.on('end', () => {
      clearTimeout(timeout);
      if (renderError) return reject(renderError);
      const helmet = context.helmet;
      if (!helmet) return reject(new Error(`Missing metadata for ${initialPath}`));
      resolve({ body, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(part => part.toString()).join('\n'), htmlAttributes: helmet.htmlAttributes.toString() });
    });
    const app = (
      <StrictMode>
        <StaticRouter location={initialPath} basename={isEnglishPath(initialPath) ? '/en/' : '/'}>
          <App initialPath={initialPath} helmetContext={context} />
        </StaticRouter>
      </StrictMode>
    );
    const stream = renderToPipeableStream(app,
      {
        onAllReady() {
          // All lazy routes are now resolved. String serialization avoids the
          // React 18 stream encoder's NUL padding at multibyte chunk boundaries.
          try { body = renderToString(app); } catch (error) { renderError = error; }
          stream.pipe(output);
        },
        onError(error) { renderError = error; },
        onShellError(error) { clearTimeout(timeout); reject(error); }
      }
    );
    const timeout = setTimeout(() => { stream.abort(); reject(new Error(`Rendering timed out: ${initialPath}`)); }, 30000);
  });
}
