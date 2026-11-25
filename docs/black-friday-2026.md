# Black Friday 2026 - checklist avant ouverture
## Offres
- Pack 3 formations : 99 EUR, paiement unique, sélection après achat, attribution manuelle après contrôle du paiement.
- Pass MAO 365 : 299 EUR, paiement unique, 365 jours d'accès au bundle Pass MAO existant, PM School et nouvelles formations incluses selon les droits du Pass. Trois formations éligibles à conserver sans limite de durée, bonus unique à l'issue du premier Pass, même en cas de renouvellement.
- Renouvellement fidélité : 299 EUR, sans reconduction ; à traiter manuellement tant que le parcours n'est pas finalisé.
## Systeme.io
- Pack : https://systeme.io/dashboard/funnels/7839921
- Pass : https://systeme.io/dashboard/funnels/7839922
- Produit Pass 365 créé mais non rattaché au checkout tant que l'expiration n'est pas sécurisée. Produit distinct du Pass récurrent existant ; bundle existant 50096.
- Workflow « Pass MAO 365 - Échéance annuelle (à compléter avant activation) » (579254) : inactif, délai de 365 jours puis ajout du tag Pass 365 - Expiré.
- Règle 2545606 : tag achat BF2026 -> Pass 365 - Actif.
- Règle 2545605 : Pass 365 - Expiré -> retirer Actif, ajouter Retrait accès à vérifier.
- Règle 2545607 : tag Retrait accès à vérifier -> notification interne.
- Règle 2545609 : tag Expiré -> email client de fin de Pass, choix des trois cours ou renouvellement sur réponse.
## À terminer dans l'interface
1. Vérifier si la ressource bundle autorise un délai d'expiration natif de 365 jours ; sinon ajouter le déclencheur Tag ajouté / Pass 365 - Actif au workflow, ainsi qu'un contrôle de droits et d'échéance avant de révoquer le bundle. Ne jamais révoquer chaque cours à l'aveugle.
2. Vérifier le cas de chevauchement avec un Pass classique ou des achats indépendants, et la gestion des remboursements, de la PM School et des renouvellements anticipés. Tester sur un compte dédié sans droits clients réels, avec une copie de workflow à délai court ; ne pas raccourcir le délai du workflow réel.
3. Rattacher le produit Pass et finaliser les deux checkouts et pages merci ; sur le pack, envoyer le client vers /black-friday/merci. Sur le Pass, confirmer les accès et les modalités de fin.
4. Vérifier les 28 cours actuels, maintenir la liste du bonus à jour pour les nouvelles formations, tester les trois choix sans doublons et la confirmation email.
5. Définir fermeture commerciale réelle au 30/11/2026 à 23h59 heure française. Les liens de commande doivent également être fermés, pas uniquement la page publique.
6. Activer le workflow seulement après test. Basculer packReady et passReady dans src/pages/black-friday.astro seulement après validation des parcours. Déployer puis tester en production.
## Sécurité
Le formulaire mailto ne prouve pas un achat. Vérifier la transaction et l'identité avant chaque attribution. Le bonus n'est attribué qu'une fois. Ne pas supprimer des droits permanents acquis indépendamment, ni un Pass renouvelé. Aucun paiement test réel sans accord.
