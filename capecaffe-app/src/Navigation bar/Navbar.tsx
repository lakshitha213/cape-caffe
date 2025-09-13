"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import capeLogo from "../../Assets/CApe caffe.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Search state
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // Filter products based on search input
  useEffect(() => {
    if (!search) {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

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

          {/* Search Bar */}
          <div className="flex-1 flex justify-center relative">
            <input
              type="text"
              placeholder="Search by product or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Dropdown Results */}
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {filteredProducts.map((product) => (
                  <Link key={product._id} href={`/menu#${product._id}`}>
                    <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {/* Optimized Product Image */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={`http://localhost:5000/api/products/${product._id}/image`}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized // remove this if you want Next.js optimization
                        />
                      </div>

                      {/* Name & Category */}
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                          {product.name}
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">{product.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 ml-4">
            <Link href="/">
              <h2 className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600 font-bold' : ''}`}>Home</h2>
            </Link>
            <Link href="/menu">
              <h2 className={`hover:text-blue-600 transition ${isActive('/menu') ? 'text-blue-600 font-bold' : ''}`}>Menu</h2>
            </Link>
            <Link href="/contact">
              <h2 className={`hover:text-blue-600 transition ${isActive('/contact') ? 'text-blue-600 font-bold' : ''}`}>Contact</h2>
            </Link>
            <Link href="/about">
              <h2 className={`hover:text-blue-600 transition ${isActive('/about') ? 'text-blue-600 font-bold' : ''}`}>About - Us</h2>
            </Link>
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
