# EudTech Full-Site Product Design QA

## Scope

- Branch: `codex/website-next-update`
- Production policy: production remains unchanged until explicit approval.
- Public inventory: 41 sitemap routes, 11 configurator product routes, and 7 user-facing product detail routes.
- Breakpoints: 1440 px desktop, 820 px tablet, and 390 px mobile.
- Modes: Traditional Chinese / English and light / dark.

## Image system

- AI Agent evidence chain: `public/ai-agent-evidence-chain-v1.webp`.
- Full-site brand scenes: `public/brand-provenance/eudtech-brand-{home,social,procurement,delivery,consultation,careers}.webp`.
- Original generated PNG files are retained in `docs/assets/brand-provenance/`; the deployable site uses compressed WebP files only.
- Imagegen scenes are used for brand narrative and business context. Product configuration, hardware selection, vendor evidence, and operational controls continue to use real product media or functional icons.
- GPU infrastructure uses the real Comino product image instead of generated hardware; the evaluated GPU Imagegen source is retained only with the source records and is not deployed.

## Design review

- Visual direction: navy, cyan, and emerald form one consistent EudTech system across the homepage, solution pages, resources, company, contact, and careers.
- Typography: generated images contain no embedded text; bilingual page copy remains native HTML.
- Layout: hero copy remains inside the shared `max-w-7xl` grid with image focal points controlled per page.
- Navigation: the GPU configurator now includes the shared EudTech footer; the crawler-facing configurator index now includes visible site navigation and footer links.
- Product routes: `/products/10` and `/products/11` now load Cyabra product data instead of a product-not-found state.
- Accessibility: narrative images use bilingual alternative text where the image carries meaning; decorative imagery remains excluded from assistive narration.

## Verification evidence

- Netlify production build: passed.
- Static SEO verification: 39 generated routes passed.
- Discovery verification: 38 required URLs, 39 social preview images, sitemap index, feeds, and LLM files passed.
- Original-prompt preservation verification: passed.
- Changed-file lint: 0 errors; one pre-existing Fast Refresh warning in `SitePagePrimitives.tsx`.
- Configurator performance checks: 6 of 6 passed.
- Critical visual matrix: 10 routes × 4 modes = 40 screenshots passed.
- Full local sitemap matrix: 41 routes × desktop/mobile = 82 screenshots. All 60 non-product-configurator checks passed. The remaining 22 local reviews are solely the 11 product background images in two viewports because the Netlify Image CDN endpoint is unavailable on localhost; navigation, footer, overflow, and controls passed on those routes.
- Local interaction suite: AI Agent scenario tabs, FAQ, language, theme, calls to action, and mobile navigation passed with no severe browser console errors.
- Contact sheet: `/Users/serverc/WorkSpace-AI/deliverables/eudtech-full-site-imagegen-20260817/design-qa/full-site-hero-contact-sheet.png`.
- Full matrix report: `/Users/serverc/WorkSpace-AI/deliverables/eudtech-full-site-imagegen-20260817/full-sitemap-local-final/audit.json`.

## Preview acceptance gate

- Netlify branch deploy: `6a82e07784a64b0008eb225d`, commit `0921566ba3cf229282f88aa01b62f091b7335b8f`, state `ready`.
- Public preview: `https://codex-website-next-update--website-eudtech.netlify.app`.
- Public visual verification: 41 routes × desktop/mobile = 82 unique checks passed on the latest website code. Evidence is split into stable batches under `public-major-final`, `public-configurator-retry-final`, `public-configurator-remaining-final`, `public-topics-a-final`, and `public-topics-b-final`.
- Public interaction verification passed on the latest website code: `interactions-public-latest/interactions.json`.
- Netlify Image CDN product images passed. An intermittent upstream background failure was converted into a controlled branded gradient fallback and the affected routes then passed on both desktop and mobile.
- Production remains unchanged and requires explicit approval before release.

final result: passed
