import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'match' | 'alert' | 'neutral' | 'validated' | 'pending' | 'unvalidated';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'primary', size = 'md', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap';

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  const variants = {
    primary: 'bg-[var(--sp-violet-light)] text-[var(--sp-violet)]',
    match: 'bg-[var(--sp-match-green-bg)] text-[var(--sp-match-green)]',
    alert: 'bg-[var(--sp-alert-coral-bg)] text-[var(--sp-alert-coral)]',
    neutral: 'bg-[var(--sp-gray-light)] text-[var(--sp-gray-medium)]',
    validated: 'bg-[var(--sp-match-green-bg)] text-[var(--sp-match-green)]',
    pending: 'bg-[var(--sp-amber-bg)] text-[var(--sp-amber)]',
    unvalidated: 'bg-[var(--sp-gray-light)] text-[var(--sp-gray-medium)]',
  };

  const variantClass = className ? '' : variants[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
