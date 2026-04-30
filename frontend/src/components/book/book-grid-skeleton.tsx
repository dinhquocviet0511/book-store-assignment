import { COPY } from '@/constants/copy';

const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

export function BookGridSkeleton() {
  return (
    <div aria-label={COPY.state.loadingBooks} role="status">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skeletonItems.map((item) => (
          <div
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
            key={item}
          >
            <div className="aspect-[4/5] animate-pulse bg-slate-200" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-16 w-full animate-pulse rounded bg-slate-100" />
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
                <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
