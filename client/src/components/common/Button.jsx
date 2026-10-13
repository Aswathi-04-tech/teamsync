// import React from 'react';
// import { Loader2 } from 'lucide-react';

// /**
//  * Reusable Button component with purple & indigo gradient options and state transitions
//  */
// const Button = ({
//   children,
//   variant = 'primary',
//   size = 'md',
//   isLoading = false,
//   disabled = false,
//   icon: Icon,
//   iconPosition = 'left',
//   onClick,
//   type = 'button',
//   className = '',
//   ...props
// }) => {
//   const variantStyles = {
//     primary:
//       'bg-gradient-to-r from-brand-600 via-brand-500 to-purpleBrand-600 hover:from-brand-500 hover:to-purpleBrand-500 text-white shadow-glow hover:shadow-lg hover:shadow-brand-500/25 border border-brand-400/20',
//     secondary:
//       'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 shadow-sm',
//     outline:
//       'bg-transparent hover:bg-brand-500/10 text-brand-300 border border-brand-500/40 hover:border-brand-400',
//     ghost:
//       'bg-transparent hover:bg-slate-800/80 text-slate-300 hover:text-white',
//     danger:
//       'bg-rose-600/90 hover:bg-rose-600 text-white shadow-sm border border-rose-500/30',
//   };

//   const sizeStyles = {
//     sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
//     md: 'px-4 py-2 text-sm rounded-xl gap-2',
//     lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none ${
//         variantStyles[variant] || variantStyles.primary
//       } ${sizeStyles[size] || sizeStyles.md} ${className}`}
//       {...props}
//     >
//       {isLoading ? (
//         <Loader2 className="w-4 h-4 animate-spin text-current" />
//       ) : (
//         <>
//           {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
//           {children}
//           {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
//         </>
//       )}
//     </button>
//   );
// };

// export default Button;

import React from "react";
import { Loader2, ArrowRight } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600
      text-white
      shadow-lg shadow-violet-600/20
      hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500
      hover:shadow-xl hover:shadow-violet-600/30
      border border-white/10
    `,

    secondary: `
      bg-slate-800 text-slate-100
      border border-slate-700
      hover:bg-slate-700 hover:border-slate-600
      shadow-sm
    `,

    outline: `
      bg-transparent text-violet-300
      border border-violet-500/40
      hover:bg-violet-500/10
      hover:border-violet-400 hover:text-violet-200
    `,

    ghost: `
      bg-transparent text-slate-300
      hover:bg-white/5 hover:text-white
    `,

    danger: `
      bg-gradient-to-r from-rose-600 to-red-600
      text-white border border-rose-400/20
      shadow-lg shadow-rose-600/15
      hover:from-rose-500 hover:to-red-500
      hover:shadow-xl hover:shadow-rose-600/25
    `,

    success: `
      bg-gradient-to-r from-emerald-600 to-teal-600
      text-white border border-emerald-400/20
      shadow-lg shadow-emerald-600/15
      hover:from-emerald-500 hover:to-teal-500
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-xs rounded-lg gap-2",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        group relative inline-flex items-center justify-center
        overflow-hidden whitespace-nowrap
        font-semibold tracking-wide
        transition-all duration-300 ease-out
        active:scale-[0.97]
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-violet-400
        focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:shadow-none
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {/* Subtle hover shine */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        transition-transform duration-700
        group-hover:translate-x-full
        pointer-events-none"
      />

      <span className="relative inline-flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
            )}

            {children}

            {Icon && iconPosition === "right" && (
              <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default Button;

