import React from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Github, Linkedin, Mail, Phone, ArrowUp, Bot, Shield, CheckSquare, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCopilot: () => void;
  onOpenTests: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCopilot,
  onOpenTests,
  onOpenAuth
}) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 relative text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-slate-800/60">
          
          {/* Monogram & Title */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white font-mono text-sm">
                DW
              </div>
              <span className="font-bold text-slate-100 text-sm">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Computer Science &amp; Engineering Undergraduate at MIT World Peace University (MIT WPU), Pune. Specializing in C++, Data Structures, Applied AI, and Relational DBMS.
            </p>
            <div className="text-slate-400 text-[11px] font-mono">
              Available for Summer 2026 Internships &amp; Engineering Roles
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2 font-mono">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Sections</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
              <a href="#certifications" className="hover:text-cyan-400 transition-colors">Certifications</a>
              <a href="#resume" className="hover:text-cyan-400 transition-colors">Resume PDF</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Recruiter Tools & Socials */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Recruiter Tools</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenCopilot();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask AI Copilot</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenTests();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Unit Tests</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenAuth();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recruiter Portal</span>
              </button>
            </div>

            {/* Socials */}
            <div className="pt-2 flex items-center gap-4 text-slate-300">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="hover:text-emerald-400 transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Digvijay Madhav Ware &bull; All Rights Reserved. Built with React, Three.js, C++ Kinematics &amp; Gemini 3.1 Pro.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors flex items-center gap-1 text-[11px] font-mono"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
