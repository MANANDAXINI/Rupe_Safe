'use client';

import { useState } from 'react';
import Link from 'next/link';
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

  // Hide navbar on admin pages and admin signin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">RupeSafe</span>
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
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  {/* Admin Dashboard Link - Only show if user is admin */}
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center cursor-pointer bg-blue-50">
                          <Shield className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-blue-600 font-semibold">Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  pathname === link.path
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center px-4 mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name || 'User'}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>

                    {/* Admin Dashboard - Mobile */}
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-base font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="w-4 h-4 mr-3" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 px-4">
                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
