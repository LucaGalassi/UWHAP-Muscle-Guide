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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} text-center`}>
          <div className={`text-3xl font-black ${theme.text} mb-1`}>{learnedCount}</div>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText} font-bold`}>Mastered</div>
          <div className={`text-[9px] ${theme.subText} opacity-60 mt-0.5`}>of {totalCount}</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} text-center`}>
          <div className={`text-3xl font-black ${theme.text} mb-1`}>{stats?.totalSessions ?? 0}</div>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText} font-bold`}>Sessions</div>
          <div className={`text-[9px] ${theme.subText} opacity-60 mt-0.5`}>completed</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} text-center`}>
          <div className={`text-3xl font-black ${theme.text} mb-1`}>{stats?.flashcardsAnswered ?? 0}</div>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText} font-bold`}>Cards</div>
          <div className={`text-[9px] ${theme.subText} opacity-60 mt-0.5`}>reviewed</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.border} ${theme.cardBg} text-center`}>
          <div className={`text-2xl font-black ${theme.text} mb-1`}>{Math.round((learnedCount / totalCount) * 100)}%</div>
          <div className={`text-[10px] uppercase tracking-wider ${theme.subText} font-bold`}>Progress</div>
          <div className={`text-[9px] ${theme.subText} opacity-60 mt-0.5`}>mastery rate</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Flashcards */}
        <button
          onClick={() => onSelectTool('FLASHCARDS')}
          className={`group relative p-8 rounded-2xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-lg transition-all text-left`}
        >
          <div className="w-12 h-12 bg-orange-100/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6 text-orange-600 drop-shadow" />
          </div>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>Flashcards</h3>
          <p className={`text-sm leading-relaxed mb-6 ${theme.subText}`}>
            Classic active recall. Flip cards to test your memory of origins, insertions, and actions.
          </p>
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Practice <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Quiz */}
        <button
          onClick={() => onSelectTool('QUIZ')}
          className={`group relative p-8 rounded-2xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-lg transition-all text-left`}
        >
          <div className="w-12 h-12 bg-blue-100/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-blue-600 drop-shadow" />
          </div>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>Quiz Mode</h3>
          <p className={`text-sm leading-relaxed mb-6 ${theme.subText}`}>
            Multiple choice challenges generated dynamically from your curriculum.
          </p>
          <span className={`${currentTheme === 'midnight' ? 'text-blue-400' : 'text-blue-600'} text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all`}>
            Start Quiz <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Smart Guide */}
        <button
          onClick={() => onSelectTool('SMART_GUIDE')}
          className={`group relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-left overflow-hidden ${
            currentTheme === 'midnight'
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : currentTheme === 'blueprint'
                ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-400'
                : currentTheme === 'nature'
                  ? 'bg-gradient-to-br from-emerald-700 to-teal-700 text-white border border-emerald-200/70'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Smart Guide</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Intelligent spaced repetition system. Learn {totalCount - learnedCount} new muscles and review at optimal intervals for long-term retention.
          </p>
          <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Begin Smart Study <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        {/* Lightning Round */}
        <button
          onClick={() => onSelectTool('LIGHTNING')}
          className={`group relative p-8 rounded-2xl border ${theme.border} ${theme.cardBg} shadow-sm hover:shadow-lg transition-all text-left`}
        >
          <div className="w-12 h-12 bg-emerald-100/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-emerald-600 drop-shadow" />
          </div>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>Lightning Round</h3>
          <p className={`text-sm leading-relaxed mb-6 ${theme.subText}`}>
            8-question speed drill with instant scoring. Perfect for quick daily streaks.
          </p>
          <span className={`${currentTheme === 'midnight' ? 'text-emerald-400' : 'text-emerald-600'} text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all`}>
            Start Lightning Round <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Ratings breakdown */}
      {(stats?.flashcardsAnswered ?? 0) > 0 && (
        <div className="mt-6">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.subText} mb-3`}>Confidence Distribution</h3>
          <div className="grid grid-cols-4 gap-2">
            {[{key:'AGAIN',label:'Again',color:'red'},{key:'HARD',label:'Hard',color:'orange'},{key:'GOOD',label:'Good',color:'blue'},{key:'EASY',label:'Easy',color:'emerald'}].map(({key,label,color}) => (
              <div key={key} className={`p-3 rounded-lg border ${theme.border} ${theme.cardBg} text-center`}>
                <div className={`text-2xl font-black text-${color}-600 mb-1`}>{stats?.ratings?.[key as keyof typeof stats.ratings] ?? 0}</div>
                <div className={`text-[10px] uppercase tracking-wider text-${color}-600 font-bold`}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyDashboard;