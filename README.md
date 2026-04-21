# J-VOX AAC

Augmentative and Alternative Communication (AAC) Progressive Web App.

## Deploy to GitHub Pages

1. Upload all files to your GitHub repo (e.g. `johnlaz.github.io/jvox/`)
2. In repo Settings → Pages → set source to `main` branch, `/ (root)` or `/jvox` folder
3. Visit your URL — tap browser menu → **"Add to Home Screen"** to install as PWA

## File Structure

```
jvox/
├── index.html          ← Main app (single file, all logic inside)
├── manifest.json       ← PWA install manifest
├── sw.js               ← Service worker (offline support)
├── apple-touch-icon.png ← iOS home screen icon
├── icons/
│   ├── icon-192.png    ← PWA icon (Android/Chrome)
│   └── icon-512.png    ← PWA icon (large/splash)
└── README.md
```

## Features

- 12 pre-built categories with 150+ phrases
- Icons on every phrase button
- Magic Wand AI sentence refinement (requires free Groq API key)
- Web Speech API TTS — no subscription needed
- Dark Luxury + Bright Colorful themes
- PIN-free edit mode with backup reminder
- Add/edit/delete categories, phrases, scenes, and symbols
- Backup & Restore to JSON
- Full offline support after first load
- Haptic feedback

## Getting a Groq API Key (Free)

1. Go to https://console.groq.com
2. Create a free account
3. Generate an API key
4. Paste it in J-VOX Settings → Groq API Key

## Default Edit Mode

Edit mode is unlocked from Settings → Unlock Edit Mode.
No PIN required — just tap confirm.
**Always back up before editing** using Settings → Backup My Data.

## Default PIN

No PIN used in this version. Edit lock is confirmation-only.

---
Built with ❤️ for Johnny and non-verbal communicators everywhere.
