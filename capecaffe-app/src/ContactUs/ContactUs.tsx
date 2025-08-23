import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-white grid md:grid-cols-2 gap-10">
        
        {/* Left Section - Description */}
        <div className="flex flex-col justify-center p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to CapeCaffe</h2>
          <p className="text-gray-300 leading-relaxed">
            CapeCaffe is more than just a coffee shop; it&apos;s a destination. 
            We fuse the rich, comforting aroma of expertly crafted coffee 
            with the vibrant energy of pop culture. 
            Come for the perfect espresso, stay for the nostalgia, 
            community, and events that celebrate the stories you love.
          </p>

          {/* Divider */}
          <hr className="border-gray-700 my-8" />

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" />
              <a href="mailto:cape@caffee.com" className="hover:underline">
                cape@caffee.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <a href="tel:+94712365125" className="hover:underline">
                +94 71 236 5125
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <p>No 79/B, Akkara 06, Thirawala, Vitharandeniya</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
              <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="p-6 flex flex-col justify-center bg-gray-900 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full p-3 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
