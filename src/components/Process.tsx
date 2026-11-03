"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check, MousePointer2 } from "@/components/icons";
import { ScrollReveal } from "./ScrollReveal";

/* ---------- visuals, one per step ---------- */

function DiscoverVisual() {
  const notes = [
    { t: "Goals", l: ["Grow online sales", "Cut manual work"] },
    { t: "Users", l: ["Who buys", "What they need"] },
    { t: "Constraints", l: ["Budget", "Deadline"] },
    { t: "Scope", l: ["Smallest useful launch", "Phase 2 ideas"] },
  ];
  return (
    <div className="grid h-full grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6">
      {notes.map((n, i) => (
        <motion.div
          key={n.t}
          initial={{ opacity: 0, y: 24, rotate: i % 2 ? 2 : -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 110, damping: 15 }}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-2">{n.t}</p>
          <ul className="mt-3 space-y-2">
            {n.l.map((x) => (
              <li key={x} className="flex items-center gap-2 text-[13px] text-white/80">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-accent/25 text-accent">
                  <Check size={10} strokeWidth={3.5} />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function DesignVisual() {
  // wireframe on the left, high-fidelity version revealed by a sweeping cursor
  const layout = (hi: boolean) => (
    <div className="absolute inset-4 flex flex-col gap-3 sm:inset-6">
      <div className={`flex h-9 items-center justify-between rounded-xl px-3 ${hi ? "bg-white/10" : "border border-dashed border-white/25"}`}>
        <span className={`h-2.5 w-14 rounded-full ${hi ? "bg-white/70" : "bg-white/15"}`} />
        <span className={`h-5 w-16 rounded-full ${hi ? "bg-gradient-to-r from-accent to-accent-2" : "border border-dashed border-white/25"}`} />
      </div>
      <div className={`flex-1 rounded-2xl ${hi ? "bg-gradient-to-br from-indigo-500/60 via-indigo-400/30 to-cyan-400/40" : "border border-dashed border-white/25"}`}>
        <div className="p-4">
          <span className={`block h-4 w-2/3 rounded-full ${hi ? "bg-white/85" : "bg-white/15"}`} />
          <span className={`mt-3 block h-2.5 w-1/2 rounded-full ${hi ? "bg-white/50" : "bg-white/10"}`} />
        </div>
      </div>
      <div className="grid h-[28%] grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`rounded-xl ${hi ? "bg-white/10 ring-1 ring-white/15" : "border border-dashed border-white/25"}`} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="relative h-full min-h-[16rem]">
      {layout(false)}
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.45, 0.8, 1], ease: "easeInOut" }}
      >
        {layout(true)}
      </motion.div>
      <motion.div
        className="absolute top-1/2 text-white"
        animate={{ left: ["0%", "96%", "96%", "0%"] }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.45, 0.8, 1], ease: "easeInOut" }}
      >
        <MousePointer2 size={22} className="fill-white drop-shadow-lg" />
      </motion.div>
    </div>
  );
}

function BuildVisual() {
  const code = [
    ["const", " order", " = await", " checkout(", "cart", ")"],
    ["if", " (!order.paid)", " return", " retry()"],
    ["await", " notify(", "team", ")"],
    ["export", " default", " order"],
  ];
  const tests = ["Cart totals", "Checkout flow", "Payment webhook", "Order emails"];
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-6">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-[12px] leading-relaxed">
        {code.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.25 }}
            className="flex gap-3"
          >
            <span className="w-4 text-white/25">{i + 1}</span>
            <span>
              {line.map((w, j) => (
                <span key={j} className={j === 0 ? "text-indigo-300" : j % 3 === 1 ? "text-cyan-200" : "text-white/75"}>
                  {w}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {tests.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.2 }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px]"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
              <Check size={10} strokeWidth={3.5} />
            </span>
            {t}
          </motion.div>
        ))}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 2.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent-2"
        />
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
        </span>
        <span className="font-mono text-[11px] text-white/40">monitoring on</span>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <svg viewBox="0 0 300 140" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 120 C40 112 60 100 90 96 S140 70 170 62 S230 34 300 10 L300 140 L0 140 Z"
            fill="url(#lg)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.85, 1] }}
          />
          <motion.path
            d="M0 120 C40 112 60 100 90 96 S140 70 170 62 S230 34 300 10"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.85, 1], ease: "easeInOut" }}
          />
        </svg>
        <p className="absolute left-4 top-3 text-xs text-white/50">Traffic after launch</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-white/60">
        {["Deployed", "Analytics on", "Support active"].map((x) => (
          <span key={x} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-2">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- data ---------- */

const steps: {
  n: string;
  title: string;
  when: string;
  text: string;
  points: string[];
  color: string;
  Visual: () => ReactNode;
}[] = [
  {
    n: "01",
    title: "Discover",
    when: "Typically week 1",
    text: "I learn the goals, users and constraints, then scope the smallest thing worth shipping.",
    points: ["Goals and success metrics", "Scope, timeline and budget", "Tech plan and risks"],
    color: "#6366f1",
    Visual: DiscoverVisual,
  },
  {
    n: "02",
    title: "Design",
    when: "Typically weeks 1 to 2",
    text: "Wireframes and a clickable prototype you approve before a single line of code is written.",
    points: ["Wireframes and user flows", "Clickable prototype", "UI kit and brand polish"],
    color: "#22d3ee",
    Visual: DesignVisual,
  },
  {
    n: "03",
    title: "Build",
    when: "Weekly demos",
    text: "Clean code and automated tests, with a working demo every week so you always see real progress.",
    points: ["Weekly demos on staging", "Automated tests", "Security and performance checks"],
    color: "#818cf8",
    Visual: BuildVisual,
  },
  {
    n: "04",
    title: "Launch & Grow",
    when: "And after",
    text: "Deployment, analytics and iteration. I stay on after launch to keep improving.",
    points: ["Production deployment", "Analytics and monitoring", "Ongoing support and updates"],
    color: "#38bdf8",
    Visual: LaunchVisual,
  },
];

/* ---------- stacking card ---------- */

function StepCard({ s, i, progress }: { s: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const n = steps.length;
  // earlier cards shrink slightly as later ones slide over them
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.045]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-6">
      <motion.div
        style={{ scale, top: i * 26, originY: 0, background: `radial-gradient(ellipse 70% 60% at 85% 10%, ${s.color}26, transparent 70%), #0a0b12` }}
        className="relative grid w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] md:min-h-[30rem] md:grid-cols-[1fr_1.05fr]"
      >
        <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-bold text-black" style={{ background: s.color }}>
              {s.n}
            </span>
            <span className="rounded-full border border-white/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">{s.when}</span>
          </div>
          <h3 className="mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{s.title}</h3>
          <p className="mt-4 max-w-md text-[1.05rem] leading-snug text-white/55">{s.text}</p>
          <ul className="mt-6 space-y-2.5">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[16rem] border-t border-white/10 bg-black/25 md:border-l md:border-t-0">
          <s.Visual />
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="process" className="relative">
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-16 text-center sm:pb-16 sm:pt-28">
        <ScrollReveal
          className="text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
          lead="How I work."
          tail="Four clear steps, a demo every week and one engineer you can actually talk to."
        />
      </div>
      <div ref={ref} className="relative">
        {steps.map((s, i) => (
          <StepCard key={s.n} s={s} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
