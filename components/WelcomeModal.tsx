import React, { useState } from 'react';
import { Play, Download, AlertTriangle, Timer, CheckCircle, ArrowRight, GraduationCap, Brain, Save, ShieldAlert, ChevronRight, Palette, Sparkles, Moon, Ruler, Leaf } from 'lucide-react';
import { THEME_CONFIG } from '../constants';
import appPackage from '../package.json';
import { AppTheme } from '../types';

interface WelcomeModalProps {
  onDismiss: () => void;
  onResume: (url: string) => void;
  daysUntilExam: number;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
}

const APP_VERSION = appPackage.version ?? 'dev';

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onDismiss, onResume, daysUntilExam, currentTheme, onSelectTheme }) => {
  const [resumeLink, setResumeLink] = useState('');
  const [error, setError] = useState('');
  const [tutorialStep, setTutorialStep] = useState<number>(0); // 0 = Landing, 1+ = Tutorial
  const [resumeMode, setResumeMode] = useState<'CODE' | 'LINK'>('CODE');

  const themeShowcase: Record<AppTheme, { tagline: string; highlight: string; swatch: string; icon: React.ReactNode }> = {
    modern: {
      tagline: 'Clinically clean gradients and crisp panels built for bright classrooms.',
      highlight: 'Matches UW Health UI cues so everything feels familiar.',
      swatch: 'bg-gradient-to-r from-brand-400 via-blue-400 to-blue-600',
      icon: <Sparkles className="w-5 h-5" />
    },
    midnight: {
      tagline: 'Dim, high-contrast palette for late-night focus without the glare.',
      highlight: 'Protects tired eyes during 11pm cram sessions.',
      swatch: 'bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-700',
      icon: <Moon className="w-5 h-5" />
    },
    blueprint: {
      tagline: 'Engineered grid overlays that feel like your anatomy lab schematics.',
      highlight: 'Great for visual thinkers who love diagrams.',
      swatch: 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-400',
      icon: <Ruler className="w-5 h-5" />
    },
    nature: {
      tagline: 'Warm, grounded neutrals inspired by sketchbooks and cafe study sessions.',
      highlight: 'Keeps anxiety low with softer contrast.',
      swatch: 'bg-gradient-to-r from-emerald-200 via-emerald-100 to-amber-100',
      icon: <Leaf className="w-5 h-5" />
    }
  };

  const handleResume = () => {
    if (!resumeLink.trim()) {
      setError("Please paste a link first.");
      return;
    }
    try {
      onResume(resumeLink);
      setError(''); // Clear error on success
      onDismiss();
    } catch (e) {
      console.error('Resume link error:', e);
      setError("Could not read that code/link. Double-check and try again.");
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
      subtitle: "CRITICAL: The Save Code System",
      icon: <Save className="w-12 h-12 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
             <h4 className="font-bold text-red-700 flex items-center gap-2 mb-1">
               <AlertTriangle className="w-4 h-4" /> No Accounts = Privacy
             </h4>
             <p className="text-red-600 text-xs">
               We do not store your data on a server. Your progress lives in your browser or your custom save code.
             </p>
          </div>
          <p>
            To save your progress across devices or browsers, click <strong>"Save & Share Stats"</strong> in the sidebar.
          </p>
          <p>
            This generates a <strong>Save Code</strong> (like a fancy password). Copy this code and save it somewhere safe:
          </p>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <code className="text-xs text-emerald-400 font-mono break-all">
              eyJtdXNjbGVzIjp7InRlc3QiOiJ2YWx1ZSJ9fQ==
            </code>
          </div>
          <p className="text-xs">
            <strong className="text-brand-600">Next time:</strong> Just paste your code on the welcome screen to restore everything!
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
            The core muscle list and information matches your <strong>Lab Manual</strong>.
          </p>
          <p>
            <strong>Note on Descriptions:</strong> Web and app scripting, detailed descriptions, demonstrations, mnemonics, were generated using AI to accelerate app production.
          </p>
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700">
              <span className="text-red-600">IMPORTANT:</span> ALWAYS verify specific origin/insertion, muscle information, text, etc with the official course materials if in doubt. The Lab Manual is your absolute source of truth for the exam. Once again this content was made heavly assited with AI, so mistakes are likely. Report any issues or mistakes to Luca for fixing.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-brand-600 via-brand-500 to-blue-600 p-6 md:p-8 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
          <div className="absolute top-6 right-6 z-10 text-right">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Release</span>
            <div className="mt-2 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[12px] font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5" /> v{APP_VERSION}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Welcome to A&P Muscle Guide</h1>
                <p className="text-blue-100 text-sm font-medium mt-1">UW Health RN Apprenticeship Edition</p>
              </div>
            </div>
            
            {/* Exam Countdown Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mt-2">
              <Timer className="w-4 h-4 text-red-300" />
              <div>
                <div className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Final Exam: Monday, Dec 8</div>
                <div className="text-xl font-black text-white">{daysUntilExam} Days Remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-white to-slate-50 overflow-y-auto">
           <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
               <CheckCircle className="w-6 h-6 text-emerald-500" />
               Resume Your Progress
             </h2>
             <p className="text-slate-600 leading-relaxed">
               Have a save code? Paste it below to restore your progress, themes, and study queue.
             </p>
           </div>

           <div className="space-y-4 mb-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Save className="w-3 h-3" />
                    Resume Options
                  </label>
                  <div className="bg-slate-100 p-1 rounded-lg flex text-[11px] font-bold uppercase tracking-wider">
                    <button 
                      onClick={() => setResumeMode('CODE')}
                      className={`px-3 py-1 rounded-md transition-all ${resumeMode === 'CODE' ? 'bg-white shadow text-brand-600' : 'text-slate-400'}`}
                    >Code</button>
                    <button 
                      onClick={() => setResumeMode('LINK')}
                      className={`px-3 py-1 rounded-md transition-all ${resumeMode === 'LINK' ? 'bg-white shadow text-brand-600' : 'text-slate-400'}`}
                    >Link</button>
                  </div>
                </div>
                {resumeMode === 'CODE' ? (
                  <textarea 
                    rows={3}
                    placeholder="Paste your save code here...\nExample: eyJ2ZXJzaW9uIjoxLCJwYXJhbXMiOnt9fQ=="
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
                    value={resumeLink}
                    onChange={(e) => {
                      setResumeLink(e.target.value);
                      setError('');
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Paste your magic link (https://...)"
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    value={resumeLink}
                    onChange={(e) => {
                      setResumeLink(e.target.value);
                      setError('');
                    }}
                  />
                )}
                {error && (
                  <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-medium">{error}</p>
                  </div>
                )}
              </div>

              <button 
                onClick={handleResume}
                disabled={!resumeLink.trim()}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  resumeLink.trim()
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-200' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <Download className="w-4 h-4" /> Restore My Progress
              </button>
           </div>

           {/* Feature Highlights */}
           <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm p-3 bg-white rounded-xl border border-slate-200">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">No account needed</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-white rounded-xl border border-slate-200">
                <Save className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-slate-700 font-medium">Save via code</span>
              </div>
           </div>

           <div className="mb-10">
             <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                   <Palette className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-brand-500 uppercase tracking-widest">Make it yours</p>
                   <p className="text-xl font-black text-slate-900">Pick a theme before you dive in</p>
                 </div>
               </div>
               <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Tap a card to preview instantly</p>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
               {Object.entries(themeShowcase).map(([key, story]) => {
                 const themeKey = key as AppTheme;
                 const isActive = themeKey === currentTheme;
                 return (
                   <button
                     key={key}
                     type="button"
                     onClick={() => onSelectTheme(themeKey)}
                     aria-pressed={isActive}
                     className={`text-left rounded-2xl border-2 p-4 transition-all bg-white/90 backdrop-blur-sm ${
                       isActive
                         ? 'border-emerald-400 shadow-lg shadow-emerald-100'
                         : 'border-slate-200 hover:border-brand-200 hover:shadow-md'
                     }`}
                   >
                     <div className="flex items-center justify-between gap-3">
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-brand-600">
                           {story.icon}
                         </div>
                         <div>
                           <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Theme</p>
                           <p className="text-lg font-black text-slate-900">{THEME_CONFIG[themeKey].label}</p>
                         </div>
                       </div>
                       {isActive && (
                         <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                           Active
                         </span>
                       )}
                     </div>
                     <p className="text-sm text-slate-600 mt-3">{story.tagline}</p>
                     <p className="text-xs text-slate-400 font-semibold">{story.highlight}</p>
                     <div className={`mt-4 h-10 rounded-xl ${story.swatch}`}></div>
                   </button>
                 );
               })}
             </div>
           </div>

           <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gradient-to-b from-white to-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider">or</span>
              </div>
           </div>

           <button 
             onClick={() => setTutorialStep(1)}
             className="w-full py-5 bg-gradient-to-r from-brand-50 to-blue-50 text-brand-700 hover:from-brand-100 hover:to-blue-100 border-2 border-brand-200 rounded-xl font-bold transition-all flex items-center justify-center gap-3 group shadow-md hover:shadow-xl"
           >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-brand-300 shadow-sm">
                 <Play className="w-5 h-5 text-brand-600" />
               </div>
               <div className="text-left">
                 <span className="block text-xs uppercase tracking-wider text-brand-500 font-bold">New Student?</span>
                 <span className="text-xl font-black">Start Tutorial</span>
               </div>
             </div>
             <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;