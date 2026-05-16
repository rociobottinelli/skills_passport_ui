import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', padding = true, hover = false, onClick }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl shadow-sm border border-gray-100';
  const paddingStyles = padding ? 'p-6' : '';
  const hoverStyles = hover ? 'cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5' : '';

  return (
    <div onClick={onClick} className={`${baseStyles} ${paddingStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
