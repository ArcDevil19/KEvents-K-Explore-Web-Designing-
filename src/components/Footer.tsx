import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { validateEmail } from '../utils/validation';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onFilterCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onFilterCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(newsletterEmail);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                K
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                Events
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Modern event discovery and pass management platform for KIIT University and Bhubaneswar, Odisha. Connecting students, researchers, and creators with top-tier technology summits, cultural festivals, and creative symposiums.
            </p>
            <div className="text-xs text-slate-400 pt-2">
              © {new Date().getFullYear()} K Events. All rights reserved. Built with modern web standards.
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Event Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onFilterCategory('Tech & AI')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Tech & AI
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onFilterCategory('Music & Arts')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Music & Arts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onFilterCategory('Business & Startups')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Business & Startups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onFilterCategory('Health & Wellness')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Health & Wellness
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onFilterCategory('Design & Creative')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Design & Creative
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('top')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Home / Top
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('featured-section')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Featured Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('events-section')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollToSection('about-section')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Platform & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Weekly Event Digest
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Receive early-bird ticket alerts and speaker updates directly in your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                {error && <p className="text-[11px] text-rose-500">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
