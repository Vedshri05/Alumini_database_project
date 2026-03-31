export type UserRole = 'ADMIN' | 'ALUMNI' | 'STUDENT';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

const AUTH_KEY = 'alumni_auth';

export function saveAuth(user: AuthUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getAuth(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'ADMIN':   return '/admin';
    case 'ALUMNI':  return '/alumni-dashboard';
    case 'STUDENT': return '/student-dashboard';
  }
}
