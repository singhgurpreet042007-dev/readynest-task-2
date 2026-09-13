import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export function TechSecurity() {
  const techStack = [
    {
      name: 'Next.js 16',
      category: 'Frontend Core',
      description: 'App Router architecture with React Server & Client Components for rapid page transitions.',
    },
    {
      name: 'TypeScript',
      category: 'Type System',
      description: 'Strict end-to-end static typing across both client and server data layers.',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling Engine',
      description: 'Minimalist Apple design system with sleek dark mode, crisp typography, and orange outlines.',
    },
    {
      name: 'Prisma ORM',
      category: 'Data Layer',
      description: 'Type-safe object-relational mapping models for Students, Attendance, Tasks, and Timetables.',
    },
    {
      name: 'Relational Database',
      category: 'Storage',
      description: 'ACID-compliant relational database storage ensuring high institutional data integrity.',
    },
    {
      name: 'JWT & Bcrypt',
      category: 'Security',
      description: 'Cryptographically signed JSON Web Tokens with salted bcrypt password hashing.',
    },
  ];

  const securityPoints = [
    {
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Strict barrier between Student and Administrator privileges across frontend routes and REST APIs.',
    },
    {
      title: 'Protected REST Endpoints',
      desc: 'Bearer token verification middleware guards all mutating academic operations.',
    },
    {
      title: 'Salted Bcrypt Hashing',
      desc: 'User credentials are salted and hashed before persistence; plain text passwords are never stored.',
    },
    {
      title: 'Decoupled Architecture',
      desc: 'Segregated frontend and backend communicating exclusively via type-safe REST contracts.',
    },
  ];

  return (
    <section id="technology" className="py-28 border-t border-white/[0.08] relative bg-[#08080a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Open typography */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-20">
          <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
            Stack & Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            Engineered on a Modern Foundation
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal pt-1">
            Full-stack engineering built with enterprise standards, strict typing, and hardened security.
          </p>
        </div>

        {/* Tech Stack: Completely open text list, NO cards, NO badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 mb-20">
          {techStack.map((tech, i) => (
            <div key={i} className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-medium">
                {tech.category}
              </span>
              <h3 className="text-lg font-semibold text-white tracking-tight">{tech.name}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Matrix: Clean open list */}
        <div className="pt-16 border-t border-white/[0.08]">
          <div className="flex items-center gap-2.5 mb-10">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Institutional Security Standards
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
            {securityPoints.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white tracking-tight">{item.title}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
