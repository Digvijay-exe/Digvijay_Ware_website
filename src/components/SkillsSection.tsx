import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Code, Binary, Database, Cpu, Terminal, Sparkles, Check, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'binary':
        return <Binary className="w-4 h-4 text-blue-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs mb-3">
            <Binary className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Engineering Skill Matrix
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Proficiencies across low-level C++ systems, advanced algorithmic optimization, relational database engineering, and applied computer vision.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((category, idx) => (
            <button
              key={category.name}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(idx);
              }}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === idx
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {getIcon(category.icon)}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES[activeTab].skills.map((skill, index) => (
            <div
              key={skill.name}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md font-semibold">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Practical Application Highlight */}
              {skill.highlight && (
                <div className="flex items-start gap-2 pt-1 text-xs text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{skill.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Summary Tag Cloud */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Core Competencies &amp; Architectural Focus
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              'Object-Oriented Programming (OOP)',
              'KMP String Search',
              'Boyer-Moore Heuristic',
              'Tree & Graph Traversal',
              'Dynamic Programming',
              'MySQL Relational Design',
              'SQL Normalization (1NF-3NF)',
              'Indexing & Procedures',
              'Socket Programming (TCP/UDP)',
              'Signal Telemetry & Kinematics',
              'Computer Vision Essentials',
              'Linux/Unix Shell & Tooling',
              'Git Branching & GitHub CI'
            ].map(pill => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
