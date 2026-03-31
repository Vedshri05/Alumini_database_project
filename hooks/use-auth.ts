'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, clearAuth, AuthUser, UserRole } from '@/lib/auth';

export function useAuth(requiredRole?: UserRole) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.replace('/login');
      return;
    }
    if (requiredRole && auth.role !== requiredRole) {
      router.replace('/login');
      return;
    }
    setUser(auth);
    setChecking(false);
  }, [router, requiredRole]);

  const logout = () => {
    clearAuth();
    router.push('/login');
  };

  return { user, checking, logout };
}
