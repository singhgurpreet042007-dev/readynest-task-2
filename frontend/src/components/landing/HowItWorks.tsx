import React from 'react';
import { UserCheck, SlidersHorizontal, BellRing } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Sign In Securely',
      description:
        'Students and faculty access role-specific workspaces using cryptographic JWT credentials and authenticated routes.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Track Campus Utilities',
      description:
        'Manage personalized attendance ratios, daily lecture timetables, and academic assignment sprints in one place.',
      icon: SlidersHorizontal,
    },
    {
      step: '03',
      title: 'Maintain 75% Threshold',
      description:
        'Monitor predictive alerts, review verified university circulars, and submit lab deliverables with complete peace of mind.',
      icon: BellRing,
    },
  ];

  return (
    <section id="how-it-works" className="py-28 border-t border-b border-black/[0.06] relative bg-white text-[#1d1d1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Open and spacious */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-20">
          <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
            Three Steps
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.12]">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal pt-1">
            From seamless credential onboarding to daily academic discipline in seconds.
          </p>
        </div>

        {/* 3 Steps: Open text, completely box-free, generous breathing room */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative space-y-4 text-left">
                {/* Step number and icon */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-light text-orange-500/40 font-mono">
                    {item.step}
                  </span>
                  <div className="w-px h-6 bg-black/10" />
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>

                <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
