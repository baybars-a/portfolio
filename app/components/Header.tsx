'use client';

import React, { useState } from 'react';

interface HeaderProps {
  data: { name: string; };
}

const Header: React.FC<HeaderProps> = ({ data: _data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'HOME' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#work-experience', label: 'EXPERIENCE' },
    { href: '#about', label: 'ABOUT' },
    { href: '#certifications', label: 'CERTIFICATIONS' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-sm border-b border-white/10 opacity-0 animate-fade-in-up">
      <nav className="max-w-6xl mx-auto flex items-center justify-center px-6 py-4">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link-animated inline-block text-gray-300 text-xs font-mono tracking-widest uppercase px-1 py-0.5 overflow-hidden"
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden text-gray-300 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <ul className="md:hidden flex flex-col items-start gap-1 px-6 pb-4 bg-neutral-950 border-b border-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link-animated inline-block py-2 px-3 text-gray-300 text-xs font-mono tracking-widest uppercase overflow-hidden"
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
