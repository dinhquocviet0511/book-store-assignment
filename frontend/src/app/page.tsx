import { BookGrid } from '@/components/book/book-grid';
import { BookSearch } from '@/components/book/book-search';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { COPY } from '@/constants/copy';
import { fetchBooks } from '@/lib/api';

export const dynamic = 'force-dynamic';

type HomePageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

function getSearchQuery(value: string | string[] | undefined): string {
  const query = Array.isArray(value) ? value[0] : value;
  return query?.trim() ?? '';
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const search = getSearchQuery(params.q);
  const books = await fetchBooks({ cache: 'no-store', search });

  return (
    <Container className="py-8 sm:py-10">
      <section className="mb-8 flex flex-col gap-5">
        <p className="text-sm font-semibold uppercase text-accent">
          {COPY.home.kicker}
        </p>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
            {COPY.home.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted">
            {COPY.home.subtitle}
          </p>
        </div>
        <BookSearch defaultValue={search} />
      </section>

      {books.length > 0 ? (
        <BookGrid books={books} />
      ) : (
        <EmptyState
          message={COPY.home.noResultsMessage}
          title={COPY.home.noResultsTitle}
        />
      )}
    </Container>
  );
}
