import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  FileText, 
  Layers, 
  Code, 
  User, 
  Trophy, 
  Compass, 
  Volume2, 
  VolumeX, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenResumeModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open
          const evt = new CustomEvent('open-command-palette');
          window.dispatchEvent(evt);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'work',
      title: 'Explore Selected Work & Projects',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        const el = document.querySelector('#work');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'tech',
      title: 'Inspect Tech Constellation (Languages, Frameworks, Tools)',
      category: 'Navigation',
      icon: Code,
      action: () => {
        const el = document.querySelector('#tech');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'about',
      title: 'Read Developer Philosophy & Dossier',
      category: 'Navigation',
      icon: User,
      action: () => {
        const el = document.querySelector('#about');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'journey',
      title: 'View Hackathons & Awards Timeline',
      category: 'Navigation',
      icon: Trophy,
      action: () => {
        const el = document.querySelector('#journey');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'aira-lab',
      title: 'Discover AiRA LAB & Project Amrit',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        const el = document.querySelector('#aira-lab');
        el?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'Open Verified Resume Dossier (PDF)',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResumeModal();
      }
    },
    {
      id: 'sound',
      title: 'Toggle Audio Synthesizer Feedback',
      category: 'Settings',
      icon: Volume2,
      action: () => {
        sounds.toggleMute();
        onClose();
      }
    },
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `Project: ${p.title} (${p.category})`,
      category: 'Projects',
      icon: Terminal,
      action: () => {
        onClose();
        onSelectProject(p.id);
      }
    }))
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-xl bg-[#0C101B] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-white"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#0F1424]">
            <Search className="w-5 h-5 text-emerald-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands, projects, skills, or sections..."
              className="w-full bg-transparent outline-none font-sans text-sm text-white placeholder-zinc-500"
            />
            <button
              onClick={onClose}
              className="p-1 rounded bg-white/5 text-zinc-400 hover:text-white text-xs font-mono"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                No matching commands found.
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      item.action();
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/15 hover:border-emerald-500/30 border border-transparent text-left group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-sans text-xs sm:text-sm text-zinc-200 group-hover:text-white font-medium">
                          {item.title}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500 uppercase">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Note */}
          <div className="px-4 py-2.5 bg-[#080B13] border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span>DHYEY_COMMAND_OS</span>
            <span>PRESS ⌘K TO TOGGLE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
