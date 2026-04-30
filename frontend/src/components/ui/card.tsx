import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
