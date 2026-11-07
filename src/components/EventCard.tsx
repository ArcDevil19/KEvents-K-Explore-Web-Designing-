import React, { useState } from 'react';
import { Calendar, MapPin, Bookmark, ArrowUpRight, Users, Clock } from 'lucide-react';
import { EventItem } from '../types/event';
import { CountdownTimer } from './CountdownTimer';

interface EventCardProps {
  event: EventItem;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isBookmarked,
  onToggleBookmark,
  onSelectEvent,
  onRegisterClick,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-2xs">
      {/* Media Box */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!imgError ? (
          <img
            src={event.image}
            alt={event.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800">
            <Calendar className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-xs font-medium text-center">{event.category}</span>
          </div>
        )}

        {/* Top Left Event Date Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/85 text-white backdrop-blur-md border border-white/15 text-xs font-semibold shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{event.displayDate}</span>
        </div>

        {/* Top Floating Action: Bookmark */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(event.id);
          }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs cursor-pointer"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} />
        </button>

        {/* Format & Category Overlays */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900/85 text-white backdrop-blur-md border border-white/10">
            {event.format}
          </span>
          {event.price === 0 ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-2xs">
              Free Pass
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur-md shadow-2xs tabular-nums">
              {event.currency}{event.price}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Quiet Unboxed Metadata with separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{event.category}</span>
            <span aria-hidden="true">·</span>
            <span>{event.format}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectEvent(event)}
            className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
          >
            {event.title}
          </h3>

          {/* Prominent Scheduled Event Date Banner */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Date:
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {event.displayDate}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{event.time.split('–')[0].trim()}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Location */}
          <div className="pt-0.5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>

        {/* Live Countdown snippet */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <CountdownTimer targetDate={event.date} variant="card" />
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSelectEvent(event)}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-center transition-colors cursor-pointer"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onRegisterClick(event)}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg text-center shadow-2xs transition-colors cursor-pointer"
          >
            Register Now
          </button>
        </div>
      </div>
    </article>
  );
};
