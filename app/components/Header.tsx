'use client';

import React, { useState } from 'react';

interface HeaderProps {
  data: { name: string; };
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="py-4 md:py-12">
      <nav className="flex justify-between items-center">
        <a
          href=""
          className="text-lg md:text-2xl font-bold text-white hover:text-gray-300 transition-colors"
        >
          {data.name}
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-base">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden text-white p-2"
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
        <ul className="md:hidden mt-4 flex flex-col space-y-4 text-base">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;