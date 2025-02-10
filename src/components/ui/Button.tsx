import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  icon: Icon, 
  variant = 'primary',
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`
        p-2 rounded-lg transition-colors
        ${variant === 'primary' 
          ? 'hover:bg-gray-800/50 text-[#CFB53B]' 
          : 'hover:bg-gray-700/50 text-gray-300'}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}