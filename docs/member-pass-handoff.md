# Bibliothèque membre PASS MAO

## Accès et architecture

- Route : `/pass/catalogue/`.
- Sortie statique : `dist/pass/catalogue/index.html`, avec les assets communs dans `dist/`.
- Métadonnée `noindex, nofollow` ; aucun lien ajouté dans la navigation publique.
- Cette URL est discrète, mais **ne constitue pas une authentification**. Toute personne qui connaît l’URL peut consulter le catalogue. Les cours et leurs contrôles d’accès restent dans Systeme.io.
- Aucun serveur, compte local, cookie de connexion ou contenu de cours ajouté. Sans JavaScript, toutes les fiches restent visibles.

## Contenu et maintenance

La page réutilise `BaseLayout`, `Header`, `CourseCover`, `OptionIcon`, les polices locales et les couleurs du catalogue public. Ses styles complémentaires sont dans `src/styles/member-pass.css`.

La source des formations reste `src/data/catalogue.ts`, alimentée par les données partagées du projet. Les deux formations confirmées par Vince, Fondations MAO et Écouter comme un Producer, portent le catalogue du Pass à 28 ressources. L’illustration d’Écouter comme un Producer reprend un visuel de studio du projet, en attendant une couverture dédiée.

Dans `src/data/member-pass.ts` :

- `memberCourseUrls` associe les identifiants de formations aux liens permanents fournis par Vince. Onze liens ont été intégrés ; aucun lien membre n’a été déduit d’une page de vente.
- `memberAccess.school` ouvre la PM School et `memberAccess.schoolInvitation` contient le lien d’invitation pour les personnes qui ne sont pas encore inscrites.
- Les formations sans lien direct affichent « Retrouver dans mes cours » et ouvrent la connexion Systeme.io. Remplacer ce repli en ajoutant leur identifiant dans `memberCourseUrls`.
- `memberUniverses` contient les six parcours et les identifiants associés. Une formation peut figurer dans plusieurs parcours.
- `memberDiscovery` définit le titre, la description et les identifiants de la petite sélection éditoriale. Modifier ces champs pour mettre une nouveauté en avant, sans inventer de date de sortie.

Voix Express ne figure pas dans les données disponibles. Le parcours voix propose les cours réels d’EQ, de compression et de mixage, en précisant qu’ils ne sont pas exclusivement consacrés aux voix.

Les onze liens fournis ont été reproduits exactement. La lecture effective des cours nécessite une session membre autorisée dans Systeme.io et n’est pas vérifiée par le site statique.

## Validation

Exécuter `npm run build` puis `npm run verify:static`. Servir `dist/` avec un serveur HTTP statique pour contrôler la page sans serveur Astro.

Vérifications navigateur : recherche insensible aux accents, six filtres, absence de résultats et remise à zéro, affichage progressif, images, thèmes clair/sombre, absence de débordement de 320 à 1440 pixels, fonctionnement sans JavaScript et absence de lien vers la page depuis les pages publiques.

Validation du 17 septembre 2026 : build réussi, audit statique réussi (6 pages, 105 fichiers, 53 références locales), contrôles Chrome réussis à 320, 390, 525, 768, 1024 et 1440 pixels. Les 28 fiches ont un visuel et les 11 boutons directs utilisent les liens fournis. Aucun échec HTTP ni erreur JavaScript lors de ces contrôles locaux.

L’ajout de cette page ne modifie pas le workflow de déploiement ni les secrets. Le contenu de `dist/` reste l’unité de déploiement.
