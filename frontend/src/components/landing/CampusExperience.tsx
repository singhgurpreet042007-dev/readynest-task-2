import Image from 'next/image';
import {
  ClipboardCheck,
  CalendarDays,
  CheckSquare,
  Bell,
} from 'lucide-react';

export function CampusExperience() {
  return (
    <section id="campus-experience" className="py-28 border-t border-black/[0.06] bg-white text-[#1d1d1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Open typography */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
            Campus Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.12]">
            Connected Campus. Seamless Discipline.
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal pt-1">
            Smart Campus Utility connects students with academic records and empowers administrators with transparent institutional governance.
          </p>
        </div>

        {/* Visual Container */}
        <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] bg-neutral-100 transition duration-300 hover:border-orange-500/40 shadow-lg">
          <div className="relative aspect-[21/9] min-h-[360px] w-full">
            <Image
              src="/images/campus-experience.jpg"
              alt="Modern University Campus Architecture"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Minimalist Frosted Bottom Bar */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-white/90 backdrop-blur-md border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight">Live Campus Telemetry</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-3.5 h-3.5 text-orange-600" />
                <span>Attendance: 87.4% (Good Standing)</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-neutral-500" />
                <span>Daily Classes: 4</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pending Tasks: 3</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-neutral-500" />
                <span>New Circulars: 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
