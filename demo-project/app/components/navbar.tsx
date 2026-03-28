import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/images/RupexaLogo.jpeg" alt="Rupexa Logo" width={40} height={40} />
          </Link>
          <span className="text-white text-lg font-bold hidden sm:inline">Rupexa Private Limited</span>
        </div>
        <div className="space-x-4">
          <Link href="/services" className="text-white hover:underline">Services</Link>
          <Link href="/about" className="text-white hover:underline">About</Link>
          <Link href="/contact" className="text-white hover:underline">Contact</Link>
          <Link href="/blogs" className="text-white hover:underline">Blogs</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;