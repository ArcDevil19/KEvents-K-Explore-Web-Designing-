import React, { useState } from 'react';
import {
  X,
  Ticket,
  Calendar,
  MapPin,
  Clock,
  Download,
  Trash2,
  AlertTriangle,
  FileJson,
  Printer,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Registration } from '../types/event';
import {
  cancelRegistration,
  deleteRegistration,
  exportRegistrationsJSON,
} from '../utils/storage';

interface MyRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Registration[];
  onRefreshRegistrations: () => void;
  onBrowseEvents: () => void;
}

export const MyRegistrationsModal: React.FC<MyRegistrationsModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onRefreshRegistrations,
  onBrowseEvents,
}) => {
  const [selectedPass, setSelectedPass] = useState<Registration | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredRegistrations = registrations.filter((reg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reg.eventTitle.toLowerCase().includes(query) ||
      reg.id.toLowerCase().includes(query) ||
      reg.eventCity.toLowerCase().includes(query)
    );
  });

  const handleCancelPass = (id: string) => {
    cancelRegistration(id);
    onRefreshRegistrations();
    setConfirmCancelId(null);
    if (selectedPass?.id === id) {
      setSelectedPass((prev) => (prev ? { ...prev, status: 'Cancelled' } : null));
    }
  };

  const handleDeletePass = (id: string) => {
    deleteRegistration(id);
    onRefreshRegistrations();
    if (selectedPass?.id === id) {
      setSelectedPass(null);
    }
  };

  const handleExport = () => {
    exportRegistrationsJSON(registrations);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                My Event Passes & Registrations
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Managed locally in your browser storage ({registrations.length} saved)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {registrations.length > 0 && (
              <button
                type="button"
                onClick={handleExport}
                title="Export all passes as JSON backup"
                className="p-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg inline-flex items-center gap-1.5 px-2.5 transition-colors cursor-pointer"
              >
                <FileJson className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Export JSON</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close passes modal"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {registrations.length === 0 ? (
            /* Empty State */
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Ticket className="w-6 h-6 stroke-1" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No Event Registrations Yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Explore our upcoming technology summits, music sessions, and creative workshops, and register to obtain your digital admission passes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseEvents();
                }}
                className="mt-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Explore Upcoming Events
              </button>
            </div>
          ) : selectedPass ? (
            /* Inspect Single Pass View */
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setSelectedPass(null)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                ← Back to All Passes
              </button>

              {/* Pass Card */}
              <div className="rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/80 bg-linear-to-br from-indigo-50/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Digital Admission Pass
                    </span>
                    <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {selectedPass.eventTitle}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Ticket ID</div>
                    <div className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {selectedPass.id}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs p-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">Attendee</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {selectedPass.fullName}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">Date & Time</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedPass.eventDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">Pass Type</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedPass.ticketType} ({selectedPass.ticketsCount})
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">Status</div>
                    <div
                      className={`font-bold ${
                        selectedPass.status === 'Cancelled'
                          ? 'text-rose-500'
                          : 'text-emerald-500'
                      }`}
                    >
                      {selectedPass.status}
                    </div>
                  </div>
                </div>

                {/* Payment & Transaction Info */}
                <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Paid: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedPass.totalAmount === 0 ? 'FREE' : `₹${selectedPass.totalAmount}`}
                    </span>
                    {selectedPass.paymentMethod && (
                      <span className="text-slate-500 dark:text-slate-400"> via {selectedPass.paymentMethod}</span>
                    )}
                  </div>
                  {selectedPass.transactionId && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Txn: </span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {selectedPass.transactionId}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Venue: {selectedPass.eventVenue}, {selectedPass.eventCity}
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-1.5 px-3 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Pass Actions */}
              <div className="flex items-center justify-between pt-2">
                {selectedPass.status !== 'Cancelled' ? (
                  <button
                    type="button"
                    onClick={() => setConfirmCancelId(selectedPass.id)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Cancel This Registration</span>
                  </button>
                ) : (
                  <span className="text-xs text-rose-500 font-medium">This pass has been cancelled</span>
                )}

                <button
                  type="button"
                  onClick={() => handleDeletePass(selectedPass.id)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove from Device</span>
                </button>
              </div>
            </div>
          ) : (
            /* Passes List View */
            <div className="space-y-3">
              {/* Filter search */}
              {registrations.length > 2 && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter your passes by title, city, or ID..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              )}

              <div className="space-y-2.5">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedPass(reg)}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group shadow-2xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {reg.id}
                        </span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            reg.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {reg.eventTitle}
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                        <span>{reg.eventDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{reg.eventCity}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {reg.totalAmount === 0 ? 'Free' : `₹${reg.totalAmount}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                        View Ticket
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancellation Confirmation Dialog */}
          {confirmCancelId && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Confirm Cancellation</span>
              </div>
              <p className="text-amber-800 dark:text-amber-300">
                Are you sure you want to cancel registration pass <strong>{confirmCancelId}</strong>? You can re-register anytime while seats remain available.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCancelPass(confirmCancelId)}
                  className="py-1 px-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-md cursor-pointer"
                >
                  Yes, Cancel Pass
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmCancelId(null)}
                  className="py-1 px-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md cursor-pointer"
                >
                  Keep Pass
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>All passes stored locally on your device</span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
