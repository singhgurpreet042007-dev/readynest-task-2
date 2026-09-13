import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../hooks/useAuth';

export const metadata: Metadata = {
  title: 'Smart Campus Utility | Academic & Campus Management Platform',
  description:
    'One intelligent platform to manage academics, attendance, schedules, notices, and everyday university activities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1d1d1f] min-h-screen antialiased selection:bg-orange-500/20 selection:text-orange-700">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
