import React, { useState } from 'react';
import { PROJECTS } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Github, ExternalLink, Activity, Cpu, Play, RotateCcw, Search, Zap, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

interface ProjectsSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onUnlockQuest }) => {
  // Kinematic Fatigue Simulator State (Pulse)
  const [reps, setReps] = useState<number[]>([0.88, 0.85, 0.82]); // Baseline 3 reps
  const [currentVelocity, setCurrentVelocity] = useState(0.82);
  const [isCalibrated, setIsCalibrated] = useState(true);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [repCount, setRepCount] = useState(3);

  // InkLite Algorithm Visualizer State
  const [sampleText, setSampleText] = useState('FAST_SEARCH_ALGORITHM_KMP_BOYER_MOORE_TEXT_PROCESSING_ENGINE_C++');
  const [searchPattern, setSearchPattern] = useState('KMP');
  const [searchResult, setSearchResult] = useState<{
    matches: number[];
    comparisons: number;
    naiveComparisons: number;
    timeComplexity: string;
    algorithm: 'KMP' | 'Boyer-Moore';
  }>({
    matches: [22],
    comparisons: 25,
    naiveComparisons: 64,
    timeComplexity: 'O(N + M)',
    algorithm: 'KMP'
  });

  // Pulse Rep Simulator
  const handleSimulateRep = () => {
    soundFX.playClick();
    onUnlockQuest('q-inspect-pulse');

    const nextRepCount = repCount + 1;
    setRepCount(nextRepCount);

    // Calculate natural fatigue velocity degradation
    const baseline = (reps[0] + reps[1] + reps[2]) / 3;
    const fatigueFactor = Math.max(0.4, currentVelocity * 0.91 + (Math.random() * 0.04 - 0.02));
    const newVel = parseFloat(fatigueFactor.toFixed(2));
    setCurrentVelocity(newVel);

    const updatedReps = [...reps, newVel];
    setReps(updatedReps);

    // Velocity loss threshold: > 20% loss triggers fatigue alert
    const velocityLoss = ((baseline - newVel) / baseline) * 100;
    if (velocityLoss >= 20) {
      setAlertTriggered(true);
    }
  };

  const handleResetPulse = () => {
    soundFX.playClick();
    setReps([0.88, 0.85, 0.82]);
    setCurrentVelocity(0.82);
    setRepCount(3);
    setAlertTriggered(false);
    setIsCalibrated(true);
  };

  // InkLite KMP / Boyer-Moore Search Demo
  const handleRunSearch = (algo: 'KMP' | 'Boyer-Moore') => {
    soundFX.playClick();
    onUnlockQuest('q-test-kmp');

    const text = sampleText.toUpperCase();
    const pat = searchPattern.toUpperCase();

    if (!pat) return;

    let comparisons = 0;
    const matches: number[] = [];

    if (algo === 'KMP') {
      // Compute KMP prefix table (LPS)
      const lps: number[] = new Array(pat.length).fill(0);
      let len = 0;
      let i = 1;
      while (i < pat.length) {
        comparisons++;
        if (pat[i] === pat[len]) {
          len++;
          lps[i] = len;
          i++;
        } else {
          if (len !== 0) {
            len = lps[len - 1];
          } else {
            lps[i] = 0;
            i++;
          }
        }
      }

      // KMP Search
      let ti = 0;
      let pi = 0;
      while (ti < text.length) {
        comparisons++;
        if (pat[pi] === text[ti]) {
          ti++;
          pi++;
        }
        if (pi === pat.length) {
          matches.push(ti - pi);
          pi = lps[pi - 1];
        } else if (ti < text.length && pat[pi] !== text[ti]) {
          if (pi !== 0) {
            pi = lps[pi - 1];
          } else {
            ti++;
          }
        }
      }

      const naiveComparisons = (text.length - pat.length + 1) * pat.length;
      setSearchResult({
        matches,
        comparisons,
        naiveComparisons,
        timeComplexity: 'O(N + M)',
        algorithm: 'KMP'
      });
    } else {
      // Boyer-Moore bad character heuristic simulation
      const badChar: { [key: string]: number } = {};
      for (let i = 0; i < pat.length; i++) {
        badChar[pat[i]] = i;
      }

      let s = 0;
      while (s <= text.length - pat.length) {
        let j = pat.length - 1;
        while (j >= 0 && pat[j] === text[s + j]) {
          comparisons++;
          j--;
        }
        if (j < 0) {
          matches.push(s);
          s += (s + pat.length < text.length) ? pat.length - (badChar[text[s + pat.length]] ?? -1) : 1;
        } else {
          comparisons++;
          const lastOccur = badChar[text[s + j]] ?? -1;
          s += Math.max(1, j - lastOccur);
        }
      }

      const naiveComparisons = (text.length - pat.length + 1) * pat.length;
      setSearchResult({
        matches,
        comparisons,
        naiveComparisons,
        timeComplexity: 'Sublinear O(N / M)',
        algorithm: 'Boyer-Moore'
      });
    }
  };

