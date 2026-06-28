import type { ReactNode } from 'react';

export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface DropdownItem {
  label: string;
  value?: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: DropdownPosition;
  className?: string;
}
