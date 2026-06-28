import type { Metadata } from 'next';

import { fontSans, fontDana } from '@/config/fonts';
import { Providers } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A modern task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDana.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
