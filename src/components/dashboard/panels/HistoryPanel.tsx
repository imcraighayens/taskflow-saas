import React from 'react';
import { Activity } from '../../../types';
import { ACT_COLORS } from '../../../constants';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity[];
  onClear: () => void;
}

export default function HistoryPanel({ isOpen, onClose, activity, onClear }: HistoryPanelProps) {
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed right-0 top-0 bottom-0 w-[340px] bg-[#141720] border-l border-white/10 shadow-[-18px_0_56px_rgba(0,0,0,0.5)] z-[1501] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="text-[15px] font-bold text-white">🔔 Activity History</div>
          <div className="flex items-center gap-2">
            <button onClick={onClear} className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#8B93A7] hover:bg-white/5 hover:text-white transition-all">Clear</button>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
          </div>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          {activity.length === 0 ? (
            <div className="text-center text-[#525869] text-[13px] py-10">No activity yet.</div>
          ) : (
            <div className="flex flex-col">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-white/5 last:border-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: ACT_COLORS[a.type] }}>
                    {a.type.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[13px] text-[#8B93A7] leading-snug" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                    <div className="text-[11px] text-[#525869] font-mono mt-1">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
