import { Key } from "react";

export interface Certification {
  name: string;
  issuer: string;
}

export interface Experience {
  role: string;
  company: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  /** Command-style name shown in the man-page view, e.g. "colorize". */
  manName?: string;
  /** SYNOPSIS line for the man-page view. */
  synopsis?: string;
}

export interface PortfolioData {
  name: string;
  header: {
    name: string;
  };
  hero: {
    videoUrl: Key | null | undefined;
    greeting: string;
    description: string;
    avatarUrl: string;
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
  experience: {
    resumeUrl: string;
    columns: Experience[][];
  };
  workExperience: WorkExperience[];
  certifications: Certification[];
  footer: {
    title: string;
    subtitle: string;
    email: string;
    socials: {
      linkedin: string;
    }
  };
}
