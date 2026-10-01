import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  Terminal, 
  BookOpen, 
  FileCheck
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

interface AboutStoryProps {
  onOpenResumeModal: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#07090E] overflow-hidden transition-colors duration-400">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="pb-16 border-b border-zinc-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>SECTION [03] // PHILOSOPHY &amp; DOSSIER</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight uppercase">
            ABOUT <br className="hidden sm:inline" />
            <span className="text-outline-strong text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              THE DEVELOPER.
            </span>
          </h2>
        </div>

        {/* Large Statement Reveal */}
        <div className="py-16 border-b border-zinc-200 dark:border-white/10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-zinc-400 dark:text-zinc-500 uppercase"
          >
            I DON'T JUST WRITE CODE.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 uppercase"
          >
            I BUILD EXPERIENCES.
          </motion.div>
        </div>

        {/* Narrative & Digital Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-start">
          
          {/* Left Column: Personal Narrative & Education */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
              Engineering with curiosity, tactile design, and architectural discipline.
            </h3>

            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                I am a Bachelor of Computer Applications (BCA) student in Semester 5 at <strong className="text-zinc-900 dark:text-white font-semibold">L J College of Computer Applications, Gujarat University</strong> in Ahmedabad. My technical journey is defined by hands-on development across frontend architectures, Python backend systems, and AI-enabled product prototypes.
              </p>
              <p>
                Under the academic mentorship of <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{PORTFOLIO_DATA.personal.mentor}</strong> in the <strong className="text-zinc-900 dark:text-white font-semibold">Advanced Research and Analytics Lab (AiRA LAB)</strong>, I actively explore the intersection of physical hardware sensors, satellite NDVI data pipelines, and responsive web user experiences.
              </p>
              <p>
                From building mobile-first claymorphic habit tracking PWAs to competing in national hackathons and engineering hardware sensor automations, I focus on turning complex computational logic into refined, accessible software products.
              </p>
            </div>

            {/* Academic Profile Cards (Marks completely removed as required) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0C101A] border border-zinc-200 dark:border-white/10 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>HIGHER EDUCATION</span>
                </div>
                <div className="font-space font-bold text-zinc-900 dark:text-white text-base">
                  BCA — Semester 5
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                  L J College of Computer Applications • Gujarat University
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0C101A] border border-zinc-200 dark:border-white/10 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-teal-600 dark:text-teal-300">
                  <BookOpen className="w-4 h-4" />
                  <span>ACADEMIC FOUNDATION</span>
                </div>
                <div className="font-space font-bold text-zinc-900 dark:text-white text-base">
                  Secondary &amp; Higher Secondary
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                  Gujarat State Education Board
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Digital Dossier ID */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-[#0C101B]/90 border border-zinc-200 dark:border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl shadow-black/10 dark:shadow-black">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>OFFICIAL DOSSIER</span>
              </span>
              <span className="text-zinc-400">ID: DHYEY-2026-TRV</span>
            </div>

            {/* Photo & Badge */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shrink-0 shadow-md bg-zinc-900">
                <img
                  src="/dhyey.png"
                  alt="Dhyey Trivedi"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              <div className="space-y-1">
                <div className="font-space font-bold text-lg text-zinc-900 dark:text-white">Dhyey Trivedi</div>
                <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">Software &amp; Frontend Dev</div>
                <div className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
            </div>

            {/* Credentials Matrix */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-white/5">
                <span className="text-zinc-500">LAB AFFILIATION</span>
                <span className="text-zinc-800 dark:text-white text-right font-semibold">Advanced Research &amp; Analytics Lab</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-white/5">
                <span className="text-zinc-500">MENTORSHIP</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-right font-semibold">Prof. Parth Joshi</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-white/5">
                <span className="text-zinc-500">CERTIFICATES RECORD</span>
                <span className="text-zinc-800 dark:text-white text-right font-semibold">15 Recorded Certificates</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-white/5">
                <span className="text-zinc-500">PRIMARY FOCUS</span>
                <span className="text-teal-600 dark:text-teal-300 text-right font-semibold">Frontend / Python / AI</span>
              </div>
            </div>

            {/* Resume Action */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResumeModal();
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('DOSSIER', 'hover');
              }}
              onMouseLeave={resetCustomCursor}
              className="w-full flex items-center justify-center gap-2 bg-zinc-200 dark:bg-white/5 hover:bg-emerald-500/20 border border-zinc-300 dark:border-white/10 hover:border-emerald-500/40 text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 font-mono text-xs py-3 rounded-xl transition-all"
            >
              <FileCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>VIEW COMPLETE VERIFIED RESUME</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
