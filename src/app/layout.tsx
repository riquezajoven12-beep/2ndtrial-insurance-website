import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Tharmanathan Insurance Agency | Licensed Great Eastern Advisor Malaysia',
  description: 'Trusted Great Eastern advisor helping Malaysian families secure medical, life, and retirement protection with clear guidance and zero sales pressure.',
  keywords: 'Insurance Advisor Malaysia, Medical Card Malaysia, Life Insurance Malaysia, Great Eastern Agent PJ',
  openGraph: {
    title: 'Protect Your Family With The Right Insurance | A Tharmanathan Insurance Agency',
    description: 'Licensed Great Eastern advisor. Get a free coverage assessment today.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
