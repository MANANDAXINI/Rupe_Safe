import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'RupeSafe - Technology Solutions Company',
  description: 'RupeSafe is a technology solutions company that helps businesses build, grow, and scale in the digital world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
