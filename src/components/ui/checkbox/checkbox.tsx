'use client';

import { Check, Minus } from 'lucide-react';

import { cn } from '@/utils';

import type { CheckboxProps } from './types';
import './checkbox.css';

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  size = 'md',
  label,
  indeterminate = false,
  disabled = false,
  id,
  ...props
}) => {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label
      className={cn('checkbox-wrapper', `checkbox-${size}`, className)}
      data-disabled={disabled}
      htmlFor={checkboxId}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className="checkbox-input"
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        {...props}
      />
      <span className="checkbox-control">
        {indeterminate ? (
          <Minus size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} color="#ffffff" />
        ) : (
          <Check size={size === 'sm' ? 10 : size === 'md' ? 12 : 14} color="#ffffff" />
        )}
      </span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};
