import React from 'react';

/**
 * Reusable PageHeader with title, description, badge, and custom action slots
 */
const PageHeader = ({
  title,
  description,
  badge,
  children,
  breadcrumb,
  className = '',
}) => {
  return (
    <div className={`mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800/60 ${className}`}>
      <div>
        {breadcrumb && (
          <div className="text-xs text-brand-400 font-medium mb-1 tracking-wide uppercase">
            {breadcrumb}
          </div>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center flex-wrap gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
