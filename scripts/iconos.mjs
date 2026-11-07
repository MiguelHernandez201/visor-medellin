// Exporta scripts/icono.svg a los PNG que pide webOS: app/icon.png (80x80) y app/largeIcon.png (130x130).
// Uso: npm run iconos
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync(new URL('./icono.svg', import.meta.url));

for (const [archivo, lado] of [['icon.png', 80], ['largeIcon.png', 130]]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: lado } }).render().asPng();
  writeFileSync(new URL(`../app/${archivo}`, import.meta.url), png);
  console.log(`app/${archivo} (${lado}x${lado})`);
}
