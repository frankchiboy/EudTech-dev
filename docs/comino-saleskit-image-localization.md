# Comino Sales Kit image localization

The AI infrastructure page uses matching-language source images for cooling and
maintenance. Chinese assets remain unchanged; English assets are rendered from
the existing `Sales Kit 0911Eng.pdf`, not generated or translated artwork.

Source SHA-256: `92b1e67e4229133285c33394b3e96a3b48cb3a24e654379a51c7f42a202a1550`.

| English asset | Source PDF page |
| --- | --- |
| `liquid-airflow-en.webp` | 34 |
| `monitoring-qdc-en.webp` | 35 |

Pages are rendered at 1800 × 1013 pixels and encoded as WebP (quality 92).
The existing selection matrix already has English labels and is retained.
Source typography and wording are preserved, including source typographical errors.

Verification: build, language toggle, image load, full-image links and Chinese
asset preservation. Deployment target is the development preview, not production.
