import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { OpeningSequence } from './components/OpeningSequence';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { TechConstellation } from './components/TechConstellation';
import { AboutStory } from './components/AboutStory';
import { HackathonBasketball } from './components/HackathonBasketball';
import { AiraLabSection } from './components/AiraLabSection';
import { LearningRoadmap } from './components/LearningRoadmap';
import { BeyondTheCode } from './components/BeyondTheCode';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

function PortfolioMain() {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleOpenCommandPalette = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener('open-command-palette', handleOpenCommandPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenCommandPalette);
  }, []);

  const handleOpenProjectById = (projectId: string) => {
    const found = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#07080B] text-zinc-900 dark:text-[#E2E8F0] relative overflow-x-hidden selection:bg-emerald-400 selection:text-black transition-colors duration-400">
      
      {/* Physics-based Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Opening Boot Sequence */}
      {!bootSequenceComplete && (
        <OpeningSequence onComplete={() => setBootSequenceComplete(true)} />
      )}

      {/* Main Experience Layout */}
      <div className={`transition-opacity duration-1000 ${bootSequenceComplete ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Floating Minimal Navbar with Theme Toggle */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Hero Section — Dhyey as the Visual Center & Giant Typography Layering */}
        <Hero
          onOpenProject={handleOpenProjectById}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* Section 01: Selected Work (Editorial Showcase & Simulators) */}
        <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 02: The Tech Constellation */}
        <TechConstellation />

        {/* Section 03: Storytelling & Digital Dossier (Education Marks Removed) */}
        <AboutStory onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Section 04: Hackathon Basketball Arena (2D Shoot-to-Explore & Voice Synthesizer) */}
        <HackathonBasketball />

        {/* Section 05: AiRA LAB Hub (Radar & Project Amrit) */}
        <AiraLabSection onOpenProject={handleOpenProjectById} />

        {/* Section 06: Futuristic Learning Roadmap */}
        <LearningRoadmap />

        {/* Section 07: Beyond The Code */}
        <BeyondTheCode />

        {/* Section 08: Dramatic Closing Contact & Transmission */}
        <ContactSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Technical Footer */}
        <Footer />
      </div>

      {/* Project Blueprint & Prototype Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Quick Power-User Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleOpenProjectById}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <PortfolioMain />
    </ThemeProvider>
  );
}

export default App;
