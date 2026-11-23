import { useEffect } from 'react';
import { X } from 'lucide-react';
import { SOURCE_SCAN_IMAGES } from '../data/syllabus';

interface SourceScansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceScansModal({ isOpen, onClose }: SourceScansModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#14171C]/65 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-scans-title"
      onClick={onClose}
    >
      <div
        className="folio-sheet border border-[#CFCAC0] rounded-md max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#DCD8CE] bg-[#F6F4EE]">
          <div>
            <h2 id="source-scans-title" className="font-serif text-lg font-medium text-[#1A2028]">
              Original Syllabus Reference Pages
            </h2>
            <p className="text-xs text-[#5B6068] mt-0.5">
              Source sheets for FSMS23 SIII SP-V P1: Cyber Law, Risk and Compliance
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close original syllabus scans"
            className="h-10 w-10 inline-flex items-center justify-center rounded border border-[#D4CFC4] bg-white text-[#2C3138] hover:bg-[#F2EFE8] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#EDEAE2]">
          {SOURCE_SCAN_IMAGES.map((scan) => (
            <figure key={scan.id} className="bg-white border border-[#D4CFC4] rounded p-3 sm:p-4">
              <figcaption className="text-xs font-mono text-[#454A52] mb-3">{scan.label}</figcaption>
              <img
                src={scan.src}
                alt={scan.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-sm border border-[#E6E3DA]"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
