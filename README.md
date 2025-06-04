# Board Game App

A fully offline board game web app built with React, using **IndexedDB** for local storage and **PWA** support for installability. No backend required—users can play, save, and load their game progress locally, even without an internet connection!

## Features

- ⚡ 100% offline-ready (Progressive Web App)
- 💾 Persistent local storage with IndexedDB (via `idb`)
- 🚀 Fast and modern front-end (React + Vite)
- 🏠 Installable to device home screen
- 📦 Ready for deployment as a static site

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (usually comes with Node.js)
- A code editor like Visual Studio Code (recommended)

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone https://git.fhict.nl/I539945/board-game-project.git
```
### How to Start the Application

1. Open the project directory in CMD:

```bash
cd boardgame-app
```
2. Install Dependencies in CMD:

```bash
npm install
```

3. Run the Development Server in CMD:

```bash
npm run dev
```

4. Build for Production in CMD:

```bash
npm run build
```

4. Preview the Production Build in CMD:

```bash
npm run preview
```

---

## Project Structure

```bash
src/
  components/       # React components (game board, controls, etc.)
  db/               # IndexedDB logic (e.g., idb.js)
  App.jsx           # Main app file
  index.jsx         # Entry point
  styles/           # CSS styles
public/
  manifest.webmanifest  # PWA manifest
  icons/                # App icons
vite.config.js      # Vite + PWA plugin config
```

## IndexedDB Storage
All game data is stored in the browser using IndexedDB. The helper functions in src/db/idb.js provide a simple API to save and load game state.

```bash
import { saveGameState, loadGameState } from './db/idb';

// Save state
await saveGameState('main', gameData);

// Load state
const gameData = await loadGameState('main');

```

### Deployment
You can deploy the built site (dist/ folder) to any static hosting, such as:

- Netlify

- Vercel

- GitHub Pages

### Customization
- Add your own React components to the src/components/ folder.

- Update the IndexedDB logic as needed in src/db/idb.js.

- Change app icons and manifest in the public/ folder.

- Adjust PWA settings in vite.config.js.


### Credits
- React

- Vite

- idb (IndexedDB helper)

- vite-plugin-pwa

---

## Step-by-Step: How to Use This App
Download or clone the repository.

Install dependencies: 'npm install'

Start the app: 'npm run dev'

Open the app in your browser.

Play your board game! Your progress is saved locally (even if you close the browser).

Install the app to your device for the full offline experience (look for “Install” or “Add to Home Screen” in your browser).

Deploy if you want to share your app with others ('npm run build' and upload the 'dist/' folder).

---

## Troubleshooting

### App Won’t Work Offline
- Run `npm run build` and `npm run preview` to test the production build.
- Check the browser Console for service worker errors.
- If offline mode fails, clear your browser cache and refresh.

### IndexedDB Issues
- Use `npm run dev` or `npm run preview` (do not use `file://` paths).
- Some browsers’ private/incognito mode may block IndexedDB.
- Check the Console for errors and confirm you’re using Chrome, Edge, or Firefox.

### App Not Installable
- Make sure `manifest.webmanifest` and icons are present in the `public/` folder.
- Check that your service worker is active (see Application tab in DevTools).

### App Not Updating
- PWAs use caching, so updates may take time to appear.
- Hard refresh the app (Ctrl+Shift+R or Cmd+Shift+R).

### Still Stuck?
- Check browser DevTools (Console/Application tab) for errors.
- Open an issue or contact the maintainer with details.

