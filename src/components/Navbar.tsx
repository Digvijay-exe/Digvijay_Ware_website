import React, { useState } from 'react';
import { Sun, Moon, FileText, Bot, CheckSquare, Menu, X, Shield, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCopilot: () => void;
  onOpenTests: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenCopilot,
  onOpenTests,
  onOpenAuth,
  isAuthenticated
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Resume PDF', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    soundFX.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors duration-200">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-bold focus:rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <a
            href="#about"
            onClick={handleLinkClick}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-black text-cyan-400 text-base">DW</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
                  Digvijay Madhav Ware
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  Available 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">B.Tech CSE @ MIT WPU, Pune</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* AI Copilot Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenCopilot();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-all shadow-sm shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              title="Career Copilot AI with Gemini Thinking Mode"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">AI Copilot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </button>

            {/* Unit Tests Runner Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenTests();
              }}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-mono transition-colors"
              title="Run Code & Algorithm Unit Tests"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tests</span>
            </button>

            {/* Recruiter Auth Portal Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenAuth();
              }}
              className={`p-1.5 rounded-xl border text-xs transition-colors ${
                isAuthenticated
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500/50'
              }`}
              title={isAuthenticated ? 'Verified Recruiter Session Active' : 'Recruiter Secure Access Portal'}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleDarkMode();
              }}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-700"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile Navigation" className="lg:hidden py-3 px-2 border-t border-slate-800 bg-slate-950/95 space-y-1 animate-fadeIn">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-3">
              <button
                onClick={() => {
                  handleLinkClick();
                  onOpenTests();
                }}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 font-mono"
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Run System Tests</span>
              </button>
              <button
                onClick={() => {
                  handleLinkClick();
                  onOpenCopilot();
                }}
                className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
