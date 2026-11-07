import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventFilters } from './components/EventFilters';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { MyRegistrationsModal } from './components/MyRegistrationsModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AuthGate } from './components/AuthGate';
import { EVENTS_DATA } from './data/events';
import { EventItem, FilterState, Registration } from './types/event';
import { KiitUser } from './types/auth';
import { getStoredAuthUser, logoutKiitStudent } from './utils/auth';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredRegistrations,
  getBookmarkedEventIds,
  toggleBookmarkStorage,
} from './utils/storage';
import { Sparkles, Calendar, CheckCircle2, Bookmark, Filter, Compass } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // KIIT Student Authentication State
  const [currentUser, setCurrentUser] = useState<KiitUser | null>(() => getStoredAuthUser());

  // Registrations & Bookmarks in LocalStorage
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Modals state
  const [selectedDetailEvent, setSelectedDetailEvent] = useState<EventItem | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerTargetEvent, setRegisterTargetEvent] = useState<EventItem | null>(null);
  const [isMyRegistrationsOpen, setIsMyRegistrationsOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    format: 'all',
    sortBy: 'date-asc',
    dateFilter: 'all',
  });

  // Only bookmarked filter toggle
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // Initialize theme & storage on mount
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    setStoredTheme(savedTheme);

    setRegistrations(getStoredRegistrations());
    setBookmarkedIds(getBookmarkedEventIds());
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
  };

  const handleLogout = () => {
    logoutKiitStudent();
    setCurrentUser(null);
    showToast('Successfully signed out from KIIT Student Portal.');
  };

  const handleToggleBookmark = (eventId: string) => {
    const updated = toggleBookmarkStorage(eventId);
    setBookmarkedIds(updated);
    const isNowBookmarked = updated.includes(eventId);
    showToast(isNowBookmarked ? 'Event saved to your bookmarks' : 'Event removed from bookmarks');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const refreshRegistrations = () => {
    setRegistrations(getStoredRegistrations());
  };

  const handleOpenRegistration = (event?: EventItem) => {
    setRegisterTargetEvent(event || null);
    setIsRegisterOpen(true);
  };

  const handleRegistrationSuccess = (newReg: Registration) => {
    refreshRegistrations();
    showToast(`Pass ${newReg.id} confirmed and saved to your device!`);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Flagship event for the hero section
  const flagshipEvent = useMemo(() => {
    return EVENTS_DATA.find((e) => e.featured) || EVENTS_DATA[0];
  }, []);

  // Filtered & Sorted events list
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Search query filter
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesCity = event.city.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription.toLowerCase().includes(query);
        const matchesSpeaker = event.speakers.some((s) => s.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCity && !matchesVenue && !matchesDesc && !matchesSpeaker) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All' && event.category !== filters.category) {
        return false;
      }

      // Format filter
      if (filters.format !== 'all' && event.format !== filters.format) {
        return false;
      }

      // Bookmarked only toggle
      if (showOnlyBookmarked && !bookmarkedIds.includes(event.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (filters.sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [filters, bookmarkedIds, showOnlyBookmarked]);

  // Featured events subset
  const featuredEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => e.featured);
  }, []);

  // MANDATORY AUTH GATE: If student is not logged in, show KIIT Student Login / Create Account page
  if (!currentUser) {
    return (
      <AuthGate
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.fullName.split(' ')[0]}! Access granted.`);
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <div className="p-3.5 px-4 bg-slate-900 dark:bg-indigo-950 text-white rounded-xl shadow-xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        registeredCount={registrations.length}
        onOpenMyRegistrations={() => setIsMyRegistrationsOpen(true)}
        onScrollToSection={scrollToSection}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          flagshipEvent={flagshipEvent}
          onSelectEvent={(evt) => setSelectedDetailEvent(evt)}
          onRegisterClick={(evt) => handleOpenRegistration(evt)}
          onExploreClick={() => scrollToSection('events-section')}
        />

        {/* Featured Events Marquee Section */}
        <section
          id="featured-section"
          className="py-14 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Highlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                Featured & Marquee Events
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Hand-picked conferences, acoustic sets, and startup summits across KIIT University with high attendee acclaim and rapid pass reservations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isBookmarked={bookmarkedIds.includes(event.id)}
                onToggleBookmark={handleToggleBookmark}
                onSelectEvent={(evt) => setSelectedDetailEvent(evt)}
                onRegisterClick={(evt) => handleOpenRegistration(evt)}
              />
            ))}
          </div>
        </section>

        {/* Main Event Discovery & Filter Catalog Section */}
        <section
          id="events-section"
          className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Compass className="w-3.5 h-3.5" />
                <span>Explore The Complete Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                Upcoming Gatherings & Passes
              </h2>
            </div>

            {/* Quick Filter: Show Bookmarked Only */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  showOnlyBookmarked
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300 font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-current' : ''}`} />
                <span>Saved Events ({bookmarkedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <EventFilters
            filters={filters}
            onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
            onResetFilters={() => {
              setFilters({
                search: '',
                category: 'All',
                format: 'all',
                sortBy: 'date-asc',
                dateFilter: 'all',
              });
              setShowOnlyBookmarked(false);
            }}
            totalEvents={EVENTS_DATA.length}
            filteredCount={filteredEvents.length}
          />

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isBookmarked={bookmarkedIds.includes(event.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectEvent={(evt) => setSelectedDetailEvent(evt)}
                  onRegisterClick={(evt) => handleOpenRegistration(evt)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 px-4 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Events Match Your Filters
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                We couldn&rsquo;t find any events matching your selected criteria. Try adjusting your search query or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    search: '',
                    category: 'All',
                    format: 'all',
                    sortBy: 'date-asc',
                    dateFilter: 'all',
                  });
                  setShowOnlyBookmarked(false);
                }}
                className="py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* Platform Values & Interactive FAQ Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onFilterCategory={(cat) => {
          setFilters((prev) => ({ ...prev, category: cat }));
          scrollToSection('events-section');
        }}
      />

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedDetailEvent}
        onClose={() => setSelectedDetailEvent(null)}
        onRegisterClick={(evt) => handleOpenRegistration(evt)}
      />

      {/* Registration Modal with Validation & Pass Confirmation */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        event={registerTargetEvent}
        allEvents={EVENTS_DATA}
        onRegistrationSuccess={handleRegistrationSuccess}
        currentUser={currentUser}
      />

      {/* My Registrations & Passes Management Drawer/Modal */}
      <MyRegistrationsModal
        isOpen={isMyRegistrationsOpen}
        onClose={() => setIsMyRegistrationsOpen(false)}
        registrations={registrations}
        onRefreshRegistrations={refreshRegistrations}
        onBrowseEvents={() => scrollToSection('events-section')}
      />
    </div>
  );
}
