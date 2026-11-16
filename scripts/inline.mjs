// Inlines the Vite build (dist/) into a single self-contained index.html at the repo root.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'dist/index.html'), 'utf8');
const jsName = html.match(/assets\/(index-[^"]+\.js)/)[1];
const cssName = html.match(/assets\/(index-[^"]+\.css)/)[1];
const js = readFileSync(join(root, 'dist/assets', jsName), 'utf8');
const css = readFileSync(join(root, 'dist/assets', cssName), 'utf8');
const out = html
  .replace(/<link rel="stylesheet"[^>]*>/, () => '<style>' + css + '</style>')
  .replace(/<script type="module"[^>]*><\/script>/, () => '<script type="module">' + js + '</' + 'script>');
const start = out.indexOf('<script type="module">') + '<script type="module">'.length;
const inlined = out.slice(start, out.indexOf('</script>', start));
if (inlined !== js) { console.error('inline verification failed'); process.exit(1); }
writeFileSync(join(root, 'index.html'), out);
console.log('index.html (single-file) written:', out.length, 'bytes');
