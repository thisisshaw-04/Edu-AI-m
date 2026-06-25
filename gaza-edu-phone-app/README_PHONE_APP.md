# Edu(AI)M Phone App Copy

This folder is a phone/tablet app copy of the offline education platform.

## What Is Inside

- `www/` contains the bundled app files.
- `capacitor.config.json` is the mobile wrapper configuration.
- `package.json` is ready for Capacitor if Node dependencies are installed.
- `www/manifest.webmanifest` and `www/sw.js` make the web copy installable/offline-capable as a PWA.

## Android Build Path

From this folder:

```bash
npm install
npm run cap:android
npm run cap:open:android
```

Then build/run from Android Studio.

## Important AI Note

The UI and curriculum work offline. The current tutor AI still calls local Ollama at:

```text
http://localhost:11434/api/chat
```

On a phone, `localhost` means the phone itself. The AI will only work if a local model server is available on that device, or if the app is later configured to call a local school/server address.
