# Creator Clap

AI-powered creator economy platform — creators, service providers, and brands in one marketplace.

**Live:** https://originaonxi.github.io/creator-clap/

## Pages

- `/` — landing page
- `/login`, `/signup/:userType` — auth (creator / provider / brand)
- `/creator/dashboard`, `/creator/book` — creator dashboard and service booking
- `/provider/dashboard` — provider dashboard
- `/brand/dashboard`, `/brand/campaign/create` — brand dashboard and campaign builder
- `/be-famous`, `/be-famous/pitch` — Be Famous landing and pitch submission
- `/cc-tv` — CC TV

Auth is a front-end demo: login/signup creates a mock user stored in `localStorage`. There is no backend yet.

## Develop

```bash
npm install
npm run dev
npm run build
```

Stack: React 18, TypeScript, Vite, Tailwind CSS, React Router, lucide-react.
Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
