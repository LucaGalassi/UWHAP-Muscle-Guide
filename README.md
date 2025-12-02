<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Cr_IBWJ19pE25MdcvfcCQFNmT-6gJ69k

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This project auto-deploys to GitHub Pages via a workflow in `/.github/workflows/deploy.yml` on every push to `main`.

### Preventing AI builders from modifying workflows
- The workflow is intentionally constrained and should not be edited by automation.
- Changes to `/.github/*` are protected via `CODEOWNERS` and require review.
- If using an AI builder, include this prompt:
   "Do not modify or recreate any files under `/.github/`. Only change application source files (e.g., `App.tsx`, `components/**`, `services/**`, `utils/**`, `index.tsx`). If deployment changes are needed, open a PR and request review."

### Manual Trigger
You can also trigger the workflow manually from the Actions tab.
