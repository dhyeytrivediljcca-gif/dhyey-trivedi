import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  GraduationCap, 
  Trophy, 
  Cpu, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const personal = PORTFOLIO_DATA.personal;

  const handleDownload = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f59b', '#38bdf8', '#ffffff']
    });

    const link = document.createElement('a');
    link.href = personal.socials.resumeUrl;
    link.download = 'Dhyey_Trivedi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#090D16] border border-zinc-200 dark:border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-zinc-900 dark:text-white z-10 space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              <div>
                <h3 className="font-space font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white">
                  Dhyey Trivedi — Official Resume Dossier
                </h3>
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  Verified Academic &amp; Professional Record • 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/15 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Summary Grid */}
          <div className="space-y-6">
            
            {/* Professional Summary */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0F1422] border border-zinc-200 dark:border-white/10 space-y-2">
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
                PROFESSIONAL SUMMARY
              </div>
              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {personal.summary}
              </p>
            </div>

            {/* Education & Mentorship (Marks completely removed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0F1422] border border-zinc-200 dark:border-white/10 space-y-2">
                <div className="font-mono text-xs text-teal-600 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>HIGHER EDUCATION</span>
                </div>
                <div className="font-space font-bold text-zinc-900 dark:text-white text-base">
                  {personal.degree} — {personal.semester}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {personal.college}
                </div>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 pt-1">
                  Gujarat University • Ahmedabad
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0F1422] border border-zinc-200 dark:border-white/10 space-y-2">
                <div className="font-mono text-xs text-cyan-600 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>AiRA LAB &amp; FACULTY GUIDANCE</span>
                </div>
                <div className="font-space font-bold text-zinc-900 dark:text-white text-base">
                  Member &amp; Coordinator
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {personal.lab}
                </div>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 pt-1">
                  Guided by {personal.mentor}
                </div>
              </div>
            </div>

            {/* Core Technical Arsenal */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0F1422] border border-zinc-200 dark:border-white/10 space-y-3">
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
                VERIFIED TECHNICAL ARSENAL
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block mb-1">LANGUAGES</span>
                  <span className="text-zinc-800 dark:text-zinc-200">Python, C, C#, Java, JavaScript, SQL, HTML, CSS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">DEVELOPMENT</span>
                  <span className="text-zinc-800 dark:text-zinc-200">React, Vite, Tailwind CSS, .NET, REST APIs, PWA</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">TOOLS &amp; PLATFORMS</span>
                  <span className="text-zinc-800 dark:text-zinc-200">Git, VS Code, Figma Make, Supabase, Vercel, Render</span>
                </div>
              </div>
            </div>

            {/* Achievements Highlights */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0F1422] border border-zinc-200 dark:border-white/10 space-y-3">
              <div className="font-mono text-xs text-orange-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                <span>KEY COMPETITIVE HIGHLIGHTS</span>
              </div>

              <div className="space-y-2">
                {PORTFOLIO_DATA.hackathonsAndJourney.slice(0, 5).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                    <span className="text-emerald-500 font-mono font-bold shrink-0">•</span>
                    <span><strong className="text-zinc-900 dark:text-white">{h.title}</strong> — {h.roleOrPrize} ({h.description})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-white/10">
            <span className="font-mono text-xs text-zinc-500">
              CONFIRMED SOURCE OF TRUTH • NO FABRICATION
            </span>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs px-6 py-3 rounded-full uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD OFFICIAL RESUME (PDF)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
