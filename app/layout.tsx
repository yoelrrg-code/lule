import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import AOSInit from '@/components/AOSInit';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'LULE — Brand & Digital Experience',
  description: 'LULE connects the right message with a distinctive brand to create a coherent experience.',
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
        {children}
      </body>
    </html>
  );
}
