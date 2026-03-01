import React, { useState, useEffect } from 'react';

interface TopbarProps {
  onSearch: (query: string) => void;
  onImport: () => void;
  onExport: () => void;
  onToggleFav: () => void;
  showFav: boolean;
  onToggleHistory: () => void;
  hasOverdue: boolean;
}

export default function Topbar({ onSearch, onImport, onExport, onToggleFav, showFav, onToggleHistory, hasOverdue }: TopbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="flex-shrink-0 bg-[#111318] rounded-[20px] h-14 min-h-[56px] flex items-center justify-between px-3.5 gap-3 shadow-[0_6px_24px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.04)_inset] border border-white/5 relative z-40 ml-[68px] mr-2.5 mt-2.5">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="text-[13.5px] text-white/40 truncate">
          {greeting}, <strong className="text-white/85 font-bold">Craig</strong>
        </div>
        <div className="font-mono text-[11.5px] text-white/20 whitespace-nowrap">
          {time.toLocaleTimeString('en-ZA', {hour:'2-digit',minute:'2-digit',second:'2-digit'})}
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[11px] px-3 h-[34px] min-w-[180px] max-w-[260px] focus-within:border-[#6373FF]/40 focus-within:bg-[#6373FF]/5 transition-all">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white/25 fill-none stroke-[1.8]"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input 
          type="text" 
          placeholder="Search tasks… (Ctrl+F)" 
          className="bg-transparent border-none outline-none font-sans text-[12.5px] text-white/80 w-full placeholder:text-white/20"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-gradient-to-br from-orange-500 to-pink-500 text-white text-xs font-bold border-none cursor-pointer shadow-[0_3px_14px_rgba(249,115,22,0.3)] hover:-translate-y-px hover:shadow-[0_5px_20px_rgba(249,115,22,0.45)] transition-all">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none stroke-[2.5]"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="none"/></svg>
          Upgrade
        </button>
        <button onClick={onImport} className="w-[34px] h-[34px] rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-white/35 hover:bg-white/10 hover:text-white/80 transition-all" title="Import">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.6]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </button>
        <button onClick={onExport} className="w-[34px] h-[34px] rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-white/35 hover:bg-white/10 hover:text-white/80 transition-all" title="Export">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.6]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
        <button onClick={onToggleFav} className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center transition-all ${showFav ? 'bg-[#6373FF]/15 border-[#6373FF]/30 text-[#8B9EFB]' : 'bg-white/5 border-white/10 text-white/35 hover:bg-white/10 hover:text-white/80'}`} title="Favourites">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.6]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
        <button onClick={onToggleHistory} className="w-[34px] h-[34px] rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-white/35 hover:bg-white/10 hover:text-white/80 transition-all relative" title="Activity">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.6]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          {hasOverdue && <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-[#111318]"></div>}
        </button>
      </div>
    </header>
  );
}
