# Archives L4D2 — contrôles et utilisation

## Modifications demandées

- `Dark Woods` ajoutée aux campagnes gardées avec une fiche détaillée modifiable.
- `Never Ending War : Redux` réintégrée puis reclassée en `POURQUOI PAS` avec la remarque sur le lag de la troisième carte.
- `Whispers beyond the wind remake` retirée de la base finale.
- `Whispers of winter`, qui est une campagne différente, conservée.

## Contrôles effectués

- Lecture des 762 entrées de l’Excel et conservation de leurs catégories et remarques.
- Conservation de toutes les propriétés originales du JSON pour les campagnes gardées restantes, notamment les images intégrées.
- Comparaison nominative JSON–Excel avec rapport des correspondances exactes, approximatives et absentes.
- Ouverture réelle de l’application dans un navigateur local.
- Recherche de `Dark Woods` : 1 résultat et ouverture correcte de la fiche.
- Recherche des deux campagnes supprimées : 0 résultat.
- Recherche de `Whispers of winter` : 1 résultat.
- Filtre `NON` : 255 résultats.
- Tirage aléatoire et relance : fonctionnels.
- Tirage filtrable par difficulté et longueur.
- 58 nouvelles cartes ou anciennes cartes reclassées, avec leurs remarques.
- Toutes les campagnes `OUI` disposent maintenant d’une fiche détaillée.
- Quatre catégories uniquement : `OUI`, `POURQUOI PAS`, `BOF`, `NON`.
- Les anciennes entrées `BIEN AUSSI` ont été intégrées à `POURQUOI PAS`.
- Ouverture initiale limitée aux campagnes `OUI`.
- Ajout manuel d’une campagne testé avec catégorie, cartes, difficulté et remarque.
- Console du navigateur : aucune erreur ni alerte.

## Utilisation

Ouvrir `index.html`. La recherche porte sur le nom, les catégories, les remarques, les notes et la difficulté. Les fiches gardées sont modifiables ; leurs changements sont enregistrés sur l’appareil. Les boutons d’import et d’export permettent de transférer cette sauvegarde.

Pour un déploiement, publier tout ce dossier sans en retirer de fichiers.
