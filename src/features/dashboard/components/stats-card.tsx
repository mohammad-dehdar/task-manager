import { TrendingUp, TrendingDown } from 'lucide-react';

import { cn } from '@/utils';

interface StatsCardProps {
  label: string;
  value: number;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

export function StatsCard({ label, value, trend, trendValue, color = 'bg-primary-500' }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">{label}</span>
        {trend && (
          <span className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend === 'up' ? 'text-success-600' : 'text-error-600',
          )}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-neutral-900">{value}</span>
      </div>
      <div className={cn('h-1 w-full rounded-full mt-1', color)} />
    </div>
  );
}
