import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { verifyStatic } from './verify-static.mjs';

// Quoting for lftp's command language; no shell is used to launch lftp.
const quote = value => '"' + value.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('$', '\\$').replaceAll('`', '\\`') + '"';

export function configuration(env) {
  const protocol = env.DEPLOY_PROTOCOL || 'sftp';
  if (!['sftp', 'ftps', 'ftps-implicit', 'ftp'].includes(protocol)) throw new Error('DEPLOY_PROTOCOL doit être sftp, ftps, ftps-implicit ou ftp.');
  for (const name of ['FTP_HOST', 'FTP_USERNAME', 'FTP_REMOTE_PATH']) {
    if (!env[name]?.trim()) throw new Error(`Secret manquant : ${name}.`);
  }
  const host = env.FTP_HOST.trim();
  const username = env.FTP_USERNAME.trim();
  if (!/^[a-zA-Z0-9.-]+$/.test(host)) throw new Error('FTP_HOST doit être un nom de serveur ou une IPv4, sans URL ni chemin.');
  if (!/^[a-zA-Z0-9_.@+-]+$/.test(username)) throw new Error('Format de FTP_USERNAME non pris en charge.');
  const port = env.FTP_PORT?.trim() || (protocol === 'sftp' ? '22' : protocol === 'ftps-implicit' ? '990' : '21');
  if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) throw new Error('FTP_PORT doit être un port valide.');
  const remote = env.FTP_REMOTE_PATH.trim();
  if (!/^\/[a-zA-Z0-9_./ -]*$/.test(remote) || remote.split('/').some(part => part === '..' || part === '.')) {
    throw new Error('FTP_REMOTE_PATH doit être un chemin absolu simple, sans .. ni caractères de commande.');
  }
  if (protocol === 'sftp' && remote.replaceAll('/', '') === '') throw new Error('La racine SFTP / est refusée : préciser la racine web du domaine.');
  if (protocol === 'ftp' && env.ALLOW_INSECURE_FTP !== 'true') throw new Error('FTP sans chiffrement refusé. Préférer SFTP/FTPS ; ALLOW_INSECURE_FTP=true est requis pour ce mode.');
  const key = protocol === 'sftp' ? env.SSH_PRIVATE_KEY?.trim() : '';
  if (protocol === 'sftp' && !env.SSH_KNOWN_HOSTS?.trim()) throw new Error('Secret SSH_KNOWN_HOSTS manquant : vérifier la clé serveur auprès de GNC.');
  if (!key && !env.FTP_PASSWORD) throw new Error('Secret FTP_PASSWORD manquant (ou SSH_PRIVATE_KEY en SFTP).');
  if (!['true', 'false'].includes(env.DEPLOY_DRY_RUN || 'false')) throw new Error('DEPLOY_DRY_RUN doit être true ou false.');
  if (!['true', 'false'].includes(env.DEPLOY_DEBUG || 'false')) throw new Error('DEPLOY_DEBUG doit être true ou false.');
  return { protocol, host, username, port, remote, key, dryRun: env.DEPLOY_DRY_RUN === 'true', debug: env.DEPLOY_DEBUG === 'true' };
}

export function transferCommands(source, remote, dryRun) {
  const flags = '--reverse --transfer-all --no-perms --no-symlinks --overwrite --max-errors=1 --verbose=1' + (dryRun ? ' --dry-run' : '');
  // Les guillemets sont inclus littéralement par Pure-FTPd dans la commande CWD.
  // Le chemin est déjà validé ; seuls les espaces nécessitent un échappement lftp.
  const remotePath = remote.replaceAll(' ', '\\ ');
  return [
    `cd ${remotePath}`,
    'echo "Phase 1/2 : assets (aucune suppression distante)."',
    `mirror ${flags} --parallel=2 --exclude-glob=*.html --exclude-glob=deploy-version.json ${quote(source + '/')} ./`,
    'echo "Phase 2/2 : pages HTML (assets déjà transférés)."',
    `mirror ${flags} --parallel=1 --exclude-glob=* --include-glob=*/ --include-glob=*.html ${quote(source + '/')} ./`,
    ...(dryRun ? ['echo "Simulation terminée : aucun fichier envoyé."'] : [`put ${quote(path.join(source, 'deploy-version.json'))} -o deploy-version.json`]),
    'exit',
  ];
}

export function lftpArguments(config, settings, commands) {
  const scheme = config.protocol === 'sftp' ? 'sftp' : config.protocol === 'ftps-implicit' ? 'ftps' : 'ftp';
  // lftp exécute -e avant l'URL si l'option apparaît en premier. L'URL doit donc
  // précéder le script afin que `cd` et `mirror` disposent bien d'une connexion.
  return ['--norc', ...(config.debug ? ['-d'] : []), '--env-password', '--user', config.username, '-p', config.port, `${scheme}://${config.host}`, '-e', [...settings, ...commands].join('\n')];
}

export function redact(line, env) {
  const names = ['FTP_PASSWORD', 'FTP_USERNAME', 'FTP_HOST', 'FTP_REMOTE_PATH', 'SSH_PRIVATE_KEY', 'SSH_KNOWN_HOSTS'];
  const values = names.flatMap(name => (env[name] || '').split(/\r?\n/).filter(value => value.length > (name === 'FTP_PASSWORD' ? 0 : 1)))
    .flatMap(value => [value, encodeURIComponent(value)]).sort((a, b) => b.length - a.length);
  return values.reduce((text, secret) => text.replaceAll(secret, '***'), line);
}

