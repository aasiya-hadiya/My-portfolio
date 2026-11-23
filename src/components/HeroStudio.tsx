import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RotateCcw, Terminal } from 'lucide-react';

type StudioTab = 'topology' | 'console' | 'ocr';

interface GraphNode {
  id: string;
  label: string;
  detail: string;
  targetHref: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  primary?: boolean;
}

const INITIAL_NODES: Omit<GraphNode, 'x' | 'y' | 'vx' | 'vy'>[] = [
  { id: 'aasiya', label: 'Aasiya Hadiya', detail: 'AI & Data Science ’28 · Builder & Founder', targetHref: '#about', color: '#2563EB', radius: 10, primary: true },
  { id: 'stashvault', label: 'StashVault', detail: 'Co-Founder · 272+ launch visitors · Product Hunt', targetHref: '#projects', color: '#059669', radius: 8, primary: true },
  { id: 'flyrank', label: 'FlyRank AI', detail: 'Machine Learning Intern · Applied ML', targetHref: '#experience', color: '#4F46E5', radius: 7 },
  { id: 'ocr', label: 'OCR Pipeline', detail: 'Receipt extraction & structured storage', targetHref: '#projects', color: '#059669', radius: 6 },
  { id: 'nlp', label: 'NLP & Transformers', detail: 'Skillsoft Certified · Prompting & LLMs', targetHref: '#certifications', color: '#7C3AED', radius: 6 },
  { id: 'ml', label: 'Machine Learning', detail: 'DeepLearning.AI · Regression & Classification', targetHref: '#certifications', color: '#2563EB', radius: 7 },
  { id: 'dorahacks', label: 'DoraHacks 2.0', detail: 'Top 500 of 6,000+ teams across 35+ countries', targetHref: '#experience', color: '#E11D48', radius: 6 },
  { id: 'fullstack', label: 'Full-Stack Web', detail: 'Python · JavaScript · HTML · Databases', targetHref: '#about', color: '#4F46E5', radius: 6 },
];

const EDGES: [string, string][] = [
  ['aasiya', 'stashvault'],
  ['aasiya', 'flyrank'],
  ['aasiya', 'ml'],
  ['aasiya', 'dorahacks'],
  ['aasiya', 'fullstack'],
  ['stashvault', 'ocr'],
  ['stashvault', 'dorahacks'],
  ['stashvault', 'fullstack'],
  ['flyrank', 'ml'],
  ['ml', 'nlp'],
  ['ocr', 'nlp'],
];

const OCR_SAMPLES = [
  {
    id: 'sony',
    item: 'Sony WH-1000XM5 Wireless',
    vendor: 'Croma Electronics',
    purchased: '2026-09-14',
    total: 'INR 26,990',
    warrantyEnd: '2027-09-14',
    returnWindow: 'Closed (14d)',
    status: 'Protected · 9 months left',
    confidence: '98.4%',
    aiNote: 'Extended manufacturer warranty eligible via serial registration.',
  },
  {
    id: 'laptop',
    item: 'MacBook Air 13" M3',
    vendor: 'Imagine Apple Store',
    purchased: '2026-11-12',
    total: 'INR 1,14,900',
    warrantyEnd: '2027-11-12',
    returnWindow: 'Active · 3 days left',
    status: 'Return window open',
    confidence: '99.1%',
    aiNote: 'Invoice parsed. Return deadline reminder scheduled for Nov 26.',
  },
  {
    id: 'keyboard',
    item: 'Keychron K2 Pro QMK',
    vendor: 'Meckeys India',
    purchased: '2026-10-02',
    total: 'INR 9,499',
    warrantyEnd: '2027-10-02',
    returnWindow: 'Closed (7d)',
    status: 'Protected · 10 months left',
    confidence: '97.8%',
    aiNote: 'Switch batch & order ID indexed for one-click support claim.',
  },
];

interface ConsoleLine {
  kind: 'boot' | 'ok' | 'cmd' | 'out';
  text: string;
}

const BOOT_SEQUENCE: ConsoleLine[] = [
  { kind: 'boot', text: '$ loading modules: AI · ML · Web' },
  { kind: 'ok', text: '> compiling projects ... OK' },
  { kind: 'boot', text: '> syncing StashVault · FlyRank AI · DoraHacks 2.0' },
  { kind: 'ok', text: '> welcome, Aasiya_' },
];

