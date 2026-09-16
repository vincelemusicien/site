# Déploiement de lemusicien.fr vers GNC/cPanel

Le workflow `.github/workflows/deploy.yml` publie le **contenu** de `dist/` à chaque
push sur `main`. Le dépôt est `https://github.com/vincelemusicien/site.git`.
L’accès SSH ayant été confirmé pour GNC, le protocole par défaut est **SFTP**.
Node 24 est utilisé uniquement sur GitHub pour construire Astro ; aucun processus
Node, serveur Astro, shell distant ou rsync distant n’est nécessaire sur GNC.

## Secrets GitHub à créer

Dans le dépôt : **Settings → Secrets and variables → Actions → Secrets → New repository secret**.
Ne mettre aucune de ces valeurs dans le YAML, dans un commit ou dans une capture publique.

| Secret | Valeur à récupérer / renseigner |
| --- | --- |
| `FTP_HOST` | Nom exact du serveur SSH donné par GNC/cPanel, sans `sftp://`, sans chemin. Ne pas utiliser automatiquement `lemusicien.fr` si GNC indique un autre serveur. |
| `FTP_USERNAME` | Identifiant **SSH/cPanel**, qui n’est pas nécessairement l’adresse d’un compte FTP. |
| `FTP_PORT` | Port SSH confirmé par GNC, souvent `22`. Si absent, SFTP utilise `22`. |
| `FTP_REMOTE_PATH` | Chemin absolu de la racine web de `lemusicien.fr`, tel qu’il apparaît en SFTP. Exemple uniquement : `/home/IDENTIFIANT/public_html/`. |
| `SSH_KNOWN_HOSTS` | Ligne(s) `known_hosts` de la clé **du serveur**, vérifiée auprès de GNC. Pour un port non standard, la ligne doit utiliser `[serveur]:port`. |
| `SSH_PRIVATE_KEY` | Contenu complet d’une clé privée dédiée au déploiement, non chiffrée par une passphrase, dont la clé publique est autorisée dans cPanel. Méthode recommandée. |
| `FTP_PASSWORD` | Alternative en SFTP si aucune `SSH_PRIVATE_KEY` n’est définie : mot de passe du compte SSH/cPanel. Également utilisé pour FTPS. Inutile si une clé SFTP est utilisée. |

Avec la méthode recommandée, renseigner les cinq premiers secrets et
`SSH_PRIVATE_KEY`. Aucun secret `GITHUB_TOKEN` n’est à créer : GitHub le fournit.
Le nom `FTP_*` des secrets est conservé pour pouvoir changer de protocole sans
renommer la configuration ; il ne force pas l’utilisation de FTP.

### Où trouver les informations dans cPanel/GNC

1. **Domains / Domaines** : lire la **Document Root / Racine du document** associée
   précisément à `lemusicien.fr` (pas celle d’un sous-domaine).
2. **Security → SSH Access / Sécurité → Accès SSH** : vérifier le compte et gérer
   les clés. Le port et le nom du serveur sont à confirmer dans l’espace client
   GNC ou auprès du support si cPanel ne les affiche pas.
3. Se connecter une fois avec un client SFTP (FileZilla, Cyberduck…) pour vérifier
   le chemin de destination et la présence du site existant. Un environnement
   SFTP restreint peut afficher un chemin différent du chemin système cPanel.
4. Demander à GNC l’empreinte SHA256 de la clé hôte SSH. La clé hôte identifie le
   serveur ; ce n’est pas la clé personnelle importée dans cPanel.

Créer une clé de déploiement depuis le Mac, **hors du dépôt** :

```sh
ssh-keygen -t ed25519 -C "github-actions-lemusicien" -f ~/.ssh/lemusicien_deploy -N ''
```

Importer le contenu de `~/.ssh/lemusicien_deploy.pub` dans **Manage SSH Keys →
Import Key**, puis **Manage → Authorize**. Mettre le contenu de
`~/.ssh/lemusicien_deploy` dans le secret `SSH_PRIVATE_KEY`, en conservant les
lignes `BEGIN` / `END` et les retours à la ligne. La clé privée reste protégée par
GitHub Secrets et ne doit jamais être committée.

Pour préparer `SSH_KNOWN_HOSTS`, remplacer `SERVEUR_GNC` et `PORT_SSH` :

```sh
ssh-keyscan -p PORT_SSH SERVEUR_GNC > /tmp/lemusicien-known-hosts
ssh-keygen -lf /tmp/lemusicien-known-hosts
```

**Comparer les empreintes au renseignement obtenu de GNC** avant de copier le
contenu du fichier dans `SSH_KNOWN_HOSTS`. `ssh-keyscan` seul ne prouve pas
l’identité du serveur. Le workflow refuse une clé absente, inconnue ou modifiée.

## Premier test, sans écriture

1. Créer les secrets ci-dessus. Vérifier que GitHub Actions est autorisé dans le
   dépôt (**Settings → Actions → General**).
2. Le workflow doit exister sur GitHub. Si le premier push a eu lieu avant la
   création des secrets, son échec « Secret manquant » est attendu : aucun
   transfert n’a lieu. Ne pas ajouter de faux identifiants pour le contourner.
3. Aller dans **Actions → Déployer lemusicien.fr → Run workflow**.
4. Choisir la branche **main** et laisser **Simuler le transfert** coché.
5. Vérifier les étapes vertes : installation, build, validation de `dist`, tests
   du transfert et connexion SFTP. Le journal de la simulation liste les fichiers
   qui seraient transférés. Elle confirme la connexion et la lecture de la
   destination, mais pas encore les droits d’écriture.
