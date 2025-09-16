"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/Navigation bar/Navbar";
import ContactUs from "@/ContactUs/ContactUs";
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

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  // Add product to cart API call
  const handleAddToOrder = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT saved at login
      if (!token) {
        alert("Please log in to add items to your cart.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product?._id,
          quantity,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      const data = await res.json();
      alert(`${quantity} x ${product?.name} added to cart! ✅`);
      console.log("Updated cart:", data.cart);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  if (loading) return <p className="text-center mt-24">Loading...</p>;
  if (error) return <p className="text-center mt-24 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-24">Product not found</p>;

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-md p-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative h-80">
            <Image
              src={`http://localhost:5000/api/products/${product._id}/image`}
              alt={product.name}
              fill
              className="object-cover rounded-2xl"
              unoptimized
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
              <p className="text-amber-700 text-lg mb-4">{product.description}</p>
              <p className="text-amber-900 font-bold text-2xl mb-4">
                ${totalPrice}{" "}
                <span className="text-sm font-medium text-amber-700">
                  (${product.price.toFixed(2)} each)
                </span>
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold text-amber-800">Quantity:</span>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-amber-200 px-3 py-1 rounded-lg text-amber-900 font-bold hover:bg-amber-300 transition"
                >
                  -
                </button>
                <span className="text-amber-900 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-amber-200 px-3 py-1 rounded-lg text-amber-900 font-bold hover:bg-amber-300 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToOrder}
                className="bg-amber-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-amber-700 transition"
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default ProductDetailsPage;
