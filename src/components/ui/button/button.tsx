'use client';

import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '@/utils';

import type { ButtonProps } from './types';
import './button.css';

export function Button({
  as = 'button',
  variant = 'fill',
  color = 'primary',
  size = 'text-md',
  rounded = false,
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  loadingText,
  startIcon,
  endIcon,
  href,
  className,
  children,
  ...props
}: ButtonProps & { children?: ReactNode }) {
  const classes = cn(
    'button',
    variant !== 'link' && `button-${variant}`,
    `button-${color}`,
    size && variant !== 'link' && `button-${size}`,
    rounded && 'button-rounded',
    fullWidth && 'button-full-width',
    isLoading && 'button-loading',
    className,
  );

  const content = (
    <>
      {isLoading && (
        <LoaderCircle className="button-spinner" size={16} />
      )}
      {!isLoading && startIcon}
      {isLoading && loadingText ? loadingText : children}
      {!isLoading && endIcon}
    </>
  );

  if (as === 'link' && href) {
    return (
      <Link href={href} className={classes} aria-disabled={isDisabled}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
