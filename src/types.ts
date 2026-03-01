export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive';
  lastActive?: string;
  avatar?: string;
  initials: string;
  department?: string;
  joinedAt?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  desc: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'mid' | 'low';
  tag: 'design' | 'dev' | 'data' | 'mgmt' | 'qa' | 'docs';
  due: string;
  done: boolean;
  fav: boolean;
  assignee: string;
}

export interface Activity {
  type: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  text: string;
  time: string;
}

export interface Feature {
  id: string;
  name: string;
  desc: string;
  icon: string;
  dept: string[];
  status: 'available' | 'installed' | 'coming-soon' | 'in-review' | 'parked';
  author: string;
  version: string;
  installs: number;
  rating: number;
  tags: string[];
}
