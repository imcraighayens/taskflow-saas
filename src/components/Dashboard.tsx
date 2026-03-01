import React, { useState, useEffect } from 'react';
import Sidebar from './dashboard/Sidebar';
import Topbar from './dashboard/Topbar';
import BoardView from './dashboard/BoardView';
import ListView from './dashboard/ListView';
import OverviewView from './dashboard/OverviewView';
import MarketplaceView from './dashboard/MarketplaceView';
import DatabaseView from './dashboard/DatabaseView';
import TaskModal from './dashboard/TaskModal';
import RightPanel from './dashboard/RightPanel';
import StatsGrid from './dashboard/StatsGrid';
import FilterBar from './dashboard/FilterBar';
import UsersPanel from './dashboard/UsersPanel';
import SettingsPanel from './dashboard/panels/SettingsPanel';
import ProfilePanel from './dashboard/panels/ProfilePanel';
import HistoryPanel from './dashboard/panels/HistoryPanel';
import FilterPanel from './dashboard/panels/FilterPanel';
import ShortcutsModal from './dashboard/modals/ShortcutsModal';
import DetailModal from './dashboard/modals/DetailModal';
import ConfirmModal from './dashboard/modals/ConfirmModal';
import { Task, Feature, Activity, User } from '../types';
import { DEFAULT_TASKS, MP_DEFAULT, DEFAULT_ACTIVITY, DEFAULT_USERS } from '../constants';

interface DashboardProps {
  currentUser: User;
  onLogout: () => void;
}

