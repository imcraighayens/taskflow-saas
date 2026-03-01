import React from 'react';
import { Task } from '../../types';
import { TAG_GRADS } from '../../constants';

interface ListViewProps {
  tasks: Task[];
  compactMode: boolean;
  onEditTask: (id: number) => void;
  onViewTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onToggleDone: (id: number) => void;
  onToggleFav: (id: number) => void;
}

export default function ListView({ tasks, compactMode, onEditTask, onViewTask, onDeleteTask, onToggleDone, onToggleFav }: ListViewProps) {
  if (tasks.length === 0) {
    return <div className="text-center py-20 text-[#525869]">No tasks found.</div>;
  }

  return (
    <div className="bg-[#181C27] border border-white/5 rounded-2xl overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Task</th>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Assignee</th>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Status</th>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Priority</th>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Category</th>
            <th className={`font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] text-right ${compactMode ? 'p-2.5 text-[10px]' : 'p-3.5 text-[11px]'}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id} className="hover:bg-[#4A6CF7]/5 cursor-pointer group" onClick={() => onViewTask(t.id)}>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5`}>
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-[18px] h-[18px] rounded-md border-[1.5px] border-white/15 flex items-center justify-center cursor-pointer transition-all hover:border-[#4A6CF7] shrink-0 ${t.done ? 'bg-emerald-500 border-emerald-500' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggleDone(t.id); }}
                  >
                    {t.done && <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none stroke-[3]"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div>
                    <div className={`text-[13px] font-semibold ${t.done ? 'line-through text-[#525869]' : 'text-[#F0F2F8]'}`}>
                      {t.title} {t.fav && <span className="text-amber-400 text-[10px]">★</span>}
                    </div>
                  </div>
                </div>
              </td>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5`}>
                {t.assignee ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-[9px] font-extrabold text-white">
                      {t.assignee.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-xs font-medium text-[#8B93A7]">{t.assignee}</span>
                  </div>
                ) : <span className="text-xs text-[#525869] italic">Unassigned</span>}
              </td>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5`}>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  t.status === 'todo' ? 'bg-orange-500/15 text-orange-300' :
                  t.status === 'in-progress' ? 'bg-[#4A6CF7]/15 text-[#818CF8]' :
                  'bg-emerald-500/15 text-emerald-300'
                }`}>
                  {t.status === 'todo' ? 'To Do' : t.status === 'in-progress' ? 'In Progress' : 'Done'}
                </span>
              </td>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5`}>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  t.priority === 'high' ? 'bg-red-500/15 text-red-300' :
                  t.priority === 'mid' ? 'bg-amber-500/15 text-amber-300' :
                  'bg-emerald-500/15 text-emerald-300'
                }`}>
                  {t.priority === 'mid' ? 'Medium' : t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                </span>
              </td>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5`}>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 text-[#8B93A7] uppercase tracking-wide">
                  {t.tag}
                </span>
              </td>
              <td className={`${compactMode ? 'p-2.5' : 'p-3.5'} border-b border-white/5 text-right`}>
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-white/10 rounded text-[#8B93A7] hover:text-white" onClick={(e) => { e.stopPropagation(); onEditTask(t.id); }}>✏</button>
                  <button className="p-1.5 hover:bg-red-500/10 rounded text-[#8B93A7] hover:text-red-400" onClick={(e) => { e.stopPropagation(); onDeleteTask(t.id); }}>✕</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
