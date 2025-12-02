<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Cr_IBWJ19pE25MdcvfcCQFNmT-6gJ69k

## GitHub Pages Auto-Deploy

This project has an automated GitHub Actions workflow that:
- **Runs on every push to `main`**
- **Builds** the app with `npm run build`
- **Deploys** the `dist/` folder to the `gh-pages` branch
- **Auto-updates** your live site at: https://lucagalassi.github.io/UWHAP-Muscle-Guide/

The workflow file is located at `.github/workflows/deploy.yml` and is critical to maintaining continuous deployment. If it's accidentally removed, you can restore it from git history or recreate it.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
