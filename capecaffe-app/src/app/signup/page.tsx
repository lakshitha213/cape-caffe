"use client";

import React, { useState } from 'react';
import Navbar from "@/Navigation bar/Navbar";
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Send data to backend API
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Success - user created in MongoDB
        console.log('User created successfully:', result.user);
        
        // Save JWT token for authentication
        localStorage.setItem('token', result.token);
        
        // Show success message
        alert('Account created successfully! Welcome to Cape Caffe!');
        
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: ''
        });
        
        // Redirect to login page
        window.location.href = '/login';
        
      } else {
        // Handle errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          alert(result.message || 'Signup failed. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('Network error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
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
              Join Cape Caffe
            </h1>
            <p className="text-stone-600">Create your account and start your coffee journey</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 ring-1 ring-white/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                      errors.firstName ? 'border-red-300' : 'border-stone-200'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                      errors.lastName ? 'border-red-300' : 'border-stone-200'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

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
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.phone ? 'border-red-300' : 'border-stone-200'
                  }`}
                  placeholder="(+94) 712345678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password Fields */}
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
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl bg-white/60 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.confirmPassword ? 'border-red-300' : 'border-stone-200'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 transition duration-200 transform ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white shadow-amber-200/60 hover:shadow-amber-300/70 hover:brightness-105 hover:-translate-y-[1px]'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-stone-200"></div>
              <span className="px-4 text-xs uppercase tracking-wider text-stone-500">or</span>
              <div className="flex-1 border-t border-stone-200"></div>
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              <button className="w-full bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-800 py-3 px-4 rounded-xl font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 transition shadow-sm">
                Continue with Google
              </button>
              <button className="w-full bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-800 py-3 px-4 rounded-xl font-medium hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 transition shadow-sm">
                Continue with Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center mt-6 text-stone-600">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-800 hover:text-amber-900 font-semibold underline underline-offset-4 decoration-2">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center mt-4 text-xs text-stone-600">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline underline-offset-4 decoration-2 hover:text-amber-900">Terms of Service</a> and{' '}
            <a href="#" className="underline underline-offset-4 decoration-2 hover:text-amber-900">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
