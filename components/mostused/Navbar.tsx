'use client'; 

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className={`relative w-full px-6 py-4 flex items-center justify-between font-sans border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-stone-950 text-stone-50 border-stone-800' 
        : 'bg-white text-stone-950 border-stone-100'
    }`}>
      
      {/* Left side: Brand Logo & Title */}
      <div className="flex-shrink-0 z-10">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
          <img 
            src="/logo.png" 
            alt="ARC Logo" 
            className="w-10 h-10 rounded-full object-cover border border-stone-200 transition-transform duration-200 group-hover:scale-105"
          />
          <span className={`font-semibold text-lg tracking-wide transition-colors ${
            darkMode ? 'text-stone-50' : 'text-stone-950'
          }`}>
            Abdul Rahman Carpets
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8 text-sm font-medium transition-colors ${
        darkMode ? 'text-stone-300' : 'text-stone-800'
      }`}>
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Home
        </Link>
        <Link href="/who-we-are" className="hover:text-amber-600 transition-colors">
          Who We Are
        </Link>
        <Link href="/collection" className="hover:text-amber-600 transition-colors">
          Collection
        </Link>
        <Link href="/product-details" className="hover:text-amber-600 transition-colors">
          Product Details
        </Link>
        <Link href="/contact" className="hover:text-amber-600 transition-colors">
          Contact Us
        </Link>
      </div>

      {/* Right side: Dark / Bright Mode Icon Button */}
      <div className="flex-shrink-0 z-10">
        <button
          onClick={toggleDarkMode}
          className={`p-2.5 rounded-full border transition-all duration-300 ${
            darkMode 
              ? 'bg-stone-900 border-stone-800 text-amber-400 hover:bg-stone-800 hover:text-amber-300' 
              : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            /* Sun Icon (Bright Mode Logo) */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.58-1.58m12.42-12.42l1.58-1.58M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
          ) : (
            /* Moon Icon (Dark Mode Logo) */
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>

    </nav>
  );
}