"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Bell, Bot, Check, Database, FileText, Layers, LayoutDashboard, Mail, Plug, Send, Settings, Sparkles, Users } from "@/components/icons";

const steps = [
  {
    id: "web",
    label: "Web & E-commerce",
    title: "Web & E-commerce.",
    text: "Shopify, WordPress and custom Next.js sites built to load fast and convert. Storefronts, bundle builders and landing pages that sell.",
    color: "#6366f1",
  },
  {
    id: "mobile",
    label: "Mobile apps",
    title: "Mobile apps.",
    text: "iOS and Android apps with React Native and Flutter, from first prototype to store launch.",
    color: "#22d3ee",
  },
  {
    id: "saas",
    label: "SaaS platforms",
    title: "SaaS platforms.",
    text: "Multi-tenant products with accounts, billing, dashboards and APIs that are ready to scale from day one.",
    color: "#a78bfa",
  },
  {
    id: "ai",
    label: "AI automation",
    title: "AI automation.",
    text: "Workflows that connect your CRM, email and WhatsApp so the repetitive work runs itself.",
    color: "#34d399",
  },
  {
    id: "bot",
    label: "Chatbots & custom AI",
    title: "Chatbots & custom AI.",
    text: "Assistants trained on your own data that answer questions, qualify leads and sell around the clock.",
    color: "#f59e0b",
  },
];

/* ---------- screens (sized in em so they scale with the laptop) ---------- */

function WebScreen() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <motion.div
        animate={{ y: ["0%", "-72%"] }}
        transition={{ duration: 38, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        <Image src="/projects/yaynuts.webp" alt="Storefront I built" width={1000} height={7800} className="h-auto w-full" priority />
      </motion.div>
    </div>
  );
}

