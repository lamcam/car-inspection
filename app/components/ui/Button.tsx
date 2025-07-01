'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'start' | 'resume';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'px-4 py-2 rounded transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    start: 'bg-green-600 text-white hover:bg-green-700',
    resume: 'bg-yellow-500 text-white hover:bg-yellow-600',
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {loading ? 'Đang xử lý...' : children}
    </button>
  );
}
