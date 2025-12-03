import React, { useEffect, useState } from 'react';
import { Activity, Clock, AlertTriangle, Settings, Key, UserPlus, KeyRound, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import pkg from '../package.json';

interface SplashScreenProps {
  onFinish: () => void;
  studentName?: string;
  hasSavedSession?: boolean;
  autoResume?: boolean;
  onResume?: () => void;
  onReset?: () => void;
  onImport?: (input: string) => void;
  onNewStudent?: () => void;
}

// Format timestamp to relative time string
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
  if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  return 'Just now';
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, studentName, hasSavedSession=false, autoResume=false, onResume, onReset, onImport, onNewStudent }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showNewUserChoice, setShowNewUserChoice] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

  useEffect(() => {
    // Load last save timestamp
    try {
      const savedTimestamp = localStorage.getItem('last_save_timestamp');
      if (savedTimestamp) {
        setLastSaveTime(parseInt(savedTimestamp, 10));
      }
    } catch {}
    
    if (hasSavedSession) {
      if (autoResume) {
        // brief pause for visual continuity
        const t = setTimeout(() => { setIsExiting(true); setTimeout(() => { onResume?.(); onFinish(); }, 300); }, 400);
        return () => clearTimeout(t);
      }
      setShowPrompt(true);
      return;
    }
    
    // For new users (no saved session), show choice after brief splash animation
    const timer = setTimeout(() => {
      setShowNewUserChoice(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onFinish, hasSavedSession, autoResume, onResume]);

  const handleNewStudent = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNewStudent?.();
      onFinish();
    }, 300);
  };

  const handleImportCode = () => {
    if (!importValue.trim()) {
      setImportError('Please paste your save code first.');
      return;
    }
    
    try {
      onImport?.(importValue.trim());
      setImportSuccess(true);
      setImportError('');
      
      // Auto-advance after successful import
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onResume?.();
          onFinish();
        }, 300);
      }, 1000);
    } catch (e) {
      setImportError('Invalid save code. Please check and try again.');
      setImportSuccess(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      {/* Version Badge - Top Right Corner */}
      <div className="absolute top-4 right-4 text-slate-500 text-xs font-bold opacity-50 z-10">
        v{pkg.version}
      </div>

      <div className="relative mb-12">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        
        {/* Emoji Cloud Animation */}
        <div className="relative z-10 grid grid-cols-3 gap-8 md:gap-12">
           <div className="animate-[bounce_2s_infinite] text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">💪</div>
           <div className="animate-[bounce_2.2s_infinite] delay-100 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🧠</div>
           <div className="animate-[bounce_1.8s_infinite] delay-200 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🫀</div>
           <div className="animate-[bounce_2.5s_infinite] delay-300 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🦴</div>
           <div className="animate-[bounce_2.1s_infinite] delay-500 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🧬</div>
           <div className="animate-[bounce_1.9s_infinite] delay-700 text-6xl md:text-7xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-default select-none">🩸</div>
        </div>
      </div>

      <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 text-center px-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">UWH AP1</span> Muscle Guide
      </h1>
      
      {studentName && (
        <div className="relative z-10 text-xl md:text-2xl font-bold text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
          Welcome back, <span className="text-sky-400">{studentName}</span>
        </div>
      )}
      
      {!hasSavedSession && !showNewUserChoice && !showImportForm && (
        <div className="relative z-10 text-xl md:text-2xl font-bold text-emerald-400 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
          🎓 Welcome!
        </div>
      )}
      
      {!showPrompt && !showNewUserChoice && !showImportForm && (
        <div className="relative z-10 flex items-center gap-3 text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] animate-in fade-in delay-500 duration-1000">
          <Activity className="w-4 h-4 text-sky-500 animate-spin" />
          {hasSavedSession ? 'Loading Your Progress...' : 'Preparing Your Study Guide...'}
        </div>
      )}

      {/* New User Choice - Show when no saved session detected */}
      {showNewUserChoice && !showImportForm && (
        <div className="relative z-20 w-full max-w-md mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-black text-slate-900">Let's Get Started!</h2>
              <p className="text-sm text-slate-600 mt-2">Are you new here, or do you have progress from another device?</p>
            </div>
            
            <div className="space-y-3">
              {/* New Student Option */}
              <button
                onClick={handleNewStudent}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg">I'm a New Student</div>
                  <div className="text-emerald-100 text-xs">Start fresh with a quick tutorial</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
              
              {/* Import Save Code Option */}
              <button
                onClick={() => setShowImportForm(true)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <KeyRound className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg">I Have a Save Code</div>
                  <div className="text-slate-500 text-xs">Restore progress from another browser</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-70 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Form */}
      {showImportForm && (
        <div className="relative z-20 w-full max-w-md mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-lg font-black text-slate-900">Enter Your Save Code</h2>
              <p className="text-xs text-slate-600 mt-1">Paste the code you copied from Settings → Copy Save Code</p>
            </div>
            
            <div className="space-y-3">
              <textarea
                value={importValue}
                onChange={(e) => { setImportValue(e.target.value); setImportError(''); setImportSuccess(false); }}
                placeholder="Paste your save code here..."
                className="w-full h-28 p-3 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-slate-50"
                disabled={importSuccess}
              />
              
              {importError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg p-2">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{importError}</span>
                </div>
              )}
              
              {importSuccess && (
                <div className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 rounded-lg p-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Progress restored successfully! Redirecting...</span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setShowImportForm(false); setImportValue(''); setImportError(''); }}
                  disabled={importSuccess}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 border border-slate-200 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleImportCode}
                  disabled={importSuccess || !importValue.trim()}
                  className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restore Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrompt && (
        <div className="relative z-20 w-full max-w-lg mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-black text-slate-900">Resume previous session?</h2>
              <p className="text-xs text-slate-600 mt-1">We found saved progress and preferences in this browser.</p>
              
              {/* Last Save Indicator */}
              {lastSaveTime && (
                <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg py-1.5 px-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last saved: {formatRelativeTime(lastSaveTime)}</span>
                </div>
              )}
            </div>
            
            {/* Browser Storage Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <span className="font-bold">Your data is stored locally in this browser.</span>{' '}
                Clearing browser data will erase your progress. For backup, go to Settings → Copy Save Code after resuming.
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsExiting(true); setTimeout(() => { onResume?.(); onFinish(); }, 300); }}
                className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
              >Resume</button>
              <button
                onClick={() => { onReset?.(); setShowPrompt(false); setIsExiting(true); setTimeout(onFinish, 300); }}
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 border border-slate-200"
              >Start Fresh</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
