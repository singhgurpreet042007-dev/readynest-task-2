import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  borderless?: boolean;
}

export function GlassCard({
  children,
  className = '',
  glow = false,
  borderless = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${
        borderless
          ? 'bg-transparent'
          : glow
          ? 'border border-orange-500/50 bg-orange-50/30'
          : 'border border-black/[0.08] bg-white hover:border-orange-500/40'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
