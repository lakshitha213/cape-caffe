"use client";

import React, { useState } from 'react';
import Navbar from "@/Navigation bar/Navbar";
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <Navbar />
      
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl"></div>
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-orange-300/20 blur-[80px]"></div>
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-stone-300/20 blur-3xl"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-stone-900 via-amber-900 to-stone-900 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-stone-600">Sign in to your Cape Caffe account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 ring-1 ring-white/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.email ? 'border-red-300' : 'border-stone-200'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.password ? 'border-red-300' : 'border-stone-200'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-800 focus:ring-amber-700 border-stone-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-stone-600">
                    Remember me
                  </label>
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-amber-800 hover:text-amber-900 underline underline-offset-4 decoration-2"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 transition duration-200 transform hover:-translate-y-[1px]"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-stone-200"></div>
              <span className="px-4 text-xs uppercase tracking-wider text-stone-500">or</span>
              <div className="flex-1 border-t border-stone-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-800 py-3 px-4 rounded-xl font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 transition shadow-sm">
                Continue with Google
              </button>
              <button className="w-full bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-800 py-3 px-4 rounded-xl font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 transition shadow-sm">
                Continue with Facebook
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center mt-6 text-stone-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-amber-800 hover:text-amber-900 font-semibold underline underline-offset-4 decoration-2">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-stone-600">
              By signing in, you agree to our{' '}
              <a href="#" className="underline underline-offset-4 decoration-2 hover:text-amber-900">Terms of Service</a> and{' '}
              <a href="#" className="underline underline-offset-4 decoration-2 hover:text-amber-900">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
