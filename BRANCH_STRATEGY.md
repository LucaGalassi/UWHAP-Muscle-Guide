# Branch Strategy: Separating Source from Automation

## Overview
This project uses **two branches** to avoid conflicts between source code and CI/build automation:

- **`main`** — Source code only (React components, services, utilities)
- **`automation`** — CI/build configuration (GitHub Actions, tsconfig, package management)

This separation ensures that:
- ✅ Your app builder can freely update source code on `main` without touching CI
- ✅ Automation changes are isolated and don't create conflicts
- ✅ Build/deploy issues are decoupled from feature development

---

## Branch Responsibilities

### `main` branch
Contains only application source code:
- `components/` — React components
- `services/` — API services (Gemini, etc.)
- `utils/` — Utility functions
- `App.tsx`, `index.tsx` — App entry points
- `types.ts`, `constants.ts` — Type definitions and constants
- `index.css` — Styles
- `index.html` — HTML template
- `package.json` — Dependencies only (no `package-lock.json`)
- `README.md` — Documentation
- `BUILD_FIXES_SUMMARY.md` — Build reference

**Do NOT commit to `main`**:
- `.github/workflows/` — CI workflows go to `automation`
- `tsconfig.json` — Build config goes to `automation`
- `package-lock.json` — Lock file goes to `automation`
- `.gitkeep` files — Protection files go to `automation`

### `automation` branch
Contains CI/build infrastructure:
- `.github/workflows/deploy.yml` — GitHub Actions auto-deploy workflow
- `tsconfig.json` — TypeScript configuration with build optimizations
- `package-lock.json` — Exact dependency versions for reproducible builds
- `.github/.gitkeep` — Directory protection files

---

## Workflow

### For your app builder (working on `main`)
```bash
# Always work on main for source code
git checkout main
git pull origin main

# Make your changes (components, services, utils, etc.)
# ...

# Push to main — this triggers deployment via automation branch
git add components/ services/ utils/ App.tsx index.tsx
git commit -m "feat: add new feature"
git push origin main
```

**Important**: Do NOT edit `.github/`, `tsconfig.json`, or `package-lock.json` on `main`.

### For automation/CI maintenance (when build issues arise)
```bash
# Switch to automation branch
git checkout automation
git pull origin automation

# Fix build config (tsconfig, workflow, lock file, etc.)
# ...

# Push to automation
git add .github/ tsconfig.json package-lock.json
git commit -m "ci: fix build issue"
git push origin automation

# When ready, merge automation into main via PR
git checkout main
git merge automation
git push origin main
```

---

## GitHub Actions Workflow

The workflow is defined in `.github/workflows/deploy.yml` on the **`automation` branch**:

1. Checks out the latest code from `main`
2. Installs dependencies (using `package-lock.json` from `automation`)
3. Builds the app (`npm run build`)
4. Deploys to GitHub Pages

**Key**: The workflow always reads `tsconfig.json` and `package-lock.json` from the `automation` branch, so source code changes on `main` won't break the build.

---

## Setup Instructions

### Initial Setup (Already Done)
- ✅ Created `automation` branch with all CI/build files
- ✅ Configured GitHub Actions to use `automation` branch for config
- ✅ Documented build requirements in `BUILD_FIXES_SUMMARY.md`

### For Future Updates

**If source code needs build fixes**:
1. Update `.github/workflows/deploy.yml` on `automation` branch
2. Update `tsconfig.json` on `automation` branch
3. Update `package-lock.json` on `automation` branch
4. Merge `automation` into `main` when ready

**If source code has new dependencies**:
1. Add to `package.json` on `main`
2. Run `npm install` to generate updated `package-lock.json`
3. Push `package-lock.json` update to `automation` branch

---

## Example: Adding a New Dependency

```bash
# On main: add dependency to package.json
git checkout main
npm install new-package

# Create package-lock.json
git add package.json package-lock.json
git commit -m "feat: add new-package"

# Push to trigger build
git push origin main

# If build succeeds: automation syncs automatically
# If build fails: update automation branch and merge back

# On automation: update build config if needed
git checkout automation
# ... make changes ...
git push origin automation

# Merge back to main
git checkout main
git merge automation
git push origin main
```

---

## Benefits

| Issue | Solution |
|-------|----------|
| `tsconfig.json` reverts to strict mode | Config stays on `automation`, source on `main` |
| `.github/workflows/` keeps getting deleted | Isolated on `automation` with protection |
| `package-lock.json` conflicts | Managed separately on `automation` |
| Build failures on code push | Decoupled from source — automation can be fixed independently |

---

## Quick Reference

```bash
# Work on app features
git checkout main
git pull origin main
# ... make changes ...
git push origin main

# Work on CI/build issues
git checkout automation
git pull origin automation
# ... fix tsconfig, workflows, package-lock.json ...
git push origin automation

# Sync automation config into main
git checkout main
git merge automation
git push origin main
```

---

## Support

If the build breaks:
1. Check the GitHub Actions tab for error messages
2. Update the `automation` branch with fixes
3. Merge `automation` into `main` to apply fixes
4. Re-run the workflow

Live site: https://lucagalassi.github.io/UWHAP-Muscle-Guide/
