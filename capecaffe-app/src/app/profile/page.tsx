"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Coffee, Settings, LogOut } from "lucide-react";
import Navbar from "@/Navigation bar/Navbar";
import ContactUs from "@/ContactUs/ContactUs";

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartCount(data.cart?.items.length || 0);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Fetch user profile
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(console.error)
      .finally(() => {
        fetchCartCount().finally(() => setLoading(false));
      });
  }, []);

  const handleGoToCart = () => router.push("/cart");
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p className="pt-20 px-4">Loading profile...</p>;
  if (!user) return <p className="pt-20 px-4">No user found. Please log in.</p>;

  return (
    <><><Navbar /><>


      <div className="pt-20 px-4 max-w-3xl mx-auto">
        {/* Header with Cart */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4E342E]">My Profile</h1>
          <button
            onClick={handleGoToCart}
            className="relative p-2 rounded-full bg-[#F3E5AB] hover:bg-[#E0C97F] transition"
          >
            <ShoppingCart className="w-6 h-6 text-[#4E342E]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-[#D7CCC8] flex items-center justify-center shadow-inner">
            <User className="w-8 h-8 text-[#4E342E]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#4E342E]">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            {user.phone && <p className="text-gray-500">📞 {user.phone}</p>}
          </div>
        </div>

        {/* Profile Options */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoToCart}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:bg-[#F3E5AB] transition"
          >
            <Coffee className="w-5 h-5 text-[#4E342E]" />
            <span className="text-[#4E342E] font-medium">My Orders</span>
          </button>

          <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:bg-[#F3E5AB] transition">
            <Settings className="w-5 h-5 text-[#4E342E]" />
            <span className="text-[#4E342E] font-medium">Account Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:bg-red-50 transition text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>


    </></><ContactUs /></>
  );
};

export default Profile;
