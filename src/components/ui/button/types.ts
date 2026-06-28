import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'ghost' | 'link';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'gray' | 'white';
export type ButtonSize = 'text-xs' | 'text-sm' | 'text-md' | 'text-lg';
export type ButtonIconSize = 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconSize?: ButtonIconSize;
  rounded?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  as?: 'button';
  href?: never;
}

export interface ButtonAsLinkProps extends ButtonBaseProps {
  as: 'link';
  href: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
