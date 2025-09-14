"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/Navigation bar/Navbar";
import ContactUs from "@/ContactUs/ContactUs";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: {
    data: string;
    contentType: string;
  };
}

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categorizedItems = products.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [] as Product[];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
          <p className="text-amber-700 mt-4">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-amber-900 mb-4 tracking-wide">
            Our Menu
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Discover our handcrafted coffee creations made with <br />
            <span className="font-semibold">premium beans</span> from sustainable farms around the world.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 shadow-sm">
            <p className="font-semibold">Unable to load menu</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Categories */}
        {Object.keys(categorizedItems).length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">
              No menu items available
            </h2>
            <p className="text-amber-600">
              Please check back later or contact us for our current offerings.
            </p>
          </div>
        ) : (
          Object.entries(categorizedItems).map(([category, items]) => (
            <div key={category} className="mb-20">
              <h2 className="text-3xl font-bold text-amber-900 border-b-4 border-amber-400 inline-block pb-2 mb-10">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {items.map((item) => (
                  <Link key={item._id} href={`/products/${item._id}`}>
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
                      <div className="flex">
                        {/* Image */}
                        <div className="w-1/3 relative overflow-hidden h-40 md:h-48">
                          <Image
                            src={`http://localhost:5000/api/products/${item._id}/image`}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                        </div>

                        {/* Info */}
                        <div className="w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                              <span className="text-amber-700 font-bold text-lg">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-amber-600 text-sm mt-2 line-clamp-3">{item.description}</p>
                          </div>
                          <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition">
                            Add to Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Daily Special */}
        <div className="bg-gradient-to-r from-amber-200 to-amber-100 rounded-2xl p-10 text-center shadow-lg mt-20">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">✨ Daily Special ✨</h2>
          <p className="text-amber-800 mb-6 text-lg">
            Today&apos;s featured drink:{" "}
            <span className="font-semibold text-amber-900">Hazelnut Latte</span>{" "}
            — <span className="text-green-700 font-bold">20% Off</span>!
          </p>
          <button className="bg-amber-700 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-amber-800 transition">
            View Today&apos;s Specials
          </button>
        </div>
      </div>
      <ContactUs />
    </div>
  );
}
