import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  variant?: 'hero' | 'card' | 'compact' | 'badge';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateRemaining(target: string): TimeRemaining {
  const targetTime = new Date(target).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  variant = 'card',
}) => {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining(targetDate)
  );

  useEffect(() => {
    // Initial calculation
    setRemaining(calculateRemaining(targetDate));

    // Live real-time interval updating every 1000ms
    const interval = setInterval(() => {
      setRemaining(calculateRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (remaining.isPast) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 py-1">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span>Event In Progress / Live Today</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1 font-mono text-xs tabular-nums text-slate-700 dark:text-slate-300">
        <span>{remaining.days}d</span>
        <span>:</span>
        <span>{String(remaining.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span>{String(remaining.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold">
          {String(remaining.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 shadow-inner">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {remaining.days}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
            Days
          </div>
        </div>
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 shadow-inner">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {String(remaining.hours).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
            Hours
          </div>
        </div>
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 shadow-inner">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {String(remaining.minutes).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
            Mins
          </div>
        </div>
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 sm:p-3 shadow-inner">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-indigo-400 tabular-nums">
            {String(remaining.seconds).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
            Secs
          </div>
        </div>
      </div>
    );
  }

  // Enhanced card variant with 4 distinct real-time countdown blocks
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
          Starts in
        </span>
        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
          Live Ticker
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center font-mono tabular-nums">
        <div className="bg-white dark:bg-slate-800 rounded px-1.5 py-1 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {remaining.days}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
            days
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded px-1.5 py-1 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {String(remaining.hours).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
            hrs
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded px-1.5 py-1 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {String(remaining.minutes).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
            mins
          </div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/60 rounded px-1.5 py-1 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs">
          <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {String(remaining.seconds).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-indigo-600/75 dark:text-indigo-400/75">
            secs
          </div>
        </div>
      </div>
    </div>
  );
};
