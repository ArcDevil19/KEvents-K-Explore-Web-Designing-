import React, { useState } from 'react';
import { Sun, Moon, Ticket, Menu, X, Compass, LogOut, GraduationCap, User } from 'lucide-react';
import { KiitUser } from '../types/auth';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  registeredCount: number;
  onOpenMyRegistrations: () => void;
  onScrollToSection: (sectionId: string) => void;
  currentUser: KiitUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  registeredCount,
  onOpenMyRegistrations,
  onScrollToSection,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single clean element) */}
        <button
          onClick={() => handleNavClick('top')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
            K
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Events
            </span>
            <span className="hidden lg:inline text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              KIIT
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => handleNavClick('featured-section')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Featured
          </button>
          <button
            onClick={() => handleNavClick('events-section')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Events
          </button>
          <button
            onClick={onOpenMyRegistrations}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>My Passes</span>
            {registeredCount > 0 && (
              <span className="font-mono text-xs px-1.5 py-0.2 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded font-semibold tabular-nums">
                {registeredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About & FAQ
          </button>
        </nav>

        {/* Zone 3: Student Profile Chip + Logout + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Logged in User Info */}
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <div className="truncate max-w-[140px] font-semibold">
                {currentUser.fullName.split(' ')[0]}
              </div>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                ({currentUser.rollNumber || currentUser.email.split('@')[0]})
              </span>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sign Out Button */}
          {currentUser && (
            <button
              type="button"
              onClick={onLogout}
              title="Sign out from student portal"
              className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xl:inline">Sign Out</span>
            </button>
          )}

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          {currentUser && (
            <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{currentUser.fullName}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {currentUser.rollNumber ? `Roll: ${currentUser.rollNumber} · ` : ''}{currentUser.email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="py-1 px-2 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavClick('featured-section')}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Featured Events
          </button>
          <button
            onClick={() => handleNavClick('events-section')}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Browse All Events
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMyRegistrations();
            }}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-indigo-500" />
              <span>My Passes</span>
            </span>
            {registeredCount > 0 && (
              <span className="font-mono text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded font-semibold tabular-nums">
                {registeredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            About & FAQ
          </button>
        </div>
      )}
    </header>
  );
};
