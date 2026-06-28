import { cn } from '@/utils';

import type { BadgeProps } from './types';
import './badge.css';

export function Badge({
  color = 'neutral',
  size = 'md',
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cn('badge', `badge-${size}`, `badge-${color}`, className)}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
