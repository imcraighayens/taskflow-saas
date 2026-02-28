import React, { useState } from 'react';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');

  const handleNavigate = (target: 'landing' | 'login' | 'signup' | 'dashboard') => {
    setPage(target);
  };

  return (
    <>
      {page === 'landing' && <Landing onNavigate={handleNavigate} />}
      {(page === 'login' || page === 'signup') && (
        <Auth 
          initialView={page === 'login' ? 'login' : 'signup'} 
          onLogin={() => setPage('dashboard')}
          onNavigate={(p) => setPage(p)}
        />
      )}
      {page === 'dashboard' && <Dashboard />}
    </>
  );
}
