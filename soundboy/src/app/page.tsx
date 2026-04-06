import { supabaseServerClient } from '../lib/supabaseClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Auth from '../components/Auth';

export default async function HomePage() {
  // On the server, check if a user session exists.  If so, redirect to dashboard.
  const cookieStore = cookies();
  const supabase = supabaseServerClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect('/dashboard');
  }
  return <Auth />;
}