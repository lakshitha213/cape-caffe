"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/Navigation bar/Navbar";
import ContactUs from "@/ContactUs/ContactUs";
import { Trash2 } from "lucide-react";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data.cart?.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  if (loading) return <p className="pt-20 px-4">Loading cart...</p>;
  if (!cartItems.length) return <p className="pt-20 px-4">Your cart is empty.</p>;

  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
            >
              <div>
                <h2 className="font-semibold">{item.productId.name}</h2>
                <p>${item.productId.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.productId._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-xl shadow flex justify-between items-center">
          <span className="font-bold text-xl">Total:</span>
          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <ContactUs />
    </>
  );
};

export default CartPage;
