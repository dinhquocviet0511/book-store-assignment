import { CheckCircle2 } from 'lucide-react';

type ToastProps = {
  message: string;
  show: boolean;
};

export function Toast({ message, show }: ToastProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="absolute bottom-4 left-4 right-4 inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white shadow-soft"
      role="status"
    >
      <CheckCircle2 aria-hidden="true" size={16} />
      {message}
    </div>
  );
}
