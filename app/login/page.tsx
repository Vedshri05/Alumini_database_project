'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { GraduationCap, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { saveAuth, getAuth, getDashboardPath, UserRole } from '@/lib/auth';

type Tab = 'ADMIN' | 'STUDENT' | 'ALUMNI';

const DEMO = {
  ADMIN:   { email: 'admin@alumni.com',   password: 'admin123' },
  STUDENT: { email: 'student@alumni.com', password: 'student123' },
  ALUMNI:  { email: 'alumni@alumni.com',  password: 'alumni123' },
};

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'linkedin' | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    if (auth) router.replace(getDashboardPath(auth.role));
  }, [router]);

  // Pre-fill demo credentials when tab changes
  useEffect(() => {
    setEmail(DEMO[tab].email);
    setPassword(tab === 'ADMIN' ? DEMO[tab].password : '');
    setError('');
  }, [tab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: tab }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || 'Invalid credentials. Please try again.');
        return;
      }

      const { token, role, name } = json.data;
      saveAuth({ token, role: role as UserRole, email, name });
      router.push(getDashboardPath(role as UserRole));
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'linkedin') => {
    setSocialLoading(provider);
    setError('');
    try {
      await signIn(provider, { callbackUrl: '/auth/callback' });
    } catch {
      setError('Authentication failed. Please try again.');
      setSocialLoading(null);
    }
  };

  const isAdmin = tab === 'ADMIN';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col items-center justify-center p-4">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4 shadow-md">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Alumni Management System</h1>
        <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 mb-4 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(['ADMIN', 'STUDENT', 'ALUMNI'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === t
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Social buttons — Student & Alumni only */}
        {!isAdmin && (
          <>
            <button
              onClick={() => handleSocial('google')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 disabled:opacity-60 rounded-xl px-4 py-3 mb-3 text-sm font-medium text-gray-700 transition-colors"
            >
              {socialLoading === 'google'
                ? <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                : <GoogleIcon />}
              Continue with Google
            </button>

            <button
              onClick={() => handleSocial('linkedin')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-[#0077B5] hover:bg-[#005f94] disabled:opacity-60 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-white transition-colors"
            >
              {socialLoading === 'linkedin'
                ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                : <LinkedInIcon />}
              Continue with LinkedIn
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {/* Email / Password form — all tabs */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder={isAdmin ? 'admin@alumni.com' : 'your.email@example.com'}
                required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password"
                required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {isAdmin && (
          <div className="text-center mt-3">
            <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
          </div>
        )}

        {/* Demo credentials */}
        {isAdmin && (
          <>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">Demo Credentials</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><span className="font-semibold">Email:</span> admin@alumni.com</p>
              <p><span className="font-semibold">Password:</span> admin123</p>
            </div>
          </>
        )}

        {tab === 'STUDENT' && (
          <>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">Demo Credentials</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><span className="font-semibold">Email:</span> student@alumni.com</p>
              <p><span className="font-semibold">Password:</span> student123</p>
            </div>
          </>
        )}

        {tab === 'ALUMNI' && (
          <>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">Demo Credentials</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p><span className="font-semibold">Email:</span> alumni@alumni.com</p>
              <p><span className="font-semibold">Password:</span> alumni123</p>
            </div>
          </>
        )}

        {/* Sign up prompt — Student & Alumni only */}
        {!isAdmin && (
          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => router.push(`/signup?provider=google&role=${tab}`)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6">© 2026 Alumni System. All rights reserved.</p>
    </div>
  );
}
