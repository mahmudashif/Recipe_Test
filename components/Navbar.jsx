"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Recipe App
            </Link>
          </div>

          {/* Right side - Navigation & User Info */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/recipes" className="hover:text-blue-200">
              Recipes
            </Link>
            <Link href="/cart" className="hover:text-blue-200">
              Cart
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Cart Link with potential counter */}

                {/* User dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-blue-200">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-blue-200">{user.email}</span>
                  </button>

                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as
                      <br />
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
