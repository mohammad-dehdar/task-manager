import { cn } from '@/utils';

import type { TextareaProps } from './types';
import './textarea.css';

export const Textarea: React.FC<TextareaProps> = ({
  className,
  size = 'md',
  state = 'default',
  label,
  hint,
  resize = 'vertical',
  id,
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={textareaId}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'textarea',
          `textarea-${size}`,
          `textarea-${state}`,
          `textarea-resize-${resize}`,
          className,
        )}
        {...props}
      />
      {hint && (
        <p className={cn('input-hint', state === 'error' && 'input-hint-error')}>
          {hint}
        </p>
      )}
    </div>
  );
};
