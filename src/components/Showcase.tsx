"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, X } from "@/components/icons";
import { SectionHead } from "./SectionHead";
import { companies } from "@/lib/site";
import { showcaseProjects } from "@/lib/projects";

type Project = (typeof showcaseProjects)[number];
type Tile =
  | { id: string; kind: "project"; h: number; project: Project }
  | { id: string; kind: "stat"; h: number; value: string; label: string }
  | { id: string; kind: "logo"; h: number; name: string; logo: string }
  | { id: string; kind: "ai"; h: number }
  | { id: string; kind: "tag"; h: number; text: string };

const W = 300;
const GAP = 22;
const COLS = 8;
const PAD = 60;

// Extra tiles that sit between the projects so the canvas never feels like a plain grid
const extras: Tile[] = [
  { id: "s0", kind: "stat", h: 190, value: "9+", label: "Years building for the web" },
  { id: "l0", kind: "logo", h: 220, name: companies[1].name, logo: companies[1].logo },
  { id: "a0", kind: "ai", h: 300 },
  { id: "t0", kind: "tag", h: 210, text: "Shopify · Laravel · Next.js" },
  { id: "l1", kind: "logo", h: 220, name: companies[3].name, logo: companies[3].logo },
  { id: "s1", kind: "stat", h: 190, value: "6", label: "Countries served" },
  { id: "t1", kind: "tag", h: 240, text: "AI agents that never sleep" },
  { id: "l2", kind: "logo", h: 220, name: companies[6].name, logo: companies[6].logo },
  { id: "a1", kind: "ai", h: 280 },
  { id: "s2", kind: "stat", h: 190, value: "55+", label: "Live projects shipped" },
  { id: "l3", kind: "logo", h: 220, name: companies[0].name, logo: companies[0].logo },
  { id: "t2", kind: "tag", h: 220, text: "From idea to launch" },
  { id: "s3", kind: "stat", h: 190, value: "68+", label: "Skills & technologies" },
  { id: "l4", kind: "logo", h: 220, name: companies[8].name, logo: companies[8].logo },
];
const heights = [400, 340, 420, 360, 380, 400, 350, 430];
const tiles: Tile[] = [];
showcaseProjects.forEach((project, i) => {
  tiles.push({ id: `p${i}`, kind: "project", h: heights[i % heights.length], project });
  if (i % 4 === 3 && extras[(i - 3) / 4]) tiles.push(extras[(i - 3) / 4]);
});

// Masonry layout computed once: each tile goes into the shortest column
const colH = Array<number>(COLS).fill(PAD);
const placed = tiles.map((t) => {
  const c = colH.indexOf(Math.min(...colH));
  const pos = { x: PAD + c * (W + GAP), y: colH[c] };
  colH[c] += t.h + GAP;
  return { tile: t, ...pos };
});
const PLANE_W = PAD * 2 + COLS * W + (COLS - 1) * GAP;
const PLANE_H = Math.max(...colH) + PAD - GAP;

// Projects the autoplay tour flies to, in order
const stops = placed.filter((p) => p.tile.kind === "project").filter((_, i) => i % 4 === 0) as (typeof placed[number] & { tile: Extract<Tile, { kind: "project" }> })[];
const DWELL = 4800;

function TileBody({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "project":
      return (
        <>
          <Image
            src={tile.project.img}
            alt={tile.project.title}
            fill
            sizes="300px"
            draggable={false}
            className="select-none object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-2">{tile.project.kind}</p>
            <p className="mt-1 text-lg font-semibold leading-tight">{tile.project.title}</p>
          </div>
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 opacity-0 backdrop-blur transition group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </>
      );
    case "stat":
      return (
        <div className="glass flex h-full flex-col justify-center p-6">
          <p className="display text-glow text-6xl">{tile.value}</p>
          <p className="mt-3 text-sm text-muted-foreground">{tile.label}</p>
        </div>
      );
    case "logo":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-white p-6 text-black">
          <Image src={tile.logo} alt={tile.name} width={110} height={110} draggable={false} className="select-none object-contain" />
          <p className="text-sm font-semibold">{tile.name}</p>
        </div>
      );
    case "ai":
      return (
        <div className="glass flex h-full flex-col justify-end gap-2 p-5 text-xs">
          <div className="max-w-[85%] rounded-2xl bg-accent px-3 py-2 text-black">Can you automate my lead follow-ups?</div>
          <div className="ml-auto max-w-[85%] rounded-2xl bg-white/10 px-3 py-2">Done. Every new lead now gets a reply in 10 seconds and lands in your CRM.</div>
          <div className="max-w-[60%] rounded-2xl bg-accent px-3 py-2 text-black">Amazing!</div>
        </div>
      );
    case "tag":
      return (
        <div className="relative flex h-full items-end bg-gradient-to-br from-indigo-500/40 via-indigo-500/10 to-cyan-400/30 p-6">
          <div className="bg-grid absolute inset-0 opacity-60" />
          <p className="serif-italic text-glow relative text-3xl leading-tight">{tile.text}</p>
        </div>
      );
  }
}

