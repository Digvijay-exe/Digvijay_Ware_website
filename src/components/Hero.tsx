import React from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { ThreeCanvas } from './ThreeCanvas';
import { soundFX } from '../utils/audio';
import { Github, Linkedin, Mail, Phone, Download, ArrowRight, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

interface HeroProps {
  onDownloadResume: () => void;
  onOpenCopilot: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDownloadResume,
  onOpenCopilot,
  reducedMotion,
  onToggleReducedMotion
}) => {
  return (
    <section id="about" className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Status: 3rd Year CSE @ MIT WPU Pune | Seeking Summer 2026 Roles</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Digvijay Madhav Ware</span>
              </h1>
              <p className="mt-2 text-xl font-medium text-slate-300 font-mono">
                Computer Science Engineer &bull; C++, Systems, Applied AI
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.professionalSummary}
            </p>

            {/* Quick Tech Highlights */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> C++ &amp; Socket Networking
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-blue-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" /> DSA: KMP, Boyer–Moore, Graphs
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-indigo-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Applied AI &amp; Computer Vision
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={() => soundFX.playClick()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onDownloadResume();
                }}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/60 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume (PDF)</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenCopilot();
                }}
                className="px-4 py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-sm font-medium flex items-center gap-2 transition-all"
                title="Interview Assistant powered by Gemini 3.1 Pro with High Thinking"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Social Links & Direct Contacts */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-slate-400 text-xs font-mono">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/Digvijay-exe</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-slate-300" />
                <span>digvijay.ware@mitwpu.edu.in</span>
              </a>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91-8779877704</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Kinetic Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-slate-900/60 dark:bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-2 shadow-2xl shadow-cyan-950/30 overflow-hidden">
              {/* Header Bar of 3D Card */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 font-semibold">interactive_core.threejs</span>
                </div>
                <button
                  onClick={onToggleReducedMotion}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Pause/Resume 3D Rotation for accessibility"
                >
                  {reducedMotion ? 'Resume 3D' : 'Pause 3D'}
                </button>
              </div>

              {/* Three.js Canvas */}
              <ThreeCanvas reducedMotion={reducedMotion} />
            </div>

            {/* Floating Metric Badges */}
            <div className="absolute -bottom-4 -left-4 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                2026
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-100">Pulse Kinematics</div>
                <div className="text-[11px] text-cyan-400 font-mono">Fatigue &amp; Velocity Engine</div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                2 ECTS
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-100">Univ of Helsinki</div>
                <div className="text-[11px] text-indigo-300 font-mono">Elements of AI Certified</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
