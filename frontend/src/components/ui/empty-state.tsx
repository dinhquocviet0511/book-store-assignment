import { BookOpen } from 'lucide-react';
import type { ReactNode } from 'react';
import { COPY } from '@/constants/copy';

type EmptyStateProps = {
  title: string;
  message?: string;
  action?: ReactNode;
};

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <BookOpen aria-hidden="true" className="text-accent" size={36} />
      <h2 className="mt-4 text-xl font-semibold text-ink">
        {title || COPY.state.empty}
      </h2>
      {message ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
