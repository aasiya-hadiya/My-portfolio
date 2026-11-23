import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

const TOPICS = [
  'ML / AI Internship',
  'Hackathon Team',
  'StashVault & Product',
  'Collaboration',
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for clipboard restrictions
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[${selectedTopic}] Reaching out via aasiya.dev`
  )}&body=${encodeURIComponent(message || `Hi Aasiya,\n\nI came across your portfolio and wanted to connect regarding ${selectedTopic}.`)}`;

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 py-20 dark:border-zinc-800"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Contact
          </p>
          <h2 className="mt-2 max-w-lg font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 text-balance">
            Open to internships, collaborations and hackathon teams.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Whether you’re hiring for Machine Learning or AI engineering internships, forming a hackathon team, or exploring product collaborations, let’s connect.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              <Mail className="h-4 w-4" />
              {PROFILE.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Copied email
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy email
                </>
              )}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Direct Inquiry Composer */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#111114]">
            <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              Start a conversation
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Pick a topic and compose a direct email draft in one click.
            </p>

            <div className="mt-5">
              <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Topic
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedTopic === topic
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-note"
                className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                Your note
              </label>
              <textarea
                id="contact-note"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi Aasiya, reaching out about ${selectedTopic}...`}
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Opens your default mail client
              </span>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 whitespace-nowrap shrink-0"
              >
                Open Email Draft <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
