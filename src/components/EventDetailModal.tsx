import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Share2,
  Check,
  Building,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { EventItem } from '../types/event';
import { CountdownTimer } from './CountdownTimer';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterClick: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegisterClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'perks'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Share event link"
            className="absolute top-4 right-16 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-colors inline-flex items-center gap-1.5 text-xs px-3 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Overlaid Badges */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="bg-indigo-600 px-3 py-1 rounded-md shadow-2xs">
                {event.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md">
                {event.format}
              </span>
            </div>

            <div className="text-right">
              {event.price === 0 ? (
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
                  FREE PASS
                </span>
              ) : (
                <div className="font-mono text-xl sm:text-2xl font-bold">
                  {event.currency}{event.price}{' '}
                  <span className="text-xs font-normal text-slate-300">/ pass</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* Main Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              {event.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.subtitle}
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Event Holding Date
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{event.displayDate}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">{event.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{event.venue}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">{event.address}, {event.city}</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  {event.seatsLeft} passes left
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs">
                  Capacity: {event.totalSeats} seats
                </div>
              </div>
            </div>
          </div>

          {/* Live Countdown Banner */}
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                Official Event Countdown
              </div>
              <div className="text-xs text-indigo-600/90 dark:text-indigo-400">
                Live countdown to opening registration & keynote start
              </div>
            </div>
            <CountdownTimer targetDate={event.date} variant="card" />
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('agenda')}
              className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative cursor-pointer ${
                activeTab === 'agenda'
                  ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Schedule & Agenda ({event.agenda.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('speakers')}
              className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative cursor-pointer ${
                activeTab === 'speakers'
                  ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Speakers ({event.speakers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('perks')}
              className={`pb-2 px-3 text-xs sm:text-sm font-semibold transition-colors relative cursor-pointer ${
                activeTab === 'perks'
                  ? 'text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Pass Benefits
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                <p>{event.fullDescription}</p>
                <p>
                  Attendees gain direct networking access to industry peers, founders, and specialized practitioners. All passes are registered under your name and securely verified via QR identifier.
                </p>
              </div>

              {/* Organizer Info */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>Organized by <strong className="text-slate-700 dark:text-slate-300">{event.organizer.name}</strong></span>
                </div>
                <a
                  href={`mailto:${event.organizer.contactEmail}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{event.organizer.contactEmail}</span>
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: Agenda */}
          {activeTab === 'agenda' && (
            <div className="space-y-3">
              {event.agenda.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start"
                >
                  <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 w-24">
                    {item.time}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                    {item.speakerName && (
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Presented by: {item.speakerName}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Speakers */}
          {activeTab === 'speakers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {event.speakers.map((spk, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-sm">
                    {spk.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      {spk.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                      {spk.role}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {spk.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Perks */}
          {activeTab === 'perks' && (
            <div className="space-y-2.5">
              {event.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Instant ticket confirmation generated & saved to your local passes.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegisterClick(event);
              }}
              className="flex-1 sm:flex-initial py-2.5 px-6 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register for this Event</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
