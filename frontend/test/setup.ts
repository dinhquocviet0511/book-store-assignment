import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    ...props
  }: {
    src: string | { src: string };
    alt: string;
    fill?: boolean;
    priority?: boolean;
  }) =>
    React.createElement('img', {
      src: typeof src === 'string' ? src : src.src,
      alt,
      ...props,
    }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement('a', { href, ...props }, children),
}));
