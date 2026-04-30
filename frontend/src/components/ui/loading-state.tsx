import { LoaderCircle } from 'lucide-react';
import { COPY } from '@/constants/copy';
import { cn } from '@/lib/cn';

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({
  label = COPY.state.loading,
  className,
}: LoadingStateProps) {
  return (
    <div
      aria-label={label}
      className={cn(
        'flex min-h-52 flex-col items-center justify-center gap-3 text-muted',
        className,
      )}
      role="status"
    >
      <LoaderCircle aria-hidden="true" className="animate-spin" size={28} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
