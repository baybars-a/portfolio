'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    // Give Lenis time to initialise before calculating scroll positions
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    const ctx = gsap.context(() => {
      // ── Hero entrance (y only — no opacity conflict with the scrub below) ──
      gsap.from('#hero-content', {
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Hero scroll-out: content drifts up + fades (scrub reverses on scroll-up)
      gsap.to('#hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // Hero blur: whole section blurs on scroll-down, clears on scroll-up
      gsap.to('#home', {
        filter: 'blur(18px)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: '65% top',
          scrub: true,
        },
      });

      // ── Section reveals ───────────────────────────────────────────────
      // immediateRender: false = elements stay visible until the trigger fires,
      // avoiding the "pre-hidden on page load" bug.

      // Projects
      gsap.from('#projects h2', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#projects', start: 'top 88%', once: true },
      });
      gsap.from('#projects .grid > *', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#projects .grid', start: 'top 88%', once: true },
      });

      // Work Experience
      gsap.from('#work-experience h2', {
        x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#work-experience', start: 'top 88%', once: true },
      });
      gsap.from('#work-experience .space-y-12 > div', {
        x: -50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#work-experience .space-y-12', start: 'top 88%', once: true },
      });

      // About
      gsap.from('#about img', {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#about', start: 'top 82%', once: true },
      });
      gsap.from('#about h2, #about p', {
        x: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#about', start: 'top 82%', once: true },
      });

      // Certifications
      gsap.from('#experience h2', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#experience', start: 'top 88%', once: true },
      });
      gsap.from('#experience .grid > div', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '#experience .grid', start: 'top 88%', once: true },
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return null;
}
