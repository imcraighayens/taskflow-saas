"use client";
import { useState } from 'react';
import { supabaseClient } from '../lib/supabaseClient';

/**
 * Authentication component providing sign‑up and sign‑in forms.  It uses
 * Supabase Auth to create accounts and sign users in.  After a
 * successful sign‑in, the user is redirected to the dashboard.
 */
export default function Auth() {
  const supabase = supabaseClient();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <form onSubmit={handleAuth} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          {isSignUp ? 'Create an account' : 'Sign in to TaskFlow'}
        </h1>
        {error && <p className="text-red-600 mb-2 text-center text-sm">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Please wait…' : isSignUp ? 'Sign up' : 'Sign in'}
        </button>
        <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </button>
            </span>
          ) : (
            <span>
              New here?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}