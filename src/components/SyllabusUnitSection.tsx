import { useState } from 'react';
import { Check, MessageSquare, X } from 'lucide-react';
import type { SyllabusTopic, SyllabusUnit } from '../data/syllabus';

interface SyllabusUnitSectionProps {
  unit: SyllabusUnit;
  completedIds: Record<string, boolean>;
  notes: Record<string, string>;
  searchQuery: string;
  onToggleTopic: (topicId: string) => void;
  onSaveNote: (topicId: string, note: string) => void;
  onToggleUnitAll: (unit: SyllabusUnit, markDone: boolean) => void;
}

export function SyllabusUnitSection({
  unit,
  completedIds,
  notes,
  searchQuery,
  onToggleTopic,
  onSaveNote,
  onToggleUnitAll,
}: SyllabusUnitSectionProps) {
  const [viewMode, setViewMode] = useState<'structured' | 'verbatim'>('structured');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleTopics = normalizedQuery
    ? unit.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(normalizedQuery) ||
          (t.group && t.group.toLowerCase().includes(normalizedQuery))
      )
    : unit.topics;

  if (
    normalizedQuery &&
    visibleTopics.length === 0 &&
    !unit.verbatimText.toLowerCase().includes(normalizedQuery) &&
    !unit.subtitle.toLowerCase().includes(normalizedQuery)
  ) {
    return null;
  }

  const completedCount = unit.topics.filter((t) => Boolean(completedIds[t.id])).length;
  const totalCount = unit.topics.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const groupedTopics = visibleTopics.reduce<Array<{ groupName: string; items: SyllabusTopic[] }>>(
    (acc, topic) => {
      const name = topic.group || 'Topics';
      const existing = acc.find((g) => g.groupName === name);
      if (existing) {
        existing.items.push(topic);
      } else {
        acc.push({ groupName: name, items: [topic] });
      }
      return acc;
    },
    []
  );

  const openNoteEditor = (topicId: string) => {
    setEditingNoteId(topicId);
    setDraftNote(notes[topicId] ?? '');
  };

  const commitNote = (topicId: string) => {
    onSaveNote(topicId, draftNote.trim());
    setEditingNoteId(null);
  };

  return (
    <article
      id={unit.id}
      aria-labelledby={`${unit.id}-heading`}
      className="folio-sheet border border-[#DCD8CE] rounded-md overflow-hidden scroll-mt-24"
    >
      <div className="px-5 sm:px-8 py-5 bg-[#F2EFE8]/75 border-b border-[#DCD8CE] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#5B6068] tabular-nums mb-1">
            <span className="font-medium text-[#1D3557]">{unit.code}</span>
            <span aria-hidden="true">·</span>
            <span>Teaching Hours: {unit.teachingHours} Hours</span>
            <span aria-hidden="true">·</span>
            <span>
              {completedCount} of {totalCount} topics reviewed
            </span>
          </div>
          <h3
            id={`${unit.id}-heading`}
            className="font-serif text-lg sm:text-xl font-medium text-[#1A2028] tracking-tight"
          >
            {unit.subtitle}
          </h3>
        </div>

        <div className="flex items-center gap-3 shrink-0 no-print">
          <div
            className="inline-flex items-center p-0.5 rounded border border-[#D4CFC4] bg-[#EBE7DE]"
            role="group"
            aria-label={`${unit.code} display format`}
          >
            <button
              type="button"
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'structured'
                  ? 'bg-[#FCFBF8] text-[#1A2028] shadow-xs'
                  : 'text-[#575C64] hover:text-[#1A2028]'
              }`}
            >
              Checklist
            </button>
            <button
              type="button"
              onClick={() => setViewMode('verbatim')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'verbatim'
                  ? 'bg-[#FCFBF8] text-[#1A2028] shadow-xs'
                  : 'text-[#575C64] hover:text-[#1A2028]'
              }`}
            >
              Verbatim Text
            </button>
          </div>

          <button
            type="button"
            onClick={() => onToggleUnitAll(unit, !allCompleted)}
            className="px-3 py-2 text-xs font-medium text-[#1D3557] hover:bg-[#1D3557]/8 rounded border border-[#CFCAC0] bg-[#FCFBF8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {allCompleted ? 'Clear Unit' : 'Mark All Read'}
          </button>
        </div>
      </div>

      <div className="h-[2px] w-full bg-[#ECE8DF]" aria-hidden="true">
        <div
          className="h-full bg-[#264E36] transition-transform duration-300 origin-left"
          style={{ transform: `scaleX(${progressPct / 100})` }}
        />
      </div>

      {viewMode === 'verbatim' ? (
        <div className="px-5 sm:px-8 py-6">
          <p className="text-xs font-mono text-[#686D75] mb-3">
            Official syllabus text ({unit.code} · {unit.teachingHours} Hours)
          </p>
          <p className="font-serif text-[15px] sm:text-base leading-[1.85] text-[#24282E] max-w-[75ch]">
            {unit.verbatimText}
          </p>
        </div>
      ) : (
        <div className="px-5 sm:px-8 py-5 divide-y divide-[#ECE8DF]">
          {groupedTopics.map((group, groupIndex) => (
            <div key={group.groupName} className={groupIndex === 0 ? 'pb-4' : 'py-4 last:pb-1'}>
              <p className="text-xs font-mono text-[#5B6068] mb-3">{group.groupName}</p>
              <ul className="space-y-1">
                {group.items.map((topic) => {
                  const isDone = Boolean(completedIds[topic.id]);
                  const existingNote = notes[topic.id];
                  const isEditing = editingNoteId === topic.id;

                  return (
                    <li key={topic.id} className="group">
                      <div className="flex items-start justify-between gap-3 py-1.5 rounded hover:bg-[#F5F2EB]/60 px-2 -mx-2 transition-colors">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={isDone}
                          onClick={() => onToggleTopic(topic.id)}
                          className="flex items-start gap-3 text-left cursor-pointer flex-1 min-w-0 py-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/40"
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 h-5 w-5 rounded-sm border inline-flex items-center justify-center shrink-0 transition-colors ${
                              isDone
                                ? 'bg-[#264E36] border-[#264E36] text-white'
                                : 'bg-white border-[#BDB7AA] text-transparent group-hover:border-[#1D3557]'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </span>
                          <span
                            className={`text-[15px] leading-relaxed select-none transition-colors ${
                              isDone ? 'text-[#686D75] line-through decoration-[#A8A398]' : 'text-[#1D2024]'
                            }`}
                          >
                            {topic.title}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => (isEditing ? setEditingNoteId(null) : openNoteEditor(topic.id))}
                          aria-label={existingNote ? `Edit note for ${topic.title}` : `Add note for ${topic.title}`}
                          className={`no-print shrink-0 h-8 px-2.5 inline-flex items-center gap-1.5 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                            existingNote
                              ? 'text-[#1D3557] bg-[#1D3557]/8 hover:bg-[#1D3557]/12'
                              : 'text-[#686D75] opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 hover:text-[#1A2028] hover:bg-[#ECE8DF]'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{existingNote ? 'Note' : 'Annotate'}</span>
                        </button>
                      </div>

                      {existingNote && !isEditing && (
                        <div className="ml-8 mt-1 mb-2 text-xs leading-relaxed text-[#4B5058]">
                          <span className="font-mono text-[#1D3557] mr-1.5">Note:</span>
                          <span>{existingNote}</span>
                        </div>
                      )}

                      {isEditing && (
                        <div className="ml-8 mt-2 mb-3 flex flex-col gap-2 no-print max-w-xl">
                          <textarea
                            rows={2}
                            value={draftNote}
                            onChange={(e) => setDraftNote(e.target.value)}
                            placeholder="Write a brief study note or statute reference..."
                            className="w-full px-3 py-2 text-xs bg-white border border-[#CFCAC0] rounded text-[#1A2028] placeholder:text-[#8E9299] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/30 focus:border-[#1D3557]"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => commitNote(topic.id)}
                              className="px-3 py-1.5 text-xs font-medium bg-[#1D3557] text-white rounded hover:bg-[#152842] transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Save Note
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNoteId(null)}
                              className="px-3 py-1.5 text-xs font-medium text-[#575C64] hover:text-[#1A2028] rounded border border-[#D4CFC4] bg-white transition-colors cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
                            >
                              <X className="w-3 h-3" aria-hidden="true" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
