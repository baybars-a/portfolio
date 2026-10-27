export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  /** One plain-English line a non-technical reader can follow. */
  summary?: string;
  description: string[];
}

export interface Project {
  title: string;
  /** One plain-English sentence: what it is, for anyone. Shown in the list. */
  summary: string;
  /** One result line, ideally with a number. Shown in the list. */
  highlight: string;
  /** Featured projects get the full card; the rest go in the compact list. */
  featured?: boolean;
  /** Link to a short demo video (YouTube / Loom / Drive). Hidden when empty. */
  demoUrl?: string;
  /** Details view, in reading order: problem → description → decision → result → limits. */
  problem?: string;
  /** What I built. */
  description: string;
  /** The key decision and why. */
  decision?: string;
  /** The outcome / what shipped. */
  result?: string;
  /** What it doesn't do yet, or where the result stops holding. */
  limits?: string;
  tags: string[];
  githubUrl?: string;
}

export interface PortfolioData {
  name: string;
  header: {
    name: string;
  };
  hero: {
    greeting: string;
    description: string;
    resumeUrl: string;
    email: string;
    socials: {
      linkedin: string;
      github: string;
    };
  };
  projects: Project[];
  about: {
    imageUrl: string;
    text1: string;
    text2: string;
  };
  workExperience: WorkExperience[];
}
