import { User, Company } from './types';

export interface AuthUser extends User {
  password: string;
}

// ── Seed admin users (always available as fallback) ──
const SEED_ADMINS: AuthUser[] = [
  { id: 'u1', name: 'Tshiamo', email: 'tshiamo@ecokode.com', role: 'admin', status: 'active', initials: 'TM', password: 'pass123!', department: 'Operations', joinedAt: '2025-01-15' },
  { id: 'u2', name: 'Kgosi',   email: 'kgosi@ecokode.com',   role: 'admin', status: 'active', initials: 'KG', password: 'pass123!', department: 'Engineering', joinedAt: '2025-01-15' },
  { id: 'u3', name: 'Craig',   email: 'craig@ecokode.com',   role: 'admin', status: 'active', initials: 'CR', password: 'pass123!', department: 'Management', joinedAt: '2025-01-15' },
];

const DEFAULT_COMPANY: Company = {
  id: 'org_ecokode',
  name: 'EcoKode',
  domain: 'ecokode.com',
  plan: 'pro',
  createdAt: '2025-01-15',
};

// ── Storage keys ──
const KEYS = {
  users: 'kd_company_users',
  company: 'kd_company',
  session: 'kd_auth_user',
};

// ── Initialize: merge seed admins with any stored users ──
function ensureSeeded(): void {
  if (!localStorage.getItem(KEYS.company)) {
    localStorage.setItem(KEYS.company, JSON.stringify(DEFAULT_COMPANY));
  }
  const existing = getAllAuthUsers();
  // Ensure seed admins always exist
  let merged = [...existing];
  for (const seed of SEED_ADMINS) {
    if (!merged.find(u => u.email.toLowerCase() === seed.email.toLowerCase())) {
      merged.push(seed);
    }
  }
  localStorage.setItem(KEYS.users, JSON.stringify(merged));
}

// ── Company ──
export function getCompany(): Company {
  ensureSeeded();
  try {
    const raw = localStorage.getItem(KEYS.company);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_COMPANY;
}

export function updateCompany(updates: Partial<Company>): Company {
  const current = getCompany();
  const updated = { ...current, ...updates };
  localStorage.setItem(KEYS.company, JSON.stringify(updated));
  return updated;
}

// ── Users (with passwords — internal only) ──
function getAllAuthUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(KEYS.users);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveAuthUsers(users: AuthUser[]): void {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

// ── Public user list (no passwords) ──
export function getAllUsers(): User[] {
  ensureSeeded();
  return getAllAuthUsers().map(({ password: _, ...u }) => u);
}

// ── Authentication ──
export function authenticateUser(email: string, password: string): User | null {
  ensureSeeded();
  const all = getAllAuthUsers();
  const found = all.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.status === 'active'
  );
  if (!found) return null;
  const { password: _, ...user } = found;
  // Update lastActive
  const updated = all.map(u =>
    u.id === found.id ? { ...u, lastActive: new Date().toISOString() } : u
  );
  saveAuthUsers(updated);
  return { ...user, lastActive: new Date().toISOString() };
}

// ── Session ──
export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(KEYS.session);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

export function storeUser(user: User): void {
  localStorage.setItem(KEYS.session, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(KEYS.session);
}

// ── Admin: Create user ──
export function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: User['role'];
  department?: string;
}): { success: boolean; error?: string; user?: User } {
  ensureSeeded();
  const all = getAllAuthUsers();

  // Check duplicate email
  if (all.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, error: 'A user with this email already exists.' };
  }

  const initials = data.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || data.name.slice(0, 2).toUpperCase();

  const newUser: AuthUser = {
    id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password,
    role: data.role,
    status: 'active',
    initials,
    department: data.department || '',
    joinedAt: new Date().toISOString().slice(0, 10),
  };

  all.push(newUser);
  saveAuthUsers(all);

  const { password: _, ...user } = newUser;
  return { success: true, user };
}

