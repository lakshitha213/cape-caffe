"use client";

import ContactUs from "@/ContactUs/ContactUs";
import Navbar from "@/Navigation bar/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
        // 👇 Change backend URL if your server runs on another port/domain
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
    <div>
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Our Menu</h1>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Discover our handcrafted coffee selections made with premium beans sourced
            from sustainable farms around the world.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-semibold">Unable to load menu</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

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
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-semibold text-amber-800 border-b-2 border-amber-300 pb-2 mb-6">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex">
                      <div className="w-1/3 relative">
                        <Image
                          src={`http://localhost:5000/api/products/${item._id}/image`}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // fallback if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallbackDiv =
                              target.nextElementSibling as HTMLElement | null;
                            if (fallbackDiv) {
                              fallbackDiv.style.display = "flex";
                            }
                          }}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-amber-200 flex items-center justify-center hidden">
                          <span className="text-amber-700 text-sm">Coffee Image</span>
                        </div>
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-amber-900">
                            {item.name}
                          </h3>
                          <span className="text-amber-700 font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-amber-600 text-sm mt-2">{item.description}</p>
                        <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition">
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <div className="bg-amber-100 rounded-xl p-6 text-center mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Daily Special</h2>
          <p className="text-amber-700 mb-4">
            Try our featured drink of the day:{" "}
            <span className="font-semibold">Hazelnut Latte</span> - 20% off!
          </p>
          <button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition">
            View Today&apos;s Specials
          </button>
        </div>
      </div>
      <ContactUs />
    </div>
  );
}