function TileView({
  p,
  index,
  px,
  py,
  vw,
  vh,
  onOpen,
  onHover,
}: {
  p: (typeof placed)[number];
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  vw: number;
  vh: number;
  onOpen: (t: Tile) => void;
  onHover: (on: boolean) => void;
}) {
  const { tile, x, y } = p;
  const depth = ((index % 3) - 1) * 0.07;

  // "Lens": tiles shrink and fade towards the edges of the viewport
  const scale = useTransform([px, py], ([a, b]: number[]) => {
    const cx = x + W / 2 + a - vw / 2;
    const cy = y + tile.h / 2 + b - vh / 2;
    const d = Math.min(1, Math.hypot(cx / (vw * 0.7), cy / (vh * 0.8)));
    return 1 - 0.3 * d;
  });
  const opacity = useTransform(scale, [0.7, 1], [0.35, 1]);
  const parX = useTransform(px, (v) => v * depth);
  const parY = useTransform(py, (v) => v * depth);

  return (
    <motion.div
      style={{ left: x, top: y, width: W, height: tile.h, scale, opacity, x: parX, y: parY }}
      onClick={() => tile.kind === "project" && onOpen(tile)}
      onPointerEnter={() => tile.kind === "project" && onHover(true)}
      onPointerLeave={() => onHover(false)}
      className={`group absolute overflow-hidden rounded-2xl border border-white/10 ${
        tile.kind === "project" ? "cursor-pointer" : ""
      }`}
    >
      <TileBody tile={tile} />
    </motion.div>
  );
}

