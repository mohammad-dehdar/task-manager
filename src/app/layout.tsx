import type { Metadata } from 'next';

import { poppins, dana } from '@/config/fonts/fonts';
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
      className={`${poppins.variable} ${dana.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
