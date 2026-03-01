import React from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  compactMode: boolean;
  visibleWidgets: { stats: boolean; calendar: boolean; progress: boolean; activity: boolean; };
  onSaveSettings: (settings: { isDark: boolean; compactMode: boolean; visibleWidgets: { stats: boolean; calendar: boolean; progress: boolean; activity: boolean; } }) => void;
  onExport: () => void;
  onImport: () => void;
  onClear: () => void;
  onOpenProfile: () => void;
}

export default function SettingsPanel({ 
  isOpen, onClose, isDark, 
  compactMode, visibleWidgets, onSaveSettings,
  onExport, onImport, onClear, onOpenProfile 
}: SettingsPanelProps) {
  const [localIsDark, setLocalIsDark] = React.useState(isDark);
  const [localCompactMode, setLocalCompactMode] = React.useState(compactMode);
  const [localVisibleWidgets, setLocalVisibleWidgets] = React.useState(visibleWidgets);

  React.useEffect(() => {
    if (isOpen) {
      setLocalIsDark(isDark);
      setLocalCompactMode(compactMode);
      setLocalVisibleWidgets(visibleWidgets);
    }
  }, [isOpen, isDark, compactMode, visibleWidgets]);

  const handleSave = () => {
    onSaveSettings({
      isDark: localIsDark,
      compactMode: localCompactMode,
      visibleWidgets: localVisibleWidgets
    });
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed right-0 top-0 bottom-0 w-[340px] bg-[#141720] border-l border-white/10 shadow-[-18px_0_56px_rgba(0,0,0,0.5)] z-[1501] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="text-[15px] font-bold text-white">⚙ Settings</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#222636]">✕</button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          
          {/* Profile Section */}
          <div className="mb-6 bg-[#1B1F2A] border border-white/5 rounded-[14px] p-4 flex items-center gap-3 cursor-pointer hover:bg-[#222636] transition-all" onClick={onOpenProfile}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-[13px] font-extrabold text-white border-2 border-[#4A6CF7]/40">CK</div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-[2px] border-[#1B1F2A]"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
              <div className="text-[14px] font-bold text-white truncate">Craig K.</div>
              <div className="text-[11px] text-white/40">Admin • View Profile</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Display</div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Dark mode</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localIsDark} onChange={() => setLocalIsDark(!localIsDark)} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Compact card view</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localCompactMode} onChange={() => setLocalCompactMode(!localCompactMode)} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Widgets</div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Stats Grid</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localVisibleWidgets.stats} onChange={() => setLocalVisibleWidgets(prev => ({ ...prev, stats: !prev.stats }))} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Calendar</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localVisibleWidgets.calendar} onChange={() => setLocalVisibleWidgets(prev => ({ ...prev, calendar: !prev.calendar }))} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Sprint Progress</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localVisibleWidgets.progress} onChange={() => setLocalVisibleWidgets(prev => ({ ...prev, progress: !prev.progress }))} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
            <div className={`flex items-center justify-between border-b border-white/5 ${localCompactMode ? 'py-2' : 'py-2.5'}`}>
              <span className="text-[13.5px] text-[#8B93A7]">Recent Activity</span>
              <label className="relative w-10 h-[22px] cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={localVisibleWidgets.activity} onChange={() => setLocalVisibleWidgets(prev => ({ ...prev, activity: !prev.activity }))} />
                <div className="absolute inset-0 bg-[#222636] rounded-full peer-checked:bg-[#4A6CF7] transition-all"></div>
                <div className="absolute left-[3px] bottom-[3px] w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-[18px]"></div>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[10.5px] font-bold text-[#525869] uppercase tracking-widest mb-2">Data</div>
            <div className="flex flex-col gap-2">
              <button onClick={onExport} className="flex items-center gap-2 px-4 py-2.5 rounded-[9px] bg-[#1B1F2A] border border-white/5 text-[13px] font-semibold text-[#8B93A7] hover:text-white hover:bg-[#222636] transition-all text-left">
                📤 Export JSON
              </button>
              <button onClick={onImport} className="flex items-center gap-2 px-4 py-2.5 rounded-[9px] bg-[#1B1F2A] border border-white/5 text-[13px] font-semibold text-[#8B93A7] hover:text-white hover:bg-[#222636] transition-all text-left">
                📥 Import JSON
              </button>
              <button onClick={onClear} className="flex items-center gap-2 px-4 py-2.5 rounded-[9px] bg-red-500/10 border border-red-500/20 text-[13px] font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-all text-left mt-2">
                🗑 Clear All Tasks
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-white/5 bg-[#141720]">
          <button onClick={handleSave} className="w-full py-3 rounded-[10px] bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.35)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(74,108,247,0.45)] transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
