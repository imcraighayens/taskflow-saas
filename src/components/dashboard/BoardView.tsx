import React from 'react';
import { Task } from '../../types';
import { STATUS_GRADS } from '../../constants';
import TaskPreview from './TaskPreview';

interface BoardViewProps {
  tasks: Task[];
  compactMode: boolean;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onEditTask: (id: number) => void;
  onViewTask: (id: number) => void;
  onToggleDone: (id: number) => void;
  onToggleFav: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export default function BoardView({ tasks, compactMode, onDragStart, onDrop, onEditTask, onViewTask, onToggleDone, onToggleFav, onDeleteTask }: BoardViewProps) {
  const cols = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    done: tasks.filter(t => t.status === 'done'),
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start h-full">
      {(Object.keys(cols) as Array<keyof typeof cols>).map(status => (
        <div key={status} className="flex flex-col h-full min-h-[200px]">
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-[13px] font-bold mb-0.5 sticky top-0 z-10 ${
            status === 'todo' ? 'bg-orange-500/10 text-orange-400' : 
            status === 'in-progress' ? 'bg-[#4A6CF7]/10 text-[#818CF8]' : 
            'bg-emerald-500/10 text-emerald-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              status === 'todo' ? 'bg-orange-500' : 
              status === 'in-progress' ? 'bg-[#4A6CF7]' : 
              'bg-emerald-500'
            }`}></div>
            {status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done'}
            <span className="ml-auto text-[11px] font-bold px-2 py-px rounded-full bg-white/10 text-[#8B93A7]">{cols[status].length}</span>
          </div>

          <div 
            className="flex-1 min-h-[100px] rounded-xl transition-all p-1"
            onDragOver={handleDragOver}
            onDrop={(e) => onDrop(e, status)}
          >
            {cols[status].map(t => (
              <div 
                key={t.id}
                draggable
                onDragStart={(e) => onDragStart(e, t.id)}
                className={`bg-[#181C27] border border-white/5 rounded-2xl overflow-hidden cursor-pointer relative mb-2.5 group hover:border-white/15 hover:-translate-y-0.5 hover:shadow-lg transition-all ${t.done ? 'opacity-50' : ''}`}
                onClick={() => onViewTask(t.id)}
              >
                {!compactMode && (
                  <>
                    <div className="h-[3px] w-full" style={{ background: STATUS_GRADS[t.status] || STATUS_GRADS['todo'] }}></div>
                    <TaskPreview tag={t.tag} status={t.status} id={t.id} />
                  </>
                )}
                <div className={compactMode ? "p-3" : "p-3.5"}>
                  <div className="flex items-start gap-2.5">
                    <div 
                      className={`w-[18px] h-[18px] rounded-md border-[1.5px] border-white/15 flex items-center justify-center cursor-pointer transition-all hover:border-[#4A6CF7] ${t.done ? 'bg-emerald-500 border-emerald-500' : ''}`}
                      onClick={(e) => { e.stopPropagation(); onToggleDone(t.id); }}
                    >
                      {t.done && <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none stroke-[3]"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <div className={`text-[13.5px] font-bold text-[#F0F2F8] leading-snug flex-1 ${t.done ? 'line-through text-[#525869]' : ''}`}>
                      {t.title}
                    </div>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/5 text-[#525869] hover:text-white" onClick={(e) => { e.stopPropagation(); onEditTask(t.id); }} title="Edit">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/10 hover:text-red-500 text-[#525869]" onClick={(e) => { e.stopPropagation(); onDeleteTask(t.id); }} title="Delete">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      t.priority === 'high' ? 'bg-red-500/15 text-red-300' : 
                      t.priority === 'mid' ? 'bg-amber-500/15 text-amber-300' : 
                      'bg-emerald-500/15 text-emerald-300'
                    }`}>{t.priority}</span>
                    
                    {t.fav && <span className="text-amber-400 text-[10px]">★</span>}
                    
                    {t.assignee && (
                      <div className="ml-auto flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-[9px] font-extrabold text-white border border-[#181C27]">
                          {t.assignee.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <span className="text-[10px] font-medium text-[#8B93A7] truncate max-w-[80px]">{t.assignee}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {cols[status].length === 0 && (
              <div className="text-center py-10 text-[#525869] text-xs">No tasks</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
