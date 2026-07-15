"use client"

import { Suspense, lazy, useEffect, useRef, useState } from "react"

const DitheringLazy = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

const certifications = [
  { company: "IBM",          role: "Machine Learning with Python",                     },
  { company: "IBM",          role: "IBM Z Xplore",                                     },
  { company: "IBM",          role: "Fundamentals of Encryption & Quantum-Safe",        },
  { company: "Databricks",   role: "Generative AI Fundamentals",                      },
  { company: "Databricks",   role: "Databricks Fundamentals",                         },
  { company: "FreeCodeCamp", role: "Scientific Computing with Python",                },
  { company: "Microsoft",    role: "Foundational C# with Microsoft",                  },
]

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/baybars-alzibdeh" },
  { label: "GitHub", href: "https://github.com/baybars-a/" },
  { label: "Email", href: "mailto:baybarsbahaa@gmail.com" },
  { label: "Resume", href: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view" },
]

export default function PortfolioHeroWithPaperShaders() {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id="certifications" className="relative min-h-screen overflow-hidden flex bg-brown-dark">
      {/* Left panel — full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 py-10 pl-12 pr-4 md:py-14 md:pl-20 md:pr-8 font-mono relative z-10 text-crt-text flex flex-col">

        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-crt-bright mb-2">
          CONTACT
        </h2>
        <p className="text-sm md:text-base text-crt-dim mb-8 md:mb-10">
          Baybars Al-Zibdeh — open to ML / software roles
        </p>

        {/* Contact links — prompt style */}
        <div className="mb-10 md:mb-14 space-y-1.5 text-sm md:text-base">
          {links.map((link) => (
            <div key={link.label} className="flex items-baseline gap-2">
              <span className="text-crt-green/80 select-none">$</span>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crt-bright underline decoration-accent/40 underline-offset-4 hover:bg-accent hover:text-black hover:decoration-transparent transition-colors"
              >
                {link.label.toLowerCase()}
              </a>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <h3 className="text-xs md:text-sm tracking-widest uppercase text-crt-dim mb-3">
          Certifications
        </h3>
        <div className="space-y-1 text-sm md:text-base text-crt-text">
          {certifications.map((item, i) => (
            <div key={i} className="flex">
              <span className="w-28 md:w-40 shrink-0 text-crt-dim">{item.company}</span>
              <span>{item.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shader — hidden on mobile */}
      <div className="hidden md:block md:w-1/2 relative">
        <Suspense fallback={<div className="absolute inset-0" />}>
          <DitheringLazy
            style={{ height: "100%", width: "100%" }}
            colorBack="hsl(20, 90%, 8%)"
            colorFront="hsl(25, 100%, 45%)"
            shape="warp"
            type="4x4"
            pxSize={3}
            offsetX={0}
            offsetY={0}
            scale={0.8}
            rotation={0}
            speed={isVisible && !reducedMotion ? 0.1 : 0}
          />
        </Suspense>
      </div>
    </div>
  )
}
