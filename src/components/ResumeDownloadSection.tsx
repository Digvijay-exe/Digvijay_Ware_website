import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';
import { downloadResumePDF, downloadResumeMarkdown } from '../utils/pdfGenerator';
import { soundFX } from '../utils/audio';
import { FileText, Download, Printer, FileCode, CheckCircle, ExternalLink, Sparkles, Eye } from 'lucide-react';

interface ResumeDownloadSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({ onUnlockQuest }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    downloadResumePDF();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleDownloadMD = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    downloadResumeMarkdown();
  };

  const handlePrint = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    window.print();
  };

  return (
    <section id="resume" className="py-20 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Candidate Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Downloadable Resume &amp; Dossier
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Verified CV ready for recruiters, hiring committees, and ATS parsing in high-resolution PDF and structured markdown.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-600/20 flex items-center gap-2.5 transition-all group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Official PDF Resume</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white">
              PDF
            </span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print-to-PDF / Clean Paper View</span>
          </button>

          <button
            onClick={handleDownloadMD}
            className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-blue-500/50 font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <FileCode className="w-4 h-4 text-blue-400" />
            <span>ATS Plaintext / Markdown</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto mb-8 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs text-center flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Official PDF dossier generated! Quest milestone unlocked (+100 XP).</span>
          </div>
        )}

        {/* High-Fidelity On-Screen Document Preview */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-4 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Document Preview &bull; Digvijay_Madhav_Ware_Resume.pdf</span>
            </div>
            <span className="hidden sm:inline text-cyan-400">Page 1 of 1 (Standard Format)</span>
          </div>

          {/* Paper View Container */}
          <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-10 shadow-lg text-left select-text print-only-resume">
            
            {/* Header */}
            <div className="text-center pb-4 mb-4 border-b-2 border-sky-600">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {PERSONAL_INFO.name}
              </h3>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 space-x-2">
                <span>{PERSONAL_INFO.location}</span>
                <span>&bull;</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>&bull;</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-600 hover:underline">{PERSONAL_INFO.email}</a>
              </div>
              <div className="text-xs text-slate-600 mt-1 space-x-3">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline font-mono">
                  linkedin.com/in/digvijay-ware-57a007330
                </a>
                <span>&bull;</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline font-mono">
                  github.com/Digvijay-exe
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-2">
                Professional Summary
              </h4>
              <p className="text-xs leading-relaxed text-slate-700 text-justify">
                {PERSONAL_INFO.professionalSummary}
              </p>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-2">
                Education
              </h4>
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                <span>{PERSONAL_INFO.education.institution}</span>
                <span>{PERSONAL_INFO.education.location}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 italic">
                <span>{PERSONAL_INFO.education.degree}</span>
                <span>{PERSONAL_INFO.education.period}</span>
              </div>
              <div className="text-xs text-slate-700 mt-1">
                – Current Status: {PERSONAL_INFO.education.status} | Focus Areas: {PERSONAL_INFO.education.focusAreas.join(', ')}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-2">
                Technical Skills
              </h4>
              <div className="text-xs space-y-1 text-slate-800">
                <div><strong>Programming:</strong> C++, Python, SQL</div>
                <div><strong>Data Structures &amp; Algorithms:</strong> Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore</div>
                <div><strong>Database Management:</strong> MySQL, Relational Database Design, SQL Joins, Indexing, Procedures, Triggers</div>
                <div><strong>AI &amp; Computer Vision:</strong> Artificial Intelligence Fundamentals, Computer Vision, AI Productivity Tools</div>
                <div><strong>Development Tools:</strong> Git, GitHub, VS Code, Linux/Unix</div>
                <div><strong>Core Concepts:</strong> Object-Oriented Programming, File I/O, Socket Programming, Software Development</div>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-2">
                Projects
              </h4>
              {PROJECTS.map(p => (
                <div key={p.id} className="mb-3">
                  <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                    <span>{p.title} – {p.subtitle}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="text-xs text-slate-600 italic mb-1">
                    {p.tags.join(' | ')}
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-0.5">
                    {p.bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Experience & Leadership */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-2">
                Experience &amp; Leadership
              </h4>
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                    <span>{exp.role.split('–')[0].trim()} – {exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 italic">
                    <span>{exp.role.split('–')[1] ? exp.role.split('–')[1].trim() : 'Ambassador'}</span>
                    <span>{exp.period}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-0.5 mt-1">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Hackathons & Competitions */}
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-1">
                Hackathons &amp; Competitions
              </h4>
              <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-0.5">
                {HACKATHONS.map((h, i) => (
                  <li key={i}>
                    <strong>{h.name}:</strong> {h.organizer}, {h.location} – {h.round}
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Certifications */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-300 pb-1 mb-1">
                Course Certifications
              </h4>
              <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-0.5">
                {CERTIFICATIONS.map(c => (
                  <li key={c.id}>
                    <strong>{c.title}:</strong> {c.issuer} – {c.details} ({c.date})
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
