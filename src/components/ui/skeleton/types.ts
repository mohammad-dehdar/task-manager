export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonWidth = 'full' | '1/2' | '1/3' | '1/4' | 'auto';
export type SkeletonHeight = 'sm' | 'md' | 'lg' | 'xl';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: SkeletonWidth;
  height?: SkeletonHeight;
  className?: string;
}
