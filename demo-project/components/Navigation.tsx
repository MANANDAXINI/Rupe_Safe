'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';
import { px } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bg-slate-950 md:bg-white shadow-md shadow-slate-900/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center h-full gap-2">
              <div className="rounded-full bg-slate-900 p-1 shadow-sm shadow-slate-950/20">
                <Image
                  src="/images/RupexaLogo.jpeg"
                  alt="Rupexa Private Limited Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                  priority
                />
              </div>
              <span className="text-white text-sm font-semibold hidden sm:inline">Rupexa</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Section */}
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <span className="max-w-[150px] truncate text-sm">{user.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center cursor-pointer bg-indigo-50">
                          <Shield className="w-4 h-4 mr-2 text-indigo-600" />
                          <span className="text-indigo-600 font-semibold">Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-[1001] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-screen w-full bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-slate-950/70 flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-700/70">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="rounded-full bg-slate-900 p-1 shadow-sm shadow-slate-950/20">
                <Image
                  src="/images/RupexaLogo.jpeg"
                  alt="Rupexa Private Limited Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </div>
              <span className="text-slate-100 text-sm font-semibold">Rupexa</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-slate-100">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-3 px-3 text-base rounded-lg border border-transparent transition-all ${
                  pathname === link.path
                    ? 'text-white bg-white/15 border-white/25'
                    : 'text-slate-100 hover:bg-slate-800/80 hover:text-white hover:border-slate-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto px-4 py-4 border-t border-slate-700/70 bg-slate-950/90">
            {loading ? (
              <div className="flex justify-start py-2">
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            ) : user ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-base text-white/95 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-base text-cyan-200 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center gap-2 text-base text-red-200 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}