// ── Admin: Update user ──
export function updateUser(id: string, updates: Partial<AuthUser>): { success: boolean; error?: string } {
  ensureSeeded();
  const all = getAllAuthUsers();
  const idx = all.findIndex(u => u.id === id);
  if (idx === -1) return { success: false, error: 'User not found.' };

  // If email changed, check for duplicates
  if (updates.email && updates.email.toLowerCase() !== all[idx].email.toLowerCase()) {
    if (all.find(u => u.email.toLowerCase() === updates.email!.toLowerCase())) {
      return { success: false, error: 'Email already in use.' };
    }
  }

  if (updates.name) {
    updates.initials = updates.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || updates.name.slice(0, 2).toUpperCase();
  }

  all[idx] = { ...all[idx], ...updates };
  saveAuthUsers(all);
  return { success: true };
}

// ── Admin: Delete user ──
export function deleteUser(id: string): { success: boolean; error?: string } {
  ensureSeeded();
  const all = getAllAuthUsers();
  const user = all.find(u => u.id === id);
  if (!user) return { success: false, error: 'User not found.' };

  // Prevent deleting the last admin
  const admins = all.filter(u => u.role === 'admin' && u.status === 'active');
  if (user.role === 'admin' && admins.length <= 1) {
    return { success: false, error: 'Cannot delete the last admin.' };
  }

  saveAuthUsers(all.filter(u => u.id !== id));
  return { success: true };
}

// ── Admin: Toggle user status ──
export function toggleUserStatus(id: string): { success: boolean; error?: string } {
  ensureSeeded();
  const all = getAllAuthUsers();
  const idx = all.findIndex(u => u.id === id);
  if (idx === -1) return { success: false, error: 'User not found.' };

  const newStatus = all[idx].status === 'active' ? 'inactive' : 'active';

  // Prevent deactivating the last active admin
  if (all[idx].role === 'admin' && all[idx].status === 'active') {
    const activeAdmins = all.filter(u => u.role === 'admin' && u.status === 'active');
    if (activeAdmins.length <= 1) {
      return { success: false, error: 'Cannot deactivate the last active admin.' };
    }
  }

  all[idx].status = newStatus;
  saveAuthUsers(all);
  return { success: true };
}

// ── Admin: Reset password ──
export function resetUserPassword(id: string, newPassword: string): { success: boolean; error?: string } {
  ensureSeeded();
  if (newPassword.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
  const all = getAllAuthUsers();
  const idx = all.findIndex(u => u.id === id);
  if (idx === -1) return { success: false, error: 'User not found.' };
  all[idx].password = newPassword;
  saveAuthUsers(all);
  return { success: true };
}

// ── Company Registration (sign-up) ──
export function registerCompany(data: {
  companyName: string;
  adminName: string;
  email: string;
  password: string;
  plan?: Company['plan'];
}): { success: boolean; error?: string; user?: User } {
  // Validate
  if (!data.companyName.trim()) return { success: false, error: 'Company name is required.' };
  if (!data.adminName.trim()) return { success: false, error: 'Your name is required.' };
  if (!data.email.trim()) return { success: false, error: 'Email is required.' };
  if (data.password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

  // Extract domain from email
  const domain = data.email.split('@')[1] || '';
  if (!domain) return { success: false, error: 'Please use a valid email address.' };

  // Create company
  const companyId = 'org_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const company: Company = {
    id: companyId,
    name: data.companyName.trim(),
    domain,
    plan: data.plan || 'starter',
    createdAt: new Date().toISOString().slice(0, 10),
  };
  localStorage.setItem(KEYS.company, JSON.stringify(company));

  // Build initials
  const initials = data.adminName.trim()
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || data.adminName.slice(0, 2).toUpperCase();

  // Create the founding admin
  const adminUser: AuthUser = {
    id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: data.adminName.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password,
    role: 'admin',
    status: 'active',
    initials,
    department: 'Management',
    joinedAt: new Date().toISOString().slice(0, 10),
  };

  // Replace the user store with just this admin (fresh company)
  saveAuthUsers([adminUser]);

  const { password: _, ...user } = adminUser;
  return { success: true, user };
}
