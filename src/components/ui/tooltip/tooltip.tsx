'use client';

import { cn } from '@/utils';

import type { TooltipProps } from './types';
import './tooltip.css';

export function Tooltip({
  content,
  position = 'top',
  children,
  className,
}: TooltipProps) {
  return (
    <div className={cn('tooltip-trigger', className)}>
      {children}
      <div className={cn('tooltip-content', `tooltip-${position}`)}>
        {content}
      </div>
    </div>
  );
}