6. Avant l’envoi réel, garder une sauvegarde cPanel des fichiers actuels du site.
   Vérifier que la racine choisie est bien celle de `lemusicien.fr`.
7. Relancer **Run workflow** sur **main**, en décochant la simulation.
8. Attendre **Vérifier la version servie par le domaine** : le workflow compare
   le marqueur de version et les cinq pages publiques avec les fichiers du build.
   Puis visiter `/`, `/formations/`, `/pass-mao/` et `/videos/`.

Les exécutions manuelles depuis d’autres branches sont ignorées. Un push sur
`main` lance un **déploiement réel**, pas une simulation.

Une fois les secrets et le premier test validés, le cycle normal est :

```sh
git add CHEMINS_DES_FICHIERS_MODIFIES
git commit -m "Mettre à jour le site"
git push
```

Le premier raccordement, s’il n’a pas déjà été poussé, utilise `git push -u origin main`.
Les résultats sont visibles dans **Actions → Déployer lemusicien.fr**, avec le
commit et le statut dans le résumé de l’exécution.

## Comportement du transfert

- `npm ci`, puis `npm run build`, puis vérification de `dist/index.html` et des
  références locales HTML/CSS. Les sorties serveur, liens symboliques et fichiers
  `.env` sont refusés.
- `lftp`, fourni par Ubuntu, utilise SFTP/OpenSSH avec contrôle de la clé hôte.
  Les deux actions GitHub officielles utilisées pour checkout et Node sont figées
  sur un SHA de version vérifié.
- Seul le contenu de `dist/` est envoyé dans `FTP_REMOTE_PATH` : aucun niveau
  `/dist/` supplémentaire. Le dossier distant doit déjà exister.
- Les assets sont envoyés avant les HTML, puis `deploy-version.json` en dernier.
  Les fichiers sont transférés sous un nom temporaire puis renommés. Le site
  entier n’est pas remplacé atomiquement : en cas de coupure entre deux pages,
  certaines pages peuvent encore être de la version précédente.
- **Aucune suppression distante** : pas de `--delete`, pas de purge de la racine.
  Les fichiers homonymes du site sont mis à jour. Les dossiers annexes et fichiers
  absents du build, y compris `.htaccess`, sont conservés. Les anciens assets et
  anciennes pages retirées du code restent donc présents jusqu’à un nettoyage
  manuel ciblé.
- Deux déploiements ne tournent jamais en même temps. Un transfert commencé n’est
  pas annulé par un nouveau push. Les erreurs et délais réseau font échouer le job.
- Les mots de passe passent par l’environnement, jamais dans une commande shell,
  une URL ou un script imprimé. Les clés SSH temporaires sont privées et nettoyées.
- Les miniatures et lecteurs YouTube restent externes. Si la synchronisation
  optionnelle YouTube est indisponible sur le runner, le catalogue committé est
  utilisé ; cela ne bloque pas le build statique.

### Si la vérification du domaine échoue

Le transfert n’est déclaré validé qu’après lecture de la nouvelle version par HTTPS.
Un mauvais document root, une ancienne règle de redirection, un `index.php`
prioritaire ou un cache/CDN peut servir une autre page malgré un transfert réussi.
Vérifier ces points dans cPanel. Si nécessaire, adapter le `DirectoryIndex` existant
pour donner la priorité à `index.html`, **sans écraser le `.htaccess` complet ni
supprimer les applications annexes**. Purger le cache concerné puis relancer.
Le marqueur `https://lemusicien.fr/deploy-version.json` indique le commit publié.

## FTPS en solution de repli

À utiliser seulement si GNC confirme que SFTP n’est finalement pas accessible.
Dans **Settings → Secrets and variables → Actions → Variables**, définir :

| Variable | Valeur |
| --- | --- |
| `DEPLOY_PROTOCOL` | `ftps` pour TLS explicite (port habituel `21`) ; `ftps-implicit` uniquement si GNC l’exige (port habituel `990`). Sans variable : `sftp`. |
| `SITE_URL` | Optionnelle : `https://lemusicien.fr`, valeur par défaut. Le site est conçu pour la racine du domaine. |

Renseigner `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PORT` et
`FTP_REMOTE_PATH` avec **Files → FTP Accounts → Configure FTP Client**.
Un compte FTP limité directement à la racine web peut avoir `/` comme chemin
distant. Les secrets SSH ne sont alors pas utilisés. Utiliser le nom de serveur
couvert par son certificat TLS, qui peut être différent du domaine du site.
La validation du certificat et le chiffrement des données restent obligatoires.

Le script connaît aussi le protocole `ftp`, mais le refuse sauf si la variable
`ALLOW_INSECURE_FTP` vaut explicitement `true`. FTP sans TLS n’est **pas sécurisé**
et n’est jamais choisi automatiquement après un échec SFTP/FTPS. Si GNC ne propose
que ce mode, demander d’abord l’activation de SFTP ou FTPS au support.

## Validation locale et sources

```sh
npm ci
npm run build
npm run verify:static
npm run test:deploy # lftp doit être installé pour les tests locaux de transfert
```

Les tests de transfert utilisent exclusivement des dossiers temporaires locaux.
Ils ne contactent pas GNC et ne requièrent aucun secret.

- [cPanel : configurer un client SFTP](https://docs.cpanel.net/knowledge-base/ftp/how-to-configure-your-sftp-client/)
- [cPanel : accès et clés SSH](https://docs.cpanel.net/cpanel/security/ssh-access/)
- [cPanel : comptes FTP et configuration FTPS](https://docs.cpanel.net/cpanel/files/ftp-accounts/)
- [Manuel lftp : mirror, simulation et fichiers temporaires](https://lftp.yar.ru/lftp-man.html)
