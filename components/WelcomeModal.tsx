import React, { useState } from 'react';
import { Play, Download, AlertTriangle, Calendar, Timer, CheckCircle, Share2, ArrowRight, GraduationCap, Brain, Save, ShieldAlert, ChevronRight, ChevronLeft } from 'lucide-react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';

interface WelcomeModalProps {
  onDismiss: () => void;
  onResume: (url: string) => void;
  daysUntilExam: number;
  currentTheme: AppTheme;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onDismiss, onResume, daysUntilExam, currentTheme }) => {
  const [resumeLink, setResumeLink] = useState('');
  const [error, setError] = useState('');
  const [tutorialStep, setTutorialStep] = useState<number>(0); // 0 = Landing, 1+ = Tutorial
  const theme = THEME_CONFIG[currentTheme];

  const handleResume = () => {
    if (!resumeLink.trim()) {
      setError("Please paste a link first.");
      return;
    }
    try {
      onResume(resumeLink);
      onDismiss();
    } catch (e) {
      setError("Invalid link format. Please try again.");
    }
  };

  const TUTORIAL_STEPS = [
    {
      title: "Welcome, RN Apprentice",
      subtitle: "Customized for UW Health A&P",
      icon: <GraduationCap className="w-12 h-12 text-brand-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to your digital study companion, designed specifically for the <strong>UW Health RN Apprenticeship</strong> Anatomy & Physiology curriculum.
          </p>
          <p>
            This tool is built to help you master the <strong>Group A & Group B muscles</strong> before your final exam on December 8th.
          </p>
          <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 flex items-start gap-3">
            <Timer className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-brand-800 text-xs uppercase tracking-wide">Goal</p>
              <p className="text-brand-700 text-xs">Master origins, insertions, and actions through active recall.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Study",
      subtitle: "Smart Guide & Flashcards",
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">1</div>
              <div>
                <span className="block font-bold text-slate-900">Smart Guide Mode</span>
                <span>Uses "Spaced Repetition" to calculate exactly when you need to review a muscle so you never forget it. Best for daily study.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">2</div>
              <div>
                <span className="block font-bold text-slate-900">Flashcards</span>
                <span>Flip cards to test your memory. Rate yourself "Hard", "Good", or "Easy" to adjust your study schedule.</span>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Saving Your Progress",
      subtitle: "CRITICAL: The Magic Link",
      icon: <Save className="w-12 h-12 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
             <h4 className="font-bold text-red-700 flex items-center gap-2 mb-1">
               <AlertTriangle className="w-4 h-4" /> No Accounts = Privacy
             </h4>
             <p className="text-red-600 text-xs">
               We do not store your data on a server. Your progress lives in your browser or your custom link.
             </p>
          </div>
          <p>
            To save your progress across devices or browsers, you must click <strong>"Save & Share Stats"</strong> in the sidebar.
          </p>
          <p>
            This generates a long <strong>Magic Link</strong>. Copy this link and save it (e.g., in your Notes app or email it to yourself). <span className="font-bold text-brand-600">Paste it back here next time to resume.</span>
          </p>
        </div>
      )
    },
    {
      title: "Content Disclaimer",
      subtitle: "AI Assisted & Lab Manual",
      icon: <ShieldAlert className="w-12 h-12 text-purple-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            The core muscle list matches your <strong>Lab Manual Edition V3.5</strong>.
          </p>
          <p>
            <strong>Note on Descriptions:</strong> Detailed descriptions, demonstrations, and mnemonics were generated using AI (Google Gemini) to accelerate app production.
          </p>
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700">
              <span className="text-red-600">IMPORTANT:</span> ALWAYS verify specific origin/insertion text with your official course materials if in doubt. The Lab Manual is your absolute source of truth for the exam.
            </p>
          </div>
        </div>
      )
    }
  ];

  // RENDER TUTORIAL VIEW
  if (tutorialStep > 0) {
    const stepIndex = tutorialStep - 1;
    const step = TUTORIAL_STEPS[stepIndex];
    const isLast = stepIndex === TUTORIAL_STEPS.length - 1;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative min-h-[500px]">
          
          {/* Progress Bar */}
          <div className="flex gap-1 p-2">
             {TUTORIAL_STEPS.map((_, i) => (
               <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= stepIndex ? 'bg-brand-600' : 'bg-slate-100'}`} />
             ))}
          </div>

          <div className="flex-1 p-8 flex flex-col items-center text-center animate-in slide-in-from-right-4 duration-300 key={stepIndex}">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
               {step.icon}
             </div>
             
             <h2 className="text-2xl font-black text-slate-900 mb-1">{step.title}</h2>
             <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-8">{step.subtitle}</p>
             
             <div className="w-full text-left bg-white rounded-xl">
               {step.content}
             </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
             <button 
               onClick={() => {
                 if (stepIndex === 0) setTutorialStep(0);
                 else setTutorialStep(prev => prev - 1);
               }}
               className="text-slate-400 hover:text-slate-600 text-sm font-bold px-4 py-2"
             >
               Back
             </button>

             <button 
               onClick={() => {
                 if (isLast) onDismiss();
                 else setTutorialStep(prev => prev + 1);
               }}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                 isLast 
                 ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200' 
                 : 'bg-slate-900 text-white hover:bg-slate-800'
               }`}
             >
               {isLast ? "Let's Study!" : "Next"} <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // RENDER LANDING VIEW (Resume vs New)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row ${theme.appBg === 'bg-slate-950' ? 'text-slate-900' : ''}`}>
        
        {/* Left Side: Stats & Info */}
        <div className="md:w-5/12 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
           
           <div>
             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                <Timer className="w-6 h-6 text-white" />
             </div>
             <h2 className="text-2xl font-black mb-2 leading-tight">Final Exam Countdown</h2>
             <div className="text-sm font-medium text-slate-400 mb-6">Monday, Dec 8</div>
             
             <div className="bg-white/10 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-4xl font-black text-red-400 mb-1">{daysUntilExam}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Days Remaining</div>
             </div>
           </div>

           <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No account needed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Share2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Save progress via URL</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Focus: Group A</span>
              </div>
           </div>
        </div>

        {/* Right Side: Actions */}
        <div className="md:w-7/12 p-8 bg-white flex flex-col justify-center">
           <div className="mb-8">
             <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome Back!</h3>
             <p className="text-sm text-slate-500 leading-relaxed">
               Paste your saved link below to restore your progress, themes, and study queue.
             </p>
           </div>

           <div className="space-y-4 mb-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Resume from Link</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Paste your magic link here..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    value={resumeLink}
                    onChange={(e) => {
                      setResumeLink(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                {error && <p className="text-xs text-red-500 mt-2 font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {error}</p>}
              </div>

              <button 
                onClick={handleResume}
                disabled={!resumeLink}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  resumeLink 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" /> Restore Progress
              </button>
           </div>

           <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400 font-medium">or</span>
              </div>
           </div>

           <button 
             onClick={() => setTutorialStep(1)}
             className="mt-6 w-full py-4 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
           >
             <div>
               <span className="block text-xs uppercase tracking-wider opacity-70">New Student?</span>
               <span className="text-lg">Start Tutorial</span>
             </div>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;