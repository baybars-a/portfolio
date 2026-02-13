'use client';

import React, { useState } from 'react';

interface HeaderProps {
  data: { name: string; };
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'HOME' },
    { href: '#projects', label: 'WORKS' },
    { href: '#about', label: 'ABOUT' },
    { href: '#contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900">
      <nav className="flex justify-between items-center">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex w-full justify-between">
          {navLinks.map((link) => (
            <li key={link.href} className="flex-1 text-center">
              <a
                href={link.href}
                className="nav-link-animated inline-block px-8 py-3 text-white text-sm tracking-widest font-medium relative overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden text-white p-4 mx-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-2 pb-4 bg-gray-900">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link-animated inline-block px-8 py-3 text-white text-sm tracking-widest font-medium relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;