export function Showcase() {
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<Project | null>(null);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);
  const inited = useRef(false);
  const anim = useRef<{ stop: () => void }[]>([]);
  const [idx, setIdx] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [inView, setInView] = useState(false);
  const [tileHover, setTileHover] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playing = !userPaused && !cooldown && !dragging && !active && inView && !tileHover;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 380, damping: 32 });
  const sy = useSpring(my, { stiffness: 380, damping: 32 });

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start centered on the plane
  useEffect(() => {
    if (!size.w || inited.current) return;
    inited.current = true;
    x.set(Math.min(0, (size.w - PLANE_W) / 2));
    y.set(Math.min(0, (size.h - PLANE_H) / 3));
  }, [size, x, y]);

  // Only run the tour while the section is on screen
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fly the canvas to the current project (centre it in the viewport)
  useEffect(() => {
    if (!size.w || !inited.current) return;
    const stop = stops[idx];
    const tx = Math.max(size.w - PLANE_W, Math.min(0, size.w / 2 - (stop.x + W / 2)));
    const ty = Math.max(size.h - PLANE_H, Math.min(0, size.h / 2 - (stop.y + stop.tile.h / 2)));
    anim.current.forEach((a) => a.stop());
    const ease = { duration: 2.2, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] };
    anim.current = [animate(x, tx, ease), animate(y, ty, ease)];
  }, [idx, size, x, y]);

  // Advance to the next project while playing
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % stops.length), DWELL);
    return () => clearTimeout(t);
  }, [playing, idx]);

  const go = (i: number) => setIdx((i + stops.length) % stops.length);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const miniLeft = useTransform(x, (v) => `${(-v / PLANE_W) * 100}%`);
  const miniTop = useTransform(y, (v) => `${(-v / PLANE_H) * 100}%`);

  return (
    <section id="work" className="px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Showcase"
          title={
            <>
              Explore my <span className="serif-italic text-glow">universe</span>
            </>
          }
          text="Sit back and let the tour fly you through my projects, or take over: drag in any direction to explore all 55. Tap a project to open the full page."
        />

        <div
          ref={viewport}
          onPointerMove={(e) => {
            if (e.pointerType === "touch") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
            setHovering(true);
          }}
          onPointerLeave={() => setHovering(false)}
          className="relative h-[62svh] min-h-[440px] cursor-none md:h-[78vh] md:min-h-[520px] overflow-hidden rounded-[2rem] border border-border bg-black/30 touch-none md:cursor-none"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />

          {size.w > 0 && (
            <motion.div
              drag
              dragConstraints={{ left: Math.min(0, size.w - PLANE_W), right: 0, top: Math.min(0, size.h - PLANE_H), bottom: 0 }}
              dragElastic={0.1}
              dragTransition={{ power: 0.25, timeConstant: 320 }}
              onPointerDown={() => (moved.current = false)}
              onDragStart={() => {
                moved.current = true;
                anim.current.forEach((a) => a.stop());
                setDragging(true);
              }}
              onDragEnd={() => {
                setDragging(false);
                setCooldown(true);
                if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
                cooldownTimer.current = setTimeout(() => setCooldown(false), 3500);
              }}
              style={{ x, y, width: PLANE_W, height: PLANE_H }}
              className="absolute left-0 top-0"
            >
              {placed.map((p, i) => (
                <TileView
                  key={p.tile.id}
                  p={p}
                  index={i}
                  px={x}
                  py={y}
                  vw={size.w}
                  vh={size.h}
                  onOpen={(t) => !moved.current && t.kind === "project" && setActive(t.project)}
                  onHover={setTileHover}
                />
              ))}
            </motion.div>
          )}

          {/* edge vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_#04060d]" />

          {/* cursor follower */}
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-20 -ml-10 -mt-10 hidden md:block"
          >
            <motion.div
              animate={{ scale: hovering ? (dragging ? 0.65 : 1) : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-white font-mono text-[11px] font-semibold uppercase tracking-widest text-black mix-blend-difference"
            >
              {dragging ? "Drop" : "Drag"}
            </motion.div>
          </motion.div>

          {/* tour caption + controls */}
          <div className="glass absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-9.5rem)] items-center gap-3 rounded-2xl py-2.5 pl-4 pr-2.5 sm:max-w-none sm:gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-2">
                {String(idx + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")} · {userPaused ? "Paused" : playing ? "Auto tour" : "Your turn"}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="truncate text-sm font-semibold"
                >
                  {stops[idx].tile.project.title}
                </motion.p>
              </AnimatePresence>
              <div className="mt-1.5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  key={`${idx}-${playing}`}
                  initial={{ width: playing ? "0%" : "0%" }}
                  animate={{ width: playing ? "100%" : "0%" }}
                  transition={{ duration: playing ? DWELL / 1000 : 0.2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-accent to-accent-2"
                />
              </div>
            </div>
            <div className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
              <button aria-label="Previous project" onClick={() => go(idx - 1)} className="grid h-9 w-9 cursor-pointer place-items-center rounded-full transition hover:bg-white/10">
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label={userPaused ? "Play tour" : "Pause tour"}
                onClick={() => setUserPaused((v) => !v)}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white text-black transition hover:scale-105"
              >
                {userPaused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button aria-label="Next project" onClick={() => go(idx + 1)} className="grid h-9 w-9 cursor-pointer place-items-center rounded-full transition hover:bg-white/10">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* minimap */}
          <div
            className="glass pointer-events-none absolute bottom-4 right-4 z-10 w-28 rounded-lg p-1 sm:w-36"
            style={{ aspectRatio: `${PLANE_W} / ${PLANE_H}` }}
          >
            <div className="relative h-full w-full">
              {placed.map((p) => (
                <i
                  key={p.tile.id}
                  className="absolute rounded-[2px] bg-white/25"
                  style={{
                    left: `${(p.x / PLANE_W) * 100}%`,
                    top: `${(p.y / PLANE_H) * 100}%`,
                    width: `${(W / PLANE_W) * 100}%`,
                    height: `${(p.tile.h / PLANE_H) * 100}%`,
                  }}
                />
              ))}
              <motion.div
                style={{ left: miniLeft, top: miniTop, width: `${(size.w / PLANE_W) * 100}%`, height: `${(size.h / PLANE_H) * 100}%` }}
                className="absolute rounded-[3px] border border-accent-2 bg-accent-2/10"
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-background md:grid-cols-[1.3fr_1fr]"
            >
              <div className="max-h-[48vh] overflow-y-auto bg-black md:max-h-[90vh]">
                <Image src={active.img} alt={active.title} width={1000} height={2200} className="h-auto w-full" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">{active.kind}</p>
                <h3 className="display mt-3 text-4xl">{active.title}</h3>
                <p className="mt-4 text-muted-foreground">{active.text}</p>
                <p className="mt-6 font-mono text-sm text-accent">{active.url} · {active.country}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {active.live && (
                    <a
                      href={`https://${active.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 font-medium text-background transition hover:opacity-90"
                    >
                      Visit live site <ArrowUpRight size={16} />
                    </a>
                  )}
                  <a
                    href="#contact"
                    onClick={() => setActive(null)}
                    className={`inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium transition ${active.live ? "glass hover:bg-white/10" : "bg-foreground text-background hover:opacity-90"}`}
                  >
                    Build something similar <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-white hover:text-black"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
