import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-200';

  const variants = {
    primary: 'bg-[var(--sp-violet)] text-white hover:opacity-90 active:scale-[0.98]',
    secondary: 'bg-[var(--sp-gray-light)] text-[var(--sp-gray-dark)] hover:bg-gray-200 active:scale-[0.98]',
    ghost: 'text-[var(--sp-violet)] hover:bg-[var(--sp-gray-light)] active:scale-[0.98]',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