  const baselineVelocity = (reps[0] + reps[1] + reps[2]) / 3;
  const currentLoss = Math.max(0, (((baselineVelocity - currentVelocity) / baselineVelocity) * 100)).toFixed(1);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Engineering &amp; Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Flagship Software Projects
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            High-performance C++ systems, real-time sensor fusion telemetry, and algorithmic engines with sublinear search performance.
          </p>
        </div>

        {/* Project 1: Pulse – Real-Time Collaborative Platform & Fatigue Tracker */}
        <div className="mb-16 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Project Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/40">
                  FLAGSHIP C++
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs">
                  2026
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                  Sub-15ms Latency
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                  Pulse – Real-Time Collaborative Platform
                </h3>
                <p className="text-cyan-400 font-medium text-sm mt-1">
                  Kinematic Fatigue Tracker with Accelerometer, Gyroscope &amp; Socket Networking
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                A high-speed biomechanical monitoring system engineered in C++. Uses real-time accelerometer and gyroscope sensor telemetry to accurately detect movement repetitions, estimate velocity profiles, and compute progressive fatigue decay.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Automatic 3-Rep Calibration:</strong> Dynamically establishes personalized concentric velocity baselines for each user set.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Confidence-Based Rep Detection:</strong> Advanced signal filtering eliminates false positives caused by sensor drift and shaking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Real-Time Velocity Loss &amp; Haptic Alerts:</strong> Immediate feedback dispatched via low-latency socket layer when velocity drops below critical fatigue threshold (&gt;20%).</span>
                </li>
              </ul>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['C++', 'Socket Programming', 'Data Structures', 'Sensor Telemetry', 'Signal Filtering', 'Haptics'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 text-xs font-mono border border-slate-700/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-3">
                <a
                  href="https://github.com/Digvijay-exe"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-all border border-slate-700"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>View Repository (GitHub)</span>
                </a>
                <span className="text-xs text-slate-400 font-mono">
                  Engineered by Digvijay Ware
                </span>
              </div>
            </div>

            {/* Right: Interactive Kinematic Fatigue Simulator */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200">Kinematic Sensor Simulator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    3-Rep Auto Calibrated
                  </span>
                </div>
              </div>

              {/* Telemetry Dashboard */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">TOTAL REPS</div>
                  <div className="text-lg font-bold font-mono text-slate-100">{repCount}</div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">LAST VELOCITY</div>
                  <div className="text-lg font-bold font-mono text-cyan-400">{currentVelocity} <span className="text-xs">m/s</span></div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">VELOCITY LOSS</div>
                  <div className={`text-lg font-bold font-mono ${parseFloat(currentLoss) >= 20 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    -{currentLoss}%
                  </div>
                </div>
              </div>

              {/* Velocity Decay Bar Graph */}
              <div className="space-y-2 mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>Rep Telemetry Sequence</span>
                  <span>Baseline: {baselineVelocity.toFixed(2)} m/s</span>
                </div>
                <div className="flex items-end gap-1.5 h-24 pt-2">
                  {reps.map((vel, idx) => {
                    const heightPercent = Math.min(100, Math.max(20, (vel / 1.0) * 100));
                    const isAlert = idx >= 3 && ((baselineVelocity - vel) / baselineVelocity) >= 0.2;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group/bar">
                        <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {vel}
                        </span>
                        <div
                          className={`w-full rounded-t-md transition-all duration-300 ${
                            isAlert
                              ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                              : idx < 3
                              ? 'bg-cyan-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                          title={`Rep ${idx + 1}: ${vel} m/s`}
                        />
                        <span className="text-[10px] font-mono text-slate-400">R{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-Time Fatigue Alert Indicator */}
              {alertTriggered ? (
                <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-center justify-between animate-bounce">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span className="font-semibold">FATIGUE LOSS &gt;20% &bull; HAPTIC ALERT FIRED</span>
                  </div>
                  <span className="font-mono text-[10px]">C++ SOCKET PACKET SENT</span>
                </div>
              ) : (
                <div className="p-2.5 mb-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Velocity within target threshold (&lt;20% decay). Kinematics stable.</span>
                </div>
              )}

              {/* Simulator Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSimulateRep}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Next Rep</span>
                </button>
                <button
                  onClick={handleResetPulse}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors"
                  title="Reset Simulator to 3-rep baseline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: InkLite – Lightweight Text & Note Processing Engine */}
        <div className="rounded-3xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Project Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-xs font-semibold border border-blue-500/40">
                  ALGORITHMIC ENGINE
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs">
                  2026
                </span>
                <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-xs border border-indigo-500/30">
                  O(N + M) KMP / Boyer-Moore
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                  InkLite – Lightweight Text &amp; Note Processing Engine
                </h3>
                <p className="text-blue-400 font-medium text-sm mt-1">
                  Engineered in C++ with OOP, Buffered File I/O &amp; Advanced String Search
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                A high-efficiency text and document processing engine designed from first principles for instant cold startup and minimal RAM footprint. Implements industry-grade Knuth-Morris-Pratt (KMP) and Boyer–Moore string-search algorithms to achieve sublinear search times across massive corpora.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong>KMP &amp; Boyer–Moore Search:</strong> Achieves deterministic O(N + M) and sublinear pattern matching with preprocessing failure tables and bad-character heuristics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Structured Document Model:</strong> Built with robust C++ object-oriented design for document tokenization, serialization, and note retrieval.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong>High-Throughput File I/O:</strong> Safe buffered file operations eliminating redundant system calls and memory fragmentation.</span>
                </li>
              </ul>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['C++', 'KMP Algorithm', 'Boyer-Moore', 'Data Structures', 'OOP', 'File I/O', 'Memory Optimization'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 text-xs font-mono border border-slate-700/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-3">
                <a
                  href="https://github.com/Digvijay-exe"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-all border border-slate-700"
                >
                  <Github className="w-4 h-4 text-blue-400" />
                  <span>View Repository (GitHub)</span>
                </a>
                <span className="text-xs text-slate-400 font-mono">
                  github.com/Digvijay-exe
                </span>
              </div>
            </div>

            {/* Right: Interactive String Search Benchmark Visualizer */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">Algorithmic Pattern Matcher</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {searchResult.algorithm} Engine Active
                </span>
              </div>

              {/* Text Input Simulation */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400">Target Text Stream (C++ Buffer)</label>
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Pattern Input & Search Triggers */}
              <div className="flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-400">Pattern Query</label>
                  <input
                    type="text"
                    value={searchPattern}
                    onChange={(e) => setSearchPattern(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-end gap-1.5">
                  <button
                    onClick={() => handleRunSearch('KMP')}
                    className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-md transition-all"
                  >
                    Run KMP
                  </button>
                  <button
                    onClick={() => handleRunSearch('Boyer-Moore')}
                    className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold shadow-md transition-all"
                  >
                    Boyer-Moore
                  </button>
                </div>
              </div>

              {/* Benchmark Results */}
              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Algorithm:</span>
                  <span className="font-mono font-bold text-cyan-400">{searchResult.algorithm}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Complexity:</span>
                  <span className="font-mono text-emerald-400">{searchResult.timeComplexity}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Char Comparisons:</span>
                  <span className="font-mono text-slate-200">
                    <strong className="text-cyan-300">{searchResult.comparisons}</strong> vs {searchResult.naiveComparisons} (Naive)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400 font-mono">Matches Found:</span>
                  <span className="font-mono font-bold text-indigo-300">
                    {searchResult.matches.length > 0 ? `${searchResult.matches.length} at index [${searchResult.matches.join(', ')}]` : 'No match'}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 font-mono">
                &bull; KMP utilizes LPS (Longest Proper Prefix which is also Suffix) failure table.<br />
                &bull; Boyer-Moore shifts pattern using Bad Character &amp; Good Suffix heuristics.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
