import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: "INITIALIZING DHYEY.TRIVEDI", sub: "SYSTEM_VERSION // 2026.04" },
    { text: "mounting portfolio & projects...", sub: "HABIT TRACKER • SPENDSNAP • SMART AGRI YIELD" },
    { text: "calibrating AiRA LAB telemetry...", sub: "ADVANCED RESEARCH AND ANALYTICS LAB" },
    { text: "INTERFACE READY.", sub: "WELCOME TO DHYEY'S DIGITAL WORLD" },
  ];

  useEffect(() => {
    sounds.playBoot();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3.2;
      });
    }, 25);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          sounds.playHover();
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    const finishTimeout = setTimeout(() => {
      onComplete();
    }, 1200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#050608] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={onComplete}
      >
        {/* Background Grid & Radar Circle */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-emerald-500/10 pointer-events-none animate-pulse-glow" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/20 pointer-events-none" />

        {/* Center Container */}
        <div className="relative z-10 max-w-md w-full bg-[#0A0D14]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-semibold tracking-wider">DHYEY_OS v2.6</span>
            </div>
            <span className="text-zinc-500">23.02° N, 72.57° E</span>
          </div>

          {/* Terminal Box */}
          <div className="min-h-[80px] flex flex-col justify-center space-y-2 font-mono">
            <div className="flex items-center gap-2 text-xs text-emerald-400/80">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase text-[10px]">Kernel Execution</span>
            </div>
            
            <motion.h2
              key={stepIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base md:text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2"
            >
              <span>&gt;</span>
              <span>{steps[stepIndex]?.text || "INITIALIZING..."}</span>
            </motion.h2>

            <motion.p
              key={`sub-${stepIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-zinc-400 font-mono"
            >
              {steps[stepIndex]?.sub}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>BOOT_SEQUENCE</span>
              </span>
              <span className="text-emerald-400 font-bold">{Math.min(100, Math.round(progress))}%</span>
            </div>

            <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full shadow-[0_0_12px_rgba(0,245,155,0.8)]"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>

          {/* Bottom quick skip prompt */}
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/60" />
              <span>Verified Candidate Context</span>
            </span>

            <button
              onClick={onComplete}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
            >
              <span>SKIP [SPACE]</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
