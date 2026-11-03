"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin } from "@/components/icons";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHead } from "./SectionHead";
import { experience, type Country } from "@/lib/profile";

type Filter = "All roles" | Country;

const filters: Filter[] = ["All roles", "Pakistan", "UAE", "United States"];
const COLOR: Record<Country, string> = { Pakistan: "#34d399", UAE: "#f59e0b", "United States": "#8b9bff" };
const START = 2017;
const END = 2027;
const span = END - START;
const years = Array.from({ length: END - START }, (_, i) => START + i);
const AUTOPLAY_MS = 3800;

const pos = (t: number) => `${((t - START) / span) * 100}%`;

export function Experience() {
  const [filter, setFilter] = useState<Filter>("All roles");
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const matches = (i: number) => filter === "All roles" || experience[i].country === filter;
  const ids = experience.map((_, i) => i).filter(matches);
  const role = experience[sel];
  const color = COLOR[role.country];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the tour walks through the roles until the visitor takes over
  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setSel((cur) => ids[(Math.max(0, ids.indexOf(cur)) + 1) % ids.length]), AUTOPLAY_MS);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, inView, filter]);

  const choose = (f: Filter) => {
    setFilter(f);
    const first = experience.findIndex((r) => f === "All roles" || r.country === f);
    if (!(f === "All roles" || experience[sel].country === f)) setSel(first);
  };

  const pick = (i: number) => {
    setSel(i);
    setAuto(false);
  };
  const step = (d: number) => {
    const at = Math.max(0, ids.indexOf(sel));
    pick(ids[(at + d + ids.length) % ids.length]);
  };

  return (
    <section id="experience" className="px-5 py-16 sm:py-28">
      <div ref={box} className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="serif-italic text-glow">worked</span>
            </>
          }
          text="Since 2017 I have worked across agencies, product teams and international clients, growing from web developer to lead engineer."
        />

        {/* headline numbers */}
        <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { v: 10, s: "", l: "Roles" },
            { v: 3, s: "", l: "Countries" },
            { v: 9, s: "+", l: "Years" },
          ].map((x, i) => (
            <BlurFade key={x.l} inView delay={i * 0.08}>
              <div className="glass rounded-3xl px-4 py-5 text-center sm:py-7">
                <p className="display text-4xl sm:text-6xl">
                  <NumberTicker value={x.v} className="text-glow" />
                  <span className="text-glow">{x.s}</span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{x.l}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* country filter doubles as the legend */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                choose(f);
                setAuto(false);
              }}
              className={`relative flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${filter === f ? "border-transparent text-black" : "border-white/12 text-white/65 hover:text-white"}`}
            >
              {filter === f && <motion.span layoutId="exp-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              {f !== "All roles" && <i className="relative h-2 w-2 rounded-full" style={{ background: COLOR[f] }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* career chart: every role is a bar on a 2017 to today axis */}
          <BlurFade inView>
            <div className="glass rounded-[2rem] p-3 sm:p-5">
              <div className="mb-2 hidden grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-x-4 px-3 md:grid">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Role</span>
                <div className="relative h-4">
                  {years.map((y, i) => (
                    <span key={y} className="absolute -translate-x-1/2 font-mono text-[10px] text-white/35" style={{ left: pos(y + 0.5) }}>
                      {i % 2 === 0 ? String(y).slice(2) : "·"}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-1">
                {experience.map((r, i) => {
                  const active = i === sel;
                  const c = COLOR[r.country];
                  return (
                    <li key={r.company + r.period} className={`transition-opacity duration-300 ${matches(i) ? "" : "opacity-25"}`}>
                      <button
                        onClick={() => matches(i) && pick(i)}
                        aria-pressed={active}
                        className="group relative grid w-full cursor-pointer grid-cols-1 items-center gap-x-4 gap-y-2 rounded-2xl px-3 py-2.5 text-left md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
                      >
                        {active && <motion.span layoutId="exp-active" className="absolute inset-0 rounded-2xl bg-white/[0.07] ring-1" style={{ ["--tw-ring-color" as string]: `${c}88` }} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                        <span className="relative flex min-w-0 items-center gap-3">
                          <Image src={r.logo} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-xl bg-white object-contain" />
                          <span className="min-w-0">
                            <span className={`block truncate text-sm font-semibold leading-tight transition-colors ${active ? "text-white" : "text-white/80 group-hover:text-white"}`}>{r.role}</span>
                            <span className="block truncate text-xs text-muted-foreground">{r.company}</span>
                          </span>
                        </span>
                        <span className="relative block h-3 rounded-full bg-white/[0.05]">
                          <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-y-0 origin-left rounded-full"
                            style={{
                              left: pos(r.from),
                              width: `max(${((r.to - r.from) / span) * 100}%, 8px)`,
                              background: `linear-gradient(90deg, ${c}, ${c}aa)`,
                              boxShadow: active ? `0 0 18px ${c}99` : "none",
                              opacity: active ? 1 : 0.6,
                            }}
                          />
                          {r.current && <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 animate-ping rounded-full" style={{ left: pos(r.to), background: c }} />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </BlurFade>

          {/* the selected role */}
          <BlurFade inView delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
                <motion.span
                  aria-hidden
                  animate={{ background: `radial-gradient(420px circle at 100% 0%, ${color}33, transparent 65%)` }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                />
                <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent 70%)` }} />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Role {String(experience.length - sel).padStart(2, "0")} / {experience.length}
                    </p>
                    {role.current && (
                      <span className="flex items-center gap-2 rounded-full bg-accent-2/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-2">
                        <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-2" /> Current
                      </span>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={sel} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
                      <div className="mt-6 flex items-center gap-4">
                        <Image src={role.logo} alt={role.company} width={72} height={72} className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-2xl bg-white object-contain p-0.5 ring-4 ring-white/10" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{role.company}</p>
                          <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight sm:text-[1.7rem]">{role.role}</h3>
                        </div>
                      </div>

                      <dl className="mt-7 grid grid-cols-2 gap-3">
                        {[
                          ["Period", role.period],
                          ["Duration", role.duration],
                          ["Location", `${role.place}`],
                          ["Country", role.country],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{k}</dt>
                            <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                              {k === "Location" && <MapPin size={14} />}
                              {v}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                          <span>Career position</span>
                          <span style={{ color }}>Year {Math.floor(role.from - START) + 1} of {Math.ceil(experience[0].to - START)}</span>
                        </div>
                        <div className="relative h-2 rounded-full bg-white/[0.06]">
                          <motion.span
                            initial={false}
                            animate={{ left: pos(role.from), width: `max(${((role.to - role.from) / span) * 100}%, 8px)` }}
                            transition={{ type: "spring", stiffness: 140, damping: 20 }}
                            className="absolute inset-y-0 rounded-full"
                            style={{ background: color, boxShadow: `0 0 14px ${color}99` }}
                          />
                        </div>
                        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/30">
                          <span>{START}</span>
                          <span>today</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-7 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {ids.map((i) => (
                        <button key={i} aria-label={`Show ${experience[i].company}`} onClick={() => pick(i)} className="grid h-4 w-4 cursor-pointer place-items-center">
                          <span className="block rounded-full transition-all" style={{ height: 6, width: i === sel ? 20 : 6, background: i === sel ? color : "rgba(255,255,255,0.25)" }} />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[-1, 1].map((d) => (
                        <button
                          key={d}
                          aria-label={d < 0 ? "Previous role" : "Next role"}
                          onClick={() => step(d)}
                          className="glass grid h-10 w-10 cursor-pointer place-items-center rounded-full transition hover:bg-white/10"
                        >
                          {d < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
