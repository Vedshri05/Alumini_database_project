'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, User, Mail, Phone, BookOpen, Calendar, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { saveAuth, getDashboardPath, UserRole } from '@/lib/auth';

const BRANCHES = [
  { value: 'CS',   label: 'Computer Science' },
  { value: 'IT',   label: 'Information Technology' },
  { value: 'ENTC', label: 'Electronics & Telecommunication' },
  { value: 'ECE',  label: 'Electronics & Communication' },
  { value: 'AIDS', label: 'AI & Data Science' },
];

const YEARS = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + 2 - i);

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();

  const emailFromOAuth = params.get('email') || '';
  const providerFromOAuth = params.get('provider') || '';
  const roleFromParam = (params.get('role') || 'STUDENT').toUpperCase() as 'STUDENT' | 'ALUMNI';
  const isOAuth = !!emailFromOAuth;

  const [form, setForm] = useState({
    name: '',
    email: emailFromOAuth,
    password: '',
    confirmPassword: '',
    role: roleFromParam,
    branch: 'CS',
    graduationYear: new Date().getFullYear(),
    phone: '',
    provider: providerFromOAuth || 'direct',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'graduationYear' ? parseInt(value) : value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isOAuth && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isOAuth && form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          branch: form.branch,
          graduationYear: form.graduationYear,
          phone: form.phone,
          provider: form.provider,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || 'Registration failed. Please try again.');
        return;
      }

      const { token, role, name, email } = json.data;
      saveAuth({ token, role: role as UserRole, email, name });
      setSuccess(`Welcome, ${name}! Redirecting to your dashboard...`);
      setTimeout(() => router.push(getDashboardPath(role as UserRole)), 1500);
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col items-center justify-center p-4">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4 shadow-md">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-500 mt-1 text-sm">Join the Alumni Management System</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2.5 mb-4 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 rounded-lg px-3 py-2.5 mb-4 text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {(['STUDENT', 'ALUMNI'] as const).map(r => (
                <button key={r} type="button"
                  onClick={() => setForm(prev => ({ ...prev, role: r }))}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    form.role === r ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  {r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" required readOnly={isOAuth}
                className={`w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isOAuth ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'text-gray-800'
                }`} />
            </div>
            {isOAuth && <p className="text-xs text-gray-400 mt-1">Auto-filled from {providerFromOAuth}</p>}
          </div>

          {/* Password — only for direct signup */}
          {!isOAuth && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" name="password" value={form.password} onChange={handleChange}
                    placeholder="Min. 6 characters" required minLength={6}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter password" required
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </>
          )}

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select name="branch" value={form.branch} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none">
                {BRANCHES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {form.role === 'STUDENT' ? 'Expected Graduation Year' : 'Graduation Year'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select name="graduationYear" value={form.graduationYear} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none">
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <button type="submit" disabled={loading || !!success}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-400">Already have an account? </span>
          <button onClick={() => router.push('/login')} className="text-sm text-blue-600 font-medium hover:underline">
            Sign In
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">© 2026 Alumni System. All rights reserved.</p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
