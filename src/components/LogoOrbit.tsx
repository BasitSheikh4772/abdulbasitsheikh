"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "@/components/icons";

type Company = { name: string; logo: string };

const where: Record<string, string> = {
  Yaynuts: "United States",
  "Universal Cartons Industry": "UAE · Ajman",
  "Red Feather Tech": "Pakistan · Karachi",
  XAutonomous: "Pakistan · Karachi",
  "Skyfit International": "UAE · Dubai",
  TechClone: "Pakistan · Karachi",
  Mark360: "Pakistan · Karachi",
  "The Web Gateway": "Pakistan · Karachi",
  "Learning Pitch": "Pakistan · Karachi",
  "EDLAB Pakistan": "Pakistan · Karachi",
};

const RADIUS = 470;
const BASE = -7; // degrees per second

function Card({ c, i, step, rot, onPick }: { c: Company; i: number; step: number; rot: MotionValue<number>; onPick: () => void }) {
  // cards fade out as they turn away from the viewer
  const opacity = useTransform(rot, (r) => {
    const cos = Math.cos(((i * step + r) * Math.PI) / 180);
    return cos > 0 ? 0.12 + 0.88 * Math.pow(cos, 1.6) : 0;
  });

  return (
    <motion.button
      onClick={onPick}
      style={{ opacity, transform: `rotateY(${i * step}deg) translateZ(${RADIUS}px)`, backfaceVisibility: "hidden" }}
      className="absolute -ml-[105px] -mt-[150px] h-[300px] w-[210px] cursor-pointer outline-none"
      aria-label={c.name}
    >
      <span className="group relative flex h-full w-full flex-col items-center rounded-[2rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.015] p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] transition duration-500 hover:-translate-y-3 hover:border-accent/40 hover:shadow-[0_30px_70px_-34px_rgba(99,102,241,0.55)]">
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <span className="grid h-32 w-32 place-items-center overflow-hidden rounded-[1.7rem] bg-white p-3 shadow-inner">
          <Image src={c.logo} alt="" width={120} height={120} draggable={false} className="h-full w-full select-none object-contain" />
        </span>
        <span className="mt-5 text-center text-[1.05rem] font-semibold leading-tight">{c.name}</span>
        <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{where[c.name] ?? ""}</span>
        <span className="mt-auto h-1 w-10 rounded-full bg-gradient-to-r from-accent to-accent-2 opacity-60 transition-all duration-500 group-hover:w-24 group-hover:opacity-100" />
      </span>
    </motion.button>
  );
}

/** A 3D ring of company cards: auto-rotates, can be dragged and flung, and any card can be clicked to bring it to the front. */
export function LogoOrbit({ companies }: { companies: Company[] }) {
  const n = companies.length;
  const step = 360 / n;
  const rot = useMotionValue(0);
  const s = useRef({ dragging: false, vel: BASE, hover: false, moved: 0, anim: null as null | { stop: () => void } });
  const [front, setFront] = useState(0);

  useMotionValueEvent(rot, "change", (r) => {
    const idx = ((Math.round(-r / step) % n) + n) % n;
    setFront((f) => (f === idx ? f : idx));
  });

  useAnimationFrame((_, delta) => {
    const st = s.current;
    if (st.dragging || st.anim) return;
    const dt = Math.min(delta, 50) / 1000;
    const target = BASE * (st.hover ? 0.15 : 1);
    st.vel += (target - st.vel) * Math.min(1, dt * 1.6);
    rot.set(rot.get() + st.vel * dt);
  });

  const goTo = (idx: number) => {
    const st = s.current;
    st.anim?.stop();
    const cur = rot.get();
    const base = -idx * step;
    const target = base + Math.round((cur - base) / 360) * 360;
    st.vel = 0;
    st.anim = animate(rot, target, {
      type: "spring",
      stiffness: 70,
      damping: 18,
      onComplete: () => {
        st.anim = null;
        st.vel = BASE;
      },
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const st = s.current;
    st.anim?.stop();
    st.anim = null;
    st.dragging = true;
    st.moved = 0;
    let lastX = e.clientX;
    let lastT = performance.now();
    const move = (ev: PointerEvent) => {
      const now = performance.now();
      const dx = ev.clientX - lastX;
      const dtMs = Math.max(1, now - lastT);
      lastX = ev.clientX;
      lastT = now;
      st.moved += Math.abs(dx);
      rot.set(rot.get() + dx * 0.22);
      st.vel = Math.max(-420, Math.min(420, st.vel * 0.6 + ((dx * 0.22) / dtMs) * 1000 * 0.4));
    };
    const up = () => {
      st.dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const c = companies[front];

  return (
    <div>
      <div
        onPointerDown={onPointerDown}
        onPointerEnter={() => (s.current.hover = true)}
        onPointerLeave={() => (s.current.hover = false)}
        onClickCapture={(e) => {
          if (s.current.moved > 6) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        className="relative mx-auto h-[24rem] max-w-[1400px] cursor-grab select-none [overflow-x:clip] [perspective:1700px] [touch-action:pan-y] active:cursor-grabbing sm:h-[27rem]"
      >
        {/* soft theme light behind the ring: pure gradients that fade to nothing, so no hard edges */}
        <div className="pointer-events-none absolute -inset-x-[10%] -inset-y-[20%] bg-[radial-gradient(ellipse_45%_40%_at_50%_50%,rgba(99,102,241,0.16),transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[70%] h-40 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(139,155,255,0.14),transparent_100%)]" />

        <div className="absolute inset-0 origin-center scale-[0.52] sm:scale-[0.72] lg:scale-100">
          <motion.div
            style={{ rotateY: rot, transformStyle: "preserve-3d" }}
            className="absolute left-1/2 top-[45%] h-0 w-0 [transform:rotateX(-6deg)]"
          >
            {companies.map((co, i) => (
              <Card key={co.name} c={co} i={i} step={step} rot={rot} onPick={() => goTo(i)} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* caption for the card at the front */}
      <div className="mt-2 flex items-center justify-center gap-3 px-4 sm:gap-5">
        <button aria-label="Previous company" onClick={() => goTo(front - 1)} className="glass grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full transition hover:bg-white/15">
          <ChevronLeft size={20} />
        </button>
        <div className="min-w-0 flex-1 text-center sm:min-w-[15rem] sm:flex-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={front}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xl font-semibold">{c.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">{where[c.name]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button aria-label="Next company" onClick={() => goTo(front + 1)} className="glass grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full transition hover:bg-white/15">
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-white/40">Drag to spin · click a card to bring it forward</p>
    </div>
  );
}
