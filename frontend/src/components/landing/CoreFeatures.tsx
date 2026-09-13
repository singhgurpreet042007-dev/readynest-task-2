import Image from 'next/image';
import Link from 'next/link';
import {
  ClipboardCheck,
  CalendarDays,
  CheckSquare,
  Bell,
  ArrowRight,
} from 'lucide-react';

export function CoreFeatures() {
  const features = [
    {
      badge: 'Attendance System',
      title: 'Attendance Monitoring & Goal Predictor',
      description:
        'Monitor real-time subject percentages and receive predictive calculations to keep attendance above regulatory 75% thresholds with single-click logging.',
      image: '/images/smart-classroom.jpg',
      icon: ClipboardCheck,
      reverse: false,
      link: '/attendance',
      highlights: [
        'Automated 75% regulatory limit warning alerts',
        'Present and absent single-click log controls',
        'Subject-wise class ratio breakdown',
      ],
    },
    {
      badge: 'Academic Schedules',
      title: 'Interactive Daily & Weekly Timetable',
      description:
        'Eliminate lecture confusion with clear day-by-day views, room locations, faculty indicators, and ongoing class status tags updated dynamically.',
      image: '/images/students-collab.jpg',
      icon: CalendarDays,
      reverse: true,
      link: '/timetable',
      highlights: [
        'Live hour status indicator and active lecture pulse',
        'Designated room numbers and professors',
        'Direct schedule management editor for faculty',
      ],
    },
    {
      badge: 'Productivity Hub',
      title: 'Academic Tasks & Submission Deadlines',
      description:
        'Stay ahead of coursework with dedicated assignment tracking. Group deliverables by Todo, In Progress, and Completed statuses with priority indicators.',
      image: '/images/campus-hero.jpg',
      icon: CheckSquare,
      reverse: false,
      link: '/tasks',
      highlights: [
        'Priority tagging (High, Medium, Low)',
        'Submission countdown dates and overdue alerts',
        'Status update transitions with real-time sync',
      ],
    },
    {
      badge: 'Campus Broadcast',
      title: 'Centralized Notices & Circulars',
      description:
        'Never miss university circulars. Filter announcements by Exam schedules, Academic guidelines, Events, and Urgent infrastructural updates.',
      image: '/images/smart-classroom.jpg',
      icon: Bell,
      reverse: true,
      link: '/notices',
      highlights: [
        'Categorized feeds (Academic, Exams, Events)',
        'Verified administrative broadcasts with author badges',
        'Instant search filter for fast document discovery',
      ],
    },
  ];

  return (
    <section id="features" className="py-28 border-t border-black/[0.06] bg-white text-[#1d1d1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-24 text-left max-w-2xl">
          <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.12]">
            Capabilities Built for Academic Precision
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal pt-1">
            Clean interfaces designed to solve real university workflow bottlenecks for both students and faculty.
          </p>
        </div>

        {/* Feature Rows: Open text, spacious, no heavy cards */}
        <div className="space-y-28">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  feat.reverse ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Side: Open typography */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    feat.reverse ? 'lg:col-start-7' : ''
                  }`}
                >
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-600">
                    <Icon className="w-4 h-4 text-orange-600" />
                    <span className="tracking-wide uppercase text-[11px] font-semibold">{feat.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                    {feat.description}
                  </p>

                  <ul className="space-y-2 pt-1 text-xs text-neutral-600">
                    {feat.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span className="text-xs text-neutral-700">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <Link
                      href={feat.link}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors group"
                    >
                      <span>Explore {feat.badge}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Visual Side: Clean image, fine border, no floating chips */}
                <div
                  className={`lg:col-span-6 ${
                    feat.reverse ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden border border-black/[0.08] hover:border-orange-500/40 transition-all duration-300 bg-neutral-50 group shadow-md">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                      <Image
                        src={feat.image}
                        alt={feat.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
