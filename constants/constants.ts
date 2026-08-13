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
      title: 'Lung Cancer Imaging Pipeline',
      description:
        "Reproducible medical-imaging ML pipelines for histopathology, CT, and whole-slide imaging, built around leakage-aware evaluation. A naive file-level split of the LC25000 dataset produced a headline 99.96% test accuracy — investigation found 99.9% of test images had a near-duplicate in the training set. I rebuilt the evaluation around group-aware, patient-level splitting so the number reported is a real upper bound, not a leaked one, and documented exactly how far it still is from a true generalization estimate.",
      result:
        'Group-aware split drops the inflated 99.96% to a defensible 99.30%, reported alongside its own 72% estimated residual contamination — accuracy stated with its own limitations, not hidden behind them. 228 tests passing, CI green, typed and linted.',
      imageUrl: '',
      tags: ['Python', 'Deep Learning', 'Medical Imaging', 'Docker'],
      githubUrl: 'https://github.com/baybars-a/lung-cancer-imaging',
      manName: 'lung-imaging',
      synopsis:
        'lung-imaging [--modality histopathology,ct,wsi] [--split group-aware] [--dataset lc25000] [--report accuracy,contamination] [--tests 228]',
    },
    {
      title: 'RouteSmith — LLM Query Router',
      description:
        "A learned quality predictor that decides whether a cheap 8B model will produce an acceptable answer before calling it, so a frontier model is only invoked when it's actually needed. Five prior systems (RouteLLM, Martian, FrugalGPT, AutoMix, Hybrid LLM) solve this as a black box on embeddings; RouteSmith instead extracts 67 interpretable query features and measures them against an embedding-only control, publishing what a small model failing actually looks like rather than just predicting it.",
      result:
        'Six router variants benchmarked on a PGR / APGR / cost-per-token metric suite with a full failure taxonomy — the pipeline runs end to end (15 tests passing, 10/10 smoke checks) with results reported honestly as pending until the labeled run executes.',
      imageUrl: '',
      tags: ['Python', 'Machine Learning', 'LLM Routing', 'Cost Optimization'],
      githubUrl: 'https://github.com/baybars-a/RouteSmith',
      manName: 'routesmith',
      synopsis:
        'routesmith [--features 67] [--routers 6] [--metrics pgr,apgr,cpt] [--baseline embedding-only] [--report failure-taxonomy]',
    },
    {
      title: 'Distributed Media Processing Platform',
      description:
        "A cloud-native distributed system for asynchronous media processing at scale — transcoding, transcription, caption generation, and highlight detection — built to demonstrate production backend engineering rather than ML research. Ingestion, orchestration, and processing run as independent components over Celery and Redis so the system keeps working correctly when workers crash, messages are lost, or infrastructure restarts. Uploads go straight from browser to object storage via presigned URLs; the API never touches video bytes.",
      result:
        'PostgreSQL as the durable source of truth for every job and task, idempotent fault-tolerant execution, faster-whisper transcription, Kubernetes deployment with KEDA autoscaling, and Prometheus/Grafana observability — plus unit, integration, and chaos-scenario tests.',
      imageUrl: '',
      tags: ['Python', 'Celery', 'Redis', 'PostgreSQL', 'Kubernetes', 'Distributed Systems'],
      githubUrl: 'https://github.com/baybars-a/Media-Processing-Platform',
      manName: 'media-platform',
      synopsis:
        'media-platform [--upload presigned-url] [--queue celery+redis] [--transcribe faster-whisper] [--deploy k8s+keda] [--observe prometheus,grafana]',
    },
    {
      title: 'UniQ — University Policy RAG System',
      description:
        "A retrieval-augmented generation system that answers questions about York University policy documents with cited sources — and refuses when the corpus can't support an answer. Naive RAG retrieves on vector similarity alone and hallucinates when wording doesn't match; UniQ fuses BM25 keyword search with dense vector search via Reciprocal Rank Fusion, then a cross-encoder reranks the top passages before generation. Runs fully locally, no API keys, no cloud, $0. I paired it with a separate component-attributing evaluation harness that judged all 248 test items against a local LLM judge and attributes every failure to the pipeline stage that caused it, rather than a single pass/fail score.",
      result:
        'Measured, not just demoed: hit-rate@10 of 74%, MRR of 0.50, and 92% correct abstention on unanswerable questions — all reported with bootstrap confidence intervals.',
      imageUrl: '',
      tags: ['Python', 'RAG', 'ChromaDB', 'BM25', 'Evaluation', 'LLM'],
      githubUrl: 'https://github.com/baybars-a/York-Rag-System',
      manName: 'uniq',
      synopsis:
        'uniq [--ingest pdf,txt,md] [--retrieve bm25,vector] [--fusion rrf:k=60] [--rerank cross-encoder] [--eval judged:248-items] [--report hit-rate,mrr,abstention]',
    },
    {
      title: 'Black & White Image Colorizer',
      description:
        "A full-stack app that restores color to black-and-white photos using Zhang et al.'s 'Colorful Image Colorization' CNN. The model works in LAB color space — taking the luminance channel and predicting 313 quantized AB color bins — served by a FastAPI backend behind a Next.js interface with a before/after comparison slider. I'm building the whole stack myself: inference through OpenCV DNN (no heavy ML framework), a Redis cache keyed by SHA-256 so repeat images return instantly, and containerized deployment to AWS through GitHub Actions.",
      result:
        'A reproducible, CI-tested data pipeline is live end to end today; the trained colorization model is the next phase of an 8-phase build documented in the repo\'s PRD.',
      imageUrl: '',
      tags: ['TypeScript', 'Python', 'FastAPI', 'OpenCV', 'Next.js', 'Redis'],
      githubUrl: 'https://github.com/baybars-a/image-colorizer',
      manName: 'colorize',
      synopsis:
        'colorize [-i grayscale.jpg] [-o color.jpg] [--model zhang-et-al] [--colorspace lab] [--ab-bins 313] [--backend fastapi]',
    },
    {
      title: 'pydeadweight',
      description:
        "A static-analysis CLI that detects — and optionally removes — declared Python dependencies your project no longer imports. Dependency lists rot as packages get added during experiments and refactors leave imports behind; pydeadweight resolves the mismatch between PyPI distribution names and import names (e.g. installing Pillow but importing PIL) by reading installed package metadata, and never executes your project's code. It's built to bias toward false negatives over false positives — it would rather miss a dead dependency than wrongly tell you to delete one you need.",
      result:
        'A read-only report by default; mutation only behind an explicit confirmation flag — correctness over cleverness.',
      imageUrl: '',
      tags: ['Python', 'CLI', 'Static Analysis', 'Developer Tools'],
      githubUrl: 'https://github.com/baybars-a/pydeadweight',
      manName: 'pydeadweight',
      synopsis:
        'pydeadweight [--path .] [--report read-only] [--fix --confirm] [--bias false-negatives]',
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
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm Baybars, a Computer Science student at York University who spends most of his time teaching machines to find structure in noise. My home turf is the Python ML stack, and the problems I like are the ones where the data fights back: leaky time series, imbalanced labels, markets that punish overfitting. My trading research platform runs a 29-feature ensemble through purged walk-forward validation, because a backtest you can't trust is just fiction with charts.",
    text2: "From January to May 2026 I was a Software Engineering intern at Treepz in Toronto. There I built a type-safe API layer for a Strapi CMS migration and moved the site onto static generation with incremental revalidation, cutting content publishing from two or three days down to under ten minutes. Off the clock I build things that see, restoring color to black-and-white photos, reading emotion from faces, turning a webcam into a sketchpad. I've worked through machine-learning and generative-AI coursework from IBM and Databricks, and what I'm after next is the kind of problem where a model stops being a demo and starts making decisions.",
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
        { role: 'Claude Code in Action', company: 'Anthropic Education' },

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