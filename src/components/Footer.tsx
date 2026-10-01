import React from 'react';
import { MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 md:px-12 bg-zinc-100 dark:bg-[#040507] border-t border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-500 font-mono text-xs transition-colors duration-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left ID & Coordinates */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="text-zinc-900 dark:text-zinc-300 font-bold tracking-wider">
              {PORTFOLIO_DATA.personal.name.toUpperCase()}
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            {PORTFOLIO_DATA.personal.location} ({PORTFOLIO_DATA.personal.coordinates})
          </span>
        </div>

        {/* Center Source of Truth Label */}
        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          <span>The Developer is the Interface • 2026</span>
        </div>

        {/* Right Scroll to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => {
            sounds.playHover();
            setCustomCursor('TOP', 'hover');
          }}
          onMouseLeave={resetCustomCursor}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-300 dark:border-white/10 hover:border-emerald-500/30 transition-all shadow-sm"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        </button>
      </div>
    </footer>
  );
};
