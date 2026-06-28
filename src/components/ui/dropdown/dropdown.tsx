'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils';

import type { DropdownProps } from './types';
import './dropdown.css';

export function Dropdown({
  trigger,
  items,
  position = 'bottom-start',
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('dropdown-wrapper', className)} ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className={cn('dropdown-menu', `dropdown-${position}`)}>
          {items.map((item, index) => (
            <button
              key={item.label + index}
              className={cn(
                'dropdown-item',
                item.destructive && 'dropdown-item-destructive',
              )}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
