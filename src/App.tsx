import { useState } from 'react';
import { LoginView, type ScholarSession } from './components/LoginView';
import { SyllabusDashboard } from './components/SyllabusDashboard';

const SESSION_KEY = 'fsms23_scholar_session_v1';

function loadInitialSession(): ScholarSession | null {
  try {
    const persisted = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
    if (!persisted) return null;
    const parsed = JSON.parse(persisted) as ScholarSession;
    return parsed && parsed.identifier ? parsed : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [session, setSession] = useState<ScholarSession | null>(loadInitialSession);

  const handleLogin = (nextSession: ScholarSession) => {
    setSession(nextSession);
    try {
      const serialized = JSON.stringify(nextSession);
      if (nextSession.remember) {
        localStorage.setItem(SESSION_KEY, serialized);
        sessionStorage.removeItem(SESSION_KEY);
      } else {
        sessionStorage.setItem(SESSION_KEY, serialized);
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const handleSignOut = () => {
    setSession(null);
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  if (!session) {
    return <LoginView onLogin={handleLogin} />;
  }

  return <SyllabusDashboard session={session} onSignOut={handleSignOut} />;
}
