import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function verifyStatic(root = path.resolve('dist')) {
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error('dist contient un lien symbolique.');
      if (entry.isDirectory()) await walk(file);
      else if (entry.isFile()) files.push(file);
      else throw new Error('dist contient un fichier non standard.');
    }
  }
  await walk(root);
  const index = path.join(root, 'index.html');
  if (!files.includes(index) || !(await stat(index)).size) throw new Error('dist/index.html est absent ou vide.');
  const relative = files.map(file => path.relative(root, file));
  if (relative.some(file => /(^|\/)(?:server|client|node_modules|\.git|\.env(?:\..*)?)(?:\/|$)|(?:^|\/)(?:_worker\.js|package\.json)$/.test(file))) {
    throw new Error('dist contient du code serveur, des sources ou un fichier de configuration sensible. Utiliser npm run build.');
  }

  const references = new Set();
  for (const file of files.filter(file => /\.(?:html|css)$/.test(file))) {
    const content = await readFile(file, 'utf8');
    const urls = [...content.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
    urls.push(...[...content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(match => match[1]));
    for (const raw of urls) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(raw)) continue;
      const url = decodeURIComponent(raw.split(/[?#]/)[0]);
      if (!url) continue;
      const target = url.startsWith('/') ? path.join(root, url) : path.resolve(path.dirname(file), url);
      if (target !== root && !target.startsWith(root + path.sep)) throw new Error('Un asset sort du dossier dist.');
      references.add(target);
    }
  }
  for (const target of references) {
    try {
      const info = await stat(target);
      if (info.isDirectory()) await stat(path.join(target, 'index.html'));
    } catch {
      throw new Error(`Référence locale absente : ${path.relative(root, target)}`);
    }
  }
  const pages = relative.filter(file => file.endsWith('.html'));
  console.log(`Build vérifié : ${pages.length} pages, ${files.length} fichiers, ${references.size} références locales valides.`);
  return { pages, files: relative };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await verifyStatic();
    if (process.argv.includes('--stamp')) {
      const commit = process.env.GITHUB_SHA;
      if (!/^[a-f0-9]{40}$/.test(commit || '')) throw new Error('GITHUB_SHA doit identifier le commit à publier.');
      await writeFile('dist/deploy-version.json', JSON.stringify({ commit, builtAt: new Date().toISOString() }) + '\n');
    }
  } catch (error) {
    console.error(`Validation refusée : ${error.message}`);
    process.exitCode = 1;
  }
}
