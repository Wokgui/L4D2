# Sauvegardes L4D2 Google Drive

L’interface et l’API conservent les cinq dernières versions de données : la dernière et quatre précédentes. La sauvegarde Supabase existante continue de protéger les données pendant une panne ou tant que Google Drive n’est pas connecté. L’interface signale explicitement ce dernier cas.

Le serveur Vercel doit disposer de quatre secrets : `L4D2_GOOGLE_CLIENT_ID`, `L4D2_GOOGLE_CLIENT_SECRET`, `L4D2_GOOGLE_REFRESH_TOKEN` et `L4D2_DRIVE_FOLDER_ID`. Le jeton doit appartenir au compte Google propriétaire et autoriser les écritures dans le dossier dédié. Ces secrets ne sont jamais envoyés au navigateur et ne doivent pas être ajoutés au dépôt.

L’API vérifie la session Supabase et le rôle propriétaire de L4D2 pour chaque requête. Elle ne liste et ne restaure que les fichiers créés pour cet utilisateur, marqués `l4d2-selector`, dans le dossier configuré. Une ancienne version n’est déplacée à la corbeille qu’après l’écriture réussie de la nouvelle. Les fichiers sans ce marquage ne sont pas touchés.

Lors de la connexion initiale, les dernières sauvegardes existantes sont reprises depuis l’historique Supabase du propriétaire pour remplir les cinq versions Drive. Une version récente déjà présente dans Drive n’est jamais remplacée par une ancienne. Les dates historiques sont conservées.

Les gros transferts de sauvegarde et de restauration utilisent une enveloppe gzip/base64 afin de respecter la limite Vercel de taille de requête et de réponse avec les images intégrées. La décompression côté serveur est limitée à 20 Mo. Une erreur d’envoi reste affichée au lieu d’être masquée par le rechargement de l’historique.

Après configuration, contrôler réellement sept sauvegardes successives dans Drive, la conservation des cinq dernières, puis une restauration depuis le téléphone. Les tests simulés de l’API ne remplacent pas cette vérification.

Construire l’interface avec `node tools/build-ui.cjs`. Tester la rotation avec `node --test tests/drive-backup.test.cjs`.
