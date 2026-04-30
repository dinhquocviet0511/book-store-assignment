import { render, screen } from '@testing-library/react';
import { ErrorState } from './error-state';
import { LoadingState } from './loading-state';

describe('state components', () => {
  test('renders accessible loading and error states', () => {
    render(<LoadingState label="Loading books" />);

    expect(screen.getByRole('status')).toHaveAccessibleName('Loading books');

    render(<ErrorState message="Failed to fetch books" />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Failed to fetch books',
    );
  });
});
