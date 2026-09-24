import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/audio';
import { Bot, Send, Sparkles, X, Brain, User, AlertCircle, CornerDownLeft, Terminal } from 'lucide-react';

interface RecruiterCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockQuest: (questId: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinkingMode?: boolean;
}

export const RecruiterCopilotModal: React.FC<RecruiterCopilotModalProps> = ({
  isOpen,
  onClose,
  onUnlockQuest
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am Digvijay's AI Career Copilot, powered by Gemini 3.1 Pro with High Thinking mode enabled.\n\nI can answer questions regarding his C++ systems engineering, low-level data structures, the Pulse kinematic fatigue algorithm, InkLite's string-matching performance, and his availability for Summer 2026 roles.\n\nHow can I assist your evaluation today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'How does the Kinematic Fatigue Tracker in Pulse work?',
    'Explain how InkLite implements KMP and Boyer-Moore string search.',
    'What is Digvijay’s academic background at MIT WPU and availability?',
    'Summarize Digvijay’s proficiency in C++, MySQL, and Applied AI.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    soundFX.playClick();
    const query = (queryText || input).trim();
    if (!query || loading) return;

    onUnlockQuest('q-contact-copilot');

    const newMsgs: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/career-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      if (data.response) {
        setMessages([...newMsgs, { role: 'assistant', content: data.response, thinkingMode: true }]);
      } else {
        setMessages([
          ...newMsgs,
          {
            role: 'assistant',
            content: 'Could not generate a response. Please reach out directly to Digvijay at digvijay.ware@mitwpu.edu.in.'
          }
        ]);
      }
    } catch (err: any) {
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          content: 'Connection issue. Digvijay is open for inquiries at digvijay.ware@mitwpu.edu.in or +91-8779877704.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[620px] rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">AI Career Copilot</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-cyan-400" />
                  <span>ThinkingLevel.HIGH</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Model: gemini-3.1-pro-preview &bull; Digvijay Ware AI Rep</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
            aria-label="Close Career Copilot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800/80 text-slate-200 rounded-tl-none font-sans'
                }`}
              >
                {m.content}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-start animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Gemini 3.1 Pro deep thinking in progress &bull; synthesizing algorithmic resume data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80">
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about Digvijay's C++, Pulse kinematics, InkLite KMP, or summer roles..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
