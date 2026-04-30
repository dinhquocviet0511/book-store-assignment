import { LoadingState } from '@/components/ui/loading-state';
import { COPY } from '@/constants/copy';

export default function Loading() {
  return <LoadingState label={COPY.state.loadingBooks} />;
}
