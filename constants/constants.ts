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
      description: '',
      imageUrl: '',
      tags: [],
      manName: 'quant-research',
      synopsis:
        'quant-research [--candles 459000] [--features 29] [--models xgboost,rf,gbm,et,ridge] [--cv purged-walk-forward] [--labeling triple-barrier] [--report pbo,bootstrap-ci]',
    },
    {
      title: 'Black & White Image Colorizer',
      description: '',
      imageUrl: '',
      tags: [],
      githubUrl: 'https://github.com/baybars-a/blacknwhite-colorization',
      manName: 'colorize',
      synopsis:
        'colorize [-i grayscale.jpg] [-o color.jpg] [--model zhang-et-al] [--colorspace lab] [--ab-bins 313] [--backend fastapi]',
    },
    {
      title: 'Facial Expression Recognition',
      description: '',
      imageUrl: '',
      tags: [],
      githubUrl: 'https://github.com/baybars-a/Facial-Expression-Recognition',
      manName: 'emotion-detect',
      synopsis:
        'emotion-detect [--source webcam] [--detect faces] [--classify emotion] [--display live]',
    },
    {
      title: 'Hand Tracker',
      description: '',
      imageUrl: '',
      tags: [],
      githubUrl: 'https://github.com/baybars-a/hand-tracker',
      manName: 'handtrack',
      synopsis:
        'handtrack [--landmarks 21] [--input webcam] [--mode draw] [--pointer index-finger]',
    },
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm Baybars a Computer Science student at York University who spends most of his screen time teaching machines to find structure in noise. My home turf is the Python ML stack, and my favorite problems are the ones where the data fights back: leaky time series, imbalanced labels, markets that punish overfitting. My trading research platform runs a 29-feature ensemble through purged walk-forward validation, because a backtest you can't trust is just fiction with charts.",
    text2: "Right now I'm a software engineering intern at Treepz in Toronto, shipping type-safe API layers and production Next.js. Off the clock I'm certified in machine learning and generative AI through IBM and Databricks, and I build things that see, restoring color to black-and-white photos, reading emotion from faces, turning a webcam into a sketchpad. What I'm after next: problems where models stop being demos and start making decisions.",
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
      period: 'Jan 2026 - Aug 2026',
      description: [
        'Architected a type-safe API service layer spanning 10 files for a Strapi CMS migration, building a complete TypeScript interface system, 7+ high-level API methods (post retrieval, filtering, pagination, static generation support), and standardized response contracts with type guards that eliminated an entire class of null-reference errors at compile time',
        'Designed data transformation mappers to flatten Strapi\'s deeply nested response structure into clean application models, implementing fallback chains for missing fields to prevent malformed data from ever reaching the UI',
        'Implemented Static Site Generation with Incremental Static Regeneration (revalidating every 3600 seconds), replacing a manual JSON-based publishing workflow and cutting content publishing time from roughly 2-3 days down to under 10 minutes',
        'Added dynamic SEO infrastructure including JSON-LD structured data, a programmatically generated sitemap, and per-page metadata',
        'Collaborated with a fellow intern on a shared dashboard search feature, owning backend filtering logic and API contract',
        'Followed a feature-branch Git workflow, submitting weekly pull requests for senior engineer review and incorporating feedback before merge'
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