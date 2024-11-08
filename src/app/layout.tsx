// src/app/layout.tsx
import React from "react";
import Link from "next/link";
import { FaHome, FaInfoCircle, FaEnvelope, FaLeaf } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
        {/* Navbar Modern Spiritual */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2 text-purple-800">
                <FaLeaf className="text-2xl" />
                <span className="text-xl font-bold">Spiritual Journey</span>
              </div>

              {/* Navigation Links */}
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <FaHome />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <FaInfoCircle />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <FaEnvelope />
                    <span>Admin</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content Area with Top Padding */}
        <main className="flex-grow pt-20 container mx-auto px-4">
          {children}
        </main>

        {/* Footer Modern Spiritual */}
        <footer className="bg-white/80 backdrop-blur-md py-6 shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-purple-800 mb-4 md:mb-0">
                <FaLeaf className="text-2xl" />
                <span className="font-bold">Spiritual Journey</span>
              </div>
              <p className="text-gray-600">
                © 2024 Spiritual Journey. Embrace Your Inner Path.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Social Media Icons */}
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <FaLeaf />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <FaInfoCircle />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
