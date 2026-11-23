import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { ContactSection } from './components/ContactSection';
import { HeroStudio } from './components/HeroStudio';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  PROOF_METRICS,
  STACK_MATRIX,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolio';

type StackFilter = 'all' | 'ai' | 'engineering' | 'product';
type ExperienceFilter = 'all' | 'work' | 'fellowship';
type CertFilter = 'all' | 'ai-ml' | 'nlp' | 'cloud-data';

const MARQUEE_ITEMS = [
  'Machine Learning',
  'NLP & Transformers',
  'OCR Extraction',
  'Full-Stack Engineering',
  'Product Launch',
  'DoraHacks 2.0 Fellow',
  'StashVault Co-Founder',
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return document.documentElement.classList.contains('dark');
  });

  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [stackFilter, setStackFilter] = useState<StackFilter>('all');
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>('all');
  const [certFilter, setCertFilter] = useState<CertFilter>('all');
  const [certQuery, setCertQuery] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      try {
        localStorage.setItem('aasiya-theme', 'dark');
      } catch {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('aasiya-theme', 'light');
      } catch {}
    }
  }, [isDark]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  const filteredStack = useMemo(() => {
    if (stackFilter === 'all') return STACK_MATRIX;
    return STACK_MATRIX.filter((item) => item.domain === stackFilter);
  }, [stackFilter]);

  const filteredExperience = useMemo(() => {
    if (experienceFilter === 'all') return EXPERIENCE;
    return EXPERIENCE.filter((item) => item.type === experienceFilter);
  }, [experienceFilter]);

  const filteredCerts = useMemo(() => {
    const q = certQuery.trim().toLowerCase();
    return CERTIFICATIONS.filter((cert) => {
      const matchesDomain = certFilter === 'all' || cert.domain === certFilter;
      const matchesQuery =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q);
      return matchesDomain && matchesQuery;
    });
  }, [certFilter, certQuery]);

  return (
    <div id="top" className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
      <Navbar />

      <main className="mx-auto max-w-[1200px] px-6">
        {/* Hero Split */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Editorial Hierarchy */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {PROFILE.headline}
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.9rem)] font-bold leading-[1.06] tracking-tight text-zinc-950 dark:text-zinc-50 text-balance">
                  Hi, I’m {PROFILE.name}.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[17px] dark:text-zinc-400">
                  Machine Learning Intern at{' '}
                  <span className="font-medium text-zinc-950 dark:text-zinc-100">
                    FlyRank AI
                  </span>{' '}
                  and Co-Founder of{' '}
                  <span className="font-medium text-zinc-950 dark:text-zinc-100">
                    StashVault
                  </span>
                  . I build applied AI systems, OCR pipelines, and full-stack web products from hackathon prototype to public launch.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 whitespace-nowrap shrink-0"
                >
                  View my work
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#111114] dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 whitespace-nowrap shrink-0"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#111114] dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 whitespace-nowrap shrink-0"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsDark((prev) => !prev)}
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-700 transition-colors duration-150 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#111114] dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-50 whitespace-nowrap shrink-0"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Showcase Studio */}
            <div className="lg:col-span-6">
              <HeroStudio isDark={isDark} />
            </div>
          </div>

          {/* Full-width 4-Column Proof Strip */}
          <div className="mt-10 grid grid-cols-2 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#111114]">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="p-5 sm:p-6">
                <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums text-zinc-950 sm:text-3xl dark:text-zinc-50">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {metric.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="marquee-wrapper overflow-hidden border-y border-zinc-200 py-3.5 dark:border-zinc-800"
        >
          <div className="marquee-track flex items-center gap-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center gap-6 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Selected Projects Bento Grid */}
        <section id="projects" className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Projects
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                Things I’ve built and shipped.
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter projects by category"
              className="inline-flex items-center gap-1 rounded-lg bg-zinc-200/70 p-1 dark:bg-zinc-900"
            >
              {(
                [
                  { id: 'all', label: 'All Projects' },
                  { id: 'ai-ml', label: 'AI & ML' },
                  { id: 'web', label: 'Web' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProjectFilter(tab.id)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    projectFilter === tab.id
                      ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => {
              const isFeatured = Boolean(project.featured);
              return (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-150 hover:border-zinc-300 sm:p-8 dark:border-zinc-800 dark:bg-[#111114] dark:hover:border-zinc-700 ${
                    isFeatured ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{project.meta}</span>
                      <span className="font-mono text-zinc-600 dark:text-zinc-400">
                        {project.primaryTag}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start">
                      <div className={isFeatured ? 'lg:col-span-7' : 'lg:col-span-12'}>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                          {project.subtitle}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {project.summary}
                        </p>
                      </div>

                      {isFeatured && (
                        <div className="border-t border-zinc-200 pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7 dark:border-zinc-800">
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                            Launch Highlights
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {project.highlights.map((h) => (
                              <li key={h} className="flex items-baseline gap-2.5">
                                <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
                                  —
                                </span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:text-blue-400 dark:hover:decoration-blue-400 whitespace-nowrap"
                    >
                      Inspect architecture
                    </button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 whitespace-nowrap"
                    >
                      View repo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* About & Stack Matrix */}
        <section
          id="about"
          className="border-t border-zinc-200 py-20 dark:border-zinc-800"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                About
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 text-balance">
                Student, builder, founder.
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {PROFILE.aboutParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                    Technical Stack
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Tools and domains I apply across ML research and product engineering.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Filter stack items"
                  className="inline-flex items-center gap-1 rounded-lg bg-zinc-200/70 p-1 dark:bg-zinc-900"
                >
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'ai', label: 'AI & ML' },
                      { id: 'engineering', label: 'Engineering' },
                      { id: 'product', label: 'Cloud & Product' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStackFilter(tab.id)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        stackFilter === tab.id
                          ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                          : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architectural Index Matrix (zero pills) */}
              <div className="mt-6 grid divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:grid-cols-2 sm:divide-y-0 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#111114]">
                {filteredStack.map((item, idx) => (
                  <div
                    key={item.name}
                    className={`p-5 ${
                      idx % 2 === 0 ? 'sm:border-r sm:border-zinc-200 sm:dark:border-zinc-800' : ''
                    } ${
                      idx < filteredStack.length - (filteredStack.length % 2 === 0 ? 2 : 1)
                        ? 'sm:border-b sm:border-zinc-200 sm:dark:border-zinc-800'
                        : ''
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                        {item.index}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section
          id="experience"
          className="border-t border-zinc-200 py-20 dark:border-zinc-800"
        >
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            {/* Experience Column */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Experience
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                    Internships, programs and fellowships.
                  </h2>
                </div>

                <div
                  role="group"
                  aria-label="Filter experience by type"
                  className="inline-flex items-center gap-1 rounded-lg bg-zinc-200/70 p-1 dark:bg-zinc-900"
                >
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'work', label: 'Roles' },
                      { id: 'fellowship', label: 'Fellowships' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setExperienceFilter(tab.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        experienceFilter === tab.id
                          ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                          : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {filteredExperience.map((exp) => (
                  <article key={exp.id} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                          {exp.role}
                        </h3>
                        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                          {exp.organization} · {exp.meta}
                        </p>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                        {exp.period}
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>

                    <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                      {exp.focus.join(' · ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div id="education" className="lg:col-span-4">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Education
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                B.E. in Artificial Intelligence &amp; Data Science.
              </h2>

              <div className="mt-8 space-y-5">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#111114]"
                  >
                    {edu.period && (
                      <p className="font-mono text-xs tabular-nums text-blue-600 dark:text-blue-400">
                        {edu.period}
                      </p>
                    )}
                    <h3 className="mt-1 font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {edu.institution}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {edu.degree}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {edu.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Ledger */}
        <section
          id="certifications"
          className="border-t border-zinc-200 py-20 dark:border-zinc-800"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Certifications
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                35 licenses &amp; certifications.
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Selected highlights across Machine Learning, Transformers, Cloud Architecture, and Statistics.
              </p>
            </div>

            <a
              href={PROFILE.certificationsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 whitespace-nowrap"
            >
              See all 35 on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter certifications by topic"
              className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-zinc-200/70 p-1 dark:bg-zinc-900"
            >
              {(
                [
                  { id: 'all', label: 'All Highlights' },
                  { id: 'ai-ml', label: 'AI & ML' },
                  { id: 'nlp', label: 'NLP & Prompting' },
                  { id: 'cloud-data', label: 'Cloud & Data' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCertFilter(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    certFilter === tab.id
                      ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                placeholder="Search title or issuer..."
                aria-label="Search certifications"
                className="w-full rounded-lg border border-zinc-200 bg-white py-2 pr-3 pl-9 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-[#111114] dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>
          </div>

          {filteredCerts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-[#111114]">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No certifications match “{certQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCertFilter('all');
                  setCertQuery('');
                }}
                className="mt-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111114]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{cert.issuer}</span>
                      <span className="font-mono tabular-nums">{cert.date}</span>
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-semibold leading-snug text-zinc-950 dark:text-zinc-100">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 Aasiya Hadiya · built with &lt;code/&gt; &amp; curiosity</p>

          <div className="flex items-center gap-6">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              Email
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
            >
              Top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
