# Homepage improvements — 2026-10-04

The homepage groups EudTech's three services around customer goals, provides a direct GPU configuration and quote entry, and ends with a concise delivery flow and consultation action. The existing Hero remains unchanged.

## Scope

- Three equal service cards with category, provider, customer outcome, and descriptive link.
- Comino configuration feature with a direct `/configurator?request=true` action.
- Procurement-guide label aligned with the destination; removed the unsupported six-GPU decision-record label.
- Compact Comino and Cyabra partnership cards linked to current manufacturer partner listings.
- Four-step delivery section and final consultation action.
- Lazy images, focus indicators, minimum 44px link targets, heading line spacing, anchor clearance, and light/dark contrast.

## Asset provenance

`public/vendor/comino/grando-workstation-closed.webp` is an 800×816 WebP encoding of the existing `public/grando-workstation-closed.png`, preserving the supplied image and transparency. Its caption links to Comino's official configurator. The asset is 67 KB. Existing workflow illustrations and brand logos are reused.

Official partner listings checked during this change:

- https://www.comino.com/en/company
- https://cyabra.com/become-a-partner/

## Validation

- Netlify build pipeline passed, including rendered pages and bilingual SEO checks. Final source rebuild verifies the rebased version.
- Chinese and English × light and dark × seven widths (1792, 1440, 1280, 1024, 820, 390, 375 CSS px). All 28 cases passed body overflow, element bounds, text clipping, decoded images, and text contrast after fixes.
- Browser zoom was 90%; override dimensions were calibrated to measured CSS widths. Actual height may differ by 1px due to rounding.
- Full TypeScript check reports 75 diagnostics across 31 unchanged files; none reference the changed homepage files.
- Changed-file ESLint passed. Browser evidence is retained in `deliverables/product-design-homepage-20261004/`.
- This is a preview change. Production publishing requires an explicit release instruction.
