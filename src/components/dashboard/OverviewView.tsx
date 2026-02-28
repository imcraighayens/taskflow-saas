import React from 'react';
import { Task } from '../../types';
import { TAG_GRADS } from '../../constants';

interface OverviewViewProps {
  tasks: Task[];
}

export default function OverviewView({ tasks }: OverviewViewProps) {
  const total = tasks.length || 1;
  const byStatus: Record<string, number> = { todo: 0, 'in-progress': 0, done: 0 };
  tasks.forEach(t => { if (byStatus[t.status] !== undefined) byStatus[t.status]++; });

  const byPriority: Record<string, number> = { high: 0, mid: 0, low: 0 };
  tasks.forEach(t => { if (byPriority[t.priority] !== undefined) byPriority[t.priority]++; });

  const tags = ['design', 'dev', 'data', 'mgmt', 'qa', 'docs'] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Status Dist */}
      <div className="bg-[#181C27] border border-white/5 rounded-[14px] p-5">
        <div className="text-[13.5px] font-bold text-[#F0F2F8] mb-4">Task Distribution</div>
        {[
          { l: 'To Do', k: 'todo', c: '#F97316' },
          { l: 'In Progress', k: 'in-progress', c: '#4A6CF7' },
          { l: 'Done', k: 'done', c: '#10B981' }
        ].map(item => {
          const n = byStatus[item.k as keyof typeof byStatus];
          const pct = Math.round((n / total) * 100);
          return (
            <div key={item.k} className="mb-3.5 last:mb-0">
              <div className="flex justify-between text-[11.5px] mb-1">
                <span className="text-[#8B93A7] font-medium">{item.l}</span>
                <span className="text-[#525869] font-mono">{n} ({pct}%)</span>
              </div>
              <div className="h-2.5 bg-[#222636] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: item.c }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Dist */}
      <div className="bg-[#181C27] border border-white/5 rounded-[14px] p-5">
        <div className="text-[13.5px] font-bold text-[#F0F2F8] mb-4">Priority Breakdown</div>
        {[
          { l: 'High', k: 'high', c: '#EF4444' },
          { l: 'Medium', k: 'mid', c: '#F59E0B' },
          { l: 'Low', k: 'low', c: '#10B981' }
        ].map(item => {
          const n = byPriority[item.k as keyof typeof byPriority];
          const pct = Math.round((n / total) * 100);
          return (
            <div key={item.k} className="mb-3.5 last:mb-0">
              <div className="flex justify-between text-[11.5px] mb-1">
                <span className="text-[#8B93A7] font-medium">{item.l}</span>
                <span className="text-[#525869] font-mono">{n} ({pct}%)</span>
              </div>
              <div className="h-2.5 bg-[#222636] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: item.c }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="col-span-1 md:col-span-2 bg-[#181C27] border border-white/5 rounded-[14px] p-5">
        <div className="text-[13.5px] font-bold text-[#F0F2F8] mb-4">Category Completion</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tags.map(tag => {
            const all = tasks.filter(t => t.tag === tag);
            const done = all.filter(t => t.done).length;
            const pct = all.length ? Math.round((done / all.length) * 100) : 0;
            return (
              <div key={tag} className="bg-[#1B1F2A] border border-white/5 rounded-xl p-3.5">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/5 text-[#8B93A7]">{tag}</span>
                  <span className="font-mono text-[11px] text-[#525869]">{done}/{all.length}</span>
                </div>
                <div className="h-1.5 bg-[#222636] rounded-full overflow-hidden mb-1.5">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: TAG_GRADS[tag] }}></div>
                </div>
                <div className="text-[11px] text-[#525869] text-right">{pct}% complete</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
