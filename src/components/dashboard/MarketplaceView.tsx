import React, { useState } from 'react';
import { Feature } from '../../types';
import { AV_COLORS } from '../../constants';

interface MarketplaceViewProps {
  features: Feature[];
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
}

export default function MarketplaceView({ features, onInstall, onUninstall }: MarketplaceViewProps) {
  const [dept, setDept] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = features.filter(f => {
    const deptMatch = dept === 'all' || f.dept.includes(dept);
    const qMatch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.desc.toLowerCase().includes(search.toLowerCase());
    return deptMatch && qMatch;
  });

  const depts = ['all','finance','hr','operations','engineering','design','sales','legal'];

  return (
    <div className="flex flex-col gap-4">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[18px] border border-[#4A6CF7]/20 bg-gradient-to-br from-[#4A6CF7]/10 to-[#8B5CF6]/10 p-8">
        <div className="relative z-10 flex flex-wrap justify-between gap-5">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#F0F2F8] mb-1">Feature Marketplace</h2>
            <p className="text-[13px] text-[#8B93A7] max-w-[520px] leading-relaxed">
              Build, park, and deploy features across Finance, HR, Operations and more. Install ready-made modules into your workflow in one click.
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-lg hover:-translate-y-0.5 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Publish Feature
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#181C27] border border-white/5 rounded-[11px] px-3 h-[38px] flex-1 min-w-[220px] max-w-[340px] focus-within:border-[#4A6CF7]/40 focus-within:bg-[#4A6CF7]/5 transition-all">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#525869] fill-none stroke-[1.8]"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            type="text" 
            placeholder="Search features…" 
            className="bg-transparent border-none outline-none font-sans text-[13px] text-[#F0F2F8] w-full placeholder:text-[#525869]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {depts.map(d => (
            <button 
              key={d}
              onClick={() => setDept(d)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[9px] text-xs font-bold border transition-all whitespace-nowrap ${
                dept === d 
                  ? 'bg-[#4A6CF7]/15 border-[#4A6CF7]/40 text-[#8B9EFB]' 
                  : 'bg-[#1B1F2A] border-white/5 text-[#8B93A7] hover:text-white hover:border-white/15'
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
              <span className={`px-1.5 py-px rounded-full text-[10px] ${dept === d ? 'bg-[#4A6CF7]/30 text-[#c7d2fe]' : 'bg-white/5'}`}>
                {d === 'all' ? features.length : features.filter(f => f.dept.includes(d)).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map(f => {
          const isInstalled = f.status === 'installed';
          return (
            <div key={f.id} className="bg-[#181C27] border border-white/5 rounded-[18px] overflow-hidden flex flex-col hover:border-white/15 hover:-translate-y-1 hover:shadow-xl transition-all group">
              <div className="h-20 relative flex items-center px-5 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="w-12 h-12 rounded-[14px] bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[22px] shadow-lg z-10">
                  {f.icon}
                </div>
                <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  f.status === 'installed' ? 'bg-[#4A6CF7]/20 text-[#818CF8] border-[#4A6CF7]/30' :
                  f.status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/25' :
                  'bg-white/5 text-[#8B93A7] border-white/10'
                }`}>
                  {f.status === 'installed' ? 'Installed' : f.status === 'available' ? 'Available' : f.status}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-sm font-extrabold text-[#F0F2F8] mb-1">{f.name}</div>
                <div className="text-xs text-[#8B93A7] leading-relaxed mb-3 line-clamp-2">{f.desc}</div>
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  {f.dept.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/5 text-[#8B93A7]">{d}</span>
                  ))}
                </div>
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] font-extrabold text-white" style={{ background: AV_COLORS[f.author.length % AV_COLORS.length] }}>
                      {f.author.charAt(0)}
                    </div>
                    <span className="text-[11px] text-[#525869]">{f.author}</span>
                  </div>
                  {isInstalled ? (
                    <button onClick={() => onUninstall(f.id)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                      Installed
                    </button>
                  ) : (
                    <button onClick={() => onInstall(f.id)} className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[11px] font-bold shadow hover:shadow-lg hover:-translate-y-px transition-all">
                      Install
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
