import React from 'react';
import Image from 'next/image';
import capeLogo from '../../Assets/CApe caffe.png';

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white z-50 navhead border-b border-gray-300 shadow-md px-4 py-2">
        <div className="flex items-center w-full gap-4">
          {/* Logo */}
          <button>
            <Image src={capeLogo} alt="Cape caffe Logo" width={100} height={100} />
          </button>

          {/* Site Name */}
          <button>
            <h1 className="font-bold italic text-xl whitespace-nowrap">Cape Caffe</h1>
          </button>

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
            <button><h2 className="hover:text-blue-600 transition">Home</h2></button>
            <button><h2 className="hover:text-blue-600 transition">Menu</h2></button>
            <button><h2 className="hover:text-blue-600 transition">Contact</h2></button>
            <button><h2 className="hover:text-blue-600 transition">About - Us</h2></button>

            {/* Sign Up Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              SignUp
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
//yes