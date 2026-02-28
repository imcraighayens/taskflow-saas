import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LandingProps {
  onNavigate: (page: 'login' | 'signup') => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#F0F2F8]">
      {/* Background */}
      <div className="bg-canvas">
        <div className="bg-orb orb1"></div>
        <div className="bg-orb orb2"></div>
        <div className="bg-orb orb3"></div>
      </div>
      <div className="grid-bg"></div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[68px] border-b border-white/5 bg-[#080A0D]/80 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div className="text-[17px] font-extrabold tracking-tight text-white">Kodesk</div>
        </a>
        <div className="hidden md:flex items-center gap-1.5">
          {['Features', 'Departments', 'Marketplace', 'Reviews'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold text-[#8B93A7] hover:text-white hover:bg-white/5 transition-all">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('login')} className="px-4.5 py-2 rounded-[10px] text-[13px] font-bold text-[#8B93A7] bg-transparent border border-white/10 hover:text-white hover:border-white/25 transition-all cursor-pointer">
            Sign in
          </button>
          <button onClick={() => onNavigate('signup')} className="px-5 py-2 rounded-[10px] text-[13px] font-bold text-white bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] border-none cursor-pointer transition-all shadow-[0_4px_16px_rgba(74,108,247,0.35)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(74,108,247,0.5)]">
            Get started →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center pt-36 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A6CF7]/10 border border-[#4A6CF7]/25 text-xs font-bold text-[#4A6CF7] mb-7 tracking-wide uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6CF7] animate-pulse"></span>
              Now with AI-powered affordability engine
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[72px] font-extrabold tracking-tighter leading-[1.05] mb-6"
            >
              The Operating System<br/>for <span className="grad-text">Modern Teams</span><br/>
              <span className="bg-gradient-to-br from-orange-500 to-pink-500 bg-clip-text text-transparent">Built to Ship.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg text-[#8B93A7] max-w-[580px] leading-relaxed mb-10"
            >
              Kodesk unifies your Board, List, Overview and Feature Marketplace in one dark, fast, beautiful workspace. From fleet ops to fintech — every department in sync.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex gap-3 flex-wrap justify-center lg:justify-start mb-10"
            >
              <button onClick={() => onNavigate('signup')} className="px-8 py-3.5 rounded-[14px] text-[15px] font-bold text-white bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] border-none cursor-pointer flex items-center gap-2.5 shadow-[0_8px_32px_rgba(74,108,247,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(74,108,247,0.6)]">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-white fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Start for free
              </button>
              <button className="px-7 py-3.5 rounded-[14px] text-[15px] font-semibold text-[#8B93A7] bg-white/5 border border-white/10 cursor-pointer flex items-center gap-2 transition-all hover:text-white hover:border-white/20 hover:bg-white/10">
                View demo →
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-3.5 text-[12.5px] text-[#525869]"
            >
              <div className="flex items-center -space-x-2">
                {['#4A6CF7', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'].map((bg, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#080A0D] flex items-center justify-center text-[10px] font-extrabold text-white" style={{ background: bg }}>
                    {['C','S','P','J','+'][i]}
                  </div>
                ))}
              </div>
              <span>Trusted by <strong className="text-white/60">2,400+</strong> teams across South Africa</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A6CF7]/20 to-[#8B5CF6]/20 blur-[60px] rounded-full -z-10"></div>
            <motion.img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Kodesk Team" 
              className="relative z-10 w-full max-w-[600px] object-cover drop-shadow-2xl select-none rounded-2xl"
              referrerPolicy="no-referrer"
              draggable={false}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full max-w-[1040px] mx-auto"
        >
          <div className="absolute inset-[-1px] rounded-[22px] bg-gradient-to-br from-[#4A6CF7]/35 via-[#8B5CF6]/20 to-transparent -z-10 blur-[1px]"></div>
          <div className="w-full bg-[#131720] rounded-[20px] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="h-11 bg-[#111318] flex items-center px-4 gap-2 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-1"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-1"></div>
              <div className="flex-1 ml-3 h-5 rounded-md bg-white/5 max-w-[200px]"></div>
            </div>
            <div className="flex h-[280px]">
              <div className="w-[52px] bg-[#0e1016] border-r border-white/5 flex flex-col items-center py-3 gap-1.5">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[#4A6CF7]/20 mb-2">
                  <div className="w-4 h-4 rounded bg-[#4A6CF7]/60"></div>
                </div>
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-[10px] flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-white/10"></div>
                  </div>
                ))}
              </div>
              <div className="flex-1 p-3.5 flex flex-col gap-2.5 overflow-hidden">
                <div className="flex gap-2 mb-1">
                  <div className="h-7 rounded-md bg-[#4A6CF7]/15 flex-1 border border-[#4A6CF7]/20"></div>
                  <div className="h-7 w-20 rounded-md bg-white/5"></div>
                </div>
                <div className="flex gap-2.5 flex-1">
                  {/* Col 1 */}
                  <div className="flex-1 bg-white/5 rounded-[10px] border border-white/5 p-2.5 flex flex-col gap-1.5">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> TO DO
                    </div>
                    <div className="bg-[#131720] border border-white/5 rounded-lg p-2">
                      <div className="h-0.5 rounded-full mb-1.5 bg-gradient-to-r from-[#4A6CF7] to-[#8B5CF6]"></div>
                      <div className="h-1.5 rounded-full bg-white/10 mb-1"></div>
                      <div className="h-1.5 rounded-full bg-white/10 w-3/5 mb-1"></div>
                      <div className="flex gap-1 mt-1.5">
                        <div className="h-3.5 rounded-full bg-white/10 w-11"></div>
                        <div className="h-3.5 rounded-full bg-white/10 w-9"></div>
                      </div>
                    </div>
                    <div className="bg-[#131720] border border-white/5 rounded-lg p-2 opacity-70">
                      <div className="h-0.5 rounded-full mb-1.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
                      <div className="h-1.5 rounded-full bg-white/10 mb-1"></div>
                      <div className="h-1.5 rounded-full bg-white/10 w-3/5"></div>
                    </div>
                  </div>
                  {/* Col 2 */}
                  <div className="flex-1 bg-white/5 rounded-[10px] border border-white/5 p-2.5 flex flex-col gap-1.5">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A6CF7]"></div> IN PROGRESS
                    </div>
                    <div className="bg-[#131720] border border-white/5 rounded-lg p-2">
                      <div className="h-0.5 rounded-full mb-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                      <div className="h-1.5 rounded-full bg-white/10 mb-1"></div>
                      <div className="h-1.5 rounded-full bg-white/10 w-3/5 mb-1"></div>
                      <div className="flex gap-1 mt-1.5">
                        <div className="h-3.5 rounded-full bg-white/10 w-12"></div>
                      </div>
                    </div>
                  </div>
                  {/* Col 3 */}
                  <div className="flex-1 bg-white/5 rounded-[10px] border border-white/5 p-2.5 flex flex-col gap-1.5">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> DONE
                    </div>
                    <div className="bg-[#131720] border border-white/5 rounded-lg p-2 opacity-50">
                      <div className="h-0.5 rounded-full mb-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                      <div className="h-1.5 rounded-full bg-white/10 mb-1"></div>
                      <div className="h-1.5 rounded-full bg-white/10 w-3/5"></div>
                    </div>
                    <div className="bg-[#131720] border border-white/5 rounded-lg p-2 opacity-40">
                      <div className="h-0.5 rounded-full mb-1.5 bg-white/20"></div>
                      <div className="h-1.5 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <div className="py-16 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1160px] mx-auto flex justify-around flex-wrap gap-8 text-center">
          {[
            { n: '16+', l: 'Marketplace Features' },
            { n: '4', l: 'View Modes' },
            { n: '7', l: 'Departments Supported' },
            { n: '∞', l: 'Tasks & Projects' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-[40px] font-extrabold tracking-tighter grad-text">{s.n}</div>
              <div className="text-[12.5px] text-[#525869] mt-1 uppercase tracking-widest font-semibold">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-[#4A6CF7]/10 border border-[#4A6CF7]/20 text-[#4A6CF7] text-[11px] font-bold uppercase tracking-widest mb-4">
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Everything you need to <span className="grad-text">ship faster</span></h2>
            <p className="text-[#8B93A7] max-w-[600px] mx-auto text-lg">
              Stop juggling multiple tools. Kodesk brings your entire product lifecycle into one unified operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Kanban Boards', desc: 'Visualize work in progress with drag-and-drop boards that keep everyone aligned.', icon: <rect x="3" y="3" width="18" height="18" rx="2" /> },
              { title: 'List Views', desc: 'Manage complex backlogs with powerful filtering, sorting, and bulk actions.', icon: <line x1="8" y1="6" x2="21" y2="6" /> },
              { title: 'Real-time Analytics', desc: 'Track velocity, burndown, and team performance with zero configuration.', icon: <path d="M18 20V10" /> },
              { title: 'Feature Marketplace', desc: 'Extend functionality with one-click installs for HR, Finance, and Ops modules.', icon: <path d="M12 2L2 7l10 5 10-5-10-5z" /> },
              { title: 'Team Profiles', desc: 'Know who is working on what with detailed user profiles and activity logs.', icon: <circle cx="12" cy="7" r="4" /> },
              { title: 'Dark Mode', desc: 'Beautifully designed dark interface that is easy on the eyes for late night coding.', icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /> }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[24px] bg-[#131720] border border-white/5 hover:border-[#4A6CF7]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-[14px] bg-[#1B1F2A] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#4A6CF7]/10 group-hover:text-[#4A6CF7] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[#8B93A7] leading-relaxed text-[15px]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-24 px-6 bg-[#0B0D11] border-y border-white/5">
        <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold uppercase tracking-widest mb-4">
              For Every Team
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">One OS, <br/><span className="text-white">Infinite Possibilities</span></h2>
            <p className="text-[#8B93A7] text-lg mb-8 leading-relaxed">
              Kodesk isn't just for developers. It's built to handle the unique workflows of every department in your organization.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                { l: 'Engineering', d: 'Sprint planning, bug tracking, and release management.', c: '#4A6CF7' },
                { l: 'Design', d: 'Asset management, feedback loops, and design system ops.', c: '#EC4899' },
                { l: 'Marketing', d: 'Campaign calendars, content pipelines, and asset approvals.', c: '#F59E0B' },
                { l: 'Operations', d: 'Hiring pipelines, vendor management, and office ops.', c: '#10B981' }
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: d.c }}>
                    {d.l[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold">{d.l}</div>
                    <div className="text-[#8B93A7] text-sm">{d.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A6CF7]/20 to-[#8B5CF6]/20 blur-[60px] rounded-full"></div>
            <div className="relative z-10 bg-[#131720] border border-white/10 rounded-[24px] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="text-lg font-bold text-white">Department Activity</div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { t: 'Q3 Marketing Campaign', s: 'In Progress', p: 75, c: '#F59E0B' },
                  { t: 'Mobile App Redesign', s: 'Review', p: 90, c: '#EC4899' },
                  { t: 'Q4 Hiring Pipeline', s: 'Planning', p: 30, c: '#10B981' },
                  { t: 'API Migration v2', s: 'Blocked', p: 45, c: '#EF4444' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{item.t}</span>
                      <span className="text-[#8B93A7]">{item.p}%</span>
                    </div>
                    <div className="h-2 bg-[#1B1F2A] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.p}%`, background: item.c }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Loved by <span className="grad-text">Builders</span></h2>
            <p className="text-[#8B93A7] text-lg">Join thousands of teams shipping faster with Kodesk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: "Kodesk completely changed how we ship. The marketplace features saved us weeks of building internal tools.", a: "Sarah J.", r: "CTO at FinTech Co" },
              { q: "Finally, a project management tool that doesn't feel like a spreadsheet from 1999. It's actually fun to use.", a: "Mike T.", r: "Product Lead" },
              { q: "The dark mode is stunning, and the performance is incredible. It handles our 50k+ tasks without a stutter.", a: "Jessica L.", r: "Eng Manager" }
            ].map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[24px] bg-[#131720] border border-white/5 relative"
              >
                <div className="text-[#4A6CF7] text-4xl font-serif absolute top-6 left-6 opacity-30">"</div>
                <p className="text-[#F0F2F8] text-lg leading-relaxed mb-6 relative z-10 pt-4">
                  {r.q}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-white font-bold">
                    {r.a[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{r.a}</div>
                    <div className="text-[#525869] text-xs">{r.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto bg-gradient-to-br from-[#4A6CF7]/20 to-[#8B5CF6]/20 rounded-[32px] p-12 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to streamline your workflow?</h2>
            <p className="text-lg text-[#F0F2F8]/80 max-w-[600px] mx-auto mb-10">
              Join the new standard in project management. Free for small teams, powerful for enterprises.
            </p>
            <button onClick={() => onNavigate('signup')} className="px-8 py-4 rounded-[16px] text-[16px] font-bold text-white bg-[#F0F2F8] text-[#080A0D] hover:bg-white hover:scale-105 transition-all shadow-xl">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 max-w-[1160px] mx-auto">
        <div className="text-[15px] font-extrabold text-[#8B93A7]">Kodesk</div>
        <div className="text-xs text-[#525869]">© 2026 Ecokode (Pty) Ltd · Johannesburg, South Africa</div>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Docs'].map(l => (
            <a key={l} href="#" className="text-xs text-[#525869] hover:text-[#8B93A7] transition-colors">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
