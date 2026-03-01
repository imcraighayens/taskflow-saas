import React, { useState, useEffect } from 'react';
import { Task } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  editingTask?: Task | null;
  initialStatus?: string;
}

export default function TaskModal({ isOpen, onClose, onSave, editingTask, initialStatus = 'todo' }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState('mid');
  const [tag, setTag] = useState('dev');
  const [due, setDue] = useState('');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDesc(editingTask.desc);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setTag(editingTask.tag);
      setDue(editingTask.due);
      setAssignee(editingTask.assignee);
    } else {
      setTitle('');
      setDesc('');
      setStatus(initialStatus);
      setPriority('mid');
      setTag('dev');
      setDue(new Date().toISOString().split('T')[0]);
      setAssignee('');
    }
  }, [editingTask, initialStatus, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({
      id: editingTask?.id,
      title,
      desc,
      status: status as any,
      priority: priority as any,
      tag: tag as any,
      due,
      assignee,
      done: status === 'done',
      fav: editingTask?.fav || false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2000] p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#141720] border border-white/15 rounded-[18px] p-6 w-[510px] max-w-full shadow-2xl transform transition-all scale-100">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[17px] font-extrabold tracking-tight text-white">{editingTask ? 'Edit Task' : 'New Task'}</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#1B1F2A] border border-white/10 flex items-center justify-center text-white/50 hover:bg-red-500/15 hover:text-red-500 hover:border-red-500/30 transition-all">✕</button>
        </div>

        <div className="mb-3.5">
          <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Task Title *</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="w-full h-[42px] px-3.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636] transition-all placeholder:text-[#525869]" 
            placeholder="What needs to be done?" 
            autoFocus
          />
        </div>

        <div className="mb-3.5">
          <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Description</label>
          <textarea 
            value={desc} 
            onChange={e => setDesc(e.target.value)}
            className="w-full p-3.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636] transition-all placeholder:text-[#525869] min-h-[72px] resize-y" 
            placeholder="Add more context…" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3.5">
          <div>
            <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full h-[42px] px-3 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636]">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full h-[42px] px-3 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636]">
              <option value="high">High</option>
              <option value="mid">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3.5">
          <div>
            <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Category</label>
            <select value={tag} onChange={e => setTag(e.target.value)} className="w-full h-[42px] px-3 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636]">
              <option value="design">Design</option>
              <option value="dev">Development</option>
              <option value="data">Data</option>
              <option value="mgmt">Management</option>
              <option value="qa">QA</option>
              <option value="docs">Docs</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Due Date</label>
            <input type="date" value={due} onChange={e => setDue(e.target.value)} className="w-full h-[42px] px-3 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636]" />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-[11px] font-bold text-[#525869] uppercase tracking-wider mb-1.5">Assignee</label>
          <input 
            value={assignee} 
            onChange={e => setAssignee(e.target.value)}
            className="w-full h-[42px] px-3.5 bg-[#1B1F2A] border border-white/10 rounded-[10px] text-[13.5px] text-white outline-none focus:border-[#4A6CF7]/50 focus:bg-[#222636] transition-all placeholder:text-[#525869]" 
            placeholder="e.g. Craig K." 
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
          <button onClick={onClose} className="px-4 py-2 rounded-[9px] text-[13px] font-semibold text-[#8B93A7] bg-[#1B1F2A] border border-white/5 hover:bg-[#222636] hover:text-white transition-all">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-[9px] text-[13px] font-bold text-white bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] shadow-[0_4px_16px_rgba(74,108,247,0.35)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(74,108,247,0.45)] transition-all">
            {editingTask ? '✔ Save Changes' : '＋ Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
}
