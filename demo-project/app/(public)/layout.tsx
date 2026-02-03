import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import TermsModal from '@/components/TermsModal';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
            <TermsModal />
        </>
    );
}
