import React from 'react';
import { 
  FlaskConical, 
  Radio, 
  Activity, 
  ArrowUpRight,
  ShieldCheck 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

interface AiraLabSectionProps {
  onOpenProject: (projectId: string) => void;
}

export const AiraLabSection: React.FC<AiraLabSectionProps> = ({ onOpenProject }) => {
  const lab = PORTFOLIO_DATA.airaLab;

  return (
    <section id="aira-lab" className="relative py-28 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#05070B] overflow-hidden border-y border-zinc-200 dark:border-white/10 transition-colors duration-400">
      
      {/* Laboratory Grid & Scanning Reticles */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Lab Top Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-12 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>ACTIVE RESEARCH LAB</span>
              </span>
              <span className="font-mono text-xs text-zinc-500">FACULTY GUIDANCE: {lab.mentor}</span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-white tracking-tight uppercase">
              Advanced Research &amp; <br className="hidden sm:inline" />
              <span className="text-emerald-500 dark:text-emerald-400">Analytics Lab</span> <span className="text-zinc-500 text-2xl sm:text-3xl font-mono font-normal">(AiRA LAB)</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {lab.fullName} • LJCCA • AHMEDABAD
            </p>
          </div>

          {/* Philosophy Badge */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0B0F19] border border-zinc-200 dark:border-emerald-500/30 flex items-center gap-4 shadow-sm">
            <FlaskConical className="w-8 h-8 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">LAB MANDATE</div>
              <div className="font-space font-bold text-zinc-900 dark:text-white text-base tracking-wider">
                {lab.philosophy}
              </div>
            </div>
          </div>
        </div>

        {/* Laboratory Architecture & Key Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
          
          {/* Left Column: Interactive Telemetry & Radar Screen */}
          <div className="lg:col-span-6 bg-zinc-900 dark:bg-[#080C14] border border-zinc-300 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl text-white">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pb-4 border-b border-white/10">
              <span className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>LABORATORY TELEMETRY SYSTEM</span>
              </span>
              <span className="text-[10px] text-zinc-500">L J CAMPUS</span>
            </div>

            {/* Radar Visualizer Animation */}
            <div className="relative my-8 h-56 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full border border-emerald-500/20" />
                <div className="w-36 h-36 rounded-full border border-emerald-500/30" />
                <div className="w-20 h-20 rounded-full border border-emerald-500/40" />
                
                {/* Crosshairs */}
                <div className="absolute w-52 h-[1px] bg-emerald-500/20" />
                <div className="absolute h-52 w-[1px] bg-emerald-500/20" />
                
                {/* Rotating Scanner */}
                <div className="absolute w-52 h-52 rounded-full animate-radar origin-center pointer-events-none bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 text-center space-y-1">
                <div className="font-mono text-xs text-emerald-400 font-bold">RESEARCH HUB</div>
                <div className="font-space font-bold text-lg sm:text-xl text-white">AiRA LAB 2026</div>
                <div className="font-mono text-[10px] text-zinc-400">Advanced Research and Analytics Lab</div>
              </div>
            </div>

            {/* Flagship Project Amrit CTA Card */}
            <div 
              onClick={() => {
                sounds.playClick();
                onOpenProject('project-amrit');
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('IOT PROTOTYPE', 'project');
              }}
              onMouseLeave={resetCustomCursor}
              className="p-5 rounded-2xl bg-[#0E1422] border border-orange-500/30 hover:border-orange-400/60 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  FIRST LAB IOT PROTOTYPE
                </span>
                <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              <div className="font-space font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                Project Amrit — Hardware &amp; Sensor Telemetry
              </div>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Contributed to the first IoT project showcased during Advanced Research and Analytics Lab activities, demonstrating physical microcontroller interfacing and live data parsing.
              </p>
            </div>
          </div>

          {/* Right Column: Key Roles and Lab Engagements */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {lab.roles.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 rounded-3xl bg-zinc-50 dark:bg-[#090D17]/90 border border-zinc-200 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-2 group shadow-sm"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {item.role}
                  </span>
                  <span className="text-zinc-500">2026</span>
                </div>

                <h3 className="font-space font-bold text-xl text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 font-sans text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}

            {/* Academic Mentorship Card */}
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-gradient-to-r dark:from-[#0C1220] dark:to-[#0A0E18] border border-zinc-200 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>ACADEMIC PROJECT GUIDANCE</span>
              </div>
              <div className="font-space font-bold text-lg text-zinc-900 dark:text-white">
                Under the mentorship of Prof. Parth Joshi
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                Focused on exploratory applied computing, scalable backend pipelines, and prototype development within the Advanced Research and Analytics Lab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
