'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut, User, Shield, ArrowRight } from 'lucide-react';
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

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
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
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 transition-all font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo Left Side */}
          <div className="flex items-center h-full">
            <Link href="/" className="flex-shrink-0 flex items-center h-full group relative w-[130px]">
              <Image
                src="/images/RupexaLogo.jpeg"
                alt="Rupexa Logo"
                width={120}
                height={120}
                className="absolute top-1/2 left-0 -translate-y-1/2 h-[74px] w-auto max-w-none object-contain mix-blend-multiply pointer-events-none"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6 xl:space-x-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center h-full px-2 text-[14px] font-[500] tracking-tight text-[#192839] hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
                {/* Subtle highlight bar */}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex lg:items-center h-full">

            {/* Multinational Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md transition-colors mr-3 outline-none">
                  <img src="https://flagcdn.com/w40/in.png" alt="India flag" className="w-6 h-auto rounded-[1px] shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white z-[1000] mt-1">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-2">
                  <img src="https://flagcdn.com/w40/in.png" alt="India flag" className="w-6 h-auto rounded-[1px] shadow-sm" />
                  <span className="font-medium text-[#192839]">India (IN)</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-2">
                  <img src="https://flagcdn.com/w40/us.png" alt="US flag" className="w-6 h-auto rounded-[1px] shadow-sm" />
                  <span className="font-medium text-[#192839]">United States (US)</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-2">
                  <img src="https://flagcdn.com/w40/my.png" alt="Malaysia flag" className="w-6 h-auto rounded-[1px] shadow-sm" />
                  <span className="font-medium text-[#192839]">Malaysia (MY)</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-2">
                  <img src="https://flagcdn.com/w40/eu.png" alt="Europe flag" className="w-6 h-auto rounded-[1px] shadow-sm" />
                  <span className="font-medium text-[#192839]">Europe (EU)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-gray-200 mr-6"></div>

            {/* Auth Section */}
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 border-gray-200">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <span className="max-w-[150px] truncate text-sm font-medium text-[#192839]">{user.name || 'User'}</span>
                    <ChevronDown className="w-4 h-4 text-[#192839]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">{user.name || 'User'}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer font-medium text-slate-700">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center cursor-pointer bg-blue-50/50 hover:bg-blue-50 font-medium text-blue-700">
                          <Shield className="w-4 h-4 mr-2" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer font-medium">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/signin" className="text-[14px] font-[600] text-blue-700 hover:text-blue-800 tracking-tight transition-colors">
                  Login
                </Link>
                <Link href="/auth/signup">
                  <button className="bg-[#305eff] hover:bg-blue-700 text-white font-[600] px-5 py-[10px] rounded-lg shadow-sm text-[14px] flex items-center gap-2 tracking-tight transition-all">
                    Sign Up
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#192839] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed inset-0 z-[1001] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-screen w-full sm:w-80 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="h-[72px] px-4 flex items-center justify-between border-b border-gray-100">
            <span className="text-[#192839] text-xl font-bold">Rupexa</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-md">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-4 flex flex-col gap-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-3 px-3 text-base font-medium rounded-lg transition-all ${pathname === link.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-[#192839] hover:bg-gray-50 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto px-4 py-6 border-t border-gray-100 bg-gray-50/50">
            {loading ? (
              <div className="flex justify-center py-2">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : user ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 text-base font-medium text-[#192839] px-3 py-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5 text-gray-500" />
                  My Profile
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 text-base font-medium text-blue-700 px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-5 h-5" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center w-full gap-3 text-base font-medium text-red-600 px-3 py-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full text-blue-700 border-blue-200 hover:bg-blue-50 h-12 font-semibold">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#305eff] hover:bg-blue-700 text-white h-12 font-semibold rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}