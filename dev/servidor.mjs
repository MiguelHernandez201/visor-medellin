// Servidor de desarrollo para el PC (npm run dev):
//   http://localhost:8083  la app, compilada y recargada al guardar (esbuild)
// Las imágenes las pide el navegador directamente a medellin.gov.co, igual que en el TV.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as esbuild from 'esbuild';

const raiz = path.dirname(fileURLToPath(import.meta.url));

const contexto = await esbuild.context({
  entryPoints: [path.join(raiz, '..', 'src', 'main.js')],
  bundle: true,
  target: 'chrome87',
  outdir: path.join(raiz, '..', 'app', 'build'),
  sourcemap: true,
  logLevel: 'info',
});
await contexto.watch();
await contexto.serve({ servedir: path.join(raiz, '..', 'app'), port: 8083 });
console.log('Visor Medellín en http://localhost:8083');
