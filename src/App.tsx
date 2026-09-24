/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTS } from './data/resumeData';
import { Quest, RecruiterUser } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceHackathonsSection } from './components/ExperienceHackathonsSection';
import { ResumeDownloadSection } from './components/ResumeDownloadSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { GamifiedHUD } from './components/GamifiedHUD';
import { RecruiterAuthModal } from './components/RecruiterAuthModal';
import { RecruiterCopilotModal } from './components/RecruiterCopilotModal';
import { UnitTestsRunnerModal } from './components/UnitTestsRunnerModal';
import { downloadResumePDF } from './utils/pdfGenerator';
import { soundFX } from './utils/audio';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dw_theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark cyberpunk aesthetic
  });

  // Gamification Quests & XP state
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('dw_quests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_QUESTS;
      }
    }
    return INITIAL_QUESTS;
  });

  // Fast Mode for Recruiters (minimalist mode without gamification HUD)
  const [fastMode, setFastMode] = useState<boolean>(() => {
    return localStorage.getItem('dw_fast_mode') === 'true';
  });

  // Reduced motion for accessibility
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);

  // Recruiter authentication state
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('dw_auth_token');
  });
  const [authUser, setAuthUser] = useState<RecruiterUser | null>(null);

  // Sync dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dw_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dw_theme', 'light');
    }
  }, [darkMode]);

  // Persist quests
  useEffect(() => {
    localStorage.setItem('dw_quests', JSON.stringify(quests));
  }, [quests]);

  // Verify auth token on initial load
  useEffect(() => {
    if (authToken) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated && data.user) {
            setAuthUser({
              name: data.user.name,
              company: data.user.company,
              role: data.user.role,
              confidentialData: data.user.confidentialData
            });
          } else {
            setAuthToken(null);
            localStorage.removeItem('dw_auth_token');
          }
        })
        .catch(() => {
          // Keep offline session
        });
    }
  }, [authToken]);

  // Unlock Quest handler
  const handleUnlockQuest = (questId: string) => {
    setQuests(prev =>
      prev.map(q => {
        if (q.id === questId && !q.completed) {
          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleToggleFastMode = () => {
    soundFX.playClick();
    setFastMode(prev => {
      const next = !prev;
      localStorage.setItem('dw_fast_mode', next.toString());
      return next;
    });
  };

  const handleToggleReducedMotion = () => {
    soundFX.playClick();
    setReducedMotion(prev => !prev);
  };

  const handleLoginSuccess = (token: string, user: RecruiterUser) => {
    setAuthToken(token);
    setAuthUser(user);
    localStorage.setItem('dw_auth_token', token);
  };

  const handleLogout = () => {
    soundFX.playClick();
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem('dw_auth_token');
  };

  // Calculate total XP
  const totalXP = quests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenTests={() => setIsTestsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isAuthenticated={!!authToken}
      />

      {/* Gamified Recruiter HUD (can be toggled or minimized in Fast Mode) */}
      {!fastMode && (
        <GamifiedHUD
          quests={quests}
          totalXP={totalXP}
          fastMode={fastMode}
          onToggleFastMode={handleToggleFastMode}
          onOpenAuth={() => setIsAuthOpen(true)}
          isAuthenticated={!!authToken}
          recruiterCompany={authUser?.company}
        />
      )}

      {/* Main Content Area */}
      <main id="main-content">
        {/* Hero Section with Three.js 3D kinetic canvas */}
        <Hero
          onDownloadResume={downloadResumePDF}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={handleToggleReducedMotion}
        />

        {/* Flagship Projects Section (Pulse Kinematics & InkLite KMP/Boyer-Moore) */}
        <ProjectsSection onUnlockQuest={handleUnlockQuest} />

        {/* Technical Skills Matrix */}
        <SkillsSection />

        {/* Experience, Hackathons & Course Certifications */}
        <ExperienceHackathonsSection onUnlockQuest={handleUnlockQuest} />

        {/* Downloadable Resume in PDF Format & Document Preview */}
        <ResumeDownloadSection onUnlockQuest={handleUnlockQuest} />

        {/* Automated Employer Contact Desk */}
        <ContactFormSection onUnlockQuest={handleUnlockQuest} />
      </main>

      {/* Footer */}
      <Footer
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenTests={() => setIsTestsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Modals */}
      <RecruiterAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        token={authToken}
        user={authUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      <RecruiterCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onUnlockQuest={handleUnlockQuest}
      />

      <UnitTestsRunnerModal
        isOpen={isTestsOpen}
        onClose={() => setIsTestsOpen(false)}
      />

    </div>
  );
}
