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
      description:
        "A quantitative trading research system that treats a backtest as a hypothesis to disprove, not a promise to trust. The hard problem in financial ML is leakage: naive cross-validation lets a model peek at the future, so strategies look profitable in testing and die live. I built the full pipeline — a 459,000-candle data layer, a 29-feature ensemble (XGBoost, RF, GBM, ET, Ridge), and López de Prado's purged walk-forward CV with triple-barrier labeling and embargo periods to cut that leakage out.",
      result:
        'Every result reports Probability of Backtest Overfitting (PBO) and bootstrap confidence intervals, so a strategy\'s edge is stated with honest uncertainty instead of one flattering number.',
      imageUrl: '',
      tags: ['Python', 'Machine Learning', 'XGBoost', 'Market Microstructure'],
      manName: 'quant-research',
      synopsis:
        'quant-research [--candles 459000] [--features 29] [--models xgboost,rf,gbm,et,ridge] [--cv purged-walk-forward] [--labeling triple-barrier] [--report pbo,bootstrap-ci]',
    },
    {
      title: 'Black & White Image Colorizer',
      description:
        "A full-stack app that restores color to black-and-white photos using Zhang et al.'s 'Colorful Image Colorization' CNN. The model works in LAB color space — taking the luminance channel and predicting 313 quantized AB color bins — served by a FastAPI backend behind a Next.js interface with a before/after comparison slider. I built the whole stack: inference through OpenCV DNN (no heavy ML framework), a Redis cache keyed by SHA-256 so repeat images return instantly, and batch handling for up to five images per request.",
      result:
        'Shipped as a deployable service, not a notebook: Docker Compose plus Kubernetes manifests, rate-limited to 10 req/min with a one-hour cache TTL.',
      imageUrl: '',
      tags: ['TypeScript', 'Python', 'FastAPI', 'OpenCV', 'Next.js', 'Redis'],
      githubUrl: 'https://github.com/baybars-a/blacknwhite-colorization',
      manName: 'colorize',
      synopsis:
        'colorize [-i grayscale.jpg] [-o color.jpg] [--model zhang-et-al] [--colorspace lab] [--ab-bins 313] [--backend fastapi]',
    },
    {
      title: 'Facial Expression Recognition',
      description:
        "A real-time computer-vision app that reads emotion from a webcam feed, classifying each frame into seven states — happy, sad, angry, surprise, fear, disgust, neutral — with a live confidence readout per emotion. I built the capture-to-classification pipeline on OpenCV, the FER model, and MediaPipe's Face Landmarker, including a toggleable overlay that traces eyes, eyebrows, iris, lips, and nose.",
      result:
        'Runs live on a standard webcam with keyboard controls to toggle the landmark overlay — a self-contained demo with no cloud calls.',
      imageUrl: '',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'Deep Learning'],
      githubUrl: 'https://github.com/baybars-a/Facial-Expression-Recognition',
      manName: 'emotion-detect',
      synopsis:
        'emotion-detect [--source webcam] [--detect faces] [--classify emotion] [--display live]',
    },
    {
      title: 'Hand Tracker',
      description:
        'A touchless drawing app: MediaPipe detects 21 hand landmarks per frame and maps your index fingertip to canvas coordinates, turning any webcam into a sketch surface. I built the tracking-to-canvas loop on MediaPipe and OpenCV, so fingertip position becomes brush position in real time.',
      result:
        'Draws live from a single webcam with no touchscreen or stylus — the hand is the input device.',
      imageUrl: '',
      tags: ['Python', 'MediaPipe', 'OpenCV'],
      githubUrl: 'https://github.com/baybars-a/hand-tracker',
      manName: 'handtrack',
      synopsis:
        'handtrack [--landmarks 21] [--input webcam] [--mode draw] [--pointer index-finger]',
    },
    {
      title: 'UniQ — University Policy RAG System',
      description:
        "A retrieval-augmented generation system that answers questions about university policy documents with cited sources. Naive RAG retrieves on vector similarity alone and hallucinates when wording doesn't match; UniQ fixes that with hybrid retrieval — BM25 keyword search fused with vector search via Reciprocal Rank Fusion, then a cross-encoder re-ranks the top passages before GPT-4o-mini writes the answer. I built the full pipeline: ingestion with token-aware chunking, dual BM25 + ChromaDB indexing, query rewriting, and citation formatting.",
      result:
        'Evaluated with RAGAS synthetic QA against a faithfulness target of ≥0.90, with a Streamlit debug view that shows exactly what was retrieved — built to be measured, not just demoed.',
      imageUrl: '',
      tags: ['Python', 'ChromaDB', 'OpenAI', 'Streamlit', 'Docker'],
      githubUrl: 'https://github.com/baybars-a/RAG-System',
      manName: 'uniq',
      synopsis:
        'uniq [--ingest pdf,txt,md] [--retrieve bm25,vector] [--fusion rrf:k=60] [--rerank ms-marco-minilm] [--llm gpt-4o-mini] [--eval ragas:faithfulness>=0.90]',
    },
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm Baybars, a Computer Science student at York University who spends most of his time teaching machines to find structure in noise. My home turf is the Python ML stack, and the problems I like are the ones where the data fights back: leaky time series, imbalanced labels, markets that punish overfitting. My trading research platform runs a 29-feature ensemble through purged walk-forward validation, because a backtest you can't trust is just fiction with charts.",
    text2: "From January to May 2026 I was a software engineering intern at Treepz in Toronto. There I built a type-safe API layer for a Strapi CMS migration and moved the site onto static generation with incremental revalidation, cutting content publishing from two or three days down to under ten minutes. Off the clock I build things that see, restoring color to black-and-white photos, reading emotion from faces, turning a webcam into a sketchpad. I've worked through machine-learning and generative-AI coursework from IBM and Databricks, and what I'm after next is the kind of problem where a model stops being a demo and starts making decisions.",
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
      period: 'Jan 2026 – May 2026',
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