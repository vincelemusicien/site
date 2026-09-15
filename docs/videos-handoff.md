# Vidéothèque YouTube

Route : `/videos/`. Source : chaîne publique https://www.youtube.com/@vincelemusicien (`UCA13Jn6ozikWGsel8B2VaQQ`). Premier import : 362 vidéos, 80 lives et 39 Shorts, soit 481 IDs uniques.

## Navigation et lecture

Entrée « Vidéos » dans le menu et depuis l’accueil. Recherche sur les titres, insensible aux accents et à la casse, avec plusieurs mots. Sept thèmes cumulables dans les données, un filtre de thème à la fois dans l’interface. Formats séparés ; la recherche porte sur le format sélectionné. Affichage progressif par 18. Titres et miniatures YouTube authentiques ; aucune durée ou date de publication inventée (non disponibles dans l’extraction utilisée).

Le lecteur YouTube sans cookies est chargé au clic, sans lecture automatique. `?v=ID#lecteur` ouvre une vidéo et permet le partage. Le lien YouTube reste disponible si une vidéo interdit l’intégration. Sans JavaScript, tous les liens de vidéos fonctionnent sur YouTube.

## Actualisation

Installation sur un nouvel environnement (Python 3.9+ et accès réseau) :

```sh
npm run videos:setup
npm run videos:sync
npm run build
```

`npm run build` et `npm run build:sites` tentent automatiquement une synchronisation avant la compilation. La prévisualisation `npm run dev` utilise le catalogue enregistré : lancer `npm run videos:sync` pour le rafraîchir.

La synchronisation récupère les trois onglets publics, en français, sans clé API, cookie de connexion ou téléchargement de médias. On utilise une version de yt-dlp vérifiée lors de l’import ; elle peut nécessiter une mise à jour si YouTube change. `YT_DLP` permet de fournir le chemin d’un autre exécutable. Le venv reste local et ignoré par Git ; le JSON est versionné pour qu’un déploiement sans Python ou extracteur reste possible.

Le script n’écrit le fichier qu’après validation de tous les onglets et de l’identité de la chaîne. Une chute de plus de 20 % du nombre de contenus est rejetée pour éviter un import partiel. La commande explicite de synchronisation échoue si nécessaire ; les hooks de build conservent le dernier catalogue et affichent un avertissement.

Le site reste statique : les nouvelles vidéos apparaissent après un nouveau build **et son déploiement**. Aucun service planifié ni déploiement automatique n’a été activé. L’environnement qui construit le site doit exécuter `npm run videos:setup` pour bénéficier du rafraîchissement.

## Classement

`src/data/videos.ts` contient les règles de classement par titre et les trois points de départ choisis dans la chaîne. Une vidéo peut appartenir à plusieurs thèmes. C’est un classement heuristique, pas une analyse du contenu audio. Les titres sans correspondance sont rangés dans « Coulisses & échanges » ; ajuster les règles au fil des nouveaux sujets.

Fichiers : `src/pages/videos.astro`, `src/styles/videos.css`, `src/data/videos.ts`, `src/data/videos/catalogue.json`, `scripts/videos/sync.py`.
