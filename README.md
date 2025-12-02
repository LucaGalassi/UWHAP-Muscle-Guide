
## Deployment (GitHub Pages)

- **Automatic deploys:** This repo is configured to deploy to GitHub Pages via GitHub Actions on pushes to `main`.
- **Pages URL:** Once deployed, the site will be available at `https://<your-github-username>.github.io/UWHAP-Muscle-Guide/`.
- **What the workflow does:** The action runs `npm ci`, then `npm run build` and publishes the generated `dist` folder to the `gh-pages` branch using the built-in `GITHUB_TOKEN`.

 

