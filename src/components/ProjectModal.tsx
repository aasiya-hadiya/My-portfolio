import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-zinc-800 dark:bg-[#111114]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {project.meta}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {project.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.summary}
          </p>

          <div className="grid gap-5 border-y border-zinc-200 py-5 sm:grid-cols-2 dark:border-zinc-800">
            <div>
              <h4 className="text-xs font-semibold text-zinc-950 dark:text-zinc-100">
                Problem
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.architecture.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-950 dark:text-zinc-100">
                Engineering Approach
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.architecture.approach}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-950 dark:text-zinc-100">
              Outcome & Traction
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.architecture.outcome}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {project.architecture.stack.join(' · ')}
              </p>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
              >
                View on GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
