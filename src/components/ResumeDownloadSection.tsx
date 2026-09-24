import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, HACKATHONS } from '../data/resumeData';
import { downloadResumePDF, downloadResumeMarkdown } from '../utils/pdfGenerator';
import { soundFX } from '../utils/audio';
import { Download, Printer, FileText } from 'lucide-react';

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
    <section id="resume" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Curriculum Vitae
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Downloadable Resume
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Exact single-page resume formatted for technical recruiters and ATS review.
          </p>
        </div>

        {/* Minimalist Action Row */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Layout</span>
          </button>

          <button
            onClick={handleDownloadMD}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plaintext (Markdown)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mb-6 p-3 rounded-lg bg-[#a7c4b5]/20 dark:bg-[#a7c4b5]/15 text-[#2e4738] dark:text-[#a7c4b5] text-xs font-mono">
            Official PDF generated &amp; downloaded (+100 XP unlocked).
          </div>
        )}

        {/* Crisp Document Paper Preview */}
        <div className="max-w-4xl rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-12 text-stone-900 dark:text-stone-100 shadow-sm print-only-resume">
          
          {/* Header */}
          <div className="text-center pb-5 mb-5 border-b border-stone-200 dark:border-stone-800">
            <h3 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 space-x-2 font-mono">
              <span>{PERSONAL_INFO.location}</span>
              <span>&bull;</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span>&bull;</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-stone-900 dark:text-stone-100 hover:underline">{PERSONAL_INFO.email}</a>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 space-x-3 font-mono">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/digvijay-ware-57a007330</a>
              <span>&bull;</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline">github.com/Digvijay-exe</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Professional Summary
            </h4>
            <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 text-justify font-serif">
              {PERSONAL_INFO.professionalSummary}
            </p>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Education
            </h4>
            <div className="flex justify-between items-baseline text-xs font-serif font-bold text-stone-900 dark:text-stone-100">
              <span>{PERSONAL_INFO.education.institution}</span>
              <span className="font-normal font-mono text-stone-500">{PERSONAL_INFO.education.location}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 italic font-serif">
              <span>{PERSONAL_INFO.education.degree}</span>
              <span className="font-mono">{PERSONAL_INFO.education.period}</span>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-serif">
              – Current Status: {PERSONAL_INFO.education.status} | Focus Areas: {PERSONAL_INFO.education.focusAreas.join(', ')}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Technical Skills
            </h4>
            <div className="text-xs space-y-1 text-stone-700 dark:text-stone-300 font-serif">
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Programming:</strong> C++, Python, SQL</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Data Structures &amp; Algorithms:</strong> Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Database Management:</strong> MySQL, Relational Database Design, SQL Joins, Indexing, Procedures, Triggers</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">AI &amp; Computer Vision:</strong> Artificial Intelligence Fundamentals, Computer Vision, AI Productivity Tools</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Development Tools:</strong> Git, GitHub, VS Code, Linux/Unix</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Core Concepts:</strong> Object-Oriented Programming, File I/O, Socket Programming, Software Development</div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Projects
            </h4>
            {PROJECTS.map(p => (
              <div key={p.id} className="mb-3 font-serif">
                <div className="flex justify-between items-baseline text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span>{p.title} – {p.subtitle}</span>
                  <span className="font-normal font-mono text-stone-500">{p.year}</span>
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 italic mb-1">
                  {p.tags.join(' | ')}
                </div>
                <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5">
                  {p.bulletPoints.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Experience & Leadership */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Experience &amp; Leadership
            </h4>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="mb-3 font-serif">
                <div className="flex justify-between items-baseline text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span>{exp.role.split('–')[0].trim()} – {exp.company}</span>
                  <span className="font-normal font-mono text-stone-500">{exp.location}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 italic mb-1">
                  <span>{exp.role.split('–')[1] ? exp.role.split('–')[1].trim() : 'Ambassador'}</span>
                  <span className="font-mono">{exp.period}</span>
                </div>
                <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hackathons & Competitions */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Hackathons &amp; Competitions
            </h4>
            <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5 font-serif">
              {HACKATHONS.map((h, i) => (
                <li key={i}>
                  <strong>{h.name}:</strong> {h.organizer}, {h.location} – {h.round}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