export async function upload(env = process.env) {
  const config = configuration(env);
  const source = path.resolve('dist');
  await verifyStatic(source);
  if (!config.dryRun) {
    const { readFile } = await import('node:fs/promises');
    const stamp = JSON.parse(await readFile(path.join(source, 'deploy-version.json'), 'utf8'));
    if (stamp.commit !== env.GITHUB_SHA || !/^[a-f0-9]{40}$/.test(stamp.commit)) throw new Error('Le marqueur de build ne correspond pas au commit courant.');
  }
  const temporary = await mkdtemp(path.join(tmpdir(), 'lemusicien-deploy-'));
  try {
    const settings = [
      'set cmd:fail-exit yes', 'set cmd:trace no', 'set net:max-retries 2',
      'set net:timeout 25', 'set net:reconnect-interval-base 5',
      'set net:reconnect-interval-max 15', 'set xfer:timeout 120',
      'set xfer:use-temp-file yes', 'set xfer:temp-file-name .*.uploading',
      'set ssl:verify-certificate yes', 'set ssl:check-hostname yes',
    ];
    if (config.protocol === 'sftp') {
      const knownHosts = path.join(temporary, 'known_hosts');
      await writeFile(knownHosts, env.SSH_KNOWN_HOSTS.trim() + '\n', { mode: 0o600 });
      const lookup = config.port === '22' ? config.host : `[${config.host}]:${config.port}`;
      if (spawnSync('ssh-keygen', ['-F', lookup, '-f', knownHosts], { stdio: 'ignore' }).status !== 0) {
        throw new Error('SSH_KNOWN_HOSTS ne contient pas la clé correspondant à FTP_HOST/FTP_PORT.');
      }
      const ssh = ['Host *', '  StrictHostKeyChecking yes', `  UserKnownHostsFile "${knownHosts}"`, '  GlobalKnownHostsFile /dev/null', '  ConnectTimeout 25', '  ConnectionAttempts 1', '  ServerAliveInterval 15', '  ServerAliveCountMax 3', '  IdentityAgent none'];
      if (config.key) {
        const keyPath = path.join(temporary, 'identity');
        await writeFile(keyPath, config.key + '\n', { mode: 0o600 });
        ssh.push(`  IdentityFile "${keyPath}"`, '  IdentitiesOnly yes', '  BatchMode yes', '  PreferredAuthentications publickey');
      } else {
        ssh.push('  BatchMode no', '  NumberOfPasswordPrompts 1', '  PubkeyAuthentication no', '  PreferredAuthentications password,keyboard-interactive');
      }
      const sshConfig = path.join(temporary, 'ssh_config');
      await writeFile(sshConfig, ssh.join('\n') + '\n', { mode: 0o600 });
      settings.push(`set sftp:connect-program ${quote(`ssh -a -x -F ${sshConfig}`)}`);
    } else {
      settings.push('set ftp:passive-mode yes');
      settings.push(...(config.protocol === 'ftp'
        ? ['set ftp:ssl-allow no']
        : ['set ftp:ssl-allow yes', 'set ftp:ssl-force yes', 'set ftp:ssl-auth TLS', 'set ftp:ssl-protect-data yes', 'set ftp:ssl-protect-list yes']));
    }
    const args = lftpArguments(config, settings, transferCommands(source, config.remote, config.dryRun));
    console.log(`${config.dryRun ? 'Simulation' : 'Déploiement'} via ${config.protocol.toUpperCase()} ; contenu de dist/ uniquement.`);
    if (config.protocol === 'ftp') console.warn('Attention : ce mode FTP transmet les identifiants et les fichiers sans chiffrement.');
    const childEnv = { ...env, LFTP_PASSWORD: config.key ? '' : env.FTP_PASSWORD, LFTP_HOME: temporary };
    const code = await new Promise((resolve, reject) => {
      const child = spawn('lftp', args, { env: childEnv, stdio: ['ignore', 'pipe', 'pipe'] });
      for (const stream of [child.stdout, child.stderr]) {
        let buffered = '';
        stream.setEncoding('utf8');
        stream.on('data', chunk => {
          buffered += chunk;
          const lines = buffered.split('\n');
          buffered = lines.pop();
          for (const line of lines) console.log(redact(line, env));
        });
        stream.on('end', () => { if (buffered) console.log(redact(buffered, env)); });
      }
      child.on('error', () => reject(new Error('Impossible de lancer lftp. Vérifier son installation.')));
      child.on('close', code => resolve(code));
    });
    if (code !== 0) throw new Error(`Transfert interrompu (code ${code}). Consulter la phase indiquée ci-dessus ; aucune vérification de succès n’a été lancée.`);
    console.log(config.dryRun ? 'Connexion et simulation réussies. Les droits d’écriture seront confirmés au premier envoi réel.' : 'Transfert terminé. Vérification HTTPS du site à suivre.');
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  upload().catch(error => { console.error(`Déploiement refusé : ${redact(error.message, process.env)}`); process.exitCode = 1; });
}
