import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
  variant?: 'default' | 'primary' | 'success';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  variant = 'default',
  className 
}: StatsCardProps) {
  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-lg',
        variant === 'primary' && 'bg-gradient-energy text-primary-foreground border-transparent',
        variant === 'success' && 'bg-success text-success-foreground border-transparent',
        variant === 'default' && 'bg-card hover:border-primary/20',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
          )}>
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className={cn(
              'text-sm',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend.positive ? 'text-success' : 'text-destructive',
              variant !== 'default' && 'text-inherit opacity-90'
            )}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% с прошлой недели</span>
            </div>
          )}
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl',
          variant === 'default' ? 'bg-accent' : 'bg-background/10'
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
