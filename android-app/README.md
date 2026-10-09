# L4D2 Android 1.0

Application Android avec site embarqué, origine HTTPS catalogue-l4d2.vercel.app, imports/exports via le sélecteur Android, icône adaptative et écran de chargement natif 112 dp avec titre et barre.

Les versions web restent disponibles. L'application Android possède son propre stockage : utiliser la restauration/synchronisation déjà présente dans le site pour récupérer les données de Chrome. Ne pas désinstaller la version web avant transfert.

Construire avec Gradle 8.10.2, JDK 17, Android SDK 35, WOKGUI_NATIVE_KEYSTORE pointant vers la clé stable. Les clés privées ne sont pas dans la sauvegarde.
