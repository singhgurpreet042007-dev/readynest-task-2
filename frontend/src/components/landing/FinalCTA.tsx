import Link from 'next/link';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/Button';

export function FinalCTA() {
  return (
    <section className="py-32 border-t border-black/[0.06] relative bg-white text-[#1d1d1f] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-500/30 bg-orange-50 text-orange-600 text-xs font-medium tracking-tight">
          <span>Transform Campus Management</span>
        </div>

        {/* Display Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.08] max-w-3xl mx-auto">
          Intelligent Utilities for Higher Education.
        </h2>

        {/* Open Subtext */}
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed font-normal">
          Unify attendance calculations, academic timetables, deliverables and administrative notices in one modern, distraction-free portal.
        </p>

        {/* CTAs: Open, minimal buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link href="/register">
            <Button size="md" variant="orange" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Get Started Free
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="md"
              variant="secondary"
              icon={<LayoutDashboard className="w-3.5 h-3.5" />}
            >
              Student Portal
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
