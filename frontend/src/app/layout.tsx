import type { Metadata } from 'next';
import { Header } from '@/components/ui/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'BookHaven',
  description: 'Online bookshop assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
