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
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/35 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-blue-200 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-5">
          <div>
            <p className="text-xs font-medium text-indigo-600">
              {project.meta}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-emerald-700">
              {project.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 transition-colors hover:bg-blue-50 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-[15px] leading-relaxed text-blue-950/85">
            {project.summary}
          </p>

          <div className="grid gap-5 border-y border-blue-100 py-5 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold text-rose-700">
                Problem
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-900/80">
                {project.architecture.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-indigo-700">
                Engineering Approach
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-900/80">
                {project.architecture.approach}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-emerald-700">
              Outcome & Traction
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-blue-900/80">
              {project.architecture.outcome}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-indigo-900/85">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-blue-600">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-blue-100 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-medium text-violet-700">
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
