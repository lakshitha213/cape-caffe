"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import capeLogo from "../../Assets/CApe caffe.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { User } from "lucide-react";

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

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  // ✅ Check auth state and listen for changes
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    window.location.href = "/";
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={`http://localhost:5000/api/products/${product._id}/image`}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
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
          <div className="flex items-center gap-6 ml-4 relative">
            <Link href="/">
              <h2 className={`hover:text-blue-600 transition ${isActive("/") ? "text-blue-600 font-bold" : ""}`}>Home</h2>
            </Link>
            <Link href="/menu">
              <h2 className={`hover:text-blue-600 transition ${isActive("/menu") ? "text-blue-600 font-bold" : ""}`}>Menu</h2>
            </Link>
            <Link href="/contact">
              <h2 className={`hover:text-blue-600 transition ${isActive("/contact") ? "text-blue-600 font-bold" : ""}`}>Contact</h2>
            </Link>
            <Link href="/about">
              <h2 className={`hover:text-blue-600 transition ${isActive("/about") ? "text-blue-600 font-bold" : ""}`}>About - Us</h2>
            </Link>

            {/* ✅ User dropdown (click toggle) */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <User className="w-8 h-8 text-blue-600 cursor-pointer hover:text-blue-800" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signup">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  SignUp
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
