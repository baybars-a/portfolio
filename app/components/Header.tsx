'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  data: { name: string; };
}

const navLinks = [
  { href: '#home', id: 'home', label: 'HOME' },
  { href: '#projects', id: 'projects', label: 'PROJECTS' },
  { href: '#work-experience', id: 'work-experience', label: 'EXPERIENCE' },
  { href: '#about', id: 'about', label: 'ABOUT' },
  { href: '#certifications', id: 'certifications', label: 'CONTACT' },
];

const Header: React.FC<HeaderProps> = ({ data: _data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const lastScroll = useRef(0);

  // Hide on scroll down, reveal on scroll up (and always near the top).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80 || y < lastScroll.current) setHidden(false);
      else if (y > lastScroll.current && y > 120 && !isMenuOpen) setHidden(true);
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-center px-6 py-4">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeId === link.id ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link-animated inline-block text-xs font-mono tracking-widest uppercase px-1 py-0.5 overflow-hidden ${
                  activeId === link.id ? 'is-active' : ''
                }`}
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle — terminal bracket token */}
        <button
          type="button"
          className="md:hidden font-mono text-base text-crt-text px-2 py-1 rounded bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '[ x ]' : '[ ≡ ]'}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-start gap-1 px-6 pb-4 bg-black/95 backdrop-blur-sm border-b border-accent/20">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeId === link.id ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link-animated inline-block py-2 px-3 text-xs font-mono tracking-widest uppercase overflow-hidden ${
                  activeId === link.id ? 'is-active' : ''
                }`}
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
