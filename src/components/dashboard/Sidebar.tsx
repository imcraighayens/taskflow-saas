import React from 'react';
import { User } from '../../types';

interface SidebarProps {
  activeView: string;
  activeProject: string | null;
  onNavigate: (view: string) => void;
  onFilterProject: (project: string | null) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSettings: () => void;
  counts: { [key: string]: number };
  isDark: boolean;
  onToggleTheme: () => void;
  currentUser?: User;
  onLogout?: () => void;
}

export default function Sidebar({ activeView, activeProject, onNavigate, onFilterProject, collapsed, onToggleCollapse, onOpenSettings, counts, isDark, onToggleTheme, currentUser, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'board', label: 'Board', icon: <rect x="3" y="3" width="8" height="8" rx="1.5" /> },
    { id: 'list', label: 'List', icon: <line x1="9" y1="6" x2="20" y2="6" /> },
    { id: 'overview', label: 'Overview', icon: <path d="M18 20V10" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /> },
    { id: 'database', label: 'Database', icon: <path d="M12 2.5c-4.4 0-8 1.8-8 4s3.6 4 8 4 8-1.8 8-4-3.6-4-8-4zM4 6.5v5c0 2.2 3.6 4 8 4s8-1.8 8-4v-5M4 11.5v5c0 2.2 3.6 4 8 4s8-1.8 8-4v-5" /> },
    ...(currentUser?.role === 'admin' ? [{ id: 'users', label: 'Team', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> }] : []),
  ];

  const projects = [
    { id: 'design', label: 'Design', icon: <path d="M12 20h9" /> },
    { id: 'dev', label: 'Dev Sprint', icon: <polyline points="16 18 22 12 16 6" /> },
    { id: 'data', label: 'Analytics', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
    { id: 'mgmt', label: 'Management', icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /> },
    { id: 'qa', label: 'QA', icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /> },
  ];

  return (
    <aside className={`fixed left-2.5 top-2.5 bottom-2.5 bg-[#111318] rounded-[24px] flex flex-col items-center py-4 z-50 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.7)] ${collapsed ? 'w-[58px]' : 'w-[216px]'}`}>
      {/* Header */}
      <div className={`flex flex-col items-center w-full mb-3 shrink-0 gap-2.5 ${!collapsed && 'flex-row px-3'}`}>
        {!collapsed ? (
          <>
            <span className="text-sm font-extrabold tracking-tight text-white whitespace-nowrap flex-1">Kodesk</span>
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10" onClick={onToggleCollapse}>
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white/50 fill-none stroke-2"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
          </>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-white font-extrabold text-lg cursor-pointer" onClick={onToggleCollapse}>
            K
          </div>
        )}
      </div>

      <div className={`h-px bg-white/5 my-2 shrink-0 transition-all ${collapsed ? 'w-[22px]' : 'w-[calc(100%-24px)]'}`}></div>

      {/* Nav */}
      <div className={`flex-1 w-full flex flex-col gap-px overflow-y-auto scrollbar-hide ${collapsed ? 'items-center px-[9px]' : 'px-2'}`}>
        {!collapsed && <div className="text-[9px] font-bold text-white/20 uppercase tracking-[2.2px] px-3.5 my-2">Views</div>}
        
        {navItems.map(item => (
          <div 
            key={item.id}
            onClick={() => { onNavigate(item.id); onFilterProject(null); }}
            className={`h-10 rounded-[14px] flex items-center cursor-pointer transition-all relative shrink-0 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'} ${activeView === item.id && !activeProject ? 'bg-[#6373FF]/15 text-[#8B9EFB]' : 'text-white/25 hover:bg-white/5 hover:text-white/70'}`}
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round">
                {item.id === 'board' && <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>}
                {item.id === 'list' && <><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></>}
                {item.id === 'overview' && <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>}
                {item.id === 'marketplace' && <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>}
                {item.id === 'database' && <><path d="M12 2.5c-4.4 0-8 1.8-8 4s3.6 4 8 4 8-1.8 8-4-3.6-4-8-4z"/><path d="M4 6.5v5c0 2.2 3.6 4 8 4s8-1.8 8-4v-5"/><path d="M4 11.5v5c0 2.2 3.6 4 8 4s8-1.8 8-4v-5"/></>}
                {item.id === 'users' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
              </svg>
            </div>
            {!collapsed && (
              <>
                <span className="text-[13px] font-semibold ml-2.5 truncate flex-1">{item.label}</span>
                {(item.id === 'board' || item.id === 'list') && counts.total > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-px rounded-full ${activeView === item.id ? 'bg-[#6373FF]/25 text-[#a5b4fc]' : 'bg-white/5 text-white/30'}`}>
                    {counts.total}
                  </span>
                )}
              </>
            )}
          </div>
        ))}

        <div className="h-3 shrink-0"></div>
        {!collapsed && <div className="h-px bg-white/5 w-[calc(100%-24px)] mx-3 mb-2 shrink-0"></div>}
        {!collapsed && <div className="text-[9px] font-bold text-white/20 uppercase tracking-[2.2px] px-3.5 my-2">Projects</div>}

        {projects.map(item => (
          <div 
            key={item.id}
            onClick={() => onFilterProject(activeProject === item.id ? null : item.id)}
            className={`h-10 rounded-[14px] flex items-center cursor-pointer transition-all relative shrink-0 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'} ${activeProject === item.id ? 'bg-[#6373FF]/15 text-[#8B9EFB]' : 'text-white/25 hover:bg-white/5 hover:text-white/70'}`}
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round">
                {item.icon}
              </svg>
            </div>
            {!collapsed && (
              <>
                <span className="text-[13px] font-semibold ml-2.5 truncate flex-1">{item.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-px rounded-full ${activeProject === item.id ? 'bg-[#6373FF]/25 text-[#a5b4fc]' : 'bg-white/5 text-white/30'}`}>
                  {counts[item.id] || 0}
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className={`w-full flex flex-col gap-px pt-2 border-t border-white/5 shrink-0 ${collapsed ? 'items-center px-[9px]' : 'px-2'}`}>
        <div onClick={onToggleTheme} className={`h-10 rounded-[14px] flex items-center cursor-pointer transition-all text-white/25 hover:bg-white/5 hover:text-white/70 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'}`}>
          <div className="w-5 h-5 shrink-0 flex items-center justify-center">
            {isDark ? (
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </div>
          {!collapsed && <span className="text-[13px] font-semibold ml-2.5 truncate">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </div>
        <div onClick={onOpenSettings} className={`h-10 rounded-[14px] flex items-center cursor-pointer transition-all text-white/25 hover:bg-white/5 hover:text-white/70 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'}`}>
          <div className="w-5 h-5 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          {!collapsed && <span className="text-[13px] font-semibold ml-2.5 truncate">Settings</span>}
        </div>
        {/* User info & Logout */}
        {currentUser && (
          <>
            <div className={`h-px bg-white/5 my-1.5 shrink-0 transition-all ${collapsed ? 'w-[22px]' : 'w-[calc(100%-12px)] mx-auto'}`}></div>
            <div className={`h-10 rounded-[14px] flex items-center transition-all shrink-0 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'}`}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">
                {currentUser.initials}
              </div>
              {!collapsed && (
                <div className="ml-2 flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-white/80 truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-white/30 truncate">{currentUser.email}</div>
                </div>
              )}
            </div>
            <div onClick={onLogout} className={`h-10 rounded-[14px] flex items-center cursor-pointer transition-all text-red-400/50 hover:bg-red-500/10 hover:text-red-400 ${collapsed ? 'w-10 justify-center' : 'w-full px-2.5'}`}>
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] stroke-current fill-none stroke-[1.55] stroke-linecap-round stroke-linejoin-round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
              {!collapsed && <span className="text-[13px] font-semibold ml-2.5 truncate">Sign Out</span>}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
