# UWHAP Muscle Guide

An interactive anatomy study companion for the UWH & Madison College A&P1 Muscle Study Guide. Built with React, TypeScript, Vite, and Tailwind CSS.

[![Deploy to GitHub Pages](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/LucaGalassi/UWHAP-Muscle-Guide/actions/workflows/deploy.yml)

## 🎯 Live Demo

**[Try it now →](https://lucagalassi.github.io/UWHAP-Muscle-Guide/)**

No setup required — open the link and start studying.

## ✨ Features

### Study Tools
- **Muscle Explorer** — Browse 60+ muscles with detailed anatomical information including origin, insertion, action, and demonstration guides
- **Flashcards** — Review muscles with flip-card style learning and SRS rating
- **Quizzes** — Test your knowledge with auto-generated multiple choice questions
- **Lightning Rounds** — Timed rapid-fire review sessions
- **Smart Guide** — Adaptive spaced repetition system (SRS) that prioritizes muscles due for review

### Progress Tracking
- **Spaced Repetition** — SM-2 based algorithm adjusted for exam timing
- **Progress Sync** — Export/import progress via shareable codes or URLs
- **Static Content** — No external API dependencies, all data bundled in the app

### User Experience
- **4 Beautiful Themes** — Modern, Midnight, Blueprint, and Nature
- **Motion Library** — Browse anatomical movements with external GIF/video search
- **Exam Countdown** — Track days until your final exam
- **Mobile Responsive** — Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom theming
- **State Management:** React hooks with prop drilling
- **Deployment:** GitHub Pages with automated CI/CD

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/LucaGalassi/UWHAP-Muscle-Guide.git
cd UWHAP-Muscle-Guide

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
├── App.tsx                 # Main app component with global state
├── constants.ts            # Muscle data and theme configurations
├── types.ts                # TypeScript type definitions
├── components/
│   ├── Sidebar.tsx         # Navigation and settings
│   ├── MuscleView.tsx      # Detailed muscle information display
│   ├── StudyDashboard.tsx  # Study mode selector
│   ├── AnimationBrowser.tsx # Motion library browser
│   ├── AdvancedAnimationViewer.tsx # Resource viewer with GIF search
│   └── StudyModes/
│       ├── FlashcardView.tsx
│       ├── QuizView.tsx
│       ├── QuizGenerator.ts
│       ├── SmartGuideView.tsx
│       └── LightningRoundView.tsx
├── services/
│   ├── muscleContentService.ts  # Static muscle content provider
│   └── animationService.ts      # Motion definitions
└── utils/
    └── srs.ts              # Spaced repetition algorithm
```

## 🎓 About

This project was created to help UWHAP students study anatomy more effectively. All muscle content is carefully curated to match the program's Group A and Group B study requirements.

**Key Design Decisions:**
- Fully static content — no external API dependencies for reliability
- Spaced repetition with exam-date awareness to optimize study time
- Progress encoded in URLs for easy sharing between students

## 📝 License

MIT License — feel free to use this code as a reference for your own projects.

---

Made with ❤️ by [Luca Galassi](https://github.com/LucaGalassi)
