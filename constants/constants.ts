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
    resumeUrl: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view?usp=sharing\?usp=sharing",
    email: "baybarsbahaa@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/baybars-alzibdeh",
      github: "https://github.com/baybars-a/",
    },
    videoUrl: undefined
  },
  projects: [
    {
      title: 'Collaborative Filtering Recommendation System',
      description: 'Built a movie recommendation engine in Python that processes over 1 million ratings. Uses Pearson correlation to find the 50 most similar users and generates personalized suggestions with 85% average accuracy, surfacing films you\'ll actually want to watch.',
      imageUrl: '/collaborative.png',
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib' ],
    },
    {
      title: 'DBSCAN Clustering',
      description: 'Applied DBSCAN clustering to 1,114 Canadian weather stations, first grouping by geography then by a 5-dimensional feature set combining location with mean, max, and min temperatures. Revealed distinct climate zones invisible to the naked eye.',
      imageUrl: '/canada.png',
      tags: ['Python','scikit-learn','pandas', 'numpy', 'matplotlib.pyplot', 'mpl_toolkits.basemap' ],
    },
    {
      title: 'Multiple Linear Regression',
      description: 'Trained a Multiple Linear Regression model to predict vehicle CO2 emissions from engine size, cylinders, and fuel consumption. Achieved a variance score of 0.86 and MSE of 491.58, demonstrating that cleaner cars are predictable and prediction is a tool for accountability.',
      imageUrl: '/regression.png',
      tags: ['Python', 'scikit-learn', 'Pandas','NumPy', 'Matplotlib'],
    },
    {
      title: 'Support Vector Machines',
      description: 'Trained an SVM classifier on tumor biopsy data, reaching 94.6% accuracy with only 5 false positives across the test set. In cancer detection, false positives cost anxiety and false negatives cost lives. This model minimizes both.',
      imageUrl: '/predicted.png',
      tags: ['Python', 'scikit-learn', 'Matplotlib'],
    },
        {
      title: 'Encoder and Decoder',
      description: 'A Java-based substitution cipher that encodes and decodes messages using a custom character mapping. Clean, interactive, and endlessly reusable, because sometimes the best encryption is the one you built yourself.',
      imageUrl: '/decode.gif',
      tags: ['Java'],
    },
{
  title: 'Probability Calculator',
  description: 'A Monte Carlo simulator that estimates the probability of drawing specific ball combinations from a hat, using random sampling to approximate answers that combinatorics makes painful to compute exactly. At scale, error drops below 1%.',
  imageUrl: '/probability.png',
  tags: ['Python', 'Tkinter', 'Statistics']
},
  ],
  about: {
    imageUrl: "/baybars.png",
    text1: "I'm a Computer Science student at York University with a deep interest in artificial intelligence and machine learning. I work with Python, scikit-learn, and pandas to build models that classify, predict, and cluster. I'm certified in ML and Generative AI, and I'm actively looking for opportunities to apply that knowledge to real problems at scale.",
    text2: "",
  },
  experience: {
    resumeUrl: "https://drive.google.com/file/d/1DDzZLer6Pv6LJuq1yjDi6yD_gHqtGF5P/view?usp=sharing\?usp=sharing",
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
      title: 'Front-End Developer Intern',
      company: 'Treepz',
      location: 'Toronto, ON',
      period: 'Jan 2026 - April 2026',
      description: [
        'Build responsive web applications using Next.js, React, and TypeScript',
        'Implement UI designs with Tailwind CSS and develop reusable component libraries',
        'Integrate RESTful APIs and optimize application performance',
        'Collaborate with cross-functional teams and participate in code reviews',
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
    title: "Get in touch",
    subtitle: "",
    email: "baybarsbahaa@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/baybars-alzibdeh/",
    }
  }
};