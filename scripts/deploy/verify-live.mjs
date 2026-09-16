import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { verifyStatic } from './verify-static.mjs';

const digest = data => createHash('sha256').update(data).digest('hex');

try {
  const base = new URL(process.env.SITE_URL || 'https://lemusicien.fr');
  if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/') throw new Error('SITE_URL doit être une origine HTTPS, sans identifiants ni sous-dossier.');
  const { pages } = await verifyStatic();
  const commit = process.env.GITHUB_SHA;
  for (const file of ['deploy-version.json', ...pages]) {
    const route = file.endsWith('index.html') ? file.slice(0, -'index.html'.length) : file;
    const url = new URL(route, base);
    url.searchParams.set('deployment', commit);
    const expected = digest(await readFile(`dist/${file}`));
    let success = false;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
        if (response.ok && digest(Buffer.from(await response.arrayBuffer())) === expected) {
          success = true;
          break;
        }
      } catch { /* Retry transient DNS/HTTP/TLS failures without logging response bodies. */ }
      if (attempt < 4) await new Promise(resolve => setTimeout(resolve, 5000));
    }
    if (!success) throw new Error(`Le contenu servi pour /${route} ne correspond pas au build. Vérifier la racine web, le cache, index.php et les règles .htaccess.`);
    console.log(`OK /${route} : contenu identique au build.`);
  }
  console.log(`Le domaine sert bien le commit ${commit}.`);
} catch (error) {
  console.error(`Vérification publique échouée : ${error.message}`);
  process.exitCode = 1;
}
