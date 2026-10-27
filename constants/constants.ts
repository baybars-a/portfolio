import { PortfolioData } from '../types';

export const initialData: PortfolioData = {
  name: 'Baybars Al-Zibdeh',
  header: {
    name: 'Baybars Al-Zibdeh',
  },
  hero: {
    greeting: "Hello world, I'm",
    description: "Computer Science student at York University, focused on AI and machine learning. I build models that find patterns, make predictions, and turn raw data into decisions worth acting on.",
    resumeUrl: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view?usp=sharing",
    email: "baybarsbahaa@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/baybars-alzibdeh",
      github: "https://github.com/baybars-a/",
    },
  },
  projects: [
    {
      title: 'Lung Cancer Imaging Pipeline',
      summary:
        "An AI model for spotting lung cancer looked 99.96% accurate because it was being tested on near-copies of images it had already seen. I caught it and rebuilt the testing so the score is honest.",
      highlight: "Honest accuracy: 99.30%, reported with its known limits · 228 automated tests",
      featured: true,
      demoUrl: '',
      problem:
        'A naive file-level split of the LC25000 dataset produced a headline 99.96% test accuracy. Investigation found 99.9% of test images had a near-duplicate in the training set.',
      description:
        'Reproducible medical-imaging ML pipelines for histopathology, CT, and whole-slide imaging, built around leakage-aware evaluation.',
      decision:
        'I rebuilt the evaluation around group-aware, patient-level splitting, so the number reported is a real upper bound, not a leaked one.',
      result:
        'The group-aware split drops the inflated 99.96% to a defensible 99.30%. 228 tests passing, CI green, typed and linted.',
      limits:
        '99.30% is still an upper bound: 72% of test images keep a near-duplicate in training, and grouping removed only about 28% of the contamination. No external validation, no baseline comparison, single seed. The CT and whole-slide pipelines are tested on synthetic inputs only.',
      tags: ['Python', 'Deep Learning', 'Medical Imaging', 'Docker'],
      githubUrl: 'https://github.com/baybars-a/lung-cancer-imaging',
    },
    {
      title: 'UniQ — University Policy RAG System',
      summary:
        "Ask a question about York University policy and get an answer that cites the exact document it came from, or an honest \"I don't know\" when the rules don't say.",
      highlight: "Correctly declines 92% of questions it can't answer · runs on a laptop for $0",
      featured: true,
      demoUrl: 'https://github.com/baybars-a/York-Rag-System/blob/main/docs/img/demo.gif',
      problem:
        "Naive RAG retrieves on vector similarity alone and hallucinates when the question's wording doesn't match the document's.",
      description:
        "A retrieval-augmented generation system that answers questions about York University policy documents with cited sources, and refuses when the corpus can't support an answer. Runs fully locally: no API keys, no cloud, $0.",
      decision:
        'UniQ fuses BM25 keyword search with dense vector search via Reciprocal Rank Fusion, then a cross-encoder reranks the top passages before generation. A separate evaluation harness judged all 248 test items with a local LLM judge and attributes every failure to the pipeline stage that caused it, rather than giving a single pass/fail score.',
      result:
        'Measured, not just demoed: hit-rate@10 of 74%, MRR of 0.50, and 92% correct abstention on unanswerable questions, all reported with bootstrap confidence intervals.',
      limits:
        'The evaluation set is small (36 in-scope and 40 out-of-scope questions), so the intervals are wide and every figure is an estimate. Scanned PDFs are not OCR\'d, and inference is single-process with no batching.',
      tags: ['Python', 'RAG', 'ChromaDB', 'BM25', 'Evaluation', 'LLM'],
      githubUrl: 'https://github.com/baybars-a/York-Rag-System',
    },
    {
      title: 'Distributed Media Processing Platform',
      summary:
        "Upload a video and get back a transcript, captions, and highlight clips, and the system keeps going even when servers crash mid-job.",
      highlight: "Processes about 12 minutes of video per minute on a laptop · recovers when a server crashes mid-job",
      featured: true,
      demoUrl: '',
      problem:
        'Asynchronous media processing (transcoding, transcription, caption generation, highlight detection) has to keep working correctly when workers crash, messages are lost, or infrastructure restarts.',
      description:
        'A cloud-native distributed system built to demonstrate production backend engineering rather than ML research. Ingestion, orchestration, and processing run as independent components over Celery and Redis.',
      decision:
        'PostgreSQL is the durable source of truth for every job and task, so execution is idempotent and survives crashes. Uploads go straight from the browser to object storage via presigned URLs; the API never touches video bytes.',
      result:
        '10/10 jobs succeeded at a sustained 11.9 jobs/min in the benchmark. faster-whisper transcription, Kubernetes deployment with KEDA autoscaling, Prometheus/Grafana observability, plus unit, integration, and chaos-scenario tests.',
      limits:
        'The benchmark ran on a single developer laptop with the default Compose stack (10 concurrent 60-second 720p videos), not on a production cluster.',
      tags: ['Python', 'Celery', 'Redis', 'PostgreSQL', 'Kubernetes', 'Distributed Systems'],
      githubUrl: 'https://github.com/baybars-a/Media-Processing-Platform',
    },
    {
      title: 'RouteSmith — LLM Query Router',
      summary:
        "Decides whether a cheap AI model can handle a question before paying for an expensive one.",
      highlight: "Predicts when the cheap model will fall short, and shows which kinds of questions trip it up",
      demoUrl: '',
      problem:
        'Sending every query to a frontier model is expensive. Five prior systems (RouteLLM, Martian, FrugalGPT, AutoMix, Hybrid LLM) decide when to route as a black box on embeddings.',
      description:
        "A learned quality predictor that decides whether a cheap 8B model will produce an acceptable answer before calling it, so a frontier model is only invoked when it's actually needed.",
      decision:
        'RouteSmith extracts 67 interpretable query features and measures them against an embedding-only control, publishing what a small model failing actually looks like rather than just predicting it.',
      result:
        'Six router variants benchmarked on a PGR / APGR / cost-per-token metric suite with a full failure taxonomy. The pipeline runs end to end (15 tests passing, 10/10 smoke checks).',
      limits: 'Results are reported as pending until the labeled run executes.',
      tags: ['Python', 'Machine Learning', 'LLM Routing', 'Cost Optimization'],
      githubUrl: 'https://github.com/baybars-a/RouteSmith',
    },
    {
      title: 'pydeadweight',
      summary:
        "Finds software packages a Python project installs but never uses, so they can be safely removed.",
      highlight: "Read-only by default, so it never deletes anything without asking",
      demoUrl: '',
      problem:
        'Dependency lists rot: packages get added during experiments, and refactors leave imports behind.',
      description:
        "A static-analysis CLI that detects, and optionally removes, declared Python dependencies your project no longer imports. It resolves the mismatch between PyPI distribution names and import names (e.g. installing Pillow but importing PIL) by reading installed package metadata, and never executes your project's code.",
      decision:
        'It is biased toward false negatives over false positives: it would rather miss a dead dependency than wrongly tell you to delete one you need.',
      result:
        'A read-only report by default; mutation only behind an explicit confirmation flag.',
      limits: 'Because of that bias, it can miss some dependencies that really are dead.',
      tags: ['Python', 'CLI', 'Static Analysis', 'Developer Tools'],
      githubUrl: 'https://github.com/baybars-a/pydeadweight',
    },
    {
      title: 'Facial Expression Recognition',
      summary:
        "Reads your facial expression through a webcam and names the emotion, live.",
      highlight: "7 emotions in real time · no internet connection needed",
      demoUrl: '',
      problem:
        'Classify emotion from a live webcam feed, frame by frame, without sending video to the cloud.',
      description:
        'A real-time computer-vision app that classifies each frame into seven states (happy, sad, angry, surprise, fear, disgust, neutral) with a live confidence readout per emotion. I built the capture-to-classification pipeline on OpenCV and the FER model.',
      decision:
        "I paired the classifier with MediaPipe's Face Landmarker, so a toggleable overlay can trace eyes, eyebrows, iris, lips, and nose.",
      result:
        'Runs live on a standard webcam with keyboard controls to toggle the landmark overlay: a self-contained demo with no cloud calls.',
      // TODO(ask): no limitations are documented in the README; add any known ones as `limits`.
      tags: ['Python', 'OpenCV', 'MediaPipe', 'Deep Learning'],
      githubUrl: 'https://github.com/baybars-a/Facial-Expression-Recognition',
    },
    {
      title: 'Hand Tracker',
      summary:
        "Draw in the air with your finger. Any webcam becomes a sketchpad.",
      highlight: "Tracks 21 points on your hand in real time · no touchscreen needed",
      demoUrl: '',
      problem: 'Drawing on a computer normally needs a touchscreen or a stylus.',
      description:
        'A touchless drawing app that turns any webcam into a sketch surface. MediaPipe detects 21 hand landmarks per frame; I built the tracking-to-canvas loop on MediaPipe and OpenCV.',
      decision:
        'I map the index fingertip to canvas coordinates, so fingertip position becomes brush position in real time.',
      result:
        'Draws live from a single webcam with no touchscreen or stylus: the hand is the input device.',
      // TODO(ask): no limitations are documented (the repo has no README); add any known ones as `limits`.
      tags: ['Python', 'MediaPipe', 'OpenCV'],
      githubUrl: 'https://github.com/baybars-a/hand-tracker',
    },
    {
      title: 'Black & White Image Colorizer',
      summary:
        "Upload an old black-and-white photo and get it back in color.",
      highlight: "A full web app, from the upload page to the server that colors the photo · work in progress",
      demoUrl: '',
      problem:
        'A black-and-white photo only records brightness, so its colors have to be predicted.',
      description:
        "A full-stack app built around Zhang et al.'s 'Colorful Image Colorization' CNN. The model works in LAB color space, taking the luminance channel and predicting 313 quantized AB color bins, served by a FastAPI backend behind a Next.js interface with a before/after comparison slider.",
      decision:
        "Inference runs through OpenCV DNN (no heavy ML framework), a Redis cache keyed by SHA-256 returns repeat images instantly, and deployment to AWS is containerized through GitHub Actions.",
      result: 'A reproducible, CI-tested data pipeline is live end to end today.',
      limits:
        "The trained colorization model is the next phase of an 8-phase build documented in the repo's PRD.",
      tags: ['TypeScript', 'Python', 'FastAPI', 'OpenCV', 'Next.js', 'Redis'],
      githubUrl: 'https://github.com/baybars-a/image-colorizer',
    },
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm Baybars, a Computer Science student at York University. I build machine-learning systems in Python, and the problems I like most are the ones where the data works against you: data recorded over time that quietly leaks the answer into the test, or categories where one outcome is far rarer than the rest. Those are the cases where a model can look great on paper and still fail in the real world.",
    text2: "From January to May 2026 I was a Software Engineering intern at Treepz in Toronto. I moved the company website onto a new content system, built the code that connects the two, and changed how pages are generated, so updates that used to take two or three days now go live in under ten minutes. Outside work I build things that see: an app (in progress) that restores color to black-and-white photos, one that reads emotion from faces, and one that turns a webcam into a sketchpad. I've worked through machine-learning and generative-AI coursework from IBM and Databricks. Next, I want to work on problems where a model stops being a demo and starts making real decisions.",
  },
  workExperience: [
    {
      title: 'Software Engineering Intern',
      company: 'Treepz',
      location: 'Toronto, ON',
      period: 'Jan 2026 – May 2026',
      summary:
        'Rebuilt how the company website publishes content: updates went from 2–3 days to under 10 minutes.',
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
};
