import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-[11px] font-medium text-neutral-600 tracking-tight">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none transition duration-150 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 disabled:opacity-40 ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-rose-500">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-neutral-500">{helperText}</p>}
    </div>
  );
}
