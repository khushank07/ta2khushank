import { useEffect, useMemo, useState } from 'react';
import { FileImage, Printer, Search, X } from 'lucide-react';
import {
  COURSE_LEARNING_OUTCOMES,
  COURSE_META,
  COURSE_OBJECTIVE,
  SYLLABUS_UNITS,
  type SyllabusUnit,
} from '../data/syllabus';
import type { ScholarSession } from './LoginView';
import { ExaminationSchemeTable } from './ExaminationSchemeTable';
import { SyllabusUnitSection } from './SyllabusUnitSection';
import { SourceScansModal } from './SourceScansModal';

interface SyllabusDashboardProps {
  session: ScholarSession;
  onSignOut: () => void;
}

type UnitFilter = 'all' | 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4';

const STORAGE_PROGRESS_KEY = 'fsms23_syllabus_progress_v1';
const STORAGE_NOTES_KEY = 'fsms23_syllabus_notes_v1';

export function SyllabusDashboard({ session, onSignOut }: SyllabusDashboardProps) {
  const [unitFilter, setUnitFilter] = useState<UnitFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScansModal, setShowScansModal] = useState(false);

  const progressStorageKey = `${STORAGE_PROGRESS_KEY}:${session.identifier}`;
  const notesStorageKey = `${STORAGE_NOTES_KEY}:${session.identifier}`;

  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(progressStorageKey);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(notesStorageKey);
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(progressStorageKey, JSON.stringify(completedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [completedIds, progressStorageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(notesStorageKey, JSON.stringify(notes));
    } catch {
      // Ignore storage quota errors
    }
  }, [notes, notesStorageKey]);

  const totalTopics = useMemo(
    () => SYLLABUS_UNITS.reduce((sum, unit) => sum + unit.topics.length, 0),
    []
  );

  const completedTopics = useMemo(
    () =>
      SYLLABUS_UNITS.reduce(
        (sum, unit) => sum + unit.topics.filter((t) => Boolean(completedIds[t.id])).length,
        0
      ),
    [completedIds]
  );

  const filteredUnits = useMemo(
    () =>
      unitFilter === 'all'
        ? SYLLABUS_UNITS
        : SYLLABUS_UNITS.filter((unit) => unit.id === unitFilter),
    [unitFilter]
  );

  const handleToggleTopic = (topicId: string) => {
    setCompletedIds((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleToggleUnitAll = (unit: SyllabusUnit, markDone: boolean) => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const topic of unit.topics) {
        next[topic.id] = markDone;
      }
      return next;
    });
  };

  const handleSaveNote = (topicId: string, noteText: string) => {
    setNotes((prev) => {
      const next = { ...prev };
      if (!noteText) {
        delete next[topicId];
      } else {
        next[topicId] = noteText;
      }
      return next;
    });
  };

  const hasMatchingUnits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return filteredUnits.some(
      (unit) =>
        unit.subtitle.toLowerCase().includes(q) ||
        unit.verbatimText.toLowerCase().includes(q) ||
        unit.topics.some(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            (t.group && t.group.toLowerCase().includes(q))
        )
    );
  }, [filteredUnits, searchQuery]);

  return (
    <div className="min-h-screen paper-surface flex flex-col">
      <header className="sticky top-0 z-30 bg-[#F4F2EC]/95 backdrop-blur-xs border-b border-[#DCD8CE] no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#overview"
            className="font-serif text-lg font-medium tracking-tight text-[#1A2028] whitespace-nowrap shrink-0"
          >
            FSMS23 Syllabus
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4B5058]">
            <a
              href="#overview"
              className="hover:text-[#1A2028] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#exam-scheme"
              className="hover:text-[#1A2028] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Exam Scheme
            </a>
            <a
              href="#objectives"
              className="hover:text-[#1A2028] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Objectives
            </a>
            <a
              href="#syllabus-units"
              className="hover:text-[#1A2028] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Units I–IV
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onSignOut}
              className="px-4 py-2 text-xs font-medium text-white bg-[#1D3557] hover:bg-[#152842] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D3557]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12 flex-1">
        <section id="overview" className="scroll-mt-24 border-b border-[#DCD8CE] pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-[#5B6068] mb-2">
                {COURSE_META.code} · Signed in as {session.displayName}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#1A2028] tracking-tight leading-[1.12] [text-wrap:balance]">
                {COURSE_META.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#4B5058] tabular-nums">
                <span>4 Lectures / Week</span>
                <span aria-hidden="true">·</span>
                <span>0 Tutorials</span>
                <span aria-hidden="true">·</span>
                <span>0 Practicals</span>
                <span aria-hidden="true">·</span>
                <span>{COURSE_META.totalCredits} Credits</span>
                <span aria-hidden="true">·</span>
                <span>{COURSE_META.totalHours} Teaching Hours</span>
                <span aria-hidden="true">·</span>
                <span>{COURSE_META.totalMarks} Total Marks</span>
              </div>
            </div>

            <div className="lg:text-right shrink-0">
              <p className="font-mono text-xs text-[#5B6068] tabular-nums">
                Study Ledger: <strong className="font-medium text-[#1A2028]">{completedTopics}</strong> of{' '}
                {totalTopics} topics reviewed
              </p>
              <div className="mt-2 h-1.5 w-full lg:w-56 bg-[#E4E0D6] rounded-xs overflow-hidden">
                <div
                  className="h-full bg-[#264E36] transition-transform duration-300 origin-left"
                  style={{
                    transform: `scaleX(${totalTopics > 0 ? completedTopics / totalTopics : 0})`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded border border-[#D4CFC4] bg-[#EBE7DE] self-start"
              role="tablist"
              aria-label="Filter syllabus by unit"
            >
              {(
                [
                  { id: 'all', label: 'All Units' },
                  { id: 'unit-1', label: 'Unit I' },
                  { id: 'unit-2', label: 'Unit II' },
                  { id: 'unit-3', label: 'Unit III' },
                  { id: 'unit-4', label: 'Unit IV' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={unitFilter === tab.id}
                  onClick={() => setUnitFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    unitFilter === tab.id
                      ? 'bg-[#FCFBF8] text-[#1A2028] shadow-xs'
                      : 'text-[#575C64] hover:text-[#1A2028]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search
                  className="w-4 h-4 text-[#686D75] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, laws, frameworks..."
                  aria-label="Search syllabus topics"
                  className="w-full h-10 pl-9 pr-8 bg-white border border-[#CFCAC0] rounded text-xs text-[#1A2028] placeholder:text-[#8E9299] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/30 focus:border-[#1D3557]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear topic search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 inline-flex items-center justify-center rounded text-[#686D75] hover:text-[#1A2028] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowScansModal(true)}
                className="h-10 px-3.5 bg-[#FCFBF8] hover:bg-[#F2EFE8] border border-[#CFCAC0] rounded text-xs font-medium text-[#1A2028] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileImage className="w-4 h-4 text-[#1D3557]" aria-hidden="true" />
                <span>Original Scans</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 px-3.5 bg-[#FCFBF8] hover:bg-[#F2EFE8] border border-[#CFCAC0] rounded text-xs font-medium text-[#1A2028] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#1D3557]" aria-hidden="true" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </section>

        <ExaminationSchemeTable />

        <section
          id="objectives"
          aria-labelledby="objectives-heading"
          className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2"
        >
          <div className="lg:col-span-5 folio-sheet border border-[#DCD8CE] rounded-md p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2
                id="objectives-heading"
                className="font-serif text-xl font-medium text-[#1A2028] tracking-tight mb-4"
              >
                Course Objective
              </h2>
              <p className="text-[15px] leading-[1.75] text-[#2C3138]">{COURSE_OBJECTIVE}</p>
            </div>
            <p className="mt-6 pt-4 border-t border-[#ECE8DF] text-xs font-mono text-[#686D75]">
              Theory Focus · Audit, Risk &amp; Legislation
            </p>
          </div>

          <div className="lg:col-span-7 folio-sheet border border-[#DCD8CE] rounded-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
              <h2 className="font-serif text-xl font-medium text-[#1A2028] tracking-tight">
                Course Learning Outcomes
              </h2>
              <span className="text-xs text-[#5B6068]">Students will gain the knowledge of:</span>
            </div>

            <ol className="divide-y divide-[#ECE8DF]">
              {COURSE_LEARNING_OUTCOMES.map((outcome, index) => (
                <li key={outcome} className="py-3.5 first:pt-1 last:pb-1 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#1D3557] tabular-nums shrink-0">
                    0{index + 1}.
                  </span>
                  <span className="text-[15px] leading-relaxed text-[#24282E]">{outcome}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="syllabus-units" aria-labelledby="units-heading" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2
              id="units-heading"
              className="font-serif text-2xl font-medium text-[#1A2028] tracking-tight"
            >
              Course Units &amp; Syllabus Topics
            </h2>
            <span className="font-mono text-xs text-[#5B6068] tabular-nums">
              4 Units · 15 Hours Each · 60 Total Hours
            </span>
          </div>

          {!hasMatchingUnits ? (
            <div className="folio-sheet border border-[#DCD8CE] rounded-md p-10 text-center">
              <p className="font-serif text-lg text-[#1A2028]">
                No syllabus topics matched &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1.5 text-sm text-[#5B6068]">
                Try searching for terms like CAATs, LAN Domain, BCP, IT Act 2000, or ISO/IEC 27001.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setUnitFilter('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#1D3557] rounded hover:bg-[#152842] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredUnits.map((unit) => (
                <SyllabusUnitSection
                  key={unit.id}
                  unit={unit}
                  completedIds={completedIds}
                  notes={notes}
                  searchQuery={searchQuery}
                  onToggleTopic={handleToggleTopic}
                  onSaveNote={handleSaveNote}
                  onToggleUnitAll={handleToggleUnitAll}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 border-t border-[#DCD8CE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#686D75]">
        <span>{COURSE_META.fullTitle}</span>
        <span className="font-mono">Session: {session.identifier}</span>
      </footer>

      <SourceScansModal isOpen={showScansModal} onClose={() => setShowScansModal(false)} />
    </div>
  );
}
