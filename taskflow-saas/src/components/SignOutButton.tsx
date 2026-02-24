"use client";
import { supabaseClient } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabaseClient().auth.signOut();
    router.push('/');
  };
  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
    >
      Sign out
    </button>
  );
}