"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  ClipboardList,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { register } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading: authLoading, logoutUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [course, setCourse] = useState('B.Tech Computer Science');
  const [semester, setSemester] = useState('Semester 1');
  const [department, setDepartment] = useState('School of Computing');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      if (emailParam) {
        setEmail(emailParam);
      }
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanEnrollment = enrollmentNumber.trim();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: cleanName,
        email: cleanEmail,
        password,
        enrollmentNumber: cleanEnrollment || `ENR${Math.floor(100000 + Math.random() * 900000)}`,
        course: course.trim(),
        semester: semester.trim(),
        department: department.trim(),
      });

      router.push(`/login?registered=true&email=${encodeURIComponent(cleanEmail)}`);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col lg:flex-row">
      {/* LEFT SIDE: Brand Showcase & Student Advantages */}
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
              <span>Student Registration • 2026 Term</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
              Begin your academic journey with unified campus utilities.
            </h1>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Create your verified student profile to unlock real-time attendance telemetry, personalized course timetables, and academic sprint trackers.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="mt-8 space-y-3 max-w-lg">
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Direct 75% Regulatory Compliance</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Never get debarred from semester examinations with proactive attendance forecasts.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <CalendarCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Instant Lecture Schedules</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Synchronized with faculty updates, room allocations, and department notices.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex items-start gap-3.5 hover:border-orange-500/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                <ClipboardList className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Deliverable & Research Sprint Board</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  Organize laboratory assignments, term projects, and thesis milestones effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats / Trust */}
        <div className="pt-8 border-t border-white/[0.08] space-y-3 max-w-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-0.5">
              <p className="text-lg font-bold text-white">1,420+</p>
              <p className="text-[10px] text-neutral-500 uppercase font-medium">Students</p>
            </div>
            <div className="space-y-0.5 border-x border-white/[0.08]">
              <p className="text-lg font-bold text-orange-400">8 Depts</p>
              <p className="text-[10px] text-neutral-500 uppercase font-medium">Connected</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-lg font-bold text-white">99.9%</p>
              <p className="text-[10px] text-neutral-500 uppercase font-medium">Uptime</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Registrar Directory Verified
            </span>
            <span className="flex items-center gap-1 font-mono text-orange-400 font-medium">
              <Lock className="w-3 h-3 text-orange-400" /> 256-Bit SSL
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Signup Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header Row (Mobile brand + Login toggle) */}
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg border border-orange-500/40 bg-orange-50 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">SmartCampus</span>
          </Link>
          <div className="ml-auto text-xs text-neutral-500">
            Already registered?{' '}
            <Link href="/login" className="text-orange-600 font-medium hover:underline transition">
              Sign in here
            </Link>
          </div>
        </div>

        {/* Centered Form Area */}
        <div className="my-auto max-w-sm sm:max-w-md w-full mx-auto py-8 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Register your student profile with institutional credentials.
            </p>
          </div>

          {!authLoading && isAuthenticated && user && (
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-500/30 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-orange-950 font-semibold">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
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

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-500/30 text-rose-700 text-xs flex items-start gap-2.5 shadow-xs">
              <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-rose-900">{error}</p>
                {error.toLowerCase().includes('already registered') && (
                  <Link
                    href={`/login?email=${encodeURIComponent(email)}`}
                    className="text-orange-600 font-semibold hover:underline inline-flex items-center gap-1 mt-1 text-[11px]"
                  >
                    Sign in with your existing account <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                placeholder="Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
              <Input
                label="Campus Email"
                type="email"
                placeholder="aarav@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Enrollment ID"
                placeholder="21BCSE104"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                disabled={isLoading}
                required
              />
              <Input
                label="Course / Degree"
                placeholder="B.Tech Computer Science"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Semester"
                placeholder="Semester 6"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                disabled={isLoading}
              />
              <Input
                label="Department"
                placeholder="School of Computing"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Input
              label="Password (min 6 characters)"
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
                {isLoading ? 'Creating Permanent Account...' : 'Complete Registration'}
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
            <span>By registering, you agree to Campus Honor Code</span>
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

