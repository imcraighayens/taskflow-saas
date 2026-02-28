import React, { useState } from 'react';
import { Task, Feature, Activity, User } from '../../types';

interface DatabaseViewProps {
  tasks: Task[];
  features: Feature[];
  activity: Activity[];
  users: User[];
}

export default function DatabaseView({ tasks, features, activity, users }: DatabaseViewProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'features' | 'activity' | 'users'>('tasks');

  const renderTable = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {['ID', 'Title', 'Status', 'Priority', 'Tag', 'Due Date', 'Assignee', 'Fav', 'Done'].map(h => (
                  <th key={h} className="p-3 text-[11px] font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="p-3 text-[13px] text-[#8B93A7] font-mono">{t.id}</td>
                  <td className="p-3 text-[13px] text-white font-medium">{t.title}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.status}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.priority}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.tag}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.due}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.assignee}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.fav ? 'true' : 'false'}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{t.done ? 'true' : 'false'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'features':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {['ID', 'Name', 'Status', 'Version', 'Author', 'Installs', 'Rating', 'Depts'].map(h => (
                  <th key={h} className="p-3 text-[11px] font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(f => (
                <tr key={f.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="p-3 text-[13px] text-[#8B93A7] font-mono">{f.id}</td>
                  <td className="p-3 text-[13px] text-white font-medium">{f.name}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.status}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.version}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.author}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.installs}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.rating}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{f.dept.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'activity':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {['Type', 'Text', 'Time'].map(h => (
                  <th key={h} className="p-3 text-[11px] font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity.map((a, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="p-3 text-[13px] text-[#8B93A7]">{a.type}</td>
                  <td className="p-3 text-[13px] text-white" dangerouslySetInnerHTML={{ __html: a.text }}></td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'users':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {['ID', 'Name', 'Email', 'Role', 'Status', 'Initials'].map(h => (
                  <th key={h} className="p-3 text-[11px] font-bold text-[#525869] uppercase tracking-wider border-b border-white/5 bg-[#1B1F2A] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="p-3 text-[13px] text-[#8B93A7] font-mono">{u.id}</td>
                  <td className="p-3 text-[13px] text-white font-medium">{u.name}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{u.email}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{u.role}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{u.status}</td>
                  <td className="p-3 text-[13px] text-[#8B93A7]">{u.initials}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 px-1">
        {(['tasks', 'features', 'activity', 'users'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[13px] font-bold capitalize transition-all border-b-2 ${
              activeTab === tab 
                ? 'text-[#4A6CF7] border-[#4A6CF7]' 
                : 'text-[#8B93A7] border-transparent hover:text-white hover:border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-auto bg-[#181C27] border border-white/5 rounded-2xl">
        {renderTable()}
      </div>
      
      <div className="mt-3 text-[11px] text-[#525869] font-mono text-right">
        {activeTab === 'tasks' && `${tasks.length} records`}
        {activeTab === 'features' && `${features.length} records`}
        {activeTab === 'activity' && `${activity.length} records`}
        {activeTab === 'users' && `${users.length} records`}
      </div>
    </div>
  );
}
