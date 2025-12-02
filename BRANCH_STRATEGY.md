# Single-Branch Strategy: Everything on `main`

## Overview
This project uses **one branch** for both source code and automation:

- **`main`** — Everything (React components, services, CI config, build files)

**Why this works**:
- App builder only has access to `main` → simple workflow
- Workflow automatically handles missing `package-lock.json` (generates it if needed)
- No branch conflicts or merging required
- Everything is in sync

---

## What's on `main`

**Source Code** (app builder's domain):
- `components/` — React components
- `services/` — API services (Gemini, etc.)
- `utils/` — Utility functions
- `App.tsx`, `index.tsx` — App entry points
- `types.ts`, `constants.ts` — Type definitions
- `index.css`, `index.html` — Styles and template

**Automation & Build Config** (shared/protected):
- `.github/workflows/deploy.yml` — Auto-deploy workflow (protected, critical)
- `tsconfig.json` — TypeScript build config
- `package-lock.json` — Exact dependency versions
- `.github/.gitkeep` — Directory protection

**Documentation**:
- `README.md` — Project docs
- `BUILD_FIXES_SUMMARY.md` — Build reference
- `package.json` — Dependencies

---

## Workflow

### App builder: push source code to `main`
```bash
git checkout main
git pull origin main

# Make changes (components, services, utils, etc.)
# ...

git add components/ services/ App.tsx index.tsx
git commit -m "feat: add new feature"
git push origin main
```

**Result**: GitHub Actions automatically:
1. Checks out the code
2. Installs dependencies (with fallback if `package-lock.json` missing)
3. Builds the app
4. Deploys to GitHub Pages

### Handling build failures
If the build breaks (e.g., `tsconfig.json` issues):

```bash
# Check the error in GitHub Actions tab
# https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions

# Fix the build config locally
# (update tsconfig.json, package.json, etc.)

git add tsconfig.json
git commit -m "ci: fix build error"
git push origin main

# Workflow automatically retries
```

---

## Key Files (Do Not Delete)

| File | Purpose | Protected |
|------|---------|-----------|
| `.github/workflows/deploy.yml` | Auto-deploy workflow | ⚠️ Critical |
| `tsconfig.json` | TypeScript config | Needed for build |
| `package.json` | Dependencies | Needed for build |
| `package-lock.json` | Dependency lock | Generated if missing |
| `.github/.gitkeep` | Directory protection | Preserves .github/ |

---

## GitHub Actions Workflow

Triggered on every push to `main`:

```yaml
steps:
  1. Checkout code from main
  2. Setup Node.js 20
  3. Install dependencies:
     - If package-lock.json exists → npm ci
     - Otherwise → npm install (auto-generates lock file)
  4. Build: npm run build
  5. Deploy to gh-pages branch
```

**Result**: Live site updates automatically at https://lucagalassi.github.io/UWHAP-Muscle-Guide/

---

## Avoiding Conflicts

### ✅ Safe to do on `main`
- Add/update React components
- Modify services or utils
- Update `package.json` (add dependencies)
- Change `index.tsx`, `App.tsx`

### ⚠️ Handle with care on `main`
- Editing `tsconfig.json` — only if you understand TypeScript config
- Deleting `package-lock.json` — it will be regenerated, but wastes time
- Touching `.github/workflows/` — only if CI is broken and needs fixing

### Never delete
- `.github/workflows/deploy.yml` — breaks auto-deploy
- `.github/.gitkeep` — unprotects the directory

---

## Common Tasks

### Add a new npm dependency
```bash
npm install new-package
git add package.json package-lock.json
git commit -m "feat: add new-package"
git push origin main
```

### Fix a TypeScript error
```bash
# Edit tsconfig.json or source files
# ...
git add tsconfig.json
git commit -m "ci: fix TypeScript error"
git push origin main
```

### Re-run the workflow manually
Go to GitHub Actions tab and click "Re-run failed jobs" on the latest run.

---

## Support

**Workflow failing?**
- Check GitHub Actions tab: https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions
- See `BUILD_FIXES_SUMMARY.md` for common issues
- Most failures are either missing `package-lock.json` or `tsconfig.json` issues (both auto-fixed on retry)

**Live Site**: https://lucagalassi.github.io/UWHAP-Muscle-Guide/

**No need to do anything special** — just push code to `main` and the workflow handles the rest.

