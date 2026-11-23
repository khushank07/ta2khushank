import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { COURSE_META } from '../data/syllabus';

export interface ScholarSession {
  identifier: string;
  displayName: string;
  signedInAt: string;
  remember: boolean;
}

interface LoginViewProps {
  onLogin: (session: ScholarSession) => void;
}

function deriveDisplayName(identifier: string): string {
  const cleaned = identifier.trim();
  if (!cleaned) return 'Scholar';
  if (cleaned.includes('@')) {
    const local = cleaned.split('@')[0];
    return local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
  return cleaned;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [identifier, setIdentifier] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedId = identifier.trim();
    if (!trimmedId) {
      setError('Enter your enrollment ID or university email address.');
      return;
    }
    if (passphrase.length < 4) {
      setError('Passphrase must be at least 4 characters long.');
      return;
    }

    setError(null);
    onLogin({
      identifier: trimmedId,
      displayName: deriveDisplayName(trimmedId),
      signedInAt: new Date().toISOString(),
      remember,
    });
  };

  const handlePrefillSample = () => {
    setIdentifier('arjun.mehta@university.edu');
    setPassphrase('fsms23-ledger');
    setError(null);
  };

  return (
    <div className="min-h-screen paper-surface flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-10">
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between border-b border-[#DCD8CE] pb-4">
        <span className="font-serif text-base sm:text-lg font-medium text-[#1A2028] tracking-tight whitespace-nowrap shrink-0">
          Academic Syllabus Ledger
        </span>
        <span className="font-mono text-xs text-[#5B6068] whitespace-nowrap shrink-0">
          {COURSE_META.code}
        </span>
      </header>

      <main className="max-w-5xl w-full mx-auto my-auto py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <section className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-4">
            <div>
              <div className="mb-8" aria-hidden="true">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#1D3557]"
                >
                  <rect
                    x="6"
                    y="8"
                    width="52"
                    height="48"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <line x1="16" y1="8" x2="16" y2="56" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
                  <circle cx="38" cy="28" r="10" stroke="currentColor" strokeWidth="1.25" />
                  <line x1="38" y1="14" x2="38" y2="42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="24" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="24" y1="46" x2="50" y2="46" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.65" />
                </svg>
              </div>

              <p className="font-mono text-xs tracking-wide text-[#5B6068] mb-3">
                {COURSE_META.code} · Semester III
              </p>

              <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1A2028] tracking-tight leading-[1.12] [text-wrap:balance] mb-5">
                {COURSE_META.title}
              </h1>

              <p className="text-base leading-relaxed text-[#454A52] max-w-xl mb-8">
                Course syllabus, teaching and examination scheme, and unit-by-unit study ledger
                covering IT security audits, the seven infrastructure domains, business continuity,
                disaster recovery, and cyber legislation.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCD8CE] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#4B5058] tabular-nums">
              <span>{COURSE_META.totalCredits} Credits</span>
              <span aria-hidden="true" className="text-[#B6B1A6]">
                ·
              </span>
              <span>{COURSE_META.totalHours} Teaching Hours</span>
              <span aria-hidden="true" className="text-[#B6B1A6]">
                ·
              </span>
              <span>4 Units</span>
              <span aria-hidden="true" className="text-[#B6B1A6]">
                ·
              </span>
              <span>{COURSE_META.totalMarks} Total Marks</span>
            </div>
          </section>

          <section className="lg:col-span-5 flex items-center">
            <div className="folio-sheet w-full border border-[#DCD8CE] rounded-md p-6 sm:p-9">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-medium text-[#1A2028] tracking-tight">
                  Student Sign-In
                </h2>
                <p className="mt-1.5 text-sm text-[#575C64]">
                  Open your course dossier and saved topic checklist.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-2.5 rounded border border-[#9E2A2B]/30 bg-[#9E2A2B]/5 px-3.5 py-2.5 text-xs text-[#7F1D1D]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9E2A2B]" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="scholar-id"
                    className="block text-xs font-medium text-[#2C3138] mb-1.5"
                  >
                    University Email or Enrollment ID
                  </label>
                  <input
                    id="scholar-id"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full h-11 px-3.5 bg-white border border-[#CFCAC0] rounded text-sm text-[#1A2028] placeholder:text-[#8E9299] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/30 focus:border-[#1D3557] transition-colors duration-150"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scholar-passphrase"
                    className="block text-xs font-medium text-[#2C3138] mb-1.5"
                  >
                    Passphrase
                  </label>
                  <div className="relative">
                    <input
                      id="scholar-passphrase"
                      name="passphrase"
                      type={showPassphrase ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Enter your passphrase"
                      className="w-full h-11 pl-3.5 pr-11 bg-white border border-[#CFCAC0] rounded text-sm text-[#1A2028] placeholder:text-[#8E9299] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/30 focus:border-[#1D3557] transition-colors duration-150"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassphrase((prev) => !prev)}
                      aria-label={showPassphrase ? 'Hide passphrase' : 'Show passphrase'}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded text-[#5B6068] hover:text-[#1A2028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/40 transition-colors"
                    >
                      {showPassphrase ? (
                        <EyeOff className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none min-h-[40px]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-[#B8B2A6] text-[#1D3557] focus:ring-[#1D3557]/30 accent-[#1D3557]"
                  />
                  <span className="text-xs text-[#4B5058]">Keep me signed in on this browser</span>
                </label>

                <button
                  type="submit"
                  className="w-full h-11 px-4 bg-[#1D3557] hover:bg-[#152842] active:translate-y-[0.5px] text-white text-sm font-medium rounded inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D3557] cursor-pointer whitespace-nowrap"
                >
                  <span>Open Course Syllabus</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-[#E6E3DA] flex items-center justify-between gap-3">
                <span className="text-xs text-[#686D75]">Testing access</span>
                <button
                  type="button"
                  onClick={handlePrefillSample}
                  className="text-xs font-medium text-[#1D3557] hover:underline underline-offset-4 py-1.5 px-2 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3557]/30 cursor-pointer whitespace-nowrap"
                >
                  Fill sample credentials
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="max-w-5xl w-full mx-auto pt-4 border-t border-[#DCD8CE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#686D75]">
        <span>Department of Information Security &amp; Compliance Studies</span>
        <span className="font-mono">Paper Code: {COURSE_META.code}</span>
      </footer>
    </div>
  );
}
