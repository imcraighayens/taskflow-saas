import './globals.css';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'TaskFlow SaaS',
  description: 'Collaborative task management with Next.js and Supabase',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}