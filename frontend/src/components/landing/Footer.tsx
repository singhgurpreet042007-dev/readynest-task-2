import Link from 'next/link';
import { GraduationCap, Code2, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#fbfbfd] text-neutral-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg border border-orange-500/40 bg-orange-50 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">SmartCampus</span>
            </Link>

            <p className="text-neutral-500 text-xs max-w-sm leading-relaxed font-normal">
              Intelligent academic utility platform connecting students and faculty. Designed with minimalist Apple engineering for modern institutional discipline.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-neutral-500 hover:text-black hover:border-orange-500/60 transition-colors"
                title="GitHub"
              >
                <Code2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:contact@smartcampus.edu"
                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-neutral-500 hover:text-black hover:border-orange-500/60 transition-colors"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-orange-600 transition-colors">Student Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-orange-600 transition-colors">Admin Console</Link></li>
              <li><Link href="/login" className="hover:text-orange-600 transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-orange-600 transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Column 3: Utilities */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider">Utilities</p>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/attendance" className="hover:text-orange-600 transition-colors">Attendance Tracker</Link></li>
              <li><Link href="/timetable" className="hover:text-orange-600 transition-colors">Lecture Timetable</Link></li>
              <li><Link href="/tasks" className="hover:text-orange-600 transition-colors">Assignments & Sprints</Link></li>
              <li><Link href="/notices" className="hover:text-orange-600 transition-colors">Campus Circulars</Link></li>
              <li><Link href="/profile" className="hover:text-orange-600 transition-colors">Profile & Identity</Link></li>
            </ul>
          </div>

          {/* Column 4: Architecture */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider">Architecture</p>
            <ul className="space-y-2.5 text-xs text-neutral-500">
              <li>Next.js 16 App Router</li>
              <li>TypeScript Strict Mode</li>
              <li>Express.js REST APIs</li>
              <li>Prisma ORM & SQLite</li>
              <li>JWT & Bcrypt Hashing</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright hairline */}
        <div className="mt-14 pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 Smart Campus Utility Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Engineered with precision for modern academia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