export function HeroStudio({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<StudioTab>('topology');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('stashvault');

  const [lines, setLines] = useState<ConsoleLine[]>(BOOT_SEQUENCE);
  const [cmdInput, setCmdInput] = useState('');
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const [selectedOcrId, setSelectedOcrId] = useState<string>('laptop');
  const activeOcr = OCR_SAMPLES.find((s) => s.id === selectedOcrId) ?? OCR_SAMPLES[0];

  useEffect(() => {
    if (activeTab !== 'topology') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    const pointer = { x: -999, y: -999, active: false };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const cx = width / 2;
    const cy = height / 2;
    const nodes: GraphNode[] = INITIAL_NODES.map((n, idx) => {
      const angle = (idx / INITIAL_NODES.length) * Math.PI * 2 - Math.PI / 2;
      const dist = n.id === 'aasiya' ? 0 : Math.min(width, height) * 0.31;
      return {
        ...n,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      };
    });

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    let currentHover: GraphNode | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;

      let closest: GraphNode | null = null;
      let minDist = 28;
      for (const node of nodes) {
        const d = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (d < minDist) {
          minDist = d;
          closest = node;
        }
      }
      if (closest?.id !== currentHover?.id) {
        currentHover = closest;
        setHoveredNode(closest);
      }
      canvas.style.cursor = closest ? 'pointer' : 'default';
    };

    const onPointerLeave = () => {
      pointer.active = false;
      currentHover = null;
      setHoveredNode(null);
      canvas.style.cursor = 'default';
    };

    const onClick = () => {
      if (currentHover) {
        setSelectedNodeId(currentHover.id);
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle architectural dot grid
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(37, 99, 235, 0.1)';
      const step = 28;
      for (let gx = step; gx < width; gx += step) {
        for (let gy = step; gy < height; gy += step) {
          ctx.fillRect(gx, gy, 1.3, 1.3);
        }
      }

      if (!prefersReducedMotion) {
        const centerX = width / 2;
        const centerY = height / 2;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.id === 'aasiya') {
            n.x += (centerX - n.x) * 0.05;
            n.y += (centerY - n.y) * 0.05;
            continue;
          }
          const angle = (i / (nodes.length - 1)) * Math.PI * 2 - Math.PI / 2;
          const targetDist = Math.min(width, height) * 0.33;
          const tx = centerX + Math.cos(angle) * targetDist;
          const ty = centerY + Math.sin(angle) * targetDist;

          n.vx += (tx - n.x) * 0.004;
          n.vy += (ty - n.y) * 0.004;

          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110 && dist > 1) {
              n.vx += (dx / dist) * 0.08;
              n.vy += (dy / dist) * 0.08;
            }
          }

          n.vx *= 0.92;
          n.vy *= 0.92;
          n.x = Math.max(46, Math.min(width - 46, n.x + n.vx));
          n.y = Math.max(36, Math.min(height - 36, n.y + n.vy));
        }
      }

      // Draw edges
      for (const [aId, bId] of EDGES) {
        const a = nodeMap.get(aId);
        const b = nodeMap.get(bId);
        if (!a || !b) continue;
        const isHighlighted =
          currentHover?.id === a.id ||
          currentHover?.id === b.id ||
          selectedNodeId === a.id ||
          selectedNodeId === b.id;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHighlighted
          ? b.color
          : isDark
          ? 'rgba(161, 161, 170, 0.22)'
          : 'rgba(148, 163, 184, 0.45)';
        ctx.lineWidth = isHighlighted ? 1.75 : 1;
        ctx.stroke();
      }

      // Draw colorful nodes and labels
      for (const node of nodes) {
        const isHovered = currentHover?.id === node.id;
        const isSelected = selectedNodeId === node.id;

        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 7, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}26`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.font = `${isHovered || isSelected ? '600' : '500'} 11.5px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle =
          isHovered || isSelected
            ? node.color
            : isDark
            ? '#E4E4E7'
            : '#1E293B';
        ctx.fillText(node.label, node.x, node.y + node.radius + 15);
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, [activeTab, isDark, selectedNodeId]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setLines([]);
      setCmdInput('');
      return;
    }

    if (cmd === 'replay') {
      setLines(BOOT_SEQUENCE);
      setCmdInput('');
      return;
    }

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Commands: about · stashvault · experience · stack · contact · replay · clear';
        break;
      case 'about':
        response =
          'Aasiya Hadiya — AI & Data Science Undergrad ’28 (VTU / Bearys). ML Intern @ FlyRank AI & Co-Founder @ StashVault.';
        break;
      case 'stashvault':
        response =
          'StashVault: AI personal ownership platform with OCR receipt extraction & warranty tracking. 272+ visitors, 80+ sign-ups in 3 days on Product Hunt.';
        break;
      case 'experience':
        response =
          'Co-Founder @ StashVault | ML Intern @ FlyRank AI | DoraHacks 2.0 Fellow (Top 500/6,000+) | Infosys Springboard | Python Intern @ Codec.';
        break;
      case 'stack':
        response = 'Python · Machine Learning · NLP & Transformers · OCR · JavaScript · HTML · Full-stack · AWS Cloud';
        break;
      case 'contact':
        response = 'Email: aasiyahadiya12@gmail.com · GitHub: github.com/aasiya-hadiya · LinkedIn: in/aasiya-hadiya';
        break;
      default:
        response = `Unknown command "${cmd}". Type "help" for available commands.`;
    }

    setLines((prev) => [
      ...prev,
      { kind: 'cmd', text: `$ ${cmd}` },
      { kind: 'out', text: response },
    ]);
    setCmdInput('');
  };

  const activeNode = hoveredNode ?? INITIAL_NODES.find((n) => n.id === selectedNodeId) ?? INITIAL_NODES[1];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111114]">
      {/* Studio Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-[#111114]">
        <div
          role="tablist"
          aria-label="Interactive showcase mode"
          className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
        >
          <button
            role="tab"
            type="button"
            aria-selected={activeTab === 'topology'}
            onClick={() => setActiveTab('topology')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'topology'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-zinc-800 dark:text-blue-400'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            Skill Graph
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={activeTab === 'console'}
            onClick={() => setActiveTab('console')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'console'
                ? 'bg-white text-indigo-600 shadow-xs dark:bg-zinc-800 dark:text-indigo-400'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            Console
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={activeTab === 'ocr'}
            onClick={() => setActiveTab('ocr')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ocr'
                ? 'bg-white text-emerald-600 shadow-xs dark:bg-zinc-800 dark:text-emerald-400'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            StashVault OCR
          </button>
        </div>

        <span className="font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
          AI · ML · Web
        </span>
      </div>

      {/* Interactive Viewport */}
      {activeTab === 'topology' && (
        <div className="flex flex-1 flex-col justify-between bg-white dark:bg-[#111114]">
          <div className="relative h-[300px] w-full sm:h-[330px]">
            <canvas
              ref={canvasRef}
              aria-label="Interactive graph of Aasiya Hadiya's projects, roles, and technical skills"
              className="h-full w-full block"
            />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
                {activeNode.label}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                {activeNode.detail}
              </p>
            </div>
            <a
              href={activeNode.targetHref}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:border-blue-600 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-blue-400 dark:hover:border-blue-500 whitespace-nowrap shrink-0"
            >
              Inspect <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      {activeTab === 'console' && (
        <div className="flex flex-1 flex-col justify-between bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
          <div className="h-[280px] overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:h-[305px]">
            {lines.map((line, i) => (
              <div
                key={`${line.text}-${i}`}
                className={
                  line.kind === 'boot'
                    ? 'text-blue-600 dark:text-blue-400'
                    : line.kind === 'ok'
                    ? 'text-emerald-600 font-medium dark:text-emerald-400'
                    : line.kind === 'cmd'
                    ? 'mt-2 text-indigo-700 font-semibold dark:text-indigo-300'
                    : 'mt-1 text-zinc-700 dark:text-zinc-300'
                }
              >
                {line.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          <div className="border-t border-zinc-200 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {['about', 'stashvault', 'experience', 'stack', 'contact'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => runCommand(preset)}
                  className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-indigo-600 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-indigo-300 dark:hover:text-white whitespace-nowrap shrink-0"
                >
                  {preset}
                </button>
              ))}
              <button
                type="button"
                onClick={() => runCommand('replay')}
                aria-label="Replay boot sequence"
                className="ml-auto inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 font-mono text-[11px] text-zinc-600 transition-colors hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(cmdInput);
              }}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-950"
            >
              <Terminal className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="Type a command (try: help)"
                aria-label="Terminal command input"
                className="w-full bg-transparent font-mono text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="rounded px-2 py-0.5 font-mono text-[11px] font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-zinc-800 whitespace-nowrap shrink-0"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'ocr' && (
        <div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-[#111114]">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3">
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Sample Receipt Input
              </p>
              <span className="font-mono text-xs font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                OCR Confidence {activeOcr.confidence}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pb-4">
              {OCR_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setSelectedOcrId(sample.id)}
                  className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
                    selectedOcrId === sample.id
                      ? 'border-emerald-600 bg-emerald-50 font-semibold text-emerald-700 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="block truncate">{sample.item}</span>
                </button>
              ))}
            </div>

            {/* Structured Extraction Preview */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Product</span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">{activeOcr.item}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Merchant</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{activeOcr.vendor}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Purchase Date</span>
                  <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">{activeOcr.purchased}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Amount</span>
                  <span className="font-mono font-medium tabular-nums text-blue-600 dark:text-blue-400">{activeOcr.total}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Warranty Expiry</span>
                  <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">{activeOcr.warrantyEnd}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">Return Window</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeOcr.returnWindow}</span>
                </div>
              </div>
              <div className="mt-3 border-t border-zinc-200 pt-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                <span className="font-semibold text-blue-600 dark:text-blue-400">AI Assistant: </span>
                {activeOcr.aiNote}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>{activeOcr.status}</span>
            <a
              href="https://github.com/aasiya-hadiya/StashVault"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline dark:text-emerald-400 whitespace-nowrap"
            >
              StashVault Repo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
