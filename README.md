# UWHAP Muscle Guide

An interactive muscle reference and study companion built with React, Vite, and Tailwind CSS. The app bundles structured muscle data, study modes (flashcards, quizzes, smart guides, lightning rounds), and optional Gemini-powered assistance to help learners practice anatomy efficiently. It also ships with built-in motion visualizers to preview joint actions without leaving the app.

## Features
- **Muscle explorer & study dashboard**: Browse muscles, track progress, and view key metadata in one place.
- **Spaced-repetition friendly**: Persisted progress map with compressed shareable state for continuing study on other devices.
- **Multiple study modes**: Flashcards, quizzes, smart guidance, and lightning rounds tailored for quick reviews.
- **AI assistance (optional)**: Plug in a Gemini API key to generate supplemental explanations and details for muscles.
- **Motion visualizers**:
  - **Beta Animation Viewer (V6.5)**: Inline SVG motions for common actions (flexion, extension, abduction, etc.) with play/pause controls.
  - **Advanced 3D Animation Viewer (Experimental)**: `react-three-fiber` rig with motion and camera presets for richer articulation previews.
- **Modern tooling**: TypeScript, Vite dev server, hot reload, and Tailwind-based styling.

## Quick start
Prerequisites: [Node.js](https://nodejs.org/) (LTS recommended)

1. Install dependencies
   ```bash
   npm install
   ```
2. Add your Gemini API key (optional but required for AI-assisted content)
   ```bash
   cp .env.local.example .env.local  # if the file exists in your workspace
   # then set GEMINI_API_KEY in .env.local
   ```
   Or create `.env.local` manually and set `GEMINI_API_KEY=<your_key>`.
3. Run the development server
   ```bash
   npm run dev
   ```
   Vite will print a local URL (typically `http://localhost:5173`).

## Available scripts
- `npm run dev` – start the Vite development server.
- `npm run build` – type-check with `tsc` and generate a production build in `dist/`.
- `npm run preview` – serve the production build locally for smoke testing.

## Deployment
This project auto-deploys to GitHub Pages using the modern Pages workflow.
- Trigger: any push to `main` (or manual `workflow_dispatch` from the Actions tab).
- Workflow: `.github/workflows/deploy.yml` builds the app (`npm run build`), uploads the `dist` artifact, and publishes with `actions/deploy-pages@v4`.
- No `gh-pages` branch is required; deployments publish directly from the built artifact.

To deploy manually without pushing code, open the Actions tab and run the **Deploy to GitHub Pages** workflow via **Run workflow**.

## Motion viewer details
- **Beta Animation Viewer (V6.5)**
  - Quick inline SVG animations for common motions.
  - Access: From any muscle view header, click the **Beta Animation** (sparkles) button.
  - Reminder: Motions are approximate and meant for general visualization only.
- **Advanced 3D Animation Viewer (Experimental)**
  - Requires installing 3D dependencies:
    ```bash
    npm install three @react-three/fiber @react-three/drei
    ```
  - Access: Click the **Target** icon in the muscle header.
  - Includes articulated limb rig presets, camera presets (front/side/top), orbit controls, axis helpers, and angle readouts. This is still an approximation, not a medical simulation.

## Project metadata
- App listing: https://ai.studio/apps/drive/1Cr_IBWJ19pE25MdcvfcCQFNmT-6gJ69k
- Tech stack: React 18, TypeScript, Vite 5, Tailwind CSS, `three`/`@react-three/fiber` (for experimental animations), and optional Google Gemini API integration.

## Support & contribution
Issues and pull requests are welcome. Please open a ticket with reproduction steps for any bugs you encounter, especially around the experimental animation viewers or Gemini-powered content.
