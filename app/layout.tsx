import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import AOSInit from '@/components/AOSInit';
import ContentProtection from '@/components/ContentProtection';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'LULE — Brand & Digital Experience',
  description: 'LULE connects the right message with a distinctive brand to create a coherent experience.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className={geist.className}>
        <AOSInit />
        <ContentProtection />
        {children}
      </body>
    </html>
  );
}
