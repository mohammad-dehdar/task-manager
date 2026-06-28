'use client';

import { useState } from 'react';

import { cn } from '@/utils';

import type { AvatarProps } from './types';
import './avatar.css';

export function Avatar({
  size = 'md',
  fallback,
  status,
  src,
  alt,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showImage = src && !imgError;
  const initials = fallback || alt?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className={cn('avatar-wrapper', className)}>
      <div className={cn('avatar', `avatar-${size}`)}>
        {showImage ? (
          <img
            src={src}
            alt={alt || ''}
            onError={() => setImgError(true)}
            className="rounded-full object-cover w-full h-full"
            {...props}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span className={cn('avatar-status', `avatar-status-${status}`)} />
      )}
    </div>
  );
}
