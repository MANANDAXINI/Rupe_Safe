'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

interface AdminHeaderProps {
    email: string;
}

export default function AdminHeader({ email }: AdminHeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        // We just need to delete the cookie. An API route could also do this.
        document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        toast.success('Successfully logged out');
        router.push('/admin/signin');
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">System Overview</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        {email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{email}</span>
                </div>

                <div className="h-6 w-[1px] bg-gray-200" />

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full px-4 transition-all"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
        </header>
    );
}