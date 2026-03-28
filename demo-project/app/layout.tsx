import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Rupexa Private Limited - Online Payment Solution',
  description: 'Rupexa Private Limited is a leading fintech company providing secure online payment solutions and technology services. Block No.101/102, Shriram Tower Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001. Contact: +91 9067488273, care@rupexa.in, info@rupexa.in',
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
