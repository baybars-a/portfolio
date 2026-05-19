"use client"

import { Suspense, lazy } from "react"

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

export default function PortfolioHeroWithPaperShaders() {
  return (
    <div id="certifications" className="relative min-h-screen overflow-hidden flex">
      <div className="w-1/2 p-8 font-mono relative z-10 text-white bg-brown-dark">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-lg font-normal mb-8"> </h1>
          <div className="mb-8">
            <h2 className="text-lg font-normal">BAYBARS AL-ZIBDEH</h2>
            <h3 className="text-lg font-normal">CERTIFICATIONS</h3>
          </div>
        </div>

        {/* Certifications list */}
        <div className="mb-12 space-y-1">
          {certifications.map((item, i) => (
            <div key={i} className="flex">
              <span className="w-44 shrink-0">{item.company}</span>
              <span className="flex-1 min-w-0">{item.role}</span>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 left-8">
          <div className="flex space-x-4 text-lg font-mono">
            <a href="https://www.linkedin.com/in/baybars-alzibdeh" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">LinkedIn</a>
            <a href="https://github.com/baybars-a/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">GitHub</a>
            <a href="mailto:baybarsbahaa@gmail.com" className="transition-opacity hover:opacity-60">Email</a>
            <a href="https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">Resume</a>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative">
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
            speed={0.1}
          />
        </Suspense>
      </div>
    </div>
  )
}
