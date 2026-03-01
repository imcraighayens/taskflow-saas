import React, { useState, useEffect } from 'react';
import { User, Company } from '../../types';
import { getAllUsers, createUser, updateUser, deleteUser, toggleUserStatus, resetUserPassword, getCompany, updateCompany } from '../../auth';
import { AV_COLORS } from '../../constants';

interface UserManagementProps {
  currentUser: User;
}

export default function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [company, setCompany] = useState<Company>(getCompany());
  const [tab, setTab] = useState<'users' | 'company'>('users');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [resetPwUser, setResetPwUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [search, setSearch] = useState('');

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<User['role']>('member');
  const [formDept, setFormDept] = useState('');
  const [formStatus, setFormStatus] = useState<User['status']>('active');

  // Company form
  const [companyName, setCompanyName] = useState(company.name);
  const [companyDomain, setCompanyDomain] = useState(company.domain);
  const [companyPlan, setCompanyPlan] = useState(company.plan);

  const [newPw, setNewPw] = useState('');

  const refreshUsers = () => setUsers(getAllUsers());

  useEffect(() => { refreshUsers(); }, []);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.department || '').toLowerCase().includes(q);
  });

  const resetForm = () => {
    setFormName(''); setFormEmail(''); setFormPassword(''); setFormRole('member'); setFormDept(''); setFormStatus('active');
  };

  const handleAdd = () => {
    if (!formName.trim() || !formEmail.trim() || !formPassword.trim()) {
      showToast('Please fill in name, email, and password.', 'error');
      return;
    }
    const res = createUser({ name: formName.trim(), email: formEmail.trim(), password: formPassword, role: formRole, department: formDept.trim() });
    if (res.success) {
      showToast(`${formName} added successfully.`, 'success');
      resetForm();
      setShowAddModal(false);
      refreshUsers();
    } else {
      showToast(res.error || 'Failed to add user.', 'error');
    }
  };

  const handleEdit = () => {
    if (!editingUser) return;
    const res = updateUser(editingUser.id, { name: formName.trim(), email: formEmail.trim(), role: formRole, department: formDept.trim(), status: formStatus });
    if (res.success) {
      showToast(`${formName} updated.`, 'success');
      setEditingUser(null);
      resetForm();
      refreshUsers();
    } else {
      showToast(res.error || 'Failed to update.', 'error');
    }
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    const res = deleteUser(confirmDelete.id);
    if (res.success) {
      showToast(`${confirmDelete.name} removed.`, 'success');
      setConfirmDelete(null);
      refreshUsers();
    } else {
      showToast(res.error || 'Failed to delete.', 'error');
    }
  };

  const handleToggleStatus = (u: User) => {
    const res = toggleUserStatus(u.id);
    if (res.success) {
      showToast(`${u.name} ${u.status === 'active' ? 'deactivated' : 'activated'}.`, 'success');
      refreshUsers();
    } else {
      showToast(res.error || 'Failed.', 'error');
    }
  };

  const handleResetPw = () => {
    if (!resetPwUser || !newPw) return;
    const res = resetUserPassword(resetPwUser.id, newPw);
    if (res.success) {
      showToast(`Password reset for ${resetPwUser.name}.`, 'success');
      setResetPwUser(null);
      setNewPw('');
    } else {
      showToast(res.error || 'Failed.', 'error');
    }
  };

  const handleSaveCompany = () => {
    const updated = updateCompany({ name: companyName.trim(), domain: companyDomain.trim(), plan: companyPlan });
    setCompany(updated);
    showToast('Company settings saved.', 'success');
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setFormName(u.name);
    setFormEmail(u.email);
    setFormRole(u.role);
    setFormDept(u.department || '');
    setFormStatus(u.status);
  };

  const isAdmin = currentUser.role === 'admin';

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
    member: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    viewer: 'bg-gray-500/15 text-gray-300 border-gray-500/20',
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    members: users.filter(u => u.role === 'member').length,
  };

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Users', val: stats.total, color: '#4A6CF7' },
          { label: 'Active', val: stats.active, color: '#10B981' },
          { label: 'Admins', val: stats.admins, color: '#8B5CF6' },
          { label: 'Members', val: stats.members, color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl bg-[#161B28] border border-white/5 p-4">
            <div className="absolute top-0 left-0 w-1 h-full rounded-full" style={{ background: s.color }}></div>
            <div className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-1 pl-2">{s.label}</div>
            <div className="text-2xl font-extrabold text-white pl-2">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex bg-[#161B28] border border-white/5 rounded-xl p-1 gap-1">
          {(['users', 'company'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${tab === t ? 'bg-[#1B1F2A] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {t === 'users' ? 'Team Members' : 'Company'}
            </button>
          ))}
        </div>
        {tab === 'users' && isAdmin && (
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.35)] hover:-translate-y-px transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            Add User
          </button>
        )}
      </div>

      {tab === 'users' && (
        <>
          {/* Search */}
          <div className="relative">
            <svg viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-white/25 fill-none stroke-2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users by name, email, or department..."
              className="w-full h-10 pl-10 pr-4 bg-[#161B28] border border-white/5 rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#4A6CF7]/50 transition-all"
            />
          </div>

          {/* User table */}
          <div className="bg-[#161B28] border border-white/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 px-5 py-3 border-b border-white/5 text-[10px] font-bold text-white/25 uppercase tracking-widest">
              <span>User</span><span>Email</span><span>Role</span><span>Department</span><span>Status</span><span>Actions</span>
            </div>

            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-[13px] text-white/25">No users found.</div>
            ) : (
              filtered.map((u, i) => (
                <div key={u.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-3 px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all items-center">
                  {/* User */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0" style={{ background: AV_COLORS[i % AV_COLORS.length] }}>
                      {u.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-white truncate">{u.name}</div>
                      {u.joinedAt && <div className="text-[10px] text-white/20">Joined {u.joinedAt}</div>}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="text-[12.5px] text-white/50 truncate">{u.email}</div>
                  {/* Role */}
                  <div>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${roleColors[u.role]}`}>
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </div>
                  {/* Dept */}
                  <div className="text-[12.5px] text-white/40 truncate">{u.department || '—'}</div>
                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-emerald-400' : 'bg-white/15'}`}></div>
                    <span className="text-[12px] text-white/40">{u.status === 'active' ? 'Active' : 'Inactive'}</span>
                  </div>
                  {/* Actions */}
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(u)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-all" title="Edit">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white/30 fill-none stroke-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button onClick={() => setResetPwUser(u)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-all" title="Reset Password">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white/30 fill-none stroke-2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </button>
                      <button onClick={() => handleToggleStatus(u)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-all" title={u.status === 'active' ? 'Deactivate' : 'Activate'}>
                        {u.status === 'active' ? (
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-amber-400/50 fill-none stroke-2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-emerald-400/50 fill-none stroke-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        )}
                      </button>
                      {u.id !== currentUser.id && (
                        <button onClick={() => setConfirmDelete(u)} className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center transition-all" title="Delete">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-red-400/40 fill-none stroke-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ── Company tab ── */}
      {tab === 'company' && (
        <div className="bg-[#161B28] border border-white/5 rounded-2xl p-6 max-w-lg space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-white mb-1">Company Settings</h3>
            <p className="text-[12px] text-white/30">Manage your organization profile.</p>
          </div>
          <div className="space-y-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-white/30 uppercase tracking-wider">Company Name</label>
              <input value={companyName} onChange={e => setCompanyName(e.target.value)} className="h-10 px-3.5 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-white/30 uppercase tracking-wider">Domain</label>
              <input value={companyDomain} onChange={e => setCompanyDomain(e.target.value)} className="h-10 px-3.5 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-white/30 uppercase tracking-wider">Plan</label>
              <select value={companyPlan} onChange={e => setCompanyPlan(e.target.value as Company['plan'])} className="h-10 px-3.5 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all">
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <button onClick={handleSaveCompany} className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.3)] hover:-translate-y-px transition-all">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ── Add User Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-[#161B28] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white">Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white/40 fill-none stroke-2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Full Name *</label>
                <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Jane Doe" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 placeholder:text-white/15 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Department</label>
                <input value={formDept} onChange={e => setFormDept(e.target.value)} placeholder="Engineering" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 placeholder:text-white/15 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/30 uppercase">Email Address *</label>
              <input value={formEmail} onChange={e => setFormEmail(e.target.value)} type="email" placeholder="jane@ecokode.com" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 placeholder:text-white/15 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Password *</label>
                <input value={formPassword} onChange={e => setFormPassword(e.target.value)} type="password" placeholder="Min. 6 chars" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 placeholder:text-white/15 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Role</label>
                <select value={formRole} onChange={e => setFormRole(e.target.value as User['role'])} className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowAddModal(false)} className="flex-1 h-10 rounded-xl bg-white/5 text-white/50 text-[13px] font-bold hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleAdd} className="flex-1 h-10 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.3)] hover:-translate-y-px transition-all">Add User</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit User Modal ── */}
      {editingUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setEditingUser(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-[#161B28] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white">Edit User</h3>
              <button onClick={() => setEditingUser(null)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white/40 fill-none stroke-2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Full Name</label>
                <input value={formName} onChange={e => setFormName(e.target.value)} className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Department</label>
                <input value={formDept} onChange={e => setFormDept(e.target.value)} className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/30 uppercase">Email</label>
              <input value={formEmail} onChange={e => setFormEmail(e.target.value)} type="email" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Role</label>
                <select value={formRole} onChange={e => setFormRole(e.target.value as User['role'])} className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/30 uppercase">Status</label>
                <select value={formStatus} onChange={e => setFormStatus(e.target.value as User['status'])} className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 transition-all">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditingUser(null)} className="flex-1 h-10 rounded-xl bg-white/5 text-white/50 text-[13px] font-bold hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleEdit} className="flex-1 h-10 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(74,108,247,0.3)] hover:-translate-y-px transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reset Password Modal ── */}
      {resetPwUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setResetPwUser(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-sm bg-[#161B28] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-white">Reset Password</h3>
            <p className="text-[12.5px] text-white/40">Set a new password for <strong className="text-white/70">{resetPwUser.name}</strong></p>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/30 uppercase">New Password</label>
              <input value={newPw} onChange={e => setNewPw(e.target.value)} type="password" placeholder="Min. 6 characters" className="h-10 px-3 bg-[#1B1F2A] border border-white/10 rounded-xl text-[13px] text-white outline-none focus:border-[#4A6CF7]/50 placeholder:text-white/15 transition-all" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setResetPwUser(null)} className="flex-1 h-10 rounded-xl bg-white/5 text-white/50 text-[13px] font-bold hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleResetPw} className="flex-1 h-10 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#8B5CF6] text-white text-[13px] font-bold transition-all">Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-sm bg-[#161B28] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-red-300">Remove User</h3>
            <p className="text-[13px] text-white/50">Are you sure you want to permanently remove <strong className="text-white/80">{confirmDelete.name}</strong> ({confirmDelete.email})? This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 h-10 rounded-xl bg-white/5 text-white/50 text-[13px] font-bold hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleDelete} className="flex-1 h-10 rounded-xl bg-red-500/80 text-white text-[13px] font-bold hover:bg-red-500 transition-all">Remove User</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-xl text-[13px] font-bold shadow-xl transition-all ${toast.type === 'success' ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
