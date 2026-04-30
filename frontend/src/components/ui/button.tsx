import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-teal-800 focus-visible:ring-accent disabled:bg-slate-300',
  secondary:
    'border border-slate-300 bg-white text-ink hover:bg-slate-50 focus-visible:ring-slate-400',
  ghost: 'bg-transparent text-ink hover:bg-slate-100 focus-visible:ring-slate-400',
  danger:
    'border border-red-200 bg-white text-red-700 hover:bg-red-50 focus-visible:ring-red-300',
};

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
