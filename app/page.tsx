'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, getDashboardPath } from '@/lib/auth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      router.replace(getDashboardPath(auth.role));
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
    </div>
  );
}
