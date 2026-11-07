import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FilterState, EventCategory } from '../types/event';

interface EventFiltersProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalEvents: number;
  filteredCount: number;
}

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Tech & AI',
  'Music & Arts',
  'Business & Startups',
  'Health & Wellness',
  'Design & Creative',
  'Sports & Outdoor',
];

const FORMATS = [
  { label: 'All Formats', value: 'all' },
  { label: 'In-Person', value: 'In-Person' },
  { label: 'Virtual', value: 'Virtual' },
  { label: 'Hybrid', value: 'Hybrid' },
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalEvents,
  filteredCount,
}) => {
  const isFiltered =
    filters.search !== '' ||
    filters.category !== 'All' ||
    filters.format !== 'all' ||
    filters.sortBy !== 'date-asc';

  return (
    <div className="space-y-4 mb-8">
      {/* Search and Secondary Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search events by name, city, topic, or venue..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: '' })}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Format Selector & Sorting */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Format Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={filters.format}
              onChange={(e) => onFilterChange({ format: e.target.value })}
              aria-label="Filter by format"
              className="w-full sm:w-auto text-xs font-medium py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs cursor-pointer"
            >
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              aria-label="Sort events"
              className="w-full sm:w-auto text-xs font-medium py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs cursor-pointer"
            >
              <option value="date-asc">Date: Soonest First</option>
              <option value="date-desc">Date: Furthest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Categories' : cat}
            </button>
          );
        })}
      </div>

      {/* Results Count & Current Active Filters Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{filteredCount}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{totalEvents}</strong> events
        </span>
        {filters.search && (
          <span className="truncate max-w-xs">
            Query: &ldquo;{filters.search}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};
