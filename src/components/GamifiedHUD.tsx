import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Quest } from '../types';
import { soundFX } from '../utils/audio';
import { Trophy, CheckCircle2, Circle, Volume2, VolumeX, Eye, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from 'lucide-react';

interface GamifiedHUDProps {
  quests: Quest[];
  totalXP: number;
  fastMode: boolean;
  onToggleFastMode: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
  recruiterCompany?: string;
}

export const GamifiedHUD: React.FC<GamifiedHUDProps> = ({
  quests,
  totalXP,
  fastMode,
  onToggleFastMode,
  onOpenAuth,
  isAuthenticated,
  recruiterCompany
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(soundFX.enabled);

  // Calculate Level (Every 100 XP is a level)
  const level = Math.min(Math.floor(totalXP / 100) + 1, 5);
  const levelTitles = [
    'Explorer Scout',
    'Technical Reviewer',
    'Engineering Specialist',
    'Lead Talent Partner',
    'Principal Hiring Architect'
  ];
  const currentTitle = levelTitles[level - 1] || 'Principal Hiring Architect';
  const progressToNextLevel = totalXP >= 400 ? 100 : (totalXP % 100);

  const completedCount = quests.filter(q => q.completed).length;

  const toggleAudio = () => {
    soundFX.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      soundFX.playClick();
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.15 }
    });
    soundFX.playQuestComplete();
  };

  return (
    <aside aria-label="Recruiter quest and clearance level HUD" className="gamified-hud fixed top-16 md:top-20 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-80">
      {/* Compact HUD Pill */}
      <div className="bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-xl shadow-cyan-950/20 text-slate-100 p-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-2">
          {/* Level & XP */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity"
            title="Click to view Recruiter Quests"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs shadow-md shadow-cyan-500/30 text-white">
              L{level}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-cyan-400 font-mono">CLEARANCE</span>
                <span className="text-[11px] text-slate-300">({totalXP} XP)</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-[130px]">
                {currentTitle}
              </div>
            </div>
          </button>

          {/* Quick Controls */}
          <div className="flex items-center gap-1">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                audioEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title={audioEnabled ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Enable)'}
              aria-label="Toggle Sound Effects"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Recruiter Fast Mode Switch */}
            <button
              onClick={onToggleFastMode}
              className={`px-2 py-1 rounded-lg border text-[10px] font-mono transition-colors flex items-center gap-1 ${
                fastMode
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Toggle Recruiter Fast Mode (Minimalist View without gamification badges)"
            >
              <Eye className="w-3 h-3" />
              <span>{fastMode ? 'Fast ON' : 'Fast'}</span>
            </button>

            {/* Expand / Collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              aria-label="Expand Quests Drawer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2.5">
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>Level {level} Progress</span>
            <span>{completedCount}/{quests.length} Quests</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${(completedCount / quests.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Expanded Quests Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1 text-cyan-400">
                <Trophy className="w-3.5 h-3.5" /> Recruiter Milestones
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {completedCount === quests.length ? 'All Unlocked! 🎉' : `${quests.length - completedCount} Remaining`}
              </span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  className={`p-2 rounded-xl text-xs flex items-start gap-2 border transition-all ${
                    quest.completed
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {quest.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${quest.completed ? 'text-slate-200 line-through' : 'text-slate-300'}`}>
                        {quest.title}
                      </span>
                      <span className="font-mono text-[10px] text-cyan-400 font-bold ml-1">+{quest.xp}XP</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{quest.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiter Auth Portal Button */}
            <div className="pt-1">
              <button
                onClick={onOpenAuth}
                className={`w-full py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  isAuthenticated
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isAuthenticated
                    ? `Verified Partner: ${recruiterCompany || 'Unlocked'}`
                    : 'Unlock Recruiter Access Portal'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
