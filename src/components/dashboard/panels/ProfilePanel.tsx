import React, { useState } from 'react';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: { total: number; done: number; overdue: number; fav: number };
}

export default function ProfilePanel({ isOpen, onClose, stats }: ProfilePanelProps) {
  const [name, setName] = useState('Craig K.');
  const [handle, setHandle] = useState('@craigk');
  const [role, setRole] = useState('Admin');

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed right-0 top-0 bottom-0 w-[340px] bg-[#141720] border-l border-white/10 shadow-[-18px_0_56px_rgba(0,0,0,0.5)] z-[1501] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="text-[15px] font-bold text-white">👤 Profile</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-xl font-extrabold text-white border-[3px] border-[#4A6CF7]/35 shadow-[0_0_0_5px_rgba(74,108,247,0.1)]">
              {name.split(' ').map(n=>n[0]).join('').slice(0,2)}
            </div>
            <div>
              <div className="text-base font-extrabold text-white">{name}</div>
              <div className="text-xs text-[#525869]">{role} · Kodesk</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-1.5">Display Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50" />
          </div>
          <div className="mb-4">
            <label className="block text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-1.5">Handle</label>
            <input value={handle} onChange={e => setHandle(e.target.value)} className="w-full p-2.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50" />
          </div>
          <div className="mb-6">
            <label className="block text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-1.5">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50">
              <option>Admin</option><option>Developer</option><option>Designer</option><option>Manager</option>
            </select>
          </div>

          <div className="mb-6">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Stats</div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#1B1F2A] border border-white/5 rounded-[11px] p-3 text-center">
                <div className="text-2xl font-extrabold font-mono grad-text">{stats.total}</div>
                <div className="text-[11px] text-[#525869] mt-0.5">Total Tasks</div>
              </div>
              <div className="bg-[#1B1F2A] border border-white/5 rounded-[11px] p-3 text-center">
                <div className="text-2xl font-extrabold font-mono text-emerald-500">{stats.done}</div>
                <div className="text-[11px] text-[#525869] mt-0.5">Completed</div>
              </div>
              <div className="bg-[#1B1F2A] border border-white/5 rounded-[11px] p-3 text-center">
                <div className="text-2xl font-extrabold font-mono text-red-500">{stats.overdue}</div>
                <div className="text-[11px] text-[#525869] mt-0.5">Overdue</div>
              </div>
              <div className="bg-[#1B1F2A] border border-white/5 rounded-[11px] p-3 text-center">
                <div className="text-2xl font-extrabold font-mono text-amber-500">{stats.fav}</div>
                <div className="text-[11px] text-[#525869] mt-0.5">Favourites</div>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="w-full py-2.5 rounded-[10px] bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-lg hover:-translate-y-0.5 transition-all">
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
}
