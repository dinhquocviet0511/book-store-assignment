import { Search } from 'lucide-react';
import { COPY } from '@/constants/copy';

type BookSearchProps = {
  defaultValue?: string;
};

export function BookSearch({ defaultValue = '' }: BookSearchProps) {
  return (
    <form action="/" className="flex w-full max-w-xl gap-2">
      <label className="sr-only" htmlFor="book-search">
        {COPY.home.searchAria}
      </label>
      <input
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        defaultValue={defaultValue}
        id="book-search"
        name="q"
        placeholder={COPY.home.searchPlaceholder}
        type="search"
      />
      <button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        type="submit"
      >
        <Search aria-hidden="true" size={16} />
        <span className="hidden sm:inline">{COPY.home.search}</span>
      </button>
    </form>
  );
}
