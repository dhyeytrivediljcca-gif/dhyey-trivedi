import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Code2 
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'FRONTEND & PWA', 'AI & DATA', 'IOT & LAB'];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(p => {
    if (filter === 'ALL') return true;
    if (filter === 'FRONTEND & PWA') return p.category.includes('Frontend') || p.category.includes('PWA') || p.category.includes('SaaS');
    if (filter === 'AI & DATA') return p.category.includes('AI') || p.category.includes('ML') || p.category.includes('Data');
    if (filter === 'IOT & LAB') return p.category.includes('IoT') || p.category.includes('LAB') || p.category.includes('Campus');
    return true;
  });

  return (
    <section id="work" className="relative py-28 px-4 sm:px-6 md:px-12 bg-zinc-50 dark:bg-[#080A0F] overflow-hidden transition-colors duration-400">
      
      {/* Background Ambience */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>SECTION [01] // PORTFOLIO CATALOG</span>
            </div>
            
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight uppercase">
              SELECTED <br className="hidden sm:inline" />
              <span className="text-outline-strong text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                WORKS.
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setFilter(cat);
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/25'
                    : 'bg-white dark:bg-[#101420] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial Project Showcase */}
        <div className="mt-16 space-y-16 md:space-y-24">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => {
                sounds.playClick();
                onSelectProject(project);
              }}
              onMouseEnter={() => {
                sounds.playHover();
                setCustomCursor('VIEW', 'project');
              }}
              onMouseLeave={resetCustomCursor}
              className="group relative rounded-3xl bg-white dark:bg-[#0B0E17]/80 hover:bg-white dark:hover:bg-[#0F1422] border-2 border-zinc-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-400/40 p-6 sm:p-8 md:p-12 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/60"
            >
              {/* Colored Glow Accent on Hover */}
              <div 
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
                style={{ backgroundColor: `${project.color}15` }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Project Meta & Editorial Text */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Top Number & Tag */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 pb-2 border-b border-zinc-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold text-sm">0{index + 1}</span>
                      <span>//</span>
                      <span className="text-zinc-600 dark:text-zinc-400 uppercase">{project.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                          {project.badge}
                        </span>
                      )}
                      <span className="text-zinc-500">{project.year}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <div className="space-y-2">
                    <h3 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-zinc-700 dark:text-zinc-300 font-sans text-sm sm:text-base leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Highlight Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-mono text-xs text-zinc-700 dark:text-zinc-300 group-hover:border-emerald-500/30 transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Visual Blueprint Card */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative aspect-[16/10] rounded-2xl bg-zinc-900 dark:bg-[#121624] border border-zinc-300 dark:border-white/10 p-6 flex flex-col justify-between overflow-hidden group-hover:border-emerald-500/50 transition-all duration-500 shadow-lg">
                    
                    {/* Background Visual Pattern */}
                    <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />
                    
                    {/* Top Blueprint Badge */}
                    <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 z-10">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>SPEC // ARCHITECTURE</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                        {project.status}
                      </span>
                    </div>

                    {/* Middle Graphic Graphic */}
                    <div className="my-auto z-10 py-4">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md space-y-2">
                        <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                          CORE ENGINE FLOW
                        </div>
                        <p className="font-mono text-xs text-zinc-200 line-clamp-3">
                          {project.architectureNotes}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs z-10">
                      <span className="text-zinc-300 group-hover:text-emerald-400 transition-colors">
                        CLICK TO OPEN PROTOTYPE SIMULATOR
                      </span>
                      <div className="w-8 h-8 rounded-full bg-emerald-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
