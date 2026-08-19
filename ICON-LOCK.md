# Icône Android L4D2 — verrouillée

Ne pas modifier les entrées `icons` de `manifest.webmanifest` lors des changements d’interface, de splash screen ou de sauvegarde.

Configuration à conserver :

- `l4d2-final-192-v52.png` en 192×192, `purpose: any`.
- `l4d2-maskable-512-v53.png` en 512×512, `purpose: any`.
- `l4d2-maskable-512-v53.png` en 512×512, `purpose: maskable`.

La présence de l’entrée `maskable` est indispensable pour éviter que Samsung/Android réduise l’image à l’intérieur d’un carré arrondi.

Le workflow `.github/workflows/check-pwa-icon.yml` vérifie automatiquement cette configuration.
