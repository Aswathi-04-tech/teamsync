import React from 'react';

/**
 * Reusable Card container with frosted glassmorphism and subtle gradient borders
 */
const Card = ({
  children,
  title,
  subtitle,
  action,
  variant = 'glass',
  className = '',
  bodyClassName = '',
  headerClassName = '',
  onClick,
  hoverable = false,
}) => {
  const variantStyles = {
    glass: 'bg-slate-900/60 backdrop-blur-md border border-slate-800/80 shadow-soft',
    solid: 'bg-slate-900 border border-slate-800 shadow-md',
    gradient: 'bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-950/30 border border-brand-500/20 shadow-glow',
    flat: 'bg-slate-950 border border-slate-800/60',
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-glow cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden ${variantStyles[variant] || variantStyles.glass} ${hoverStyles} ${className}`}
    >
      {(title || subtitle || action) && (
        <div className={`px-6 py-4 border-b border-slate-800/60 flex items-center justify-between ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
