import React from 'react';
import { Task } from '../../types';

interface StatsGridProps {
  tasks: Task[];
  onFilter: (status: string) => void;
}

export default function StatsGrid({ tasks, onFilter }: StatsGridProps) {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const prog = tasks.filter(t => t.status === 'in-progress').length;
  const overdue = tasks.filter(t => t.due && !t.done && new Date(t.due) < new Date(new Date().toDateString())).length;

  const stats = [
    { l: 'Total Tasks', v: total, i: '📋', c: 'blue', f: 'all', g: 'bg-[#4A6CF7]/15' },
    { l: 'Completed', v: done, i: '✅', c: 'green', f: 'done', g: 'bg-[#10B981]/15' },
    { l: 'In Progress', v: prog, i: '⚡', c: 'purple', f: 'in-progress', g: 'bg-[#8B5CF6]/15' },
    { l: 'Overdue', v: overdue, i: '⚠️', c: 'red', f: 'overdue', g: 'bg-[#EF4444]/15' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {stats.map(s => (
        <div 
          key={s.l}
          onClick={() => onFilter(s.f)}
          className={`bg-[#181C27] border border-white/5 rounded-[14px] p-4 cursor-pointer transition-all hover:bg-[#1E2333] hover:border-white/10 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden group`}
        >
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
            s.c === 'blue' ? 'from-[#4A6CF7] to-[#8B5CF6]' :
            s.c === 'green' ? 'from-[#10B981] to-[#06B6D4]' :
            s.c === 'purple' ? 'from-[#8B5CF6] to-[#A78BFA]' :
            'from-[#EF4444] to-[#F97316]'
          }`}></div>
          <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center text-[17px] mb-3 ${s.g}`}>
            {s.i}
          </div>
          <div className="text-[27px] font-extrabold text-white font-mono leading-none mb-0.5">{s.v}</div>
          <div className="text-xs font-medium text-[#8B93A7]">{s.l}</div>
        </div>
      ))}
    </div>
  );
}
