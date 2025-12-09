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
        toast.success('You have been logged out.');
        router.push('/admin/signin');
        router.refresh();
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b">
            <div /> {/* For spacing */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">{email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
        </header>
    );
}