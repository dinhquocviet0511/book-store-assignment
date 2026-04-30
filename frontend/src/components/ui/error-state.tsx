'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COPY } from '@/constants/copy';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900"
      role="alert"
    >
      <h2 className="text-lg font-semibold">{COPY.state.errorTitle}</h2>
      <p className="mt-2 text-sm leading-6">{message}</p>
      {onRetry ? (
        <Button className="mt-4" onClick={onRetry} variant="secondary">
          <RefreshCw aria-hidden="true" size={16} />
          {COPY.state.retry}
        </Button>
      ) : null}
    </div>
  );
}
