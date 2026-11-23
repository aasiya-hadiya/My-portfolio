import { useMemo, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Search,
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
  type AccentTone,
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

const ACCENT_TEXT: Record<AccentTone, string> = {
  blue: 'text-blue-700',
  emerald: 'text-emerald-700',
  indigo: 'text-indigo-700',
  violet: 'text-violet-700',
  rose: 'text-rose-700',
};

export default function App() {
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [stackFilter, setStackFilter] = useState<StackFilter>('all');
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>('all');
  const [certFilter, setCertFilter] = useState<CertFilter>('all');
  const [certQuery, setCertQuery] = useState('');

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
    <div id="top" className="min-h-screen bg-white text-blue-950">
      <Navbar />

      <main className="mx-auto max-w-[1200px] px-6 bg-white">
        {/* Hero Split */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Editorial Hierarchy */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  {PROFILE.headline}
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.9rem)] font-bold leading-[1.06] tracking-tight text-blue-900 text-balance">
                  Hi, I’m{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    {PROFILE.name}.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-indigo-900/85 sm:text-[17px]">
                  Machine Learning Intern at{' '}
                  <span className="font-semibold text-blue-600">
                    FlyRank AI
                  </span>{' '}
                  and Co-Founder of{' '}
                  <span className="font-semibold text-emerald-700">
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-colors duration-150 hover:border-emerald-400 hover:bg-emerald-50/50 whitespace-nowrap shrink-0"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition-colors duration-150 hover:border-indigo-400 hover:bg-indigo-50/50 whitespace-nowrap shrink-0"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Showcase Studio */}
            <div className="lg:col-span-6">
              <HeroStudio />
            </div>
          </div>

          {/* Full-width 4-Column Proof Strip */}
          <div className="mt-10 grid grid-cols-2 divide-y divide-blue-100 rounded-2xl border border-blue-200 bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="p-5 sm:p-6">
                <p
                  className={`font-mono text-2xl font-bold tracking-tight tabular-nums sm:text-3xl ${ACCENT_TEXT[metric.accent]}`}
                >
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-blue-900">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs text-indigo-600">
                  {metric.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="marquee-wrapper overflow-hidden border-y border-blue-100 bg-white py-3.5"
        >
          <div className="marquee-track flex items-center gap-6 text-xs font-semibold text-indigo-600">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center gap-6 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-blue-300">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Selected Projects Bento Grid */}
        <section id="projects" className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Projects
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
                Things I’ve built and{' '}
                <span className="text-blue-600">shipped.</span>
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter projects by category"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50/80 p-1"
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
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-indigo-700 hover:text-blue-700'
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
              const accentClass = ACCENT_TEXT[project.accent];
              return (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-6 transition-colors duration-150 hover:border-blue-300 sm:p-8 ${
                    isFeatured ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-indigo-600">{project.meta}</span>
                      <span className={`font-mono font-semibold ${accentClass}`}>
                        {project.primaryTag}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start">
                      <div className={isFeatured ? 'lg:col-span-7' : 'lg:col-span-12'}>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className={`mt-1 text-sm font-semibold ${accentClass}`}>
                          {project.subtitle}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-blue-950/80">
                          {project.summary}
                        </p>
                      </div>

                      {isFeatured && (
                        <div className="border-t border-blue-100 pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
                          <p className="text-xs font-semibold text-emerald-700">
                            Launch Highlights
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-indigo-900/85">
                            {project.highlights.map((h) => (
                              <li key={h} className="flex items-baseline gap-2.5">
                                <span className="font-mono text-xs text-emerald-600">
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

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-blue-100 pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className={`text-sm font-semibold underline decoration-blue-200 underline-offset-4 transition-colors hover:opacity-80 whitespace-nowrap ${accentClass}`}
                    >
                      Inspect architecture
                    </button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 whitespace-nowrap"
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
          className="border-t border-blue-100 py-20"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-indigo-600">
                About
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl text-balance">
                Student, builder,{' '}
                <span className="text-indigo-600">founder.</span>
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-blue-950/80">
                {PROFILE.aboutParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-blue-900">
                    Technical Stack
                  </h3>
                  <p className="mt-1 text-sm text-indigo-700">
                    Tools and domains I apply across ML research and product engineering.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Filter stack items"
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50/80 p-1"
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
                          ? 'bg-white text-indigo-700 shadow-xs'
                          : 'text-indigo-700 hover:text-blue-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architectural Index Matrix (zero pills) */}
              <div className="mt-6 grid divide-y divide-blue-100 overflow-hidden rounded-2xl border border-blue-200 bg-white sm:grid-cols-2 sm:divide-y-0">
                {filteredStack.map((item, idx) => (
                  <div
                    key={item.name}
                    className={`p-5 ${
                      idx % 2 === 0 ? 'sm:border-r sm:border-blue-100' : ''
                    } ${
                      idx < filteredStack.length - (filteredStack.length % 2 === 0 ? 2 : 1)
                        ? 'sm:border-b sm:border-blue-100'
                        : ''
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`font-display text-base font-semibold ${ACCENT_TEXT[item.accent]}`}>
                        {item.name}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-indigo-400">
                        {item.index}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-blue-900/75">
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
          className="border-t border-blue-100 py-20"
        >
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            {/* Experience Column */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Experience
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
                    Internships, programs and{' '}
                    <span className="text-emerald-700">fellowships.</span>
                  </h2>
                </div>

                <div
                  role="group"
                  aria-label="Filter experience by type"
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50/80 p-1"
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
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-indigo-700 hover:text-emerald-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 divide-y divide-blue-100 border-y border-blue-100">
                {filteredExperience.map((exp) => (
                  <article key={exp.id} className="py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className={`font-display text-lg font-semibold ${ACCENT_TEXT[exp.accent]}`}>
                          {exp.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-blue-900">
                          {exp.organization} · {exp.meta}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-medium tabular-nums text-indigo-600">
                        {exp.period}
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-blue-950/80">
                      {exp.description}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-indigo-600">
                      {exp.focus.join(' · ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div id="education" className="lg:col-span-4">
              <p className="text-sm font-semibold text-violet-700">
                Education
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-blue-900">
                B.E. in Artificial Intelligence &amp; Data Science.
              </h2>

              <div className="mt-8 space-y-5">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-2xl border border-blue-200 bg-white p-6"
                  >
                    {edu.period && (
                      <p className="font-mono text-xs font-semibold tabular-nums text-violet-700">
                        {edu.period}
                      </p>
                    )}
                    <h3 className="mt-1 font-display text-lg font-semibold text-blue-900">
                      {edu.institution}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-blue-600">
                      {edu.degree}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-indigo-900/80">
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
          className="border-t border-blue-100 py-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-violet-700">
                Certifications
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
                <span className="text-violet-700">35</span> licenses &amp; certifications.
              </h2>
              <p className="mt-2 text-sm text-indigo-700">
                Selected highlights across Machine Learning, Transformers, Cloud Architecture, and Statistics.
              </p>
            </div>

            <a
              href={PROFILE.certificationsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap"
            >
              See all 35 on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter certifications by topic"
              className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-blue-50/80 p-1"
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
                      ? 'bg-white text-violet-700 shadow-xs'
                      : 'text-indigo-700 hover:text-violet-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-blue-500" />
              <input
                type="search"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                placeholder="Search title or issuer..."
                aria-label="Search certifications"
                className="w-full rounded-lg border border-blue-200 bg-white py-2 pr-3 pl-9 text-xs text-blue-900 placeholder:text-indigo-400 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {filteredCerts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-8 text-center">
              <p className="text-sm text-indigo-700">
                No certifications match “{certQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCertFilter('all');
                  setCertQuery('');
                }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white p-5 transition-colors hover:border-violet-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-indigo-600">
                        {cert.issuer}
                      </span>
                      <span className="font-mono font-medium tabular-nums text-emerald-700">
                        {cert.date}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-semibold leading-snug text-blue-900">
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
      <footer className="border-t border-blue-100 bg-white py-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 text-xs">
          <p className="font-medium text-indigo-700">
            © 2026 Aasiya Hadiya · built with &lt;code/&gt; &amp; curiosity
          </p>

          <div className="flex items-center gap-6 font-semibold">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 transition-colors hover:text-emerald-800"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-700 transition-colors hover:text-indigo-800"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-blue-700 transition-colors hover:text-blue-800"
            >
              Email
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-1 text-violet-700 transition-colors hover:text-violet-800"
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
