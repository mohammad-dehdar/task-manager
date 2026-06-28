import type { ReactNode } from 'react';

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'neutral'
  | 'warning';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  color?: BadgeColor;
  size?: BadgeSize;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}
