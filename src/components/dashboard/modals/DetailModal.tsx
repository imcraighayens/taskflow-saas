import React, { useState } from 'react';
import { Task } from '../../../types';
import { STATUS_GRADS } from '../../../constants';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: () => void;
}

export default function DetailModal({ isOpen, onClose, task, onEdit }: DetailModalProps) {
  if (!isOpen || !task) return null;

  const stops = (STATUS_GRADS[task.status] || STATUS_GRADS['todo']).match(/#[0-9A-Fa-f]{6}/g) || ['#4A6CF7', '#8B5CF6'];
  
  // Calendar Logic
  const today = new Date();
  const [calDate, setCalDate] = useState(new Date());
  
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const dueDate = task.due ? new Date(task.due) : null;
  const isBacklog = !task.done && dueDate;
  
  const daysLeft = dueDate 
    ? Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#141720] border border-white/15 rounded-[24px] p-0 w-[800px] max-w-full shadow-2xl transform transition-all scale-100 flex overflow-hidden h-[500px]">
        
        {/* Left: Task Details */}
        <div className="flex-1 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="text-[11px] font-bold text-[#525869] uppercase tracking-widest">Task Detail</div>
            <div className="flex gap-2">
              <button onClick={onEdit} className="w-8 h-8 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636] transition-all" title="Edit">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:bg-red-500/15 hover:text-red-500 hover:border-red-500/30 transition-all">✕</button>
            </div>
          </div>

          <div className="h-[120px] rounded-xl overflow-hidden mb-6 relative shrink-0">
            <svg viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`dpg${task.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={stops[0]} />
                  <stop offset="100%" stopColor={stops[1]} />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dpg${task.id})`} />
            </svg>
            <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-md rounded-md px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
              {task.tag}
            </div>
            {task.fav && (
              <div className="absolute top-3 right-4 bg-amber-500/50 backdrop-blur-md rounded-md px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                ★ STARRED
              </div>
            )}
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-4 leading-tight">{task.title}</h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1B1F2A] rounded-[12px] p-3.5 border border-white/5">
              <div className="text-[10px] font-bold text-[#525869] uppercase tracking-wider mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                <div className="text-[13px] font-semibold text-white capitalize">{task.status.replace('-', ' ')}</div>
              </div>
            </div>
            <div className="bg-[#1B1F2A] rounded-[12px] p-3.5 border border-white/5">
              <div className="text-[10px] font-bold text-[#525869] uppercase tracking-wider mb-1">Priority</div>
              <div className="text-[13px] font-semibold text-white capitalize">{task.priority}</div>
            </div>
            <div className="bg-[#1B1F2A] rounded-[12px] p-3.5 border border-white/5">
              <div className="text-[10px] font-bold text-[#525869] uppercase tracking-wider mb-1">Due Date</div>
              <div className="text-[13px] font-semibold text-white">{task.due || 'No date'}</div>
            </div>
            <div className="bg-[#1B1F2A] rounded-[12px] p-3.5 border border-white/5">
              <div className="text-[10px] font-bold text-[#525869] uppercase tracking-wider mb-1">Assignee</div>
              <div className="text-[13px] font-semibold text-white">{task.assignee || 'Unassigned'}</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-2">Description</div>
            <div className="text-[14px] text-[#8B93A7] leading-relaxed whitespace-pre-wrap">
              {task.desc || <span className="italic text-[#525869]">No description provided.</span>}
            </div>
          </div>
        </div>

        {/* Right: Calendar */}
        <div className="w-[300px] bg-[#111318] border-l border-white/10 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[14px] font-bold text-white">
              {calDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <div className="flex gap-1">
              <button onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))} className="w-7 h-7 rounded-lg bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">‹</button>
              <button onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))} className="w-7 h-7 rounded-lg bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="text-center text-[11px] font-bold text-[#525869] pb-1">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 flex-1 content-start">
            {blanks.map(i => <div key={`b-${i}`} className="aspect-square"></div>)}
            {days.map(d => {
              const current = new Date(calDate.getFullYear(), calDate.getMonth(), d);
              const isToday = current.toDateString() === today.toDateString();
              const isDue = dueDate && current.toDateString() === dueDate.toDateString();
              
              // Range logic
              let inRange = false;
              if (dueDate && !task.done) {
                // If due date is in future: range is today -> due date
                // If due date is past: range is due date -> today (overdue)
                const start = dueDate < today ? dueDate : today;
                const end = dueDate < today ? today : dueDate;
                // Normalize to midnight for comparison
                const s = new Date(start.toDateString());
                const e = new Date(end.toDateString());
                const c = new Date(current.toDateString());
                inRange = c >= s && c <= e;
              }

              let bgClass = 'text-[#8B93A7] hover:bg-[#1B1F2A] hover:text-white';
              if (isToday) bgClass = 'bg-[#1B1F2A] text-white font-bold border border-white/20';
              if (inRange) bgClass = 'bg-[#4A6CF7]/10 text-[#8B9EFB]';
              if (isDue) bgClass = 'bg-[#4A6CF7] text-white font-bold shadow-lg shadow-[#4A6CF7]/40';
              if (isDue && task.done) bgClass = 'bg-emerald-500 text-white font-bold';
              if (isDue && !task.done && current < today) bgClass = 'bg-red-500 text-white font-bold';

              return (
                <div key={d} className={`aspect-square flex items-center justify-center rounded-lg text-[12px] cursor-default transition-all relative ${bgClass}`}>
                  {d}
                </div>
              );
            })}
          </div>

          {dueDate && !task.done && (
            <div className={`mt-auto p-4 rounded-xl border ${daysLeft < 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-[#4A6CF7]/10 border-[#4A6CF7]/20'}`}>
              <div className="flex items-center gap-3">
                <div className={`text-2xl font-extrabold ${daysLeft < 0 ? 'text-red-500' : 'text-[#4A6CF7]'}`}>
                  {Math.abs(daysLeft)}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[13px] font-bold ${daysLeft < 0 ? 'text-red-400' : 'text-[#8B9EFB]'}`}>
                    {daysLeft < 0 ? 'Days Overdue' : 'Days Left'}
                  </span>
                  <span className="text-[11px] text-[#525869]">
                    {daysLeft < 0 ? 'Task is behind schedule' : 'Time to complete backlog'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {task.done && (
             <div className="mt-auto p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-emerald-400">Complete</span>
                  <span className="text-[11px] text-[#525869]">Great job finishing this task!</span>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
