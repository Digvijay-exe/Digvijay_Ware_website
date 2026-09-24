import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { RecruiterUser } from '../types';
import { Shield, Lock, Key, CheckCircle, AlertCircle, X, Unlock, UserCheck, Phone, Mail, Award, Clock } from 'lucide-react';

interface RecruiterAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  user: RecruiterUser | null;
  onLoginSuccess: (token: string, user: RecruiterUser) => void;
  onLogout: () => void;
}

export const RecruiterAuthModal: React.FC<RecruiterAuthModalProps> = ({
  isOpen,
  onClose,
  token,
  user,
  onLoginSuccess,
  onLogout
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [company, setCompany] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (codeToUse?: string) => {
    soundFX.playClick();
    const finalCode = (codeToUse || accessCode).trim();
    if (!finalCode) {
      setError('Please provide a recruiter passkey.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: finalCode,
          company: company || 'Verified Talent Partner',
          recruiterName: recruiterName || 'Senior Technical Recruiter'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        soundFX.playQuestComplete();
        onLoginSuccess(data.token, {
          name: data.user.name,
          company: data.user.company,
          role: data.user.role,
          confidentialData: {
            phone: '+91-8779877704',
            location: 'Pune, Maharashtra, India',
            verifiedEmail: 'digvijay.ware@mitwpu.edu.in',
            university: 'MIT World Peace University (MIT WPU), Pune',
            degree: 'B.Tech CSE (2024-2028, 3rd Year)',
            availability: 'Summer 2026 Internships & Early Co-ops'
          }
        });
      } else {
        setError(data.message || 'Authentication failed. Please verify code.');
      }
    } catch (err: any) {
      setError('Connection failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          aria-label="Close Authentication Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {token && user ? (
          /* Authenticated State */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Verified Recruiter Access Active</h3>
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Session Authenticated &bull; {user.company}</span>
                </div>
              </div>
            </div>

            {/* Confidential Data Cards */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                Protected Candidate Dossier Unlocked
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Direct Verified Phone:</span>
                <a href="tel:+918779877704" className="font-mono font-bold text-emerald-400 hover:underline">
                  +91-8779877704
                </a>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Institutional Email:</span>
                <span className="font-mono text-slate-200">digvijay.ware@mitwpu.edu.in</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">University Standing:</span>
                <span className="text-slate-200">MIT WPU (3rd Year B.Tech CSE)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Hiring Availability:</span>
                <span className="text-cyan-300 font-medium">Summer 2026 Immediate</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onLogout}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
              >
                Sign Out / Revoke Token
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Login Form State */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Recruiter &amp; Partner Authentication</h3>
                <p className="text-xs text-slate-400">
                  Cryptographic verification to access protected candidate telemetry &amp; direct contacts.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Company / Hiring Entity</label>
                <input
                  type="text"
                  placeholder="e.g. Google / Microsoft / Razorpay"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Recruiter Passkey / Access Code</label>
                <input
                  type="password"
                  placeholder="Enter Passkey (e.g. RECRUITER2026)"
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Quick Demo Recruiter Passkey CTA */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300 flex items-center justify-between">
              <span>Demo Passkey: <code className="font-bold text-cyan-200">RECRUITER2026</code></span>
              <button
                type="button"
                onClick={() => {
                  setAccessCode('RECRUITER2026');
                  setCompany('Apex Tech Hiring');
                  handleLogin('RECRUITER2026');
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 font-mono text-[11px] border border-cyan-500/40 transition-colors"
              >
                1-Click Demo Login
              </button>
            </div>

            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Cryptographic Passkey...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>Authenticate &amp; Unlock Access</span>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
