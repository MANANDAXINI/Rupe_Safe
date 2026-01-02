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
            document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = '/admin/signin';
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                className="lg:hidden fixed top-5 left-5 z-50 p-2.5 rounded-xl bg-black text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-white/5
          transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center px-8 h-24">
                        <div className="flex items-center gap-3 group cursor-pointer text-white">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                                <Settings className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight">RupeSafe</h1>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-none mt-1">Admin Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden
                                        ${isActive
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
                                    )}
                                    <item.icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'group-hover:text-blue-400'}`} />
                                    {item.name}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Sign Out */}
                    <div className="p-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <Button
                                onClick={handleSignOut}
                                variant="ghost"
                                className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl h-10 transition-all font-medium"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-500 animate-in fade-in"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
