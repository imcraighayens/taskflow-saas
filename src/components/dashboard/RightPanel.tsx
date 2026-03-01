import React, { useState } from 'react';
import { Task, Activity } from '../../types';
import { TAG_GRADS, ACT_COLORS } from '../../constants';

interface RightPanelProps {
  tasks: Task[];
  activity: Activity[];
  visibleWidgets: { stats: boolean; calendar: boolean; progress: boolean; activity: boolean; };
}

export default function RightPanel({ tasks, activity, visibleWidgets }: RightPanelProps) {
  const [calDate, setCalDate] = useState(new Date());

  // Calendar Logic
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const dueDates = new Set(tasks.filter(t => t.due).map(t => new Date(t.due).getDate()));

  // Progress Logic
  const total = tasks.length || 1;
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / total) * 100);
  const circ = 175.9;
  const offset = circ - (circ * pct) / 100;

  const getCatPct = (tag: string) => {
    const catTasks = tasks.filter(t => t.tag === tag || (tag === 'qa' && t.tag === 'docs'));
    if (!catTasks.length) return 0;
    return Math.round((catTasks.filter(t => t.done).length / catTasks.length) * 100);
  };

  return (
    <div className="flex flex-col gap-3 w-full lg:w-[292px] shrink-0">
      {/* Calendar */}
      {visibleWidgets.calendar && (
        <div className="bg-[#181C27] rounded-[14px] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-[#F0F2F8]">
              {calDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <div className="flex gap-1">
              <button onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))} className="w-6 h-6 rounded-md bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">‹</button>
              <button onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))} className="w-6 h-6 rounded-md bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-[#525869] pb-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {blanks.map(i => <div key={`b-${i}`} className="aspect-square"></div>)}
            {days.map(d => {
              const isToday = new Date().toDateString() === new Date(calDate.getFullYear(), calDate.getMonth(), d).toDateString();
              const hasTask = dueDates.has(d);
              return (
                <div key={d} className={`aspect-square flex items-center justify-center rounded-md text-[11.5px] cursor-pointer relative hover:bg-[#1B1F2A] hover:text-white transition-colors ${isToday ? 'bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white font-bold' : 'text-[#8B93A7]'}`}>
                  {d}
                  {hasTask && !isToday && <div className="absolute bottom-0.5 w-0.5 h-0.5 rounded-full bg-[#4A6CF7]"></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress */}
      {visibleWidgets.progress && (
        <div className="bg-[#181C27] border border-white/5 rounded-[14px] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-bold text-[#F0F2F8]">Sprint Progress</span>
            <span className="text-[11px] font-medium text-[#525869]">{done}/{total}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-[70px] h-[70px] shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="35" cy="35" r="28" stroke="#222636" strokeWidth="7" fill="none" />
                <circle cx="35" cy="35" r="28" stroke="url(#rg)" strokeWidth="7" fill="none" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A6CF7" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-white font-mono">{pct}%</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-[#8B93A7]">Total: <span className="font-bold text-white font-mono">{total}</span></div>
              <div className="text-xs text-[#8B93A7]">Done: <span className="font-bold text-white font-mono">{done}</span></div>
              <div className="text-xs text-[#8B93A7]">Left: <span className="font-bold text-white font-mono">{total - done}</span></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {['design', 'dev', 'qa'].map(cat => (
              <div key={cat}>
                <div className="flex justify-between text-[11.5px] mb-1">
                  <span className="text-[#8B93A7] font-medium capitalize">{cat === 'qa' ? 'QA/Docs' : cat}</span>
                  <span className="text-[#525869] font-mono">{getCatPct(cat)}%</span>
                </div>
                <div className="h-[5px] bg-[#222636] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${getCatPct(cat)}%`, 
                      background: cat === 'design' ? TAG_GRADS.design : cat === 'dev' ? TAG_GRADS.dev : TAG_GRADS.qa 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity */}
      {visibleWidgets.activity && (
        <div className="bg-[#181C27] border border-white/5 rounded-[14px] p-4 flex-1 min-h-[200px]">
          <div className="text-[13px] font-bold text-[#F0F2F8] mb-3">Recent Activity</div>
          <div className="flex flex-col">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-2.5 py-2 border-b border-white/5 last:border-0">
                <div className="w-[27px] h-[27px] rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: ACT_COLORS[a.type] }}>
                  {a.type.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs text-[#8B93A7] leading-snug" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                  <div className="text-[10px] text-[#525869] font-mono mt-px">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
