import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { isEnglishPath } from './utils/seo/languageUrl';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const initialPath = window.location.pathname;
const app = (
  <StrictMode>
    <BrowserRouter basename={isEnglishPath(initialPath) ? '/en' : '/'}>
      <App initialPath={initialPath} />
    </BrowserRouter>
  </StrictMode>
);

// Preserve the complete build-rendered page while interactive code loads.
if (root.dataset.rendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
