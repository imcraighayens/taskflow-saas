import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { User } from './types';
import { getStoredUser, clearStoredUser } from './auth';

export default function App() {
  const [page, setPage] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Auto-login from stored session
  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setCurrentUser(stored);
      setPage('dashboard');
    }
  }, []);

  const handleNavigate = (target: 'landing' | 'login' | 'signup' | 'dashboard') => {
    setPage(target);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setPage('dashboard');
  };

  const handleLogout = () => {
    clearStoredUser();
    setCurrentUser(null);
    setPage('landing');
  };

  return (
    <>
      {page === 'landing' && <Landing onNavigate={handleNavigate} />}
      {(page === 'login' || page === 'signup') && (
        <Auth
          initialView={page === 'login' ? 'login' : 'signup'}
          onLogin={handleLogin}
          onNavigate={(p) => setPage(p)}
        />
      )}
      {page === 'dashboard' && currentUser && (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
}
