import React from 'react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterPanel({ isOpen, onClose, onApply }: FilterPanelProps) {
  // Simplified for brevity - in a real app, this would manage local state
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed right-0 top-0 bottom-0 w-[340px] bg-[#141720] border-l border-white/10 shadow-[-18px_0_56px_rgba(0,0,0,0.5)] z-[1501] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="text-[15px] font-bold text-white">≡ Advanced Filters</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="mb-5">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Priority</div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4A6CF7]/15 border border-[#4A6CF7]/40 text-[#8B9EFB]">All</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1B1F2A] border border-white/5 text-[#8B93A7] hover:text-white">High</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1B1F2A] border border-white/5 text-[#8B93A7] hover:text-white">Medium</button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1B1F2A] border border-white/5 text-[#8B93A7] hover:text-white">Low</button>
            </div>
          </div>
          
          <div className="mb-5">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Category</div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4A6CF7]/15 border border-[#4A6CF7]/40 text-[#8B9EFB]">All</button>
              {['Design','Dev','Data','Mgmt','QA','Docs'].map(c => (
                <button key={c} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1B1F2A] border border-white/5 text-[#8B93A7] hover:text-white">{c}</button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Due Date Range</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#525869] w-9">From</span>
                <input type="date" className="flex-1 p-2 bg-[#1B1F2A] border border-white/10 rounded-lg text-xs text-white outline-none focus:border-[#4A6CF7]/50" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#525869] w-9">To</span>
                <input type="date" className="flex-1 p-2 bg-[#1B1F2A] border border-white/10 rounded-lg text-xs text-white outline-none focus:border-[#4A6CF7]/50" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 rounded-lg bg-[#1B1F2A] border border-white/5 text-xs font-semibold text-[#8B93A7] hover:text-white">Clear Filters</button>
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-xs font-bold shadow-md">Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}
