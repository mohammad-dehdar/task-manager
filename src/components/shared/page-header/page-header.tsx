import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/utils';

import type { PageHeaderProps } from './types';

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-neutral-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={14} />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-neutral-800 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-800">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className={cn('flex items-center justify-between', actions && 'gap-4')}>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-neutral-500">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
