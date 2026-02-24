import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { supabaseServerClient } from '../../lib/supabaseClient';
import SignOutButton from '../../components/SignOutButton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = cookies();
  const supabase = supabaseServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/');
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">TaskFlow</h1>
        <SignOutButton />
      </header>
      <nav className="flex space-x-4 px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
        <a href="/dashboard" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Board
        </a>
        <a href="/dashboard/list" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          List
        </a>
        <a href="/dashboard/overview" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Overview
        </a>
      </nav>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}