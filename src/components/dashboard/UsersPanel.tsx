import React from 'react';
import { Task } from '../../types';
import { AV_COLORS } from '../../constants';

interface UsersPanelProps {
  tasks: Task[];
}

export default function UsersPanel({ tasks }: UsersPanelProps) {
  const map: Record<string, Task[]> = {};
  tasks.forEach(t => {
    const name = (t.assignee || '').trim() || 'Unassigned';
    if (!map[name]) map[name] = [];
    map[name].push(t);
  });

  const names = Object.keys(map).sort((a, b) => a === 'Unassigned' ? 1 : b === 'Unassigned' ? -1 : a.localeCompare(b));
  const assignedCount = names.filter(n => n !== 'Unassigned').length;

  return (
    <div className="bg-[#181C27] border border-white/5 rounded-2xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-white/5">
        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-extrabold text-[#F0F2F8] tracking-tight">Team Overview</div>
          <div className="text-[11.5px] text-[#525869]">{tasks.length} tasks across {names.length} members</div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#4A6CF7]/10 text-[#6B87F8] whitespace-nowrap">
          {assignedCount} assignees
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-l border-t border-white/5">
        {names.map(name => {
          const userTasks = map[name];
          const done = userTasks.filter(t => t.done).length;
          const total = userTasks.length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          const col = name === 'Unassigned' ? 'rgba(255,255,255,0.12)' : AV_COLORS[name.length % AV_COLORS.length];
          const ini = name === 'Unassigned' ? '?' : name.split(' ').map(n=>n[0]).join('').slice(0,2);
          
          return (
            <div key={name} className="p-4 border-r border-b border-white/5 hover:bg-[#4A6CF7]/[0.035] transition-colors">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-extrabold text-white relative" style={{ background: col }}>
                  {ini}
                  <div className="absolute inset-[-2px] rounded-full border-2 border-transparent bg-clip-border" style={{ background: `linear-gradient(#181C27,#181C27) padding-box, linear-gradient(135deg,#4A6CF7,#8B5CF6) border-box` }}></div>
                  <span className="relative z-10">{ini}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-[#F0F2F8] truncate">{name}</div>
                  <div className="text-[11px] text-[#525869]">Team Member</div>
                </div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#8B93A7]">
                  {done}/{total}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] text-[#525869]">Completion</span>
                  <span className="text-xs font-mono font-bold text-[#F0F2F8]">{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#222636] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: col }}></div>
                </div>
              </div>

              <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Tasks</div>
              <div className="flex flex-col gap-1">
                {userTasks.slice(0, 3).map(t => (
                  <div key={t.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#1B1F2A] text-[11.5px] truncate">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.status === 'done' ? 'bg-emerald-500' : t.status === 'in-progress' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                    <span className={`truncate ${t.done ? 'line-through text-[#525869]' : 'text-[#8B93A7]'}`}>{t.title}</span>
                  </div>
                ))}
                {userTasks.length > 3 && <div className="text-[11px] text-[#525869] px-2 italic">+{userTasks.length - 3} more</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
