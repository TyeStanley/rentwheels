import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans as plusJakartaSans } from 'next/font/google';

import '@/app/globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';

const font = plusJakartaSans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rentwheels',
  description: 'Car renting made easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