function MobileScreen() {
  const phone = (src: string, cls: string, delay: number) => (
    <motion.div
      initial={{ opacity: 0, y: "6em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay }}
      className={`absolute aspect-[9/19] w-[17em] overflow-hidden rounded-[2.2em] border-[0.45em] border-[#16161a] bg-black shadow-2xl ${cls}`}
    >
      <motion.div animate={{ y: ["0%", "-60%"] }} transition={{ duration: 26, repeat: Infinity, repeatType: "reverse", ease: "linear" }}>
        <Image src={src} alt="" width={600} height={5000} className="h-auto w-full" />
      </motion.div>
      <div className="absolute left-1/2 top-[0.7em] h-[1.1em] w-[5em] -translate-x-1/2 rounded-full bg-black" />
    </motion.div>
  );
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-[#06121c] to-black">
      <div className="absolute left-1/2 top-1/2 h-[30em] w-[30em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      {phone("/projects/obvi.webp", "left-[22%] top-[7%] -rotate-6", 0)}
      {phone("/projects/sweetums.webp", "right-[22%] top-[14%] rotate-6", 0.15)}
    </div>
  );
}

function SaasScreen() {
  const bars = [38, 52, 44, 66, 58, 80, 72, 92];
  const kpis = [
    ["MRR", "$48.2k", "+12%"],
    ["Users", "12,480", "+8%"],
    ["Churn", "1.9%", "-0.4%"],
  ];
  const icons = [LayoutDashboard, Users, Database, FileText, Settings];
  return (
    <div className="absolute inset-0 flex bg-[#0b0b12] text-white">
      <div className="flex w-[9%] flex-col items-center gap-[1.6em] border-r border-white/10 py-[1.6em]">
        <span className="grid h-[2.2em] w-[2.2em] place-items-center rounded-[0.6em] bg-violet-500">
          <Layers className="h-[1.2em] w-[1.2em]" />
        </span>
        {icons.map((I, i) => (
          <I key={i} className={`h-[1.3em] w-[1.3em] ${i === 0 ? "text-violet-300" : "text-white/35"}`} />
        ))}
      </div>
      <div className="flex-1 p-[2em]">
        <div className="flex items-center justify-between">
          <p className="text-[1.5em] font-semibold">Overview</p>
          <span className="rounded-full bg-white/10 px-[1em] py-[0.3em] text-[0.8em]">Last 30 days</span>
        </div>
        <div className="mt-[1.4em] grid grid-cols-3 gap-[1em]">
          {kpis.map(([k, v, d], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: "1.2em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="rounded-[0.9em] border border-white/10 bg-white/[0.04] p-[1.1em]"
            >
              <p className="text-[0.8em] text-white/50">{k}</p>
              <p className="mt-[0.2em] text-[1.9em] font-bold leading-none">{v}</p>
              <p className="mt-[0.4em] text-[0.8em] text-emerald-400">{d}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-[1.2em] flex h-[42%] items-end gap-[0.8em] rounded-[0.9em] border border-white/10 bg-white/[0.03] p-[1.2em]">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 90, damping: 14 }}
              style={{ height: `${h}%`, originY: 1 }}
              className="flex-1 rounded-t-[0.4em] bg-gradient-to-t from-violet-600/30 to-violet-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiScreen() {
  const nodes = [
    { icon: Mail, t: "New lead", s: "Email / WhatsApp" },
    { icon: Bot, t: "AI agent", s: "Scores & replies" },
    { icon: Database, t: "CRM", s: "Contact created" },
    { icon: Bell, t: "Slack", s: "Team notified" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-[#04100c] px-[5%]">
      <div className="absolute left-1/2 top-1/2 h-[28em] w-[28em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <p className="relative mb-[2.2em] text-center font-mono text-[0.9em] uppercase tracking-[0.2em] text-emerald-300/70">
        Workflow running · 4 steps
      </p>
      <div className="relative flex items-center">
        {nodes.map((n, i) => (
          <div key={n.t} className="flex flex-1 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.35, type: "spring", stiffness: 160, damping: 14 }}
              className="relative flex w-[11em] flex-col items-center rounded-[1em] border border-emerald-400/25 bg-white/[0.04] px-[1em] py-[1.4em] text-center"
            >
              <span className="grid h-[3.4em] w-[3.4em] place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <n.icon className="h-[1.7em] w-[1.7em]" />
              </span>
              <p className="mt-[0.8em] text-[1.1em] font-semibold text-white">{n.t}</p>
              <p className="text-[0.8em] text-white/50">{n.s}</p>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="relative mx-[0.3em] h-px flex-1 bg-white/10">
                <motion.i
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: i * 0.35 + 0.3, duration: 0.5 }}
                  className="absolute left-0 top-0 h-px bg-emerald-400"
                />
                <motion.i
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ delay: 1.6 + i * 0.25, duration: 1.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                  className="absolute -top-[0.25em] h-[0.5em] w-[0.5em] rounded-full bg-emerald-300 shadow-[0_0_1em_#34d399]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Agent tool calls shown in the side panel: start/done are timeline stages (see BotScreen). */
const tools = [
  { name: "Understand intent", meta: "shipping · UAE", icon: Sparkles, start: 1, done: 2 },
  { name: "Search knowledge base", meta: "RAG · 12 ms", icon: Database, start: 2, done: 3 },
  { name: "Check inventory", meta: "Shopify API", icon: Layers, start: 4, done: 5 },
  { name: "Create order #4821", meta: "Admin API", icon: Plug, start: 5, done: 6 },
  { name: "Send receipt", meta: "AWS SES", icon: Mail, start: 6, done: 7 },
];

const STAGE_AT = [0, 500, 1400, 2800, 4600, 5300, 7200, 8200];
const LOOP_AT = 12500;

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-[0.3em] rounded-[1em] rounded-bl-[0.3em] bg-white/10 px-[1em] py-[0.8em]">
      {[0, 1, 2].map((i) => (
        <motion.i
          key={i}
          className="block h-[0.45em] w-[0.45em] rounded-full bg-white/70"
          animate={{ y: ["0%", "-60%", "0%"], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function BotScreen() {
  const [stage, setStage] = useState(0);

  // one looping timeline drives the chat and the agent panel together
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setStage(0);
      STAGE_AT.forEach((t, i) => i > 0 && timers.push(setTimeout(() => setStage(i), t)));
      timers.push(setTimeout(run, LOOP_AT));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const bubble = "max-w-[82%] rounded-[1em] px-[1em] py-[0.65em] leading-snug";
  const pop = {
    initial: { opacity: 0, y: "0.8em", scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring" as const, stiffness: 160, damping: 17 },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[1.2em] overflow-hidden bg-gradient-to-br from-[#1a1204] to-black px-[2%] text-[0.9em]">
      <div className="absolute left-1/2 top-1/2 h-[32em] w-[32em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      {/* chat window */}
      <div className="relative flex h-[90%] w-[50%] min-w-0 flex-col overflow-hidden rounded-[1.4em] border border-white/10 bg-[#0e0e12] shadow-[0_30px_80px_-30px_rgba(245,158,11,0.35)]">
        <div className="flex items-center gap-[0.8em] border-b border-white/10 px-[1.1em] py-[0.8em]">
          <span className="relative grid h-[2.5em] w-[2.5em] place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black">
            <Bot className="h-[1.35em] w-[1.35em]" />
            <i className="absolute -bottom-px -right-px h-[0.8em] w-[0.8em] rounded-full border-2 border-[#0e0e12] bg-emerald-400" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">Aria · Store Assistant</p>
            <p className="truncate text-[0.78em] text-emerald-400">Online · replies in seconds</p>
          </div>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-[0.7em] py-[0.25em] font-mono text-[0.68em] uppercase tracking-wider text-white/60 sm:block">WhatsApp</span>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-[0.6em] overflow-hidden p-[1.1em]">
          <AnimatePresence initial={false}>
            {stage >= 1 && (
              <motion.div key="u1" {...pop} className={`${bubble} ml-auto rounded-br-[0.3em] bg-amber-400 text-black`}>
                Do you ship to Dubai?
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div key="t1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                <TypingDots />
              </motion.div>
            )}
            {stage >= 3 && (
              <motion.div key="b1" {...pop} className={`${bubble} rounded-bl-[0.3em] bg-white/10 text-white`}>
                Yes! Delivery takes 2 to 4 days. Want me to place the order?
                <span className="mt-[0.6em] flex flex-wrap gap-[0.4em]">
                  {["Yes, the 12-pack", "Show flavours"].map((c, i) => (
                    <span key={c} className={`rounded-full border px-[0.8em] py-[0.25em] text-[0.82em] ${i === 0 ? "border-amber-400/60 text-amber-300" : "border-white/15 text-white/60"}`}>
                      {c}
                    </span>
                  ))}
                </span>
              </motion.div>
            )}
            {stage >= 4 && (
              <motion.div key="u2" {...pop} className={`${bubble} ml-auto rounded-br-[0.3em] bg-amber-400 text-black`}>
                Yes, the 12-pack please
              </motion.div>
            )}
            {stage === 5 && (
              <motion.div key="t2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                <TypingDots />
              </motion.div>
            )}
            {stage >= 6 && (
              <motion.div key="b2" {...pop} className="w-[88%] overflow-hidden rounded-[1em] rounded-bl-[0.3em] bg-white/10 text-white">
                <div className="flex items-center gap-[0.8em] p-[0.7em]">
                  <span className="relative h-[3.4em] w-[3.4em] shrink-0 overflow-hidden rounded-[0.7em] bg-white">
                    <Image src="/projects/yaynuts-bundle.webp" alt="" fill sizes="60px" className="object-cover object-top" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">Variety 12-pack</p>
                    <p className="text-[0.8em] text-white/55">Qty 1 · Ships to Dubai, UAE</p>
                  </div>
                  <p className="font-semibold text-amber-300">$39.00</p>
                </div>
                <div className="flex items-center gap-[0.5em] border-t border-white/10 bg-emerald-400/10 px-[0.9em] py-[0.55em] text-[0.85em] text-emerald-300">
                  <span className="grid h-[1.3em] w-[1.3em] place-items-center rounded-full bg-emerald-400 text-black">
                    <Check className="h-[0.85em] w-[0.85em]" strokeWidth={3.5} />
                  </span>
                  Order #4821 confirmed · receipt sent
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-[0.6em] border-t border-white/10 px-[1em] py-[0.7em]">
          <span className="flex-1 rounded-full bg-white/5 px-[1em] py-[0.5em] text-[0.88em] text-white/35">Type a message…</span>
          <span className="grid h-[2.2em] w-[2.2em] place-items-center rounded-full bg-amber-400 text-black">
            <Send className="h-[1.1em] w-[1.1em]" />
          </span>
        </div>
      </div>

      {/* agent activity */}
      <div className="relative hidden h-[90%] w-[34%] min-w-0 flex-col rounded-[1.4em] border border-white/10 bg-[#0e0e12]/90 p-[1.1em] sm:flex">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.7em] uppercase tracking-[0.2em] text-amber-300">Agent activity</p>
          <span className="flex items-center gap-[0.4em] text-[0.7em] text-white/45">
            <i className="h-[0.5em] w-[0.5em] animate-pulse rounded-full bg-emerald-400" /> live
          </span>
        </div>

        <ul className="relative mt-[1em] flex-1 space-y-[0.55em]">
          <AnimatePresence initial={false}>
            {tools.map((t) =>
              stage >= t.start ? (
                <motion.li
                  key={t.name}
                  initial={{ opacity: 0, x: "1em" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 170, damping: 18 }}
                  className="flex items-center gap-[0.7em] rounded-[0.9em] border border-white/10 bg-white/[0.04] px-[0.7em] py-[0.55em]"
                >
                  <span className={`grid h-[2em] w-[2em] shrink-0 place-items-center rounded-[0.6em] ${stage >= t.done ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
                    <t.icon className="h-[1.1em] w-[1.1em]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.88em] font-medium text-white">{t.name}</span>
                    <span className="block truncate font-mono text-[0.68em] text-white/40">{t.meta}</span>
                  </span>
                  {stage >= t.done ? (
                    <Check className="h-[1.1em] w-[1.1em] shrink-0 text-emerald-400" strokeWidth={3} />
                  ) : (
                    <motion.i className="h-[1em] w-[1em] shrink-0 rounded-full border-2 border-amber-400/30 border-t-amber-400" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                  )}
                </motion.li>
              ) : null,
            )}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {stage >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: "0.8em" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 divide-x divide-white/10 rounded-[0.9em] border border-emerald-400/25 bg-emerald-400/10 py-[0.6em] text-center"
            >
              {[
                ["3.2s", "resolved"],
                ["0", "humans"],
                ["$39", "revenue"],
              ].map(([v, l]) => (
                <span key={l}>
                  <span className="block font-semibold text-emerald-300">{v}</span>
                  <span className="block text-[0.68em] uppercase tracking-wider text-white/45">{l}</span>
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const screens = [WebScreen, MobileScreen, SaasScreen, AiScreen, BotScreen];

/* ---------- the scroll scene ---------- */

export function StackStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Phase 1: giant word zooms past the viewer and fades. Phase 2: laptop rises in. Phase 3: services play.
  const wordScale = useTransform(p, [0, 0.16], [1, 9]);
  const wordOpacity = useTransform(p, [0.02, 0.14], [1, 0]);
  const devScale = useTransform(p, [0.04, 0.2], [0.6, 1]);
  const devY = useTransform(p, [0.04, 0.2], [140, 0]);
  const devOpacity = useTransform(p, [0.04, 0.12], [0, 1]);
  const headOpacity = useTransform(p, [0.16, 0.24], [0, 1]);
  const headY = useTransform(p, [0.16, 0.24], [24, 0]);
  const stepProg = useTransform(p, [0.26, 0.97], [0, steps.length]);

  useMotionValueEvent(stepProg, "change", (v) => {
    const s = Math.min(steps.length - 1, Math.max(0, Math.floor(v)));
    setStep((cur) => (cur === s ? cur : s));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = 0.26 + ((i + 0.5) / steps.length) * 0.71;
    window.scrollTo({ top: el.offsetTop + total * target, behavior: "smooth" });
  };

  const Screen = screens[step];
  const cur = steps[step];

  return (
    <section ref={ref} className="relative h-[700vh] bg-black" aria-label="What I build">
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* soft blend into the dark site background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background to-transparent" />

        {/* 1. giant word */}
        <motion.h2
          style={{ scale: wordScale, opacity: wordOpacity }}
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center text-center text-[clamp(3rem,15vw,14rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-[#d6d6d9]"
        >
          Full stack
        </motion.h2>

        {/* 2. headline */}
        <motion.div style={{ opacity: headOpacity, y: headY }} className="absolute inset-x-0 top-[12vh] z-10 px-5 text-center md:top-[11vh]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">What I build</p>
          <p className="mt-2 text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold tracking-tight">Every screen. Every stack. One engineer.</p>
        </motion.div>

        {/* 3. device */}
        <motion.div
          style={{ scale: devScale, y: devY, opacity: devOpacity, "--glow": cur.color } as unknown as CSSProperties}
          className="relative mt-[29vh] w-[min(92vw,88vh)] md:mt-[22vh] md:w-[min(72vw,88vh)]"
        >
          <AnimatePresence>
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute -inset-[18%] -z-10 bg-[radial-gradient(closest-side,var(--glow),transparent)]"
            />
          </AnimatePresence>

          <div className="rounded-[2.4%/3.8%] bg-[#0b0b0e] p-[1.1%] shadow-[0_40px_120px_-40px_var(--glow)] ring-1 ring-white/15">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4%/2.2%] bg-black [container-type:inline-size]">
              <div className="absolute inset-0" style={{ fontSize: "1.45cqw" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0"
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute left-1/2 top-0 z-10 h-[3%] w-[8%] -translate-x-1/2 rounded-b-md bg-black" />
            </div>
          </div>
          <div className="relative mx-auto h-[1.6vw] max-h-4 min-h-[6px] w-[110%] -translate-x-[4.5%] rounded-b-[2em] bg-gradient-to-b from-[#34343a] to-[#0c0c0f]">
            <div className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-md bg-black/40" />
          </div>
        </motion.div>

        {/* caption, Apple style: bold lead + grey copy */}
        <motion.div style={{ opacity: headOpacity }} className="absolute inset-x-0 bottom-[17vh] z-10 px-6 text-center md:bottom-[5vh]">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl text-[clamp(0.95rem,1.35vw,1.2rem)] leading-snug text-white/55"
            >
              <span className="font-semibold text-white">{cur.title}</span> {cur.text}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* step rail */}
        <motion.ul style={{ opacity: headOpacity }} className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => jump(i)} className="group flex cursor-pointer items-center gap-3">
                <span className={`text-xs transition ${i === step ? "text-white" : "text-white/0 group-hover:text-white/60"}`}>{s.label}</span>
                <span
                  className="block rounded-full transition-all"
                  style={{
                    height: i === step ? 22 : 8,
                    width: 8,
                    background: i === step ? s.color : "rgba(255,255,255,0.25)",
                  }}
                />
              </button>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
