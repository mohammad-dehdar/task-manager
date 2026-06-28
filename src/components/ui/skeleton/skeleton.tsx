import { cn } from '@/utils';

import type { SkeletonProps } from './types';
import './skeleton.css';

export function Skeleton({
  variant = 'text',
  width = 'full',
  height = 'md',
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        `skeleton-${variant}`,
        `skeleton-w-${width}`,
        `skeleton-${height}`,
        className,
      )}
      aria-hidden="true"
    />
  );
}
