import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Command, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Sun, 
  Moon 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'WORK', href: '#work', index: '01' },
    { label: 'TECH', href: '#tech', index: '02' },
    { label: 'ABOUT', href: '#about', index: '03' },
    { label: 'ARENA', href: '#journey', index: '04' },
    { label: 'AiRA LAB', href: '#aira-lab', index: '05' },
    { label: 'ROADMAP', href: '#roadmap', index: '06' },
    { label: 'CONTACT', href: '#contact', index: '07' },
  ];

  useEffect(() => {
    setSoundActive(sounds.getSoundEnabled());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const updateClock = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(`${istTime} IST`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  const handleSoundToggle = () => {
    const newState = sounds.toggleMute();
    setSoundActive(newState);
  };

  const handleLinkClick = (href: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-3 sm:py-4 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Personal Identifier */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              sounds.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={() => {
              sounds.playHover();
              setCustomCursor('HOME', 'hover');
            }}
            onMouseLeave={resetCustomCursor}
            className="pointer-events-auto flex items-center gap-3 group bg-white/90 dark:bg-[#0A0D14]/90 hover:bg-white dark:hover:bg-[#0E121C] border border-zinc-300 dark:border-white/10 hover:border-emerald-500/40 rounded-full px-4 py-2 backdrop-blur-xl transition-all duration-300 shadow-md dark:shadow-black/40"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-black text-xs group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300">
              D
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="font-space font-bold text-xs tracking-wider text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors">
                {PORTFOLIO_DATA.personal.name.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 tracking-widest hidden sm:inline">
                AHMEDABAD • {currentTime}
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Items */}
          <nav
            className={`pointer-events-auto hidden lg:flex items-center gap-1 bg-white/90 dark:bg-[#0A0D14]/90 border ${
              isScrolled ? 'border-emerald-500/30 bg-white/95 dark:bg-[#0E121B]/95 shadow-xl' : 'border-zinc-300 dark:border-white/10'
            } rounded-full px-4 py-1.5 backdrop-blur-xl transition-all duration-500`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor(link.label, 'hover');
                }}
                onMouseLeave={resetCustomCursor}
                className="relative px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-white transition-colors duration-200 group flex items-center gap-1"
              >
                <span className="text-emerald-500/70 group-hover:text-emerald-500 text-[9px]">
                  {link.index}
                </span>
                <span className="font-semibold">{link.label}</span>
                <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="pointer-events-auto flex items-center gap-2">
            
            {/* Quick Resume Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResumeModal();
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('RESUME', 'hover');
              }}
              onMouseLeave={resetCustomCursor}
              className="hidden sm:flex items-center gap-1.5 bg-zinc-100 dark:bg-white/5 hover:bg-emerald-500/15 border border-zinc-300 dark:border-white/10 hover:border-emerald-400/40 text-zinc-800 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-300 px-3.5 py-2 rounded-full font-mono text-xs transition-all duration-300 backdrop-blur-xl"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>RESUME</span>
            </button>

            {/* Premium Dark / Light Theme Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                toggleTheme();
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor(theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE', 'hover');
              }}
              onMouseLeave={resetCustomCursor}
              aria-label="Toggle Theme Mode"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-100 dark:bg-[#0A0D14]/90 border border-zinc-300 dark:border-white/15 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-xl shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-300 hidden md:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-mono text-[10px] uppercase font-bold text-indigo-700 hidden md:inline">Dark</span>
                </>
              )}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenCommandPalette();
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('CMD+K', 'hover');
              }}
              onMouseLeave={resetCustomCursor}
              aria-label="Open Command Palette"
              className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#0A0D14]/90 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-300 dark:border-white/10 text-zinc-800 dark:text-zinc-300 px-3 py-2 rounded-full font-mono text-xs transition-all duration-300 backdrop-blur-xl shadow-sm"
            >
              <Command className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span className="hidden md:inline text-zinc-500 text-[10px]">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor(soundActive ? 'MUTE' : 'AUDIO', 'audio');
              }}
              onMouseLeave={resetCustomCursor}
              aria-label="Toggle Sound Effects"
              className={`p-2 rounded-full border transition-all duration-300 backdrop-blur-xl shadow-sm ${
                soundActive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-500 dark:text-emerald-400'
                  : 'bg-zinc-100 dark:bg-[#0A0D14]/90 border-zinc-300 dark:border-white/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-full bg-zinc-100 dark:bg-[#0A0D14]/90 border border-zinc-300 dark:border-white/10 text-zinc-800 dark:text-zinc-300 backdrop-blur-xl shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/98 dark:bg-[#07090E]/98 backdrop-blur-2xl p-6 pt-24 flex flex-col justify-between lg:hidden text-zinc-900 dark:text-white"
          >
            <div className="space-y-4">
              <div className="font-mono text-xs text-emerald-500 dark:text-emerald-400 tracking-widest pb-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
                <span>NAVIGATION // DHYEY.TRIVEDI</span>
                <span>{currentTime}</span>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-white/5 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400">{link.index}</span>
                      <span className="font-space font-bold text-xl text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="font-mono text-xs text-zinc-500">THEME COLOR</span>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/10 font-mono text-xs font-bold flex items-center gap-2"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  <span>{theme.toUpperCase()} MODE</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW VERIFIED RESUME</span>
              </button>

              <p className="text-center font-mono text-[10px] text-zinc-500">
                {PORTFOLIO_DATA.personal.location} • {PORTFOLIO_DATA.personal.college}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
