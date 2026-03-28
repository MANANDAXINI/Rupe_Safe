'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Users, ShoppingCart, Handshake, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Partners', href: '/admin/partners', icon: Handshake },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'KYC Requests', href: '/admin/kyc', icon: ShieldCheck },
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
          fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-slate-200
          transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center px-6 h-20 border-b border-slate-50">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                                <Settings className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold tracking-tight text-slate-900">Rupexa Private Limited</h1>
                                <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest leading-none mt-1">Admin Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                                        group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 relative overflow-hidden
                                        ${isActive
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 w-1 h-5 bg-blue-600 rounded-r-full" />
                                    )}
                                    <item.icon className={`w-4.5 h-4.5 mr-3 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-500'}`} />
                                    {item.name}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Sign Out */}
                    <div className="p-4 border-t border-slate-50">
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 border border-transparent rounded-xl h-10 transition-all font-semibold text-sm"
                        >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                        </Button>
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
