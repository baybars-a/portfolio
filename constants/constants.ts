import { PortfolioData } from '../types';

export const initialData: PortfolioData = {
  name: 'Baybars Al-Zibdeh',
  header: {
    name: 'Baybars Al-Zibdeh',
  },
  hero: {
    greeting: "Hello world, I'm",
    description: "Computer Science student at York University, focused on AI and machine learning. I build models that find patterns, make predictions, and turn raw data into decisions worth acting on.",
    avatarUrl: "/BaybarsImageCartoon.png",
    resumeUrl: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view?usp=sharing",
    email: "baybarsbahaa@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/baybars-alzibdeh",
      github: "https://github.com/baybars-a/",
    },
    videoUrl: undefined
  },
  projects: [
    {
      title: 'Algorithmic Trading Research Platform',
      description: 'End-to-end quantitative trading system built on a 459,000-candle data pipeline with a 29-feature ensemble (XGBoost, RF, GBM, ET, Ridge). Validated via purged walk-forward CV with bootstrap confidence intervals and PBO measurement. Implements López de Prado\'s purged K-fold CV with triple-barrier labeling and embargo periods to eliminate label leakage in time-series ML models.',
      imageUrl: '',
      tags: ['Python', 'Machine Learning', 'XGBoost', 'Market Microstructure'],
    },
    {
      title: 'Black & White Image Colorizer',
      description: 'Full-stack AI app that restores color to grayscale images using the Zhang et al. deep learning model. A FastAPI backend runs a Caffe network — converting images through LAB color space, predicting 313 AB color bins, and returning a colorized JPEG in under a second.',
      imageUrl: '',
      tags: ['TypeScript', 'Python', 'FastAPI', 'OpenCV', 'React'],
      githubUrl: 'https://github.com/baybars-a/blacknwhite-colorization',
    },
    {
      title: 'Facial Expression Recognition',
      description: 'Detects faces via webcam and classifies emotions in real-time. A computer vision pipeline that captures frames, isolates face regions, and runs them through a trained classifier — outputting the detected emotion live on screen.',
      imageUrl: '',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'Deep Learning'],
      githubUrl: 'https://github.com/baybars-a/Facial-Expression-Recognition',
    },
    {
      title: 'Hand Tracker',
      description: 'Real-time hand tracking app that lets you draw using your index finger. MediaPipe detects 21 hand landmarks per frame and maps fingertip movement to canvas coordinates — turning any webcam into a touchless drawing surface.',
      imageUrl: '',
      tags: ['Python', 'MediaPipe', 'OpenCV'],
      githubUrl: 'https://github.com/baybars-a/hand-tracker',
    },
    {
      title: 'Time Calculator',
      description: 'A Python utility that performs arithmetic on time strings — adding and subtracting durations, handling AM/PM periods, and computing the resulting day of the week. Handles edge cases like midnight rollovers and multi-day additions.',
      imageUrl: '',
      tags: ['Python'],
      githubUrl: 'https://github.com/baybars-a/Time-Calculator-Project',
    },
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm a Computer Science student at York University with a deep interest in artificial intelligence and machine learning. I work with Python, scikit-learn, and pandas to build models that classify, predict, and cluster. I'm certified in ML and Generative AI, and I'm actively looking for opportunities to apply that knowledge to real problems at scale.",
    text2: "",
  },
  experience: {
    resumeUrl: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view?usp=sharing",
    columns: [
      [
        { role: 'Machine Learning with Python', company: 'IBM' },
        { role: 'IBM Z Xplore', company: 'IBM' },
        { role: 'Fundamentals of Encryption & Quantum-Safe Techniques', company: 'IBM' }
      ],
      [
        { role: 'Generative AI Fundamentals', company: 'Databricks' },
        { role: 'Scientific Computing with Python', company: 'FreeCodeCamp' },
      ],
      [
        { role: 'Databricks Fundamentals', company: 'Databricks' },
        { role: 'Foundational C# with Microsoft', company: 'Microsoft' },


      ]
    ],
  },
  workExperience: [
    {
      title: 'Software Engineering Intern',
      company: 'Treepz',
      location: 'Toronto, ON',
      period: 'Jan 2026 - April 2026',
      description: [
        'Built production-ready, responsive interfaces with Next.js, React, and TypeScript, using server-side rendering and dynamic routing while following accessibility best practices',
        'Created and maintained a reusable Tailwind CSS component library and design tokens to ensure UI consistency and accelerate development',
        'Integrated and tested RESTful APIs, implemented client-side caching and performance improvements (code-splitting, lazy loading, image optimization)',
        'Collaborated in cross-functional teams—leading code reviews, participating in design critiques, and delivering features through Git and CI-driven workflows',
        'Deployed applications to cloud platforms and containerized environments; configured CI/CD pipelines for automated builds, previews, and releases'
      ],
    },
  ],
  certifications: [
      // {
      //   name: 'Machine Learning with Python',
      //   issuer: 'IBM',
      // },
      // {
      //   name: 'IBM Z Xplore',
      //   issuer: 'IBM',
      // },
      // {
      //   name: 'Databricks Fundamentals',
      //   issuer: 'Databricks',
      // },
      // {
      //   name: 'Generative AI Fundamentals',
      //   issuer: 'Databricks',
      // },
      // {
      //   name: 'Scientific Computing with Python',
      //   issuer: 'FreeCodeCamp',
      // },
  ],
  footer: {
    title: "",
    subtitle: "",
    email: "",
    socials: {
      linkedin: "",
    }
  }
};