import { cn } from '@/utils';

import type { InputProps } from './types';
import './input.css';

export const Input: React.FC<InputProps> = ({
  className,
  size = 'md',
  state = 'default',
  label,
  hint,
  startIcon,
  endIcon,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="input-field-wrapper">
        {startIcon && <span className="input-icon-start">{startIcon}</span>}
        <input
          id={inputId}
          className={cn('input', `input-${size}`, `input-${state}`, className)}
          {...props}
        />
        {endIcon && <span className="input-icon-end">{endIcon}</span>}
      </div>
      {hint && (
        <p className={cn('input-hint', state === 'error' && 'input-hint-error')}>
          {hint}
        </p>
      )}
    </div>
  );
};
