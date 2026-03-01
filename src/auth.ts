import { User } from './types';

export interface AuthUser extends User {
  password: string;
}

// Admin users with credentials
const AUTH_USERS: AuthUser[] = [
  {
    id: 'u1',
    name: 'Tshiamo',
    email: 'tshiamo@ecokode.com',
    role: 'admin',
    status: 'active',
    initials: 'TM',
    password: 'pass123!',
  },
  {
    id: 'u2',
    name: 'Kgosi',
    email: 'kgosi@ecokode.com',
    role: 'admin',
    status: 'active',
    initials: 'KG',
    password: 'pass123!',
  },
  {
    id: 'u3',
    name: 'Craig',
    email: 'craig@ecokode.com',
    role: 'admin',
    status: 'active',
    initials: 'CR',
    password: 'pass123!',
  },
];

export function authenticateUser(email: string, password: string): User | null {
  const found = AUTH_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) return null;
  // Return user without password
  const { password: _, ...user } = found;
  return user;
}

export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem('kd_auth_user');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

export function storeUser(user: User): void {
  localStorage.setItem('kd_auth_user', JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem('kd_auth_user');
}

export function getAdminUsers(): User[] {
  return AUTH_USERS.map(({ password: _, ...u }) => u);
}
