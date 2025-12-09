'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useEffect, useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [isChecking, setIsChecking] = useState(true);

    const isSignInPage = pathname === '/admin/signin';

    useEffect(() => {
        if (isSignInPage) {
            setIsChecking(false);
            return;
        }

        // Verify auth status with the backend
        fetch('/api/admin/check-auth')
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => {
                if (data.authenticated) {
                    setEmail(data.user.email);
                } else {
                    router.push('/admin/signin');
                }
            })
            .catch(() => {
                router.push('/admin/signin');
            })
            .finally(() => {
                setIsChecking(false);
            });
    }, [isSignInPage, router]);

    if (isSignInPage) {
        return <div className="min-h-screen bg-slate-100">{children}</div>;
    }

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar is fixed on the left */}
            <div className="fixed inset-y-0 left-0 z-50 w-64">
                <AdminSidebar />
            </div>
            
            {/* Main content has a left margin to clear the sidebar */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col">
                <AdminHeader email={email || 'Admin'} />
                <div className="p-6 flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
