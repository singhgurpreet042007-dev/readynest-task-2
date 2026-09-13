"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white text-[#1d1d1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag with subtle orange outline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[11px] font-medium tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Smart Campus Operating System</span>
            </div>

            {/* Headline: Impactful Apple display size */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08]">
              Smart Campus.{' '}
              <span className="text-neutral-500 font-normal">
                Smarter Student Life.
              </span>
            </h1>

            {/* Subtext: Open, comfortable reading width */}
            <p className="text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed font-normal">
              One unified platform to manage academic records, attendance limits, lecture timetables, and campus broadcasts with precision.
            </p>

            {/* CTAs: Minimalist pill buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/register">
                <Button size="md" variant="orange">
                  Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="md" variant="secondary">
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Key Metrics: Clean inline text, completely open, no boxes */}
            <div className="pt-8 flex items-center gap-8 sm:gap-10 flex-wrap text-left border-t border-black/[0.08]">
              <div>
                <p className="text-2xl sm:text-3xl font-light text-[#1d1d1f] tracking-tight">99.9%</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-tight font-medium mt-0.5">Platform Uptime</p>
              </div>
              <div className="w-px h-8 bg-black/[0.08] hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-light text-orange-600 tracking-tight">75%+</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-tight font-medium mt-0.5">Attendance Limit</p>
              </div>
              <div className="w-px h-8 bg-black/[0.08] hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-light text-[#1d1d1f] tracking-tight">Real-Time</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-tight font-medium mt-0.5">Campus Sync</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean visual without floating box chips */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] hover:border-orange-500/40 bg-neutral-50 transition-all duration-300 group shadow-lg">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/campus-hero.jpg"
                  alt="Modern University Campus Architecture"
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
