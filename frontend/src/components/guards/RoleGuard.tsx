"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface RoleGuardProps {
  children: React.ReactNode;
  /** The role(s) allowed on this page */
  allowed: UserRole | UserRole[];
  /** Where to redirect if the role doesn't match (defaults to login) */
  fallback?: string;
}

/**
 * Wraps a page to enforce role-based access.
 * - If unauthenticated → redirect to /login
 * - If authenticated but wrong role → redirect to fallback
 */
export function RoleGuard({ children, allowed, fallback }: RoleGuardProps) {
  const { role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      // Wrong role — send them to the appropriate dashboard
      const dest = fallback || (role === 'ADMIN' ? '/admin' : '/dashboard');
      router.replace(dest);
    }
  }, [isLoading, isAuthenticated, role]);

  // Show nothing while loading or while redirecting
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-neutral-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Wraps a page to enforce authentication only (any role).
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-neutral-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
