import React from 'react';
import { Layers, Sparkles, Zap, Shield } from 'lucide-react';

export function WhyUs() {
  const points = [
    {
      num: '01',
      icon: Layers,
      title: 'One Unified Platform',
      description: 'Everything students need in one place — tasks, attendance, schedules, and verified official alerts without app switching.',
    },
    {
      num: '02',
      icon: Sparkles,
      title: 'Smart Academic Control',
      description: 'Organize academic activities efficiently with dynamic deadline trackers, regulatory threshold alerts, and previews.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Real-Time Campus Sync',
      description: 'Important campus information is easily accessible with zero delay, instant announcements, and verified accuracy.',
    },
    {
      num: '04',
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Different experiences tailored for students and administrators, secured by cryptographic JSON Web Tokens.',
    },
  ];

  return (
    <section id="why-us" className="py-28 border-t border-b border-black/[0.06] bg-white text-[#1d1d1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header: Open and spacious */}
        <div className="space-y-3 mb-20 text-left max-w-2xl">
          <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
            Why Smart Campus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.12]">
            Integrated Architecture for Academia
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal pt-1">
            A purposeful design that replaces fragmented portals with an integrated campus operating system.
          </p>
        </div>

        {/* 4 Items: Completely open text, no boxes, generous breathing room */}
        <div className="grid sm:grid-cols-2 gap-x-20 gap-y-14">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div key={i} className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-orange-600 font-semibold">
                    {pt.num}
                  </span>
                  <div className="w-px h-3.5 bg-black/10" />
                  <Icon className="w-4 h-4 text-neutral-400" />
                </div>

                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                  {pt.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
