import React, { useState } from 'react';
import { motion } from 'motion/react';
import { authenticateUser, storeUser, registerCompany } from '../auth';
import { User } from '../types';

interface AuthProps {
  initialView?: 'login' | 'signup';
  onLogin: (user: User) => void;
  onNavigate: (page: 'landing') => void;
}

export default function Auth({ initialView = 'login', onLogin, onNavigate }: AuthProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign-up fields
  const [companyName, setCompanyName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('starter');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const switchView = (v: 'login' | 'signup') => {
    setView(v);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = authenticateUser(email, password);
      if (user) {
        storeUser(user);
        onLogin(user);
      } else {
        setError('Invalid email or password. Contact your admin for access.');
      }
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!companyName.trim()) { setError('Company name is required.'); return; }
    if (!adminName.trim()) { setError('Your full name is required.'); return; }
    if (!signupEmail.trim()) { setError('Email is required.'); return; }
    if (signupPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (signupPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (!agreedTerms) { setError('Please agree to the Terms & Privacy Policy.'); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const result = registerCompany({
        companyName: companyName.trim(),
        adminName: adminName.trim(),
        email: signupEmail.trim(),
        password: signupPassword,
        plan: selectedPlan,
      });
      if (result.success && result.user) {
        storeUser(result.user);
        onLogin(result.user);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    }, 1000);
  };

  const plans = [
    { id: 'starter' as const, label: 'Starter', price: 'Free', desc: 'Up to 5 users' },
    { id: 'pro' as const, label: 'Pro', price: '$12/mo', desc: 'Up to 50 users' },
    { id: 'enterprise' as const, label: 'Enterprise', price: '$49/mo', desc: 'Unlimited' },
  ];

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
            {view === 'login' ? 'Your workspace' : 'Start your journey'}
          </div>
          <h1 className="text-4xl lg:text-[52px] font-extrabold tracking-tight leading-[1.08] mb-4">
            {view === 'login' ? (
              <>One platform.<br/>Every <span className="grad-text">department.</span></>
            ) : (
              <>Build your<br/><span className="grad-text">company</span> workspace.</>
            )}
          </h1>
          <p className="text-[15px] text-[#8B93A7] leading-relaxed max-w-[400px] mb-9">
            {view === 'login'
              ? 'From Kanban boards and team tracking to a full feature marketplace — Kodesk is how modern teams get work done.'
              : 'Set up your company in seconds. Add your team, manage projects, and scale with our feature marketplace — all from one dashboard.'
            }
          </p>

          <div className="flex flex-col gap-3">
            {view === 'login' ? (
              [
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
              ))
            ) : (
              [
                { i: '🏢', t: 'Company workspace', d: 'Your own branded environment for the whole team.' },
                { i: '👥', t: 'Team management', d: 'Add members, assign roles, and control access.' },
                { i: '⚡', t: 'Ready in seconds', d: 'Start managing tasks immediately after sign-up.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-[14px] bg-white/[0.025] border border-white/5 transition-all hover:bg-[#4A6CF7]/5 hover:border-[#4A6CF7]/15">
                  <div className="w-9 h-9 rounded-[10px] shrink-0 flex items-center justify-center text-base bg-white/5">{item.i}</div>
                  <div className="text-[13px] text-[#8B93A7] font-medium leading-snug">
                    <strong className="text-white font-bold block text-[13px]">{item.t}</strong>
                    {item.d}
                  </div>
                </div>
              ))
            )}
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
      <div className={`w-full shrink-0 flex flex-col items-center justify-center p-8 md:p-10 bg-[#080A0D]/50 relative z-10 ${view === 'signup' ? 'md:w-[540px]' : 'md:w-[480px]'} transition-all duration-300`}>
        <div className={`w-full ${view === 'signup' ? 'max-w-[450px]' : 'max-w-[400px]'}`}>
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div className="flex items-center gap-2.5">
              <div className="text-[22px] font-extrabold tracking-tight text-white">Kodesk</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#161B28] border border-white/5 rounded-[14px] p-1 gap-1 mb-6">
            <button onClick={() => switchView('login')} className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-bold transition-all ${view === 'login' ? 'bg-[#111520] text-white shadow-sm' : 'text-[#8B93A7] hover:text-white'}`}>Sign In</button>
            <button onClick={() => switchView('signup')} className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-bold transition-all ${view === 'signup' ? 'bg-[#111520] text-white shadow-sm' : 'text-[#8B93A7] hover:text-white'}`}>Create Company</button>
          </div>

          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── LOGIN ── */}
            {view === 'login' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1.5">Welcome back 👋</h2>
                  <div className="text-[13px] text-[#8B93A7]">
                    New to Kodesk?{' '}
                    <button onClick={() => switchView('signup')} className="text-[#4A6CF7] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
                      Create a company account
                    </button>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">Email address</label>
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
                      <a href="#" className="text-xs font-semibold text-[#4A6CF7] hover:underline">Forgot password?</a>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-300 text-[12.5px]">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-red-500 fill-none stroke-2 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
                      'Sign in to Kodesk'
                    )}
                  </button>
                </form>

                <div className="text-[11px] text-[#525869] text-center mt-4 leading-relaxed">
                  By signing in you agree to our <a href="#" className="text-[#8B93A7] hover:underline">Terms</a> and <a href="#" className="text-[#8B93A7] hover:underline">Privacy Policy</a>.
                </div>
              </>
            )}

            {/* ── SIGN UP ── */}
            {view === 'signup' && (
              <>
                <div className="mb-5">
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1.5">Create your company ✨</h2>
                  <div className="text-[13px] text-[#8B93A7]">
                    Already have an account?{' '}
                    <button onClick={() => switchView('login')} className="text-[#4A6CF7] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0">
                      Sign in
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-3">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">Company name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525869]">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]"><path d="M3 21h18M3 7v14M21 7v14M6 11h.01M6 15h.01M6 19h.01M10 11h.01M10 15h.01M10 19h.01M14 11h.01M14 15h.01M14 19h.01M18 11h.01M18 15h.01M18 19h.01M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                      </div>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full h-[42px] pl-9 pr-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]"
                      />
                    </div>
                  </div>

                  {/* Admin Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">Your full name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525869]">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-[42px] pl-9 pr-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#8B93A7]">Work email</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525869]">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </div>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full h-[42px] pl-9 pr-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]"
                      />
                    </div>
                  </div>

                  {/* Passwords */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#8B93A7]">Password</label>
                      <input
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Min. 6 chars"
                        className="h-[42px] px-3.5 bg-[#161B28] border border-white/15 rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#8B93A7]">Confirm</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`h-[42px] px-3.5 bg-[#161B28] border rounded-[11px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7] focus:bg-[#4A6CF7]/5 transition-all placeholder:text-[#525869] ${confirmPassword && confirmPassword !== signupPassword ? 'border-red-500/50' : 'border-white/15'}`}
                      />
                    </div>
                  </div>

                  {/* Plan selector */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <label className="text-xs font-bold text-[#8B93A7]">Select a plan</label>
                    <div className="grid grid-cols-3 gap-2">
                      {plans.map(plan => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`p-3 rounded-[12px] border text-left transition-all ${
                            selectedPlan === plan.id
                              ? 'bg-[#4A6CF7]/10 border-[#4A6CF7]/40 shadow-[0_0_16px_rgba(74,108,247,0.15)]'
                              : 'bg-[#161B28] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-extrabold text-white">{plan.label}</span>
                            {selectedPlan === plan.id && (
                              <div className="w-3.5 h-3.5 rounded-full bg-[#4A6CF7] flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-2 h-2 stroke-white fill-none stroke-[3]"><polyline points="20 6 9 17 4 12"/></svg>
                              </div>
                            )}
                          </div>
                          <div className="text-[13px] font-bold text-[#4A6CF7]">{plan.price}</div>
                          <div className="text-[10px] text-[#525869] mt-0.5">{plan.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-2.5 mt-1 cursor-pointer select-none">
                    <div
                      onClick={() => setAgreedTerms(!agreedTerms)}
                      className={`w-4 h-4 mt-0.5 rounded-[5px] border flex items-center justify-center shrink-0 transition-all ${
                        agreedTerms ? 'bg-[#4A6CF7] border-[#4A6CF7]' : 'bg-[#161B28] border-white/15 hover:border-white/30'
                      }`}
                    >
                      {agreedTerms && <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 stroke-white fill-none stroke-[3]"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span className="text-[11.5px] text-[#8B93A7] leading-snug">
                      I agree to the <a href="#" className="text-[#4A6CF7] hover:underline">Terms of Service</a> and <a href="#" className="text-[#4A6CF7] hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-300 text-[12.5px]">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-red-500 fill-none stroke-2 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[46px] rounded-[12px] bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-sm font-extrabold border-none cursor-pointer transition-all shadow-[0_6px_24px_rgba(74,108,247,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(74,108,247,0.55)] flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Create {companyName || 'company'} account
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-[11px] text-[#525869] text-center mt-4 leading-relaxed">
                  Free forever on Starter. Upgrade anytime. No credit card required.
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
