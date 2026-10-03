import fs from 'node:fs/promises';
import sharp from 'sharp';
await fs.mkdir('src/assets/hero', { recursive: true });
for (const width of [960, 1600, 2560]) {
  await sharp('public/grando-8gpu-server.jpg').resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(`src/assets/hero/grando-${width}.webp`);
}
