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
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[${selectedTopic}] Portfolio Inquiry`
  )}&body=${encodeURIComponent(
    message ||
      `Hi Aasiya,\n\nI came across your portfolio and wanted to connect regarding ${selectedTopic}.`
  )}`;

  return (
    <section
      id="contact"
      className="border-t border-blue-100 bg-white py-20"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold text-rose-700">
            Contact
          </p>
          <h2 className="mt-2 max-w-lg font-display text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl text-balance">
            Open to internships, collaborations and{' '}
            <span className="text-blue-600">hackathon teams</span>.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-indigo-900/85">
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
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-blue-50/60 whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-700" />
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

          <div className="mt-8 flex items-center gap-6 text-sm font-semibold">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-blue-700 transition-colors hover:text-blue-800"
            >
              LinkedIn <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 transition-colors hover:text-emerald-800"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Direct Inquiry Composer */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-blue-200 bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-indigo-700">
              Start a conversation
            </h3>
            <p className="mt-1 text-sm text-blue-900/75">
              Pick a topic and compose a direct email draft in one click.
            </p>

            <div className="mt-5">
              <span className="block text-xs font-semibold text-blue-800">
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
                        : 'border-blue-200 bg-white text-indigo-700 hover:border-blue-400 hover:text-blue-700'
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
                className="block text-xs font-semibold text-blue-800"
              >
                Your note
              </label>
              <textarea
                id="contact-note"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi Aasiya, reaching out about ${selectedTopic}...`}
                className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3.5 py-2.5 text-sm text-blue-900 placeholder:text-indigo-400 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-xs text-indigo-600">
                Opens your default mail client
              </span>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 whitespace-nowrap shrink-0"
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
