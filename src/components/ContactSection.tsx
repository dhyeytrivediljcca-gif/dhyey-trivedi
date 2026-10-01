import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  FileText, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Terminal 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { setCustomCursor, resetCustomCursor } from './CustomCursor';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

// Crisp inline SVGs for social platforms
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const personal = PORTFOLIO_DATA.personal;

  const handleCopyEmail = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(personal.socials.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f59b', '#38bdf8', '#ffffff']
    });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    sounds.playSuccess();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f59b', '#38bdf8', '#a3e635']
    });

    // Mailto fallback
    const mailto = `mailto:${personal.socials.email}?subject=Message from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.email)}`;
    window.open(mailto, '_blank');
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 md:px-12 bg-white dark:bg-[#050609] overflow-hidden transition-colors duration-400">
      
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-circuit-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="pb-16 border-b border-zinc-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>SECTION [08] // INITIATE TRANSMISSION</span>
          </div>

          {/* Dramatic Typography Statement */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-syne font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-white tracking-tighter uppercase leading-none"
            >
              LET'S BUILD
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 uppercase"
            >
              SOMETHING WORTH REMEMBERING.
            </motion.h2>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-start">
          
          {/* Left Column: Direct Verified Links & Status */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-space font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                Available for Software Engineering, Frontend &amp; AI Product Roles
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                Based in Ahmedabad, Gujarat. Open to software development internships, full-time engineering roles, and innovative technical projects.
              </p>
            </div>

            {/* Quick Action Link Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Email Copier */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor('COPY EMAIL', 'hover');
                }}
                onMouseLeave={resetCustomCursor}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0D121D] hover:bg-white dark:hover:bg-[#121827] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 text-left transition-all duration-300 group flex flex-col justify-between min-h-[120px] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Mail className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  {copiedEmail ? (
                    <span className="text-xs font-mono text-emerald-500 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                  )}
                </div>

                <div>
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">DIRECT EMAIL</div>
                  <div className="font-mono text-xs sm:text-sm text-zinc-900 dark:text-white font-semibold truncate mt-0.5">
                    {personal.socials.email}
                  </div>
                </div>
              </button>

              {/* Verified Resume Dossier */}
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
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0D121D] hover:bg-white dark:hover:bg-[#121827] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 text-left transition-all duration-300 group flex flex-col justify-between min-h-[120px] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <FileText className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                </div>

                <div>
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">OFFICIAL RESUME</div>
                  <div className="font-space text-sm text-zinc-900 dark:text-white font-bold truncate mt-0.5">
                    View &amp; Download PDF
                  </div>
                </div>
              </button>

              {/* LinkedIn */}
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor('OPEN ↗', 'external');
                }}
                onMouseLeave={resetCustomCursor}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0D121D] hover:bg-white dark:hover:bg-[#121827] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 text-left transition-all duration-300 group flex flex-col justify-between min-h-[120px] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <LinkedinIcon className="w-5 h-5 text-sky-500" />
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors" />
                </div>

                <div>
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">PROFESSIONAL NETWORK</div>
                  <div className="font-space text-sm text-zinc-900 dark:text-white font-bold truncate mt-0.5">
                    LinkedIn Profile
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  sounds.playHover();
                  setCustomCursor('OPEN ↗', 'external');
                }}
                onMouseLeave={resetCustomCursor}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0D121D] hover:bg-white dark:hover:bg-[#121827] border border-zinc-200 dark:border-white/10 hover:border-emerald-500/50 text-left transition-all duration-300 group flex flex-col justify-between min-h-[120px] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <GithubIcon className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors" />
                </div>

                <div>
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">CODE REPOSITORIES</div>
                  <div className="font-space text-sm text-zinc-900 dark:text-white font-bold truncate mt-0.5">
                    GitHub Profile
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Transmission Dispatch Console */}
          <div className="lg:col-span-6 bg-zinc-50 dark:bg-[#090D16]/95 border border-zinc-200 dark:border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10 font-mono text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>TRANSMISSION DISPATCH PROTOCOL</span>
              </span>
              <span className="text-zinc-400">PORT: 8080/TLS</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-space font-bold text-2xl text-zinc-900 dark:text-white">Transmission Initiated!</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm mx-auto font-sans">
                  Thank you for reaching out. Dhyey Trivedi will review your dispatch promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-xs font-mono text-zinc-800 dark:text-white transition-all"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-600 dark:text-zinc-400 uppercase">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan (Tech Lead / Recruiter)"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white dark:bg-[#111724] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white font-sans outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-600 dark:text-zinc-400 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white dark:bg-[#111724] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white font-sans outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-600 dark:text-zinc-400 uppercase">Message &amp; Project Opportunity</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Let's discuss an engineering opportunity or project collaboration..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white dark:bg-[#111724] border border-zinc-200 dark:border-white/10 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white font-sans outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => {
                    sounds.playHover();
                    setCustomCursor('SEND', 'hover');
                  }}
                  onMouseLeave={resetCustomCursor}
                  className="shimmer-btn w-full flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs py-4 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE TO DHYEY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
