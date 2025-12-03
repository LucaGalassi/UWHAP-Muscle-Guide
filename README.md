# UWHAP Muscle Guide

An interactive muscle reference and study companion built with React, Vite, and Tailwind CSS. Browse key anatomy facts, practice with multiple study modes, and keep your spaced-repetition progress synced across devices.

[![Deploy static content to Pages](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/pages-build-deployment.yml/badge.svg)](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/pages-build-deployment.yml)
[![Auto version bump](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/auto-version-bump.yml/badge.svg)](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/auto-version-bump.yml)
[![Build and Deploy from Main](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/build-on-gh-pages.yml/badge.svg)](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/build-on-gh-pages.yml)
## Live site
- The app is hosted on GitHub Pages: https://lucagalassi.github.io/UWHAP-Muscle-Guide/
- No setup is required—open the link to start studying.

## Features
- **Muscle explorer & study dashboard**: Browse muscles, track progress, and view essential metadata in one place.
- **Study modes**: Flashcards, quizzes, smart guidance, and lightning rounds tailored for rapid review.
- **Spaced-repetition friendly**: Persisted progress map with compressed shareable state so you can move between devices.
- **Optional AI assistance**: Paste a Gemini API key into the in-app Settings prompt to generate supplemental explanations. Core content works without any key.
- **Motion previews**: Inline animations for common actions to give quick visual context.
- **Modern tooling**: TypeScript, Vite dev server, hot reload, and Tailwind-based styling.

## Using the Gemini assistant
- AI lookups are opt-in and handled entirely in the browser.
- When prompted in Settings (or via the welcome flow), paste a Gemini API key; no `.env` file is required.
- If you leave the field blank, the app uses the built-in lab manual content instead.

## Local development (optional)
Prerequisites: [Node.js](https://nodejs.org/) (LTS recommended)

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
   Vite will print a local URL (typically `http://localhost:5173`).

## Deployment
- Deployments are automated to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main` or via the **Deploy to GitHub Pages** workflow dispatch.
- Artifacts are built with `npm run build` and published directly to the `github-pages` environment.
