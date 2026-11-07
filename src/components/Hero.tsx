import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { EventItem } from '../types/event';

interface HeroProps {
  flagshipEvent: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  flagshipEvent,
  onSelectEvent,
  onRegisterClick,
  onExploreClick,
}) => {
  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-200/60 dark:border-slate-800/80">
      {/* Subtle background ambient blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Platform Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Event Discovery & Pass Management</span>
              <span aria-hidden="true">·</span>
              <span>KIIT University & Bhubaneswar</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance] font-['Outfit'] leading-[1.12]">
              Discover extraordinary events. Connect with industry pioneers.
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              K Events connects curious students and professionals with leading tech summits, acoustic music festivals, design symposiums, and startup arenas across KIIT University campuses and Bhubaneswar. Explore agendas, secure instant passes, and manage your tickets locally.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectEvent(flagshipEvent)}
                className="px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Flagship Summit</span>
              </button>
            </div>

            {/* Adjacency Trust Strip */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  42+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Curated Venues
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  15,800+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Registered Attendees
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                  100%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Verified Passes
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flagship Event Spotlight Card with Countdown */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-xl group">
              {/* Image with overlay scrim */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="/src/assets/images/hero_event_crowd_1794062160931.jpg"
                  alt="K Events Flagship Event Auditorium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Quiet unboxed top tag */}
                <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs font-semibold text-amber-400">
                  Featured Flagship Event
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs font-mono text-slate-200">
                  {flagshipEvent.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                    {flagshipEvent.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {flagshipEvent.subtitle}
                  </p>
                </div>

                {/* Prominent Event Holding Date */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-indigo-950/70 border border-indigo-500/30 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mr-1.5">
                        Holding Date:
                      </span>
                      <span className="font-bold text-white text-sm">
                        {flagshipEvent.displayDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-300 font-mono">
                    {flagshipEvent.time.split('–')[0].trim()}
                  </div>
                </div>

                {/* Event Location & Seats */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate max-w-[200px]">{flagshipEvent.venue}, {flagshipEvent.city}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-mono tabular-nums">
                    {flagshipEvent.seatsLeft} seats left
                  </span>
                </div>

                {/* Live Countdown Timer */}
                <div className="pt-2">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-2">
                    Registration Closing Countdown
                  </div>
                  <CountdownTimer targetDate={flagshipEvent.date} variant="hero" />
                </div>

                {/* CTA actions */}
                <div className="pt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectEvent(flagshipEvent)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 rounded-lg border border-slate-700 text-center transition-colors cursor-pointer"
                  >
                    View Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => onRegisterClick(flagshipEvent)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg text-center shadow-sm transition-colors cursor-pointer"
                  >
                    Register Pass ({flagshipEvent.currency}{flagshipEvent.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
