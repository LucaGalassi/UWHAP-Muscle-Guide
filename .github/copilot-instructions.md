# UWHAP Muscle Guide - Copilot Instructions

## Project Overview
Interactive anatomy study app built with React 18, Vite, TypeScript, and Tailwind CSS. Features flashcards, quizzes, and spaced repetition (SRS). Deployed to GitHub Pages.

## Architecture

### Data Flow
- **Single source of truth**: `MUSCLE_DATA` and `MUSCLE_DETAILS` in `constants.ts` define all muscles and their content
- **State management**: App-level state in `App.tsx` with prop drilling to children. No Redux/Zustand.
- **Progress persistence**: Compressed Base64 encoding (`compressProgress`/`decompressProgress`) for URL sharing and localStorage

### Component Patterns
```
App.tsx                    # Global state (progress, theme, exam date)
├── Sidebar.tsx            # Navigation, settings modal, muscle list filtering
├── StudyDashboard.tsx     # Study mode selector
├── MuscleView.tsx         # Reference content display
├── AnimationBrowser.tsx   # Browse motion library
├── AdvancedAnimationViewer.tsx  # Full resource viewer with search/GIF lookup
└── StudyModes/
    ├── FlashcardView.tsx  # SRS-enabled flashcards with rating buttons
    ├── QuizView.tsx       # Multiple choice quizzes
    ├── QuizGenerator.ts   # Question generation with contextual distractors
    └── LightningRoundView.tsx  # Timed review mode
```

### Theming System
- 4 themes defined in `THEME_CONFIG` (constants.ts): `modern`, `midnight`, `blueprint`, `nature`
- Theme passed via `currentTheme: AppTheme` prop to all components
- Access colors via: `const theme = THEME_CONFIG[currentTheme]`
- Use template literals for dynamic classes: `` className={`${theme.cardBg} ${theme.border}`} ``

### Animation/Motion Library
- `animationService.ts`: Motion definitions with joint parameters, regions, and keywords
- `AdvancedAnimationViewer.tsx`: Full-screen resource browser with GIF/video search
- `AnimationBrowser.tsx`: Grid/list view of all available motions
- Motions defined as `MotionDefinition` with educational content (tips, clinical relevance, common errors)

## Key Conventions

### Muscle Groups A vs B
- **Group A**: Full requirements (origin, insertion, action, demo)
- **Group B**: Reduced requirements (action only, no origin/insertion)
- Check `muscle.group` before asking origin/insertion questions in `QuizGenerator.ts`

### Content Retrieval Pattern
```typescript
// services/muscleContentService.ts - fetchMuscleDetails()
// 1. Check MUSCLE_DETAILS static dictionary (fast, verified)
// 2. Return placeholder content if not found
```

### SRS Algorithm
- Based on SM-2 with exam-date awareness (`utils/srs.ts`)
- Intervals capped to 40% of days until exam
- Status progression: NEW → LEARNING → REVIEW → MASTERED

### Component Props Pattern
All study components receive:
- `currentTheme: AppTheme` for styling
- `onClose` / `onNext` callbacks for navigation

## Development Commands
```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build locally
```

## File Naming & Organization
- Components: PascalCase in `components/`
- Study modes: `components/StudyModes/` directory
- Services: camelCase in `services/`
- Types in `types.ts`, constants in `constants.ts`

## Important Implementation Notes

### Adding a New Muscle
1. Add to `MUSCLE_DATA` array in `constants.ts` using `m()` helper
2. Add content to `MUSCLE_DETAILS` object with origin, insertion, action, demonstration, tips, clinicalConnection, relatedMuscles

### Adding New Animations
1. Define `MotionDefinition` in `animationService.ts`
2. Add to `MOTIONS` object with unique id, joint config, region, keywords
3. Map to muscles via `MUSCLE_ANIMATION_MAPS`

### State Compression (URL Sharing)
Progress is compressed to Base64 with schema: `[muscleIndex, statusIdx, interval, ease, due_mins, last_mins, streak]`
- Minutes used instead of ms to reduce size
- Muscle referenced by index in `MUSCLE_DATA` array

## Deployment
- Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to main
- Base path configured in `vite.config.ts` as `'./'` for relative paths
