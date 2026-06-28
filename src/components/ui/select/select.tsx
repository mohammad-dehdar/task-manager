import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils';

import type { SelectProps } from './types';
import './select.css';

export const Select: React.FC<SelectProps> = ({
  className,
  size = 'md',
  state = 'default',
  label,
  hint,
  placeholder,
  options,
  startIcon,
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="select-wrapper">
      {label && (
        <label className="input-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className="select-field-wrapper">
        {startIcon && <span className="select-icon-start">{startIcon}</span>}
        <select
          id={selectId}
          className={cn('select', `select-${size}`, `select-${state}`, className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="select-chevron" size={16} />
      </div>
      {hint && (
        <p className={cn('input-hint', state === 'error' && 'input-hint-error')}>
          {hint}
        </p>
      )}
    </div>
  );
};
