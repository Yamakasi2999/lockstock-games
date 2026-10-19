# LockStock Games

An English-language React landing page for LockStock Games and UFO CASH, based on the supplied design assets.

## Run locally

Requires Node.js 22.12+ (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173.

On this Mac, double-click `start.command` to start the app. It uses the project-local Node.js runtime in `.runtime/node/`, or an installed Node.js if the local runtime is absent. You can also run `./start.command` from Terminal; global `npm` is not needed on this Mac. The runtime is excluded from version control and production builds.

```sh
npm run build
npm run preview
```

The production build is generated in `dist/` and can be served by any static host.

## Content

- Page, game host URL and contact email: `src/App.jsx`.
- Base styles: `src/styles.css`.
- First Contact concept, responsive scene and partner sections: `src/concept.css`.
- Local font files are bundled through `@fontsource/nunito`.
- First Contact hero illustration: `public/images/ufo-world.jpg`, created with ImageGen from the supplied art references. Prompt: `design/ufo-world-prompt.txt`.
- Earlier supplied mascot remains in `public/images/mascot.jpg`; the new page does not use PROJECT X lettering.
- The previous React design is preserved in `design/react-v1/`.
- AI-localized English concept image: `public/images/ufo-cash.jpg`. This is an illustrative poster, not a capture of the live English game.

## Game embed

The live game loads from https://api-dev.lockstock-games.com/demo?game=crash&currency=INR after the visitor clicks **Play UFO CASH** or **Enter the cockpit**. The website supports fullscreen where the browser permits it, and always offers a direct game link. The language and mobile layout inside the cross-origin iframe are controlled by the game host.

Partnership links open an email to lockstock-games@lockstock.com.

### Launch URL configuration

The default demo-launch URL uses game `crash` and currency `INR`. Copy `.env.example` to `.env.local`, set `VITE_GAME_URL` to the complete demo URL, then restart Vite. Vite embeds this URL in the public browser bundle; never put provider secrets or backend credentials here. The landing page itself does not issue game sessions.

## Phone / local network

`npm run dev` listens on all network interfaces. Open the Network URL printed by Vite on a phone connected to the same local network as this Mac.

## Motion and interaction

`src/motion.css` adds masked headline entrances, section reveals, a continuous ticker, glass navigation, button highlights, diagram scanning, and hover depth. `src/useAtmosphere.js` manages scroll progress, pointer/scroll parallax, reveal observers and tilt. `src/Starfield.jsx` renders a lightweight particle layer; its loop stops when the hero or browser tab is hidden.

The hero’s **Motion** toggle pauses ambient animation and makes every reveal visible. The system’s `prefers-reduced-motion` setting also disables movement. Pointer parallax and tilt are restricted to fine-pointer devices. Prior concept files are retained in `design/react-v2/`.

## About and team

`src/AboutSection.jsx` contains the studio description and six crew cards; edit names, roles and optional photo URLs in `src/team.js`. The default avatars are abstract vector illustrations with initials, not real portraits. Layout and card styling live in `src/about.css`.

## Publish on GitHub Pages

1. Create a GitHub repository and upload this project, including `.github/workflows/deploy-pages.yml`. Use `main` as the default branch.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Push a commit to `main`, or open **Actions → Deploy to GitHub Pages → Run workflow**.
4. When deployment succeeds, the site URL appears in **Settings → Pages** and in the workflow deployment output.

The workflow builds the React app, uploads only `dist/`, and uses GitHub Pages metadata to set the correct asset base path. No local Node runtime or prebuilt `dist/` needs to be uploaded. Normal development still runs at the root URL.

The optional GitHub Actions repository variable `VITE_GAME_URL` overrides the demo URL. If it is absent, the built-in demo link is used. Local `.env.local` files are not sent to GitHub.

A repository called `lockstock-games` normally produces `https://YOUR_USERNAME.github.io/lockstock-games/`. Future pushes to `main` rebuild and update the site automatically.

Official guides: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site and https://vite.dev/guide/static-deploy.html#github-pages.
