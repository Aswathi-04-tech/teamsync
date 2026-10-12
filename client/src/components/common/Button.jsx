import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component with purple & indigo gradient options and state transitions
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-brand-600 via-brand-500 to-purpleBrand-600 hover:from-brand-500 hover:to-purpleBrand-500 text-white shadow-glow hover:shadow-lg hover:shadow-brand-500/25 border border-brand-400/20',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 shadow-sm',
    outline:
      'bg-transparent hover:bg-brand-500/10 text-brand-300 border border-brand-500/40 hover:border-brand-400',
    ghost:
      'bg-transparent hover:bg-slate-800/80 text-slate-300 hover:text-white',
    danger:
      'bg-rose-600/90 hover:bg-rose-600 text-white shadow-sm border border-rose-500/30',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none ${
        variantStyles[variant] || variantStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
