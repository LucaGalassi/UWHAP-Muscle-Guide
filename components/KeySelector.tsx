import React from 'react';

const KeySelector: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to AnatoMaster</h1>
        <p className="text-slate-500 mb-8">
          To start mastering anatomy with AI, please select your Google Gemini API key.
        </p>
        <button
          onClick={async () => {
            // @ts-ignore
            if (window.aistudio) {
               // @ts-ignore
               await window.aistudio.openSelectKey();
               // We rely on the App component to detect the change via hasSelectedApiKey polling or re-render
               window.location.reload(); 
            }
          }}
          className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Select API Key
        </button>
        <p className="mt-6 text-xs text-slate-400">
          Powered by Google Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
}

export default KeySelector;