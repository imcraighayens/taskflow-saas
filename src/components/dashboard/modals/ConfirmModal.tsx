import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#141720] border border-white/15 rounded-[18px] p-6 w-[380px] max-w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[17px] font-extrabold tracking-tight text-white">{title}</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
        </div>
        <div className="text-[13.5px] text-[#8B93A7] leading-relaxed mb-6">
          {message}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
          <button onClick={onClose} className="px-4 py-2 rounded-[9px] text-[13px] font-semibold text-[#8B93A7] bg-[#1B1F2A] border border-white/5 hover:bg-[#222636] hover:text-white transition-all">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-[9px] text-[13px] font-bold text-white bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
