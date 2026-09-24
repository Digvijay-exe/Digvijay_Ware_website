import React from 'react';
import { EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Briefcase, Trophy, Award, ExternalLink, Calendar, MapPin, CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';

interface ExperienceHackathonsSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ExperienceHackathonsSection: React.FC<ExperienceHackathonsSectionProps> = ({ onUnlockQuest }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Track Record &amp; Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Experience, Hackathons &amp; Credentials
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Demonstrated initiative through community leadership, competitive hackathons, and certified coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Campus Ambassador & Leadership Experience */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-slate-100">Experience &amp; Leadership</h3>
            </div>

            <div className="space-y-4">
              {EXPERIENCES.map((exp, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-6 transition-all hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {exp.location}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-100">{exp.company}</h4>
                  <div className="text-sm font-medium text-cyan-400 mb-4">{exp.role}</div>

                  <ul className="space-y-2 text-sm text-slate-300">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Hackathons & Competitions */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-slate-100">Hackathons &amp; Competitions</h3>
              </div>

              <div className="space-y-3">
                {HACKATHONS.map((hackathon, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                        <span>{hackathon.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {hackathon.year}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {hackathon.organizer} &bull; {hackathon.location}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="inline-block text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
                        {hackathon.round}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Course Certifications & Education Card */}
          <div id="certifications" className="lg:col-span-6 space-y-6">
            
            {/* Education Spotlight Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-blue-500/30 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-xs font-semibold border border-blue-500/40 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-400" /> ACADEMIC STATUS
                </span>
                <span className="text-xs font-mono text-slate-400">2024 – 2028</span>
              </div>
              <h4 className="text-xl font-bold text-slate-100">
                MIT World Peace University (MIT WPU)
              </h4>
              <p className="text-sm text-blue-400 font-medium">Pune, Maharashtra, India</p>
              <div className="mt-3 text-sm text-slate-300 font-mono">
                Bachelor of Technology in Computer Science &amp; Engineering (CSE)
              </div>
              <div className="mt-2 text-xs text-slate-400">
                <strong>Current Status:</strong> 3rd Year Undergraduate &bull; <strong>Focus Areas:</strong> Software Engineering, DBMS &amp; Applied AI
              </div>
            </div>

            {/* Certifications Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xl font-bold text-slate-100">Course Certifications</h3>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onUnlockQuest('q-view-certs');
                }}
                className="text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                Mark Verified (+50 XP)
              </button>
            </div>

            {/* Certifications List */}
            <div className="space-y-3.5">
              {CERTIFICATIONS.map(cert => (
                <div
                  key={cert.id}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 p-4 transition-all hover:bg-slate-900/80"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h5 className="font-bold text-sm text-slate-100">{cert.title}</h5>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/80 flex-shrink-0">
                      {cert.badge}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-400 font-medium mb-1">
                    {cert.issuer} &bull; <span className="text-slate-400 font-mono">{cert.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cert.details}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
