import React from 'react';
import { LearningTool, AppTheme } from '../types';
import { Brain, Layers, GraduationCap, ArrowRight, Zap } from 'lucide-react';
import { THEME_CONFIG } from '../constants';

interface StudyStats {
  totalSessions: number;
  lastSessionAt: number;
  musclesViewed: number;
  flashcardsAnswered: number;
  ratings: { AGAIN: number; HARD: number; GOOD: number; EASY: number };
}

interface StudyDashboardProps {
  onSelectTool: (tool: LearningTool) => void;
  learnedCount: number;
  totalCount: number;
  currentTheme: AppTheme;
  stats?: StudyStats;
}

const StudyDashboard: React.FC<StudyDashboardProps> = ({ onSelectTool, learnedCount, totalCount, currentTheme, stats }) => {
  const theme = THEME_CONFIG[currentTheme];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto overflow-y-auto h-full">
      <div className="mb-6 md:mb-10 text-center">
        <h1 className={`text-2xl md:text-3xl font-extrabold ${theme.text} mb-2 md:mb-3`}>Learning Center</h1>
        <p className={`text-sm md:text-base ${theme.subText}`}>Choose a mode to accelerate your anatomy mastery.</p>
      </div>

      {/* Stats row */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText}`}>Sessions</div>
          <div className={`text-xl font-extrabold ${theme.text}`}>{stats?.totalSessions ?? 0}</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText}`}>Muscles Viewed</div>
          <div className={`text-xl font-extrabold ${theme.text}`}>{stats?.musclesViewed ?? 0}</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText}`}>Flashcards Answered</div>
          <div className={`text-xl font-extrabold ${theme.text}`}>{stats?.flashcardsAnswered ?? 0}</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg}`}>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText}`}>Last Session</div>
          <div className={`text-xs font-semibold ${theme.text}`}>{stats?.lastSessionAt ? new Date(stats.lastSessionAt).toLocaleString() : '—'}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Flashcards */}
        <button 
          onClick={() => onSelectTool('FLASHCARDS')}
          className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Flashcards</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Classic active recall. Flip cards to test your memory of origins, insertions, and actions.
          </p>
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Practice <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Quiz */}
        <button 
          onClick={() => onSelectTool('QUIZ')}
          className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Quiz Mode</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Multiple choice challenges generated dynamically from your curriculum.
          </p>
          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Quiz <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Smart Guide */}
        <button 
          onClick={() => onSelectTool('SMART_GUIDE')}
          className="group relative p-8 bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Smart Guide</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Your personal AI-free tutor. A structured path to learn the {totalCount - learnedCount} remaining muscles one by one.
          </p>
          <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Guided Session <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Lightning Round */}
        <button 
          onClick={() => onSelectTool('LIGHTNING')}
          className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all text-left"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Round</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            8-question speed drill with instant scoring. Perfect for quick daily streaks.
          </p>
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Lightning Round <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Ratings breakdown */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        {(['AGAIN','HARD','GOOD','EASY'] as const).map((k) => (
          <div key={k} className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg} text-center`}>
            <div className={`text-[10px] uppercase tracking-wider ${theme.subText}`}>{k}</div>
            <div className={`text-lg font-extrabold ${theme.text}`}>{stats?.ratings?.[k] ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyDashboard;