"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { login } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading, loginUser, logoutUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isJustRegistered, setIsJustRegistered] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered') === 'true') {
        setIsJustRegistered(true);
        const regEmail = params.get('email');
        if (regEmail) setEmail(regEmail);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await login(cleanEmail, password);
      loginUser(res.user, res.token);

      if (res.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col lg:flex-row">
      {/* LEFT SIDE: Brand Showcase & Institutional Highlights */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] border-r border-white/[0.06] flex-col justify-between p-12 xl:p-16 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-orange-500/[0.08] to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl border border-orange-500/40 bg-orange-500/10 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">SmartCampus</span>
          </Link>

          <div className="mt-12 space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Unified Institutional Workspace</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
              The intelligent platform for modern campus life.
            </h1>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Real-time attendance compliance, dynamic lecture scheduling, sprint deliverables, and official broadcasts unified in a single seamless workspace.
            </p>
          </div>

          {/* Feature Highlight Cards */}
          <div className="mt-8 space-y-3 max-w-lg">
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Automated 75% Attendance Safeguard</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Real-time telemetry prevents regulatory shortage before examination cutoffs.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Interactive Timetable & Hall Allocations</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Instant class schedules, room directions, and direct faculty communication.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Academic Deliverables & Lab Writeups</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Track upcoming project deadlines with smart priorities and status sync.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial & Security Badge */}
        <div className="pt-8 border-t border-white/[0.08] space-y-3 max-w-lg">
          <p className="text-xs text-neutral-400 italic leading-relaxed">
            &ldquo;SmartCampus eliminated attendance disputes and simplified lecture coordination for over 1,400+ students and faculty.&rdquo;
          </p>
          <div className="flex items-center justify-between text-[11px] text-neutral-500">
            <span className="font-medium text-white/80">Dr. Rajesh Verma • Academic Affairs</span>
            <span className="flex items-center gap-1 font-mono text-orange-400 font-medium">
              <Lock className="w-3 h-3 text-orange-400" /> 256-Bit SSL Secured
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header Row (Mobile brand + Register toggle) */}
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg border border-orange-500/40 bg-orange-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">SmartCampus</span>
          </Link>
          <div className="ml-auto text-xs text-neutral-500">
            New student?{' '}
            <Link href="/register" className="text-orange-600 font-medium hover:underline transition">
              Create an account
            </Link>
          </div>
        </div>

        {/* Centered Form Area */}
        <div className="my-auto max-w-sm sm:max-w-md w-full mx-auto py-8 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Access your academic portal with university credentials.
            </p>
          </div>

          {!authLoading && isAuthenticated && user && (
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-500/30 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-orange-950 font-semibold">
                <UserCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Currently signed in as {user.name}</span>
              </div>
              <p className="text-orange-900 text-[11px]">
                You already have an active institutional session ({user.role === 'ADMIN' ? 'Administrator' : 'Student'}).
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="orange"
                  className="text-xs py-1.5"
                  onClick={() => router.push(user.role === 'ADMIN' ? '/admin' : '/dashboard')}
                >
                  Enter Workspace
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs py-1.5 text-neutral-600 hover:text-black"
                  onClick={logoutUser}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          )}

          {isJustRegistered && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-500/30 text-emerald-800 text-xs flex items-center gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900">Account Created Successfully!</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Your profile is permanently stored. Please sign in with your credentials.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-500/30 text-rose-700 text-xs flex items-start gap-2.5 shadow-xs">
              <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-rose-900">{error}</p>
                {error.toLowerCase().includes('register first') && (
                  <Link
                    href={`/register?email=${encodeURIComponent(email)}`}
                    className="text-orange-600 font-semibold hover:underline inline-flex items-center gap-1 mt-1 text-[11px]"
                  >
                    Register new student account now <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Campus Email"
              type="email"
              placeholder="student@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="orange"
                size="md"
                className="w-full justify-center text-sm py-2.5"
                disabled={isLoading}
                icon={isLoading ? undefined : <ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
            <span>Forgot your credentials? Contact campus IT</span>
            <Link href="/" className="hover:text-black hover:underline">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-neutral-400 pt-4">
          <span>Protected by Institutional Identity Security • ISO 27001</span>
        </div>
      </div>
    </div>
  );
}