export default function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [view, setView] = useState('board');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [features, setFeatures] = useState<Feature[]>(MP_DEFAULT);
  const [activity, setActivity] = useState<Activity[]>(DEFAULT_ACTIVITY);
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [sortMode, setSortMode] = useState<'date' | 'priority' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Modals & Panels State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalInitialStatus, setModalInitialStatus] = useState('todo');
  
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  
  const [isDark, setIsDark] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState({
    stats: true,
    calendar: true,
    progress: true,
    activity: true
  });

  // Load from local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tf_tasks');
    if (savedTasks) try { setTasks(JSON.parse(savedTasks)); } catch (e) {}
    
    const savedFeatures = localStorage.getItem('tf_features');
    if (savedFeatures) try { setFeatures(JSON.parse(savedFeatures)); } catch (e) {}
    
    const savedActivity = localStorage.getItem('tf_activity');
    if (savedActivity) try { setActivity(JSON.parse(savedActivity)); } catch (e) {}

    const savedTheme = localStorage.getItem('tf_theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const savedCompact = localStorage.getItem('tf_compact');
    if (savedCompact) setCompactMode(savedCompact === 'true');

    const savedWidgets = localStorage.getItem('tf_widgets');
    if (savedWidgets) try { setVisibleWidgets(JSON.parse(savedWidgets)); } catch (e) {}
  }, []);

  // Save to local storage
  useEffect(() => { localStorage.setItem('tf_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('tf_features', JSON.stringify(features)); }, [features]);
  useEffect(() => { localStorage.setItem('tf_activity', JSON.stringify(activity)); }, [activity]);
  useEffect(() => { localStorage.setItem('tf_compact', String(compactMode)); }, [compactMode]);
  useEffect(() => { localStorage.setItem('tf_widgets', JSON.stringify(visibleWidgets)); }, [visibleWidgets]);

  // Activity Helper
  const addActivity = (text: string, type: Activity['type'] = 'blue') => {
    const newAct = { text, type, time: 'Just now' };
    setActivity(prev => [newAct, ...prev].slice(0, 40));
  };

  // Filtering Logic
  const getFilteredTasks = () => {
    let filtered = tasks.filter(t => {
      if (showFavOnly && !t.fav) return false;
      if (activeProject && t.tag !== activeProject) return false;
      if (activeFilter === 'high' && t.priority !== 'high') return false;
      if (activeFilter === 'todo' && t.status !== 'todo') return false;
      if (activeFilter === 'done' && !t.done) return false;
      if (activeFilter === 'in-progress' && t.status !== 'in-progress') return false;
      if (activeFilter === 'overdue' && (!t.due || t.done || new Date(t.due) >= new Date(new Date().toDateString()))) return false;
      
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(q) || 
               t.desc.toLowerCase().includes(q) || 
               t.tag.includes(q) ||
               (t.assignee || '').toLowerCase().includes(q);
      }
      return true;
    });

    if (sortMode) {
      filtered.sort((a, b) => {
        let res = 0;
        if (sortMode === 'date') {
          if (!a.due && !b.due) res = 0;
          else if (!a.due) res = 1;
          else if (!b.due) res = -1;
          else res = new Date(a.due).getTime() - new Date(b.due).getTime();
        } else if (sortMode === 'priority') {
          const pRank = { high: 0, mid: 1, low: 2 };
          res = pRank[a.priority] - pRank[b.priority];
        }
        return sortDir === 'asc' ? res : -res;
      });
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', String(id));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    if (id) {
      const t = tasks.find(x => x.id === id);
      if (t && t.status !== status) {
        setTasks(prev => prev.map(x => x.id === id ? { ...x, status: status as any, done: status === 'done' } : x));
        addActivity(`<strong>${t.title}</strong> moved to ${status.replace('-', ' ')}`, 'blue');
      }
    }
  };

  const handleSaveTask = (task: Partial<Task>) => {
    if (task.id) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...task } as Task : t));
      addActivity(`<strong>${task.title}</strong> updated`, 'blue');
    } else {
      const newTask: Task = {
        ...task,
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        done: task.status === 'done',
        fav: false
      } as Task;
      setTasks(prev => [...prev, newTask]);
      addActivity(`<strong>${task.title}</strong> created`, 'orange');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      const t = tasks.find(x => x.id === taskToDelete);
      if (t) addActivity(`<strong>${t.title}</strong> deleted`, 'red');
      setTasks(prev => prev.filter(x => x.id !== taskToDelete));
    }
    setIsConfirmOpen(false);
    setIsDetailOpen(false);
  };

  const handleToggleDone = (id: number) => {
    const t = tasks.find(x => x.id === id);
    if (t) {
      const newDone = !t.done;
      setTasks(prev => prev.map(x => x.id === id ? { ...x, done: newDone, status: newDone ? 'done' : 'todo' } : x));
      addActivity(`<strong>${t.title}</strong> ${newDone ? 'completed' : 're-opened'}`, newDone ? 'green' : 'orange');
    }
  };

  const handleToggleFav = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, fav: !t.fav } : t));
  };

  const handleInstallFeature = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, status: 'installed', installs: (f.installs || 0) + 1 } : f));
  };

  const handleUninstallFeature = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, status: 'available' } : f));
  };

  const handleToggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('tf_theme', newTheme ? 'dark' : 'light');
  };

  const handleExport = () => {
    const json = JSON.stringify({ tasks, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `kodesk-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          const incoming = Array.isArray(data) ? data : (data.tasks || []);
          if (incoming.length) {
            const maxId = Math.max(...tasks.map(t => t.id), 0);
            const newTasks = incoming.map((t: any, i: number) => ({ ...t, id: maxId + i + 1 }));
            setTasks(prev => [...prev, ...newTasks]);
            addActivity(`${incoming.length} tasks imported`, 'purple');
          }
        } catch (err) { alert('Invalid JSON'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleSortChange = (type: 'date' | 'priority') => {
    if (sortMode === type) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortMode(type);
      setSortDir('asc');
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'Escape') {
        setIsTaskModalOpen(false); setIsDetailOpen(false); setIsConfirmOpen(false);
        setIsSettingsOpen(false); setIsProfileOpen(false); setIsHistoryOpen(false); setIsFilterPanelOpen(false); setIsShortcutsOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); setEditingTask(null); setModalInitialStatus('todo'); setIsTaskModalOpen(true); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') { e.preventDefault(); handleExport(); }
      if (e.key === '?') setIsShortcutsOpen(true);
      if (e.key === '1') setView('board');
      if (e.key === '2') setView('list');
      if (e.key === '3') setView('overview');
      if (e.key === '4') setView('marketplace');
      if (e.key === '5') setView('database');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Counts for sidebar
  const counts = {
    total: tasks.filter(t => !t.done).length,
    design: tasks.filter(t => t.tag === 'design' && !t.done).length,
    dev: tasks.filter(t => t.tag === 'dev' && !t.done).length,
    data: tasks.filter(t => t.tag === 'data' && !t.done).length,
    mgmt: tasks.filter(t => t.tag === 'mgmt' && !t.done).length,
    qa: tasks.filter(t => t.tag === 'qa' && !t.done).length,
  };

  return (
    <div className="flex h-screen bg-[#0D0F12] text-[#F0F2F8] font-sans overflow-hidden transition-colors duration-300">
      <Sidebar 
        activeView={view} 
        activeProject={activeProject}
        onNavigate={setView} 
        onFilterProject={setActiveProject}
        collapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        counts={counts}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'ml-[68px]' : 'ml-[226px]'}`}>
        <Topbar 
          onSearch={setSearchQuery} 
          onImport={handleImport}
          onExport={handleExport}
          onToggleFav={() => setShowFavOnly(!showFavOnly)}
          showFav={showFavOnly}
          onToggleHistory={() => setIsHistoryOpen(true)}
          hasOverdue={tasks.some(t => t.due && !t.done && new Date(t.due) < new Date(new Date().toDateString()))}
        />
        
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1B1F2A] border border-white/5 flex items-center justify-center text-xl shadow-sm">
                {view === 'board' ? '📋' : view === 'list' ? '☰' : view === 'overview' ? '◎' : view === 'marketplace' ? '🛍' : '🗄'}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white leading-none mb-1">
                  {view === 'marketplace' ? 'Marketplace' : view === 'database' ? 'Database' : view.charAt(0).toUpperCase() + view.slice(1)}
                </h1>
                <p className="text-[12.5px] text-[#8B93A7]">
                  {view === 'board' ? 'Manage and track your tasks' : 
                   view === 'list' ? 'All tasks in a sortable table' : 
                   view === 'overview' ? 'Visual breakdown of project health' : 
                   view === 'marketplace' ? 'Browse and install features' :
                   'Raw data viewer'}
                </p>
              </div>
            </div>
            {view !== 'marketplace' && view !== 'database' && (
              <button 
                onClick={() => { setEditingTask(null); setModalInitialStatus('todo'); setIsTaskModalOpen(true); }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.35)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(74,108,247,0.45)] transition-all"
              >
                ＋ New Task
              </button>
            )}
          </div>

          {/* Stats & Filters (Only for task views) */}
          {view !== 'marketplace' && view !== 'database' && (
            <>
              {visibleWidgets.stats && <StatsGrid tasks={tasks} onFilter={setActiveFilter} />}
              <FilterBar 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
                onSortChange={handleSortChange}
                onToggleAdv={() => setIsFilterPanelOpen(true)}
              />
            </>
          )}

          {/* View Content */}
          <div className="h-full pb-10">
            {view === 'board' && (
              <div className="flex flex-col lg:flex-row gap-4 h-full">
                <div className="flex-1 min-w-0">
                  <BoardView 
                    tasks={filteredTasks} 
                    compactMode={compactMode}
                    onDragStart={handleDragStart} 
                    onDrop={handleDrop}
                    onEditTask={(id) => { setEditingTask(tasks.find(t => t.id === id) || null); setIsTaskModalOpen(true); }}
                    onViewTask={(id) => { setDetailTask(tasks.find(t => t.id === id) || null); setIsDetailOpen(true); }}
                    onToggleDone={handleToggleDone}
                    onToggleFav={handleToggleFav}
                    onDeleteTask={handleDeleteTask}
                  />
                </div>
                {(visibleWidgets.calendar || visibleWidgets.progress || visibleWidgets.activity) && (
                  <RightPanel tasks={tasks} activity={activity} visibleWidgets={visibleWidgets} />
                )}
              </div>
            )}
            {view === 'list' && (
              <div className="flex flex-col gap-4">
                <UsersPanel tasks={filteredTasks} />
                <ListView 
                  tasks={filteredTasks} 
                  compactMode={compactMode}
                  onEditTask={(id) => { setEditingTask(tasks.find(t => t.id === id) || null); setIsTaskModalOpen(true); }}
                  onViewTask={(id) => { setDetailTask(tasks.find(t => t.id === id) || null); setIsDetailOpen(true); }}
                  onDeleteTask={handleDeleteTask}
                  onToggleDone={handleToggleDone}
                  onToggleFav={handleToggleFav}
                />
              </div>
            )}
            {view === 'overview' && <OverviewView tasks={tasks} />}
            {view === 'marketplace' && (
              <MarketplaceView 
                features={features} 
                onInstall={handleInstallFeature}
                onUninstall={handleUninstallFeature}
              />
            )}
            {view === 'database' && <DatabaseView tasks={tasks} features={features} activity={activity} users={users} />}
          </div>
        </div>
      </main>

      {/* Modals & Panels */}
      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onSave={handleSaveTask}
        editingTask={editingTask}
        initialStatus={modalInitialStatus}
      />
      
      <DetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        task={detailTask}
        onEdit={() => { setIsDetailOpen(false); setEditingTask(detailTask); setIsTaskModalOpen(true); }}
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Task?"
        message={<span>You're about to delete <strong>{tasks.find(t => t.id === taskToDelete)?.title}</strong>. This cannot be undone.</span>}
      />

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        isDark={isDark}
        compactMode={compactMode}
        visibleWidgets={visibleWidgets}
        onSaveSettings={(settings) => {
          if (settings.isDark !== isDark) handleToggleTheme();
          setCompactMode(settings.compactMode);
          setVisibleWidgets(settings.visibleWidgets);
        }}
        onExport={handleExport}
        onImport={handleImport}
        onClear={() => { if(confirm('Delete ALL tasks?')) { setTasks([]); addActivity('All tasks cleared', 'red'); } }}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <ProfilePanel 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        stats={{
          total: tasks.length,
          done: tasks.filter(t => t.done).length,
          overdue: tasks.filter(t => t.due && !t.done && new Date(t.due) < new Date(new Date().toDateString())).length,
          fav: tasks.filter(t => t.fav).length
        }}
      />

      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        activity={activity}
        onClear={() => setActivity([])}
      />

      <FilterPanel 
        isOpen={isFilterPanelOpen} 
        onClose={() => setIsFilterPanelOpen(false)} 
        onApply={() => setIsFilterPanelOpen(false)} 
      />

      <ShortcutsModal 
        isOpen={isShortcutsOpen} 
        onClose={() => setIsShortcutsOpen(false)} 
      />
    </div>
  );
}
