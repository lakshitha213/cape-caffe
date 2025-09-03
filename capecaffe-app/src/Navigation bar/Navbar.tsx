"use client";
import React from 'react';
import Image from 'next/image';
import capeLogo from '../../Assets/CApe caffe.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use next/navigation instead of next/router

const Navbar = () => {
  const pathname = usePathname(); // Get current path for active styling
  
  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white z-50 navhead border-b border-gray-300 shadow-md px-4 py-2">
        <div className="flex items-center w-full gap-4">
          {/* Logo */}
          <Link href="/">
            <Image src={capeLogo} alt="Cape caffe Logo" width={100} height={100} />
          </Link>

          {/* Site Name */}
          <Link href="/">
            <h1 className="font-bold italic text-xl whitespace-nowrap">Cape Caffe</h1>
          </Link>

          {/* Spacer before search bar */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 ml-4">
            <Link href="/">
              <h2 className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600 font-bold' : ''}`}>
                Home
              </h2>
            </Link>
            <Link href="/menu">
              <h2 className={`hover:text-blue-600 transition ${isActive('/menu') ? 'text-blue-600 font-bold' : ''}`}>
                Menu
              </h2>
            </Link>
            <Link href="/contact">
              <h2 className={`hover:text-blue-600 transition ${isActive('/contact') ? 'text-blue-600 font-bold' : ''}`}>
                Contact
              </h2>
            </Link>
            <Link href="/about">
              <h2 className={`hover:text-blue-600 transition ${isActive('/about') ? 'text-blue-600 font-bold' : ''}`}>
                About - Us
              </h2>
            </Link>

            {/* Sign Up Button */}
            <Link href="/signup">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              SignUp
            </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;