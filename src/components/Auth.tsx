import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AuthProps {
  initialView?: 'login' | 'signup';
  onLogin: () => void;
  onNavigate: (page: 'landing') => void;
}

export default function Auth({ initialView = 'login', onLogin, onNavigate }: AuthProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (view === 'login' && email.includes('@') && password.length >= 4) {
        onLogin();
      } else if (view === 'signup' && email.includes('@') && password.length >= 8) {
        onLogin();
      } else {
        setError(view === 'login' ? 'Invalid credentials (try demo@kodesk.app / demo)' : 'Password must be at least 8 chars');
      }
    }, 1200);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#080A0D] text-[#F0F2F8] font-sans overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-[#4A6CF7] rounded-full blur-[130px] opacity-10 -top-[300px] -left-[200px] animate-[orbFloat_20s_ease-in-out_infinite]"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#8B5CF6] rounded-full blur-[130px] opacity-10 -bottom-[200px] -right-[100px] animate-[orbFloat_24s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMGgwdjFIMHoiIGZpbGw9InJnYmEoNzQsMTA4LDI0NywwLjAzNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_70%_100%_at_30%_50%,black_0%,transparent_100%)]"></div>
      </div>

      {/* Left Panel */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-12 bg-gradient-to-br from-[#4A6CF7]/5 via-[#8B5CF6]/5 to-transparent border-r border-white/5 min-w-0 relative z-10">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="flex items-center gap-2.5 no-underline w-fit">
          <div className="text-xl font-extrabold tracking-tight text-white">Kodesk</div>
        </a>

        <div className="flex-1 flex flex-col justify-center py-10">
          <div className="text-[11px] font-bold text-[#4A6CF7] uppercase tracking-[2px] flex items-center gap-2 mb-5 before:content-[''] before:w-5 before:h-0.5 before:bg-[#4A6CF7] before:rounded-full">
            Your workspace
          </div>
          <h1 className="text-4xl lg:text-[52px] font-extrabold tracking-tight leading-[1.08] mb-4">
            One platform.<br/>Every <span className="grad-text">department.</span>
          </h1>
          <p className="text-[15px] text-[#8B93A7] leading-relaxed max-w-[400px] mb-9">
            From Kanban boards and team tracking to a full feature marketplace — Kodesk is how modern teams get work done.
          </p>

          <div className="flex flex-col gap-3">
            {[
              { i: '🗂️', t: 'Board, List & Overview views', d: 'Manage tasks your way with drag & drop.' },
              { i: '🛍', t: 'Feature Marketplace', d: 'Build and deploy features in one click.' },
              { i: '🚗', t: 'EcoTrack Fleet Integration', d: 'Live GPS dashboards inside your workspace.' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-[14px] bg-white/[0.025] border border-white/5 transition-all hover:bg-[#4A6CF7]/5 hover:border-[#4A6CF7]/15">
                <div className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center text-base bg-white/5">{item.i}</div>
                <div className="text-[13px] text-[#8B93A7] font-medium leading-snug">
                  <strong className="text-white font-bold block text-[13px]">{item.t}</strong>
                  {item.d}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-[#525869] pt-6 border-t border-white/5">
          <div className="flex -space-x-2">
            {['C','S','P','J'].map((l, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#080A0D] flex items-center justify-center text-[9px] font-extrabold text-white" style={{background: ['#4A6CF7','#8B5CF6','#EC4899','#F59E0B'][i]}}>{l}</div>
            ))}
          </div>
          <span>Trusted by <strong className="text-white/50">2,400+</strong> teams</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[480px] shrink-0 flex flex-col items-center justify-center p-8 md:p-10 bg-[#080A0D]/50 relative z-10">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="flex justify-center mb-9">
            <div className="flex items-center gap-2.5">
              <div className="text-[22px] font-extrabold tracking-tight text-white">Kodesk</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#161B28] border border-white/5 rounded-[14px] p-1 gap-1 mb-7">
            <button onClick={() => setView('login')} className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-bold transition-all ${view === 'login' ? 'bg-[#111520] text-white shadow-sm' : 'text-[#8B93A7] hover:text-white'}`}>Sign In</button>
            <button onClick={() => setView('signup')} className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-bold transition-all ${view === 'signup' ? 'bg-[#111520] text-white shadow-sm' : 'text-[#8B93A7] hover:text-white'}`}>Create Account</button>
          </div>

          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight mb-1.5">{view === 'login' ? 'Welcome back 👋' : 'Create your account ✨'}</h2>
              <div className="text-[13px] text-[#8B93A7]">
                {view === 'login' ? 'New to Kodesk? ' : 'Already have one? '}
                <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="text-[#4A6CF7] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
                  {view === 'login' ? 'Create an account' : 'Sign in'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {view === 'signup' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">First name</label>
                    <input type="text" placeholder="Craig" className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">Last name</label>
                    <input type="text" placeholder="K." className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]" />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#8B93A7]">{view === 'signup' ? 'Work email' : 'Email address'}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" 
                  className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#8B93A7]">Password</label>
                  {view === 'login' && <a href="#" className="text-xs font-semibold text-[#4A6CF7] hover:underline">Forgot password?</a>}
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={view === 'signup' ? 'Min. 8 characters' : '••••••••'} 
                  className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]" 
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-300 text-[12.5px]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-red-500 fill-none stroke-2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-[46px] rounded-[12px] bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-sm font-extrabold border-none cursor-pointer transition-all shadow-[0_6px_24px_rgba(74,108,247,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(74,108,247,0.55)] flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  view === 'login' ? 'Sign in to Kodesk' : 'Create account →'
                )}
              </button>
            </form>

            <div className="text-[11px] text-[#525869] text-center mt-4 leading-relaxed">
              {view === 'login' 
                ? <span>By signing in you agree to our <a href="#" className="text-[#8B93A7] hover:underline">Terms</a> and <a href="#" className="text-[#8B93A7] hover:underline">Privacy Policy</a>.</span>
                : 'Free forever on the starter plan. No credit card required.'
              }
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
