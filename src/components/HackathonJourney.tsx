import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  BookOpen, 
  Target, 
  Compass, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { PORTFOLIO_DATA, HackathonMilestone } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

export const HackathonJourney: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const milestones = PORTFOLIO_DATA.hackathonsAndJourney;

  const filteredMilestones = milestones.filter(m => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'AWARDS') return m.type === 'award' || m.type === 'cultural';
    if (activeFilter === 'HACKATHONS') return m.type === 'hackathon' || m.type === 'finalist';
    if (activeFilter === 'RESEARCH') return m.type === 'presentation';
    return true;
  });

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 md:px-12 bg-[#080A0F] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-circuit-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SECTION [04] // CHRONICLE &amp; COMPETITION</span>
            </div>

            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              HACKATHON &amp; <br className="hidden sm:inline" />
              <span className="text-outline-strong text-white hover:text-emerald-400 transition-colors">
                TECH JOURNEY.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'AWARDS', 'HACKATHONS', 'RESEARCH'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(tab);
                }}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/25'
                    : 'bg-[#101420] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="relative mt-20">
          
          {/* Central Progress Spine Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500/80 via-teal-500/40 to-transparent pointer-events-none" />

          {/* Milestone Items */}
          <div className="space-y-12 sm:space-y-16">
            {filteredMilestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0E18] border-2 border-emerald-400 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,245,155,0.4)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Year Tag (On the opposite side on desktop) */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                    <div className="font-syne font-black text-4xl sm:text-5xl lg:text-6xl text-white/[0.12] select-none">
                      {item.year}
                    </div>
                  </div>

                  {/* Milestone Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pl-8' : 'sm:pr-8'}`}>
                    <div 
                      onMouseEnter={() => sounds.playHover()}
                      className="p-6 sm:p-7 rounded-3xl bg-[#0C101B]/90 hover:bg-[#101625] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group space-y-3"
                    >
                      {/* Badge and Category */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          {item.roleOrPrize}
                        </span>
                        <span className="text-zinc-500 text-[11px]">{item.organization}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-space font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-zinc-300 font-sans text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certificate Aggregate Banner */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0E1320] to-[#0A0D15] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <div className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>OFFICIAL ACTIVITY RECORD</span>
            </div>
            <div className="font-space font-bold text-2xl text-white">
              15 Certificates across Academic, Technical, Cultural &amp; Innovation Activities
            </div>
            <div className="text-xs text-zinc-400 font-sans">
              Includes national hackathons, Gujarat University Youth Festival championships, and research symposia.
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-6 py-3 rounded-2xl bg-emerald-400 text-black font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/30">
              VERIFIED RECORD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
