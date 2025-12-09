import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">MyApp</Link>
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