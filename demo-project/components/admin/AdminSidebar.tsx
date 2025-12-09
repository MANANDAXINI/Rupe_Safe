'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Users, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout', { method: 'POST' });
            window.location.href = '/';
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }
                  `}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sign Out Button */}
                    <div className="p-4 border-t border-gray-700">
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
