import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'neutral', size = 'sm', className = '' }: BadgeProps) {
  const variantStyles = {
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    purple: 'bg-orange-50 text-orange-700 border-orange-200',
    neutral: 'bg-neutral-50 text-neutral-600 border-neutral-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-[11px]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border tracking-tight ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
