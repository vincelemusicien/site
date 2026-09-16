import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { configuration, lftpArguments, transferCommands, redact } from './upload.mjs';
import { verifyStatic } from './verify-static.mjs';

const valid = { FTP_HOST: 'hosting.example.org', FTP_USERNAME: 'deployment', FTP_REMOTE_PATH: '/home/deployment/public_html', FTP_PASSWORD: 'a"b,$c;secret', SSH_KNOWN_HOSTS: 'test-host-key' };

test('SFTP par défaut et validation des réglages', () => {
  assert.equal(configuration(valid).protocol, 'sftp');
  assert.equal(configuration(valid).debug, false);
  assert.equal(configuration(valid).port, '22');
  assert.throws(() => configuration({ ...valid, SSH_KNOWN_HOSTS: '' }), /SSH_KNOWN_HOSTS/);
  assert.throws(() => configuration({ ...valid, FTP_REMOTE_PATH: '/' }), /racine SFTP/);
  assert.throws(() => configuration({ ...valid, FTP_REMOTE_PATH: '/public_html/../mail' }), /chemin absolu/);
  assert.throws(() => configuration({ ...valid, FTP_REMOTE_PATH: '/public_html; rm -r backups' }), /chemin absolu/);
  assert.throws(() => configuration({ ...valid, FTP_PORT: '70000' }), /FTP_PORT/);
  assert.throws(() => configuration({ ...valid, FTP_HOST: '' }), /Secret manquant/);
  assert.throws(() => configuration({ ...valid, DEPLOY_PROTOCOL: 'ftp' }), /sans chiffrement/);
  assert.equal(configuration({ ...valid, DEPLOY_PROTOCOL: 'ftps', FTP_REMOTE_PATH: '/' }).port, '21');
  assert.equal(configuration({ ...valid, DEPLOY_PROTOCOL: 'ftps-implicit' }).port, '990');
});

test('les secrets et leurs formes encodées sont masqués', () => {
  assert.equal(redact(`Erreur ${valid.FTP_PASSWORD} ${encodeURIComponent(valid.FTP_PASSWORD)}`, valid), 'Erreur *** ***');
});

test('lftp ouvre le serveur avant d’exécuter le transfert', () => {
  const config = configuration({ ...valid, DEPLOY_PROTOCOL: 'ftps', FTP_REMOTE_PATH: '/' });
  const args = lftpArguments(config, ['set cmd:fail-exit yes'], ['cd "/"']);
  assert.ok(args.indexOf('ftp://hosting.example.org') < args.indexOf('-e'));
  assert.match(args.at(-1), /cd "\/"/);
});

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'lemusicien-transfer-test-'));
  const source = path.join(root, 'source');
  const target = path.join(root, 'target');
  for (const dir of ['source/_astro', 'source/videos', 'target/_astro', 'target/videos', 'target/annexe']) await mkdir(path.join(root, dir), { recursive: true });
  await writeFile(path.join(source, '_astro/new.js'), 'new asset');
  await writeFile(path.join(source, 'index.html'), 'new homepage');
  await writeFile(path.join(source, 'videos/index.html'), 'new videos');
  await writeFile(path.join(source, 'deploy-version.json'), '{"commit":"new"}');
  await writeFile(path.join(target, '_astro/old.js'), 'retained old asset');
  await writeFile(path.join(target, 'index.html'), 'old homepage');
  await writeFile(path.join(target, 'videos/personal.txt'), 'keep nested file');
  await writeFile(path.join(target, 'annexe/index.html'), 'keep sibling directory');
  await writeFile(path.join(target, '.htaccess'), 'keep host configuration');
  return { root, source, target };
}

async function tree(dir, base = dir, result = {}) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await tree(file, base, result);
    else result[path.relative(base, file)] = await readFile(file, 'utf8');
  }
  return result;
}

test('le vrai moteur lftp préserve les annexes et publie les assets avant les HTML', async () => {
  const { root, source, target } = await fixture();
  try {
    const commands = ['set cmd:fail-exit yes', 'set xfer:use-temp-file yes', 'set xfer:temp-file-name .*.uploading', 'open file:///', ...transferCommands(source, target, false)].join('\n');
    const run = spawnSync('lftp', ['--norc', '-c', commands], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stdout + run.stderr);
    const files = await tree(target);
    assert.equal(files['index.html'], 'new homepage');
    assert.equal(files['videos/index.html'], 'new videos');
    assert.equal(files['_astro/new.js'], 'new asset');
    assert.equal(files['_astro/old.js'], 'retained old asset');
    assert.equal(files['videos/personal.txt'], 'keep nested file');
    assert.equal(files['annexe/index.html'], 'keep sibling directory');
    assert.equal(files['.htaccess'], 'keep host configuration');
    assert.equal(files['deploy-version.json'], '{"commit":"new"}');
    assert.equal(Object.keys(files).some(name => name.startsWith('dist/') || name.endsWith('.uploading')), false);
    assert.ok(run.stdout.indexOf('new.js') < run.stdout.indexOf("Transferring file `index.html'"), run.stdout);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('la simulation lftp ne modifie aucun fichier distant', async () => {
  const { root, source, target } = await fixture();
  try {
    const before = await tree(target);
    const run = spawnSync('lftp', ['--norc', '-c', ['set cmd:fail-exit yes', 'open file:///', ...transferCommands(source, target, true)].join('\n')], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stdout + run.stderr);
    assert.deepEqual(await tree(target), before);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('le transfert échoue si le répertoire distant est absent', async () => {
  const { root, source, target } = await fixture();
  try {
    const run = spawnSync('lftp', ['--norc', '-c', ['set cmd:fail-exit yes', 'open file:///', ...transferCommands(source, target + '/missing', false)].join('\n')], { encoding: 'utf8' });
    assert.notEqual(run.status, 0);
    assert.equal((await tree(target))['index.html'], 'old homepage');
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('la validation bloque les assets absents et les liens symboliques', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'lemusicien-validation-'));
  try {
    await writeFile(path.join(root, 'index.html'), '<img src="/missing.png">');
    await assert.rejects(verifyStatic(root), /Référence locale absente/);
    await writeFile(path.join(root, 'index.html'), '<h1>Static</h1>');
    await symlink('/etc/passwd', path.join(root, 'linked-file'));
    await assert.rejects(verifyStatic(root), /lien symbolique/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
