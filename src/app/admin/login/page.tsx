'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createBrowserSupabase();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }

      // Update last_login
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('users').update({ last_login: new Date().toISOString() }).eq('auth_id', user.id);
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep to-navy flex items-center justify-center p-6">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-10 text-center bg-cream border-b">
          <div className="text-4xl mb-3">🛡️</div>
          <h1 className="font-serif text-2xl text-deep mb-1">A Tharmanathan Insurance</h1>
          <p className="text-sm text-gray-400">Admin & Agent Portal</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="input-field"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-teal text-white rounded-lg font-bold text-sm transition-all hover:bg-teal-light disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
