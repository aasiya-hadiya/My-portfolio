export type ProjectCategory = 'all' | 'ai-ml' | 'web';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  featured?: boolean;
  meta: string;
  primaryTag: string;
  summary: string;
  repoUrl: string;
  highlights: string[];
  architecture: {
    problem: string;
    approach: string;
    stack: string[];
    outcome: string;
  };
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  meta: string;
  period: string;
  type: 'work' | 'fellowship';
  description: string;
  focus: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period?: string;
  detail: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  domain: 'ai-ml' | 'cloud-data' | 'nlp';
}

export interface StackItem {
  index: string;
  name: string;
  domain: 'ai' | 'engineering' | 'product';
  note: string;
}

export const PROFILE = {
  brand: 'aasiya.dev',
  codeBrand: '<aasiya/>',
  name: 'Aasiya Hadiya',
  headline: 'AI & Data Science Undergraduate ’28',
  email: 'aasiyahadiya12@gmail.com',
  github: 'https://github.com/aasiya-hadiya',
  linkedin: 'https://www.linkedin.com/in/aasiya-hadiya',
  certificationsUrl: 'https://www.linkedin.com/in/aasiya-hadiya/details/certifications/',
  aboutParagraphs: [
    'I’m an Artificial Intelligence & Data Science student with a growing interest in Machine Learning and AI. I’m currently a Machine Learning Intern at FlyRank AI, getting hands-on with practical ML applications.',
    'I co-founded and built StashVault, an AI-powered personal ownership platform, contributing across frontend, backend, database, OCR integration, AI assistance and product development. I took it from concept to launch through a hackathon journey and launched it on Product Hunt.',
    'I take part in hackathons, technical events and tech fests, building practical solutions, collaborating with teams and exploring emerging technologies.',
  ],
};

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '272+',
    label: 'StashVault visitors',
    context: 'First 3 days after launch',
  },
  {
    value: '80+',
    label: 'Launch sign-ups',
    context: '30+ user feedback responses',
  },
  {
    value: '500',
    label: 'Teams selected',
    context: 'DoraHacks 2.0 from 6,000+ apps',
  },
  {
    value: '35',
    label: 'Licenses & certs',
    context: 'AI, ML, NLP & AWS Cloud',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'stashvault',
    title: 'StashVault',
    subtitle: 'AI-powered personal ownership platform',
    category: 'ai-ml',
    featured: true,
    meta: 'Co-founded · Launched on Product Hunt · 2026',
    primaryTag: 'OCR · AI · Full-Stack',
    summary:
      'Keeps receipts, product details, warranties, returns and purchase documents in one place. Features OCR-based receipt extraction, AI-powered assistance, warranty and return tracking, and structured data storage.',
    repoUrl: 'https://github.com/aasiya-hadiya/StashVault',
    highlights: [
      '272+ visitors in the first 3 days',
      '80+ sign-ups at launch',
      '30+ structured feedback responses',
      'Grew from a DoraHacks prototype to Product Hunt launch',
    ],
    architecture: {
      problem:
        'Purchase receipts, warranty cards, and return deadlines are scattered across email inboxes and paper drawers, causing missed return windows and lost proof of ownership.',
      approach:
        'Built an end-to-end platform combining OCR receipt extraction with structured database schemas, automated warranty/return deadline tracking, and an AI assistant for instant item lookup.',
      stack: ['OCR Extraction', 'AI Assistance', 'Frontend & Backend', 'Structured Database', 'Product Strategy'],
      outcome:
        'Shipped from a 2-week DoraHacks residency prototype to a public Product Hunt launch attracting 272+ visitors, 80+ sign-ups, and 30+ feedback responses in 72 hours.',
    },
  },
  {
    id: 'ace-ml',
    title: 'ACE · Machine Learning',
    subtitle: 'Interactive ML learning companion',
    category: 'ai-ml',
    meta: 'Python · Educational AI',
    primaryTag: 'Python',
    summary:
      'An AI-powered learning buddy designed for beginners to grasp core Machine Learning fundamentals through guided explanations and structured concepts.',
    repoUrl: 'https://github.com/aasiya-hadiya/ace-machine-learning',
    highlights: [
      'Beginner-friendly ML concept breakdowns',
      'Built in Python with modular AI guidance',
    ],
    architecture: {
      problem:
        'Newcomers to Machine Learning often hit steep mathematical and jargon barriers before building intuition for core algorithms.',
      approach:
        'Designed an AI-assisted study companion in Python that pairs foundational ML concepts with clear, step-by-step guidance.',
      stack: ['Python', 'Machine Learning', 'AI Guidance'],
      outcome:
        'Published as an open repository helping beginners bridge theory and intuition in foundational ML.',
    },
  },
  {
    id: 'ecorack-ai',
    title: 'EcoRack-AI',
    subtitle: 'Sustainability-focused AI initiative',
    category: 'ai-ml',
    meta: 'AI · Sustainability',
    primaryTag: 'AI',
    summary:
      'An AI project with a sustainability focus, built to support smarter, greener everyday decisions and resource awareness.',
    repoUrl: 'https://github.com/aasiya-hadiya/EcoRack-AI',
    highlights: [
      'Applied AI for greener decision workflows',
      'Built for practical environmental impact',
    ],
    architecture: {
      problem:
        'Consumers and teams lack actionable, real-time insights to evaluate the sustainability footprint of everyday choices.',
      approach:
        'Engineered an AI-driven recommendation workflow tailored toward greener alternatives and practical sustainability tracking.',
      stack: ['Applied AI', 'Decision Support', 'Sustainability'],
      outcome:
        'Demonstrated how lightweight AI workflows can turn abstract sustainability goals into concrete daily choices.',
    },
  },
  {
    id: 'abtalks-2',
    title: 'abtalks 2.0',
    subtitle: 'JavaScript web platform iteration',
    category: 'web',
    meta: 'JavaScript · Web Architecture',
    primaryTag: 'JavaScript',
    summary:
      'The second iteration of a JavaScript web project focused on cleaner interactive flows, responsive layout structure, and refined client-side behavior.',
    repoUrl: 'https://github.com/aasiya-hadiya/abtalks2.0',
    highlights: [
      'Second-generation refactor in JavaScript',
      'Focused on interactive client-side UX',
    ],
    architecture: {
      problem:
        'Early web prototypes often accumulate tight coupling between markup and interaction logic as features grow.',
      approach:
        'Rebuilt the project in a clean 2.0 iteration with modular JavaScript event handling and streamlined browser rendering.',
      stack: ['JavaScript', 'Web UI', 'DOM Architecture'],
      outcome:
        'Delivered a faster, cleaner second release with improved maintainability.',
    },
  },
  {
    id: 'report-it',
    title: 'Report It',
    subtitle: 'Front-end reporting interface',
    category: 'web',
    meta: 'HTML · Interface Design',
    primaryTag: 'HTML',
    summary:
      'A clean front-end reporting interface built with semantic HTML to structure issue capture and submission clarity.',
    repoUrl: 'https://github.com/aasiya-hadiya/report--it',
    highlights: [
      'Semantic HTML form & reporting structure',
      'Zero-clutter submission workflow',
    ],
    architecture: {
      problem:
        'Reporting forms frequently overwhelm users with ambiguous fields and unclear submission structure.',
      approach:
        'Crafted a focused front-end reporting interface emphasizing semantic HTML structure and direct field hierarchy.',
      stack: ['HTML', 'UI Structure', 'Forms'],
      outcome:
        'Provided an accessible, lightweight front-end foundation for structured issue reporting.',
    },
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'stashvault-cofounder',
    role: 'Co-Founder',
    organization: 'StashVault',
    meta: 'Self-employed',
    period: 'Aug 2026 – Present',
    type: 'work',
    description:
      'Built an AI-powered ownership platform across frontend, backend and database, with OCR receipt extraction, AI assistance and warranty/return tracking. Took it from hackathon concept to a Product Hunt launch.',
    focus: ['Full-Stack', 'OCR Integration', 'AI Assistance', 'Product Launch'],
  },
  {
    id: 'flyrank-ml',
    role: 'Machine Learning Intern',
    organization: 'FlyRank AI',
    meta: 'Remote',
    period: 'Aug 2026 – Present',
    type: 'work',
    description:
      'Working as an AI intern focused on practical Machine Learning applications, experimentation, and production workflows.',
    focus: ['Machine Learning', 'Applied AI', 'Python'],
  },
  {
    id: 'dorahacks-fellow',
    role: 'DoraHacks 2.0 Fellow',
    organization: 'DoraDAO',
    meta: 'Apprenticeship · Remote',
    period: 'Aug 2026',
    type: 'fellowship',
    description:
      'Selected among 500 teams from 6,000+ applications across 35+ countries for a 2-week product-building residency.',
    focus: ['AI for Product Development', 'Product Management'],
  },
  {
    id: 'infosys-springboard',
    role: 'Infosys Springboard',
    organization: 'Pragathi Path to Future Cohort-9 · AI EMPOW(H)ER',
    meta: 'Cohort Program',
    period: 'May 2026 – Sep 2026',
    type: 'fellowship',
    description:
      'Completed the AI EMPOW(H)ER program (May–Jul 2026) followed by the Pragathi Path to Future Cohort-9 (Jul–Sep 2026).',
    focus: ['AI Foundations', 'Industry Readiness'],
  },
  {
    id: 'codec-python',
    role: 'Python Developer Intern',
    organization: 'Codec Technologies India',
    meta: 'Remote',
    period: 'Sep 2025',
    type: 'work',
    description:
      'Internship focused on Python development, scripting fundamentals, and clean implementation.',
    focus: ['Python', 'Software Development'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'vtu',
    institution: 'Visvesvaraya Technological University',
    degree: 'Bachelor of Engineering, Artificial Intelligence and Data Science',
    detail: 'University curriculum in machine learning, algorithms, statistics, and data systems.',
  },
  {
    id: 'bearys',
    institution: 'Bearys Institute of Technology',
    degree: 'B.E. Artificial Intelligence and Data Science',
    period: 'Sep 2024 – 2028',
    detail: 'Active participant in hackathons, technical events, and applied AI student initiatives.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'dl-supervised-ml',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI',
    date: 'Oct 2026',
    domain: 'ai-ml',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner 2025: Benefits & Design Principles',
    issuer: 'Skillsoft',
    date: 'Sep 2026',
    domain: 'cloud-data',
  },
  {
    id: 'advanced-nlp-transformers',
    title: 'Advanced NLP: Introduction to Transformer Models',
    issuer: 'Skillsoft',
    date: 'Sep 2026',
    domain: 'nlp',
  },
  {
    id: 'google-ai-pro',
    title: 'Google AI Professional',
    issuer: 'Google',
    date: '2026',
    domain: 'ai-ml',
  },
  {
    id: 'comptia-dataai',
    title: 'CompTIA DataAI: Foundations of Descriptive Statistics and Probability',
    issuer: 'Skillsoft',
    date: 'Sep 2026',
    domain: 'cloud-data',
  },
  {
    id: 'ai-in-industry',
    title: 'AI in Industry',
    issuer: 'Skillsoft',
    date: 'Sep 2026',
    domain: 'ai-ml',
  },
  {
    id: 'ai-architect',
    title: 'Elements of an Artificial Intelligence Architect',
    issuer: 'Skillsoft',
    date: 'Sep 2026',
    domain: 'ai-ml',
  },
  {
    id: '1m-prompters',
    title: 'Certificate of Completion – 1 Million Prompters',
    issuer: 'Dubai Future Foundation',
    date: '2026',
    domain: 'nlp',
  },
  {
    id: 'hp-ai-beginners',
    title: 'AI for Beginners',
    issuer: 'HP',
    date: 'Aug 2025',
    domain: 'ai-ml',
  },
];

export const STACK_MATRIX: StackItem[] = [
  { index: '01', name: 'Python', domain: 'ai', note: 'Core ML scripting, data pipelines & model experimentation' },
  { index: '02', name: 'Machine Learning', domain: 'ai', note: 'Supervised learning, regression, classification & evaluation' },
  { index: '03', name: 'NLP & Transformers', domain: 'ai', note: 'Transformer architectures, embeddings & prompt workflows' },
  { index: '04', name: 'OCR', domain: 'ai', note: 'Receipt parsing & structured document data extraction' },
  { index: '05', name: 'JavaScript', domain: 'engineering', note: 'Interactive web interfaces & full-stack application logic' },
  { index: '06', name: 'HTML', domain: 'engineering', note: 'Semantic structure, accessible forms & clean markup' },
  { index: '07', name: 'Full-stack', domain: 'engineering', note: 'Frontend, backend APIs & relational/document databases' },
  { index: '08', name: 'AWS Cloud', domain: 'product', note: 'Cloud design principles, scalability & deployment basics' },
  { index: '09', name: 'Product Management', domain: 'product', note: '0-to-1 hackathon scoping, user feedback & launches' },
];
