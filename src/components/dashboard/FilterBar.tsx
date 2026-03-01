import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (type: 'date' | 'priority') => void;
  onToggleAdv: () => void;
}

export default function FilterBar({ activeFilter, onFilterChange, onSortChange, onToggleAdv }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <div className="flex bg-[#1B1F2A] border border-white/5 rounded-[10px] p-0.5">
        {[
          { id: 'all', l: 'All' },
          { id: 'high', l: 'High Priority' },
          { id: 'todo', l: 'To Do' },
          { id: 'done', l: 'Done' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => onFilterChange(t.id)}
            className={`px-3 py-1.5 rounded-[7px] text-[12.5px] font-semibold transition-all ${
              activeFilter === t.id 
                ? 'bg-[#4A6CF7] text-white shadow-md' 
                : 'text-[#525869] hover:text-[#8B93A7] hover:bg-[#222636]'
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      <button onClick={() => onSortChange('date')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B93A7] bg-[#1B1F2A] border border-white/5 hover:text-white hover:border-white/15 transition-all">
        📅 Date
      </button>
      <button onClick={() => onSortChange('priority')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B93A7] bg-[#1B1F2A] border border-white/5 hover:text-white hover:border-white/15 transition-all">
        ⬆ Priority
      </button>
      <button onClick={onToggleAdv} className="w-[34px] h-[34px] rounded-lg bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-[#525869] hover:text-white hover:border-white/15 transition-all ml-auto">
        ≡
      </button>
    </div>
  );
}
