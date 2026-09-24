import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { Github, Play, RotateCcw, Search, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onUnlockQuest }) => {
  // Kinematic Fatigue Simulator State (Pulse)
  const [reps, setReps] = useState<number[]>([0.88, 0.85, 0.82]);
  const [currentVelocity, setCurrentVelocity] = useState(0.82);
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

  const handleSimulateRep = () => {
    soundFX.playClick();
    onUnlockQuest('q-inspect-pulse');

    const nextRepCount = repCount + 1;
    setRepCount(nextRepCount);

    const baseline = (reps[0] + reps[1] + reps[2]) / 3;
    const fatigueFactor = Math.max(0.4, currentVelocity * 0.91 + (Math.random() * 0.04 - 0.02));
    const newVel = parseFloat(fatigueFactor.toFixed(2));
    setCurrentVelocity(newVel);

    const updatedReps = [...reps, newVel];
    setReps(updatedReps);

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
  };

  const handleRunSearch = (algo: 'KMP' | 'Boyer-Moore') => {
    soundFX.playClick();
    onUnlockQuest('q-test-kmp');

    const text = sampleText.toUpperCase();
    const pat = searchPattern.toUpperCase();
    if (!pat) return;

    let comparisons = 0;
    const matches: number[] = [];

    if (algo === 'KMP') {
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
          if (len !== 0) len = lps[len - 1];
          else { lps[i] = 0; i++; }
        }
      }

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
          if (pi !== 0) pi = lps[pi - 1];
          else ti++;
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
      const badChar: { [key: string]: number } = {};
      for (let i = 0; i < pat.length; i++) badChar[pat[i]] = i;

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
    <section id="projects" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Projects &amp; Systems Architecture
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Low-level C++ platforms, sensor kinematics telemetry, and string matching algorithms.
          </p>
        </div>

        {/* Project 1: Pulse */}
        <div className="mb-14 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/30 dark:bg-stone-900/20 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Pulse Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#a7c4b5]/25 dark:bg-[#a7c4b5]/15 text-[#2e4738] dark:text-[#a7c4b5]">
                  C++ Platform
                </span>
                <span className="text-xs text-stone-400 font-mono">2026</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-stone-900 dark:text-stone-100">
                  Pulse &ndash; Real-Time Collaborative Platform
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                  Kinematic Fatigue Tracker with Accelerometer, Gyroscope &amp; Socket Networking
                </p>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                Kinematic fatigue analysis engine in C++ that processes real-time accelerometer and gyroscope telemetry to detect exercise repetitions, compute velocity decay, and fire haptic alerts upon fatigue thresholds.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7a9d8a] flex-shrink-0 mt-1" />
                  <span><strong>3-Rep Calibration:</strong> Dynamically calibrates concentric velocity baselines for individual sets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7a9d8a] flex-shrink-0 mt-1" />
                  <span><strong>Confidence-Based Rep Detection:</strong> Signal filtering resistant to drift and sensor noise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7a9d8a] flex-shrink-0 mt-1" />
                  <span><strong>Velocity Loss &amp; Haptics:</strong> Calculates real-time percentage degradation and transmits alerts over sockets.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['C++', 'Socket Programming', 'Data Structures', 'Sensor Telemetry', 'Kinematics'].map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-800/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/Digvijay-exe"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/Digvijay-exe</span>
                </a>
              </div>
            </div>

            {/* Right: Minimalist Pastel Telemetry Simulator */}
            <div className="lg:col-span-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 pb-2 border-b border-stone-200 dark:border-stone-800">
                <span>Kinematic Telemetry</span>
                <span className="text-[11px] text-[#3d5a49] dark:text-[#a7c4b5]">3-rep calibrated</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/40">
                  <div className="text-[10px] text-stone-400">REPS</div>
                  <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">{repCount}</div>
                </div>
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/40">
                  <div className="text-[10px] text-stone-400">VELOCITY</div>
                  <div className="text-sm font-semibold text-[#3d5a49] dark:text-[#a7c4b5]">{currentVelocity} m/s</div>
                </div>
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/40">
                  <div className="text-[10px] text-stone-400">LOSS</div>
                  <div className={`text-sm font-semibold ${parseFloat(currentLoss) >= 20 ? 'text-[#c26d5c]' : 'text-stone-700 dark:text-stone-300'}`}>
                    -{currentLoss}%
                  </div>
                </div>
              </div>

              {/* Pastel Bar Chart */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Velocity Profile</span>
                  <span>Baseline: {baselineVelocity.toFixed(2)} m/s</span>
                </div>
                <div className="flex items-end gap-1.5 h-20 pt-2">
                  {reps.map((vel, idx) => {
                    const heightPercent = Math.min(100, Math.max(20, (vel / 1.0) * 100));
                    const isAlert = idx >= 3 && ((baselineVelocity - vel) / baselineVelocity) >= 0.2;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className={`w-full rounded-t transition-all duration-300 ${
                            isAlert
                              ? 'bg-[#fcd5ce] dark:bg-[#c26d5c]'
                              : idx < 3
                              ? 'bg-[#a7c4b5]'
                              : 'bg-[#d4c2fc]'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[9px] font-mono text-stone-400">R{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status banner */}
              {alertTriggered ? (
                <div className="p-2 rounded-lg bg-[#fcd5ce]/30 dark:bg-[#fcd5ce]/15 text-[#6c3b31] dark:text-[#fcd5ce] text-xs font-mono flex items-center justify-between">
                  <span>Fatigue threshold exceeded (&gt;20%)</span>
                  <span className="text-[10px]">Alert fired</span>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/30 text-stone-500 text-xs font-mono">
                  Kinematic velocity within normal bounds.
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSimulateRep}
                  className="flex-1 py-2 px-3 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>Simulate Rep</span>
                </button>
                <button
                  onClick={handleResetPulse}
                  className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Project 2: InkLite */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/30 dark:bg-stone-900/20 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: InkLite Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#d4c2fc]/25 dark:bg-[#d4c2fc]/15 text-[#47306e] dark:text-[#d4c2fc]">
                  String Algorithms
                </span>
                <span className="text-xs text-stone-400 font-mono">2026</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-stone-900 dark:text-stone-100">
                  InkLite &ndash; Lightweight Text &amp; Note Processing Engine
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                  C++ Object-Oriented Engine with KMP and Boyer&ndash;Moore String Matching
                </p>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                Engineered for rapid cold startup and minimal RAM footprint. Features custom implementations of Knuth-Morris-Pratt (KMP) and Boyer&ndash;Moore string-search algorithms for sublinear pattern matching across large text corpora.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b72bd] flex-shrink-0 mt-1" />
                  <span><strong>KMP &amp; Boyer–Moore:</strong> O(N + M) search using longest prefix-suffix tables and bad-character shift rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b72bd] flex-shrink-0 mt-1" />
                  <span><strong>Structured Document Processing:</strong> Object-oriented design for note parsing, indexing, and tokenization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8b72bd] flex-shrink-0 mt-1" />
                  <span><strong>Buffered File I/O:</strong> High-efficiency serialization minimizing disk access and system call overhead.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['C++', 'KMP Algorithm', 'Boyer-Moore', 'Data Structures', 'OOP', 'File I/O'].map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono text-stone-600 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-800/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/Digvijay-exe"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/Digvijay-exe</span>
                </a>
              </div>
            </div>

            {/* Right: Minimalist Pastel String Search Benchmark */}
            <div className="lg:col-span-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-5 space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200 dark:border-stone-800">
                <span>Pattern Matcher</span>
                <span className="text-[#543b7e] dark:text-[#d4c2fc]">{searchResult.algorithm} Active</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-stone-400">Target Text</label>
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-stone-400">Pattern</label>
                  <input
                    type="text"
                    value={searchPattern}
                    onChange={(e) => setSearchPattern(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="flex items-end gap-1.5">
                  <button
                    onClick={() => handleRunSearch('KMP')}
                    className="py-1.5 px-3 rounded-lg bg-[#d4c2fc]/30 hover:bg-[#d4c2fc]/50 text-[#47306e] dark:text-[#d4c2fc] text-xs font-medium transition-colors"
                  >
                    KMP
                  </button>
                  <button
                    onClick={() => handleRunSearch('Boyer-Moore')}
                    className="py-1.5 px-3 rounded-lg bg-[#a7c4b5]/30 hover:bg-[#a7c4b5]/50 text-[#2e4738] dark:text-[#a7c4b5] text-xs font-medium transition-colors"
                  >
                    Boyer-Moore
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-100/60 dark:bg-stone-800/30 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Comparisons:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{searchResult.comparisons} (vs {searchResult.naiveComparisons} naive)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Matches:</span>
                  <span className="text-stone-800 dark:text-stone-200">{searchResult.matches.length > 0 ? `Index [${searchResult.matches.join(', ')}]` : 'None'}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 leading-tight">
                Precomputes prefix failure function (KMP) or bad character skip offsets to skip redundant comparisons.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
