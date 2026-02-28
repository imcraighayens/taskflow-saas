import React from 'react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { l: 'New task', k: ['Ctrl', 'N'] },
    { l: 'Focus search', k: ['Ctrl', 'F'] },
    { l: 'Close modal', k: ['Esc'] },
    { l: 'Shortcuts', k: ['?'] },
    { l: 'Board view', k: ['1'] },
    { l: 'List view', k: ['2'] },
    { l: 'Overview', k: ['3'] },
    { l: 'Toggle dark/light', k: ['D'] },
    { l: 'Export tasks', k: ['Ctrl', 'E'] },
    { l: 'Settings', k: ['S'] },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#141720] border border-white/15 rounded-[18px] p-6 w-[460px] max-w-full shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[17px] font-extrabold tracking-tight text-white">⌨ Keyboard Shortcuts</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {shortcuts.map(s => (
            <div key={s.l} className="flex items-center justify-between p-2.5 bg-[#1B1F2A] rounded-lg">
              <span className="text-[12.5px] text-[#8B93A7]">{s.l}</span>
              <div className="flex gap-1">
                {s.k.map(k => (
                  <span key={k} className="bg-[#222636] border border-white/10 rounded px-1.5 py-0.5 font-mono text-[11px] text-white">{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
