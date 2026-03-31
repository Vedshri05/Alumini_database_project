'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { saveAuth, getDashboardPath, UserRole } from '@/lib/auth';
import { GraduationCap, AlertCircle, UserPlus } from 'lucide-react';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [provider, setProvider] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') { router.replace('/login'); return; }
    if (status === 'authenticated' && session?.user?.email) {
      const prov = (session.user as any).provider || 'google';
      setProvider(prov);
      handleSocialLogin(session.user.email, prov);
    }
  }, [status, session]);

  const handleSocialLogin = async (email: string, prov: string) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/social-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, provider: prov }),
      });
      const json = await res.json();

      // Existing user — log in
      if (res.ok && json.success) {
        const { token, role, name } = json.data;
        saveAuth({ token, role: role as UserRole, email, name });
        router.push(getDashboardPath(role as UserRole));
        return;
      }

      // New user — show signup prompt
      if (json.action === 'SIGNUP_REQUIRED') {
        setSignupEmail(email);
        return;
      }

      setError(json.message || 'Authentication failed. Please try again.');
    } catch {
      setError('Cannot connect to server. Make sure the backend is running on port 8080.');
    }
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Signup required state
  if (signupEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-orange-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Email Not Registered</h2>
          <p className="text-gray-500 text-sm mb-1">
            Your email is not registered in the system.
          </p>
          <p className="text-blue-600 text-sm font-medium mb-6 break-all">{signupEmail}</p>
          <button
            onClick={() => router.push(`/signup?email=${encodeURIComponent(signupEmail)}&provider=${provider}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <UserPlus className="w-4 h-4" />
            Complete Registration
          </button>
          <button
            onClick={() => router.push('/login')}
            className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
          <GraduationCap className="w-9 h-9 text-white" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-4" />
        <p className="text-gray-500 mt-4 text-sm">Verifying your account...</p>
      </div>
    </div>
  );
}
