import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'orange' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: 'px-3 py-1 text-[11px] rounded-full gap-1.5 font-medium tracking-tight',
    md: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5 font-medium tracking-tight',
    lg: 'px-4.5 py-2 text-xs sm:text-[13px] rounded-full gap-2 font-medium tracking-tight',
  };

  const variantStyles = {
    primary:
      'bg-[#1d1d1f] text-white hover:bg-[#333336] shadow-sm active:scale-[0.98]',
    orange:
      'bg-orange-500 text-white hover:bg-orange-600 border border-orange-500 shadow-sm active:scale-[0.98]',
    secondary:
      'border border-black/[0.12] bg-white text-[#1d1d1f] hover:bg-neutral-50 hover:border-black/25 active:scale-[0.98]',
    outline:
      'border border-orange-500/50 text-orange-600 bg-orange-50/40 hover:bg-orange-50 hover:border-orange-500 active:scale-[0.98]',
    danger:
      'border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-[0.98]',
    ghost:
      'text-neutral-600 hover:text-black hover:bg-black/[0.04] active:scale-[0.98]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
      {children}
    </button>
  );
}
