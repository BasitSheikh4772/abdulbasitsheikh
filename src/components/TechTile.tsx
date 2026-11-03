"use client";

import { useState, type CSSProperties } from "react";
import { motion, useAnimationControls } from "motion/react";

function Burst({ color }: { color: string }) {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <motion.i
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * 78, y: Math.sin(a) * 78, opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ background: color }}
            className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full"
          />
        );
      })}
    </span>
  );
}

/** An app-icon style tile. Hover to magnify like the macOS Dock, click to pop it. */
export function TechTile({ name, kind, path, color }: { name: string; kind: string; path: string; color: string }) {
  const controls = useAnimationControls();
  const [burst, setBurst] = useState(0);

  const play = () => {
    controls.start({ scale: [1, 0.82, 1.2, 0.96, 1], rotate: [0, -10, 8, -3, 0], transition: { duration: 0.6 } });
    setBurst((b) => b + 1);
  };

  return (
    <button
      onClick={play}
      style={{ "--c": color } as CSSProperties}
      className="dock-tile relative flex w-[7.5rem] shrink-0 cursor-pointer flex-col items-center gap-3 outline-none"
    >
      <motion.span
        animate={controls}
        style={{ background: `linear-gradient(145deg, ${color}3a, ${color}0d 60%), #0e0f17` }}
        className="relative grid h-[6.5rem] w-[6.5rem] place-items-center rounded-[1.9rem] ring-1 ring-white/12 shadow-[0_18px_40px_-16px_var(--c)]"
      >
        <svg viewBox="0 0 24 24" className="h-12 w-12 drop-shadow-[0_4px_14px_var(--c)]" fill={color} role="img" aria-label={name}>
          <path d={path} />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/18 via-transparent to-transparent" />
        {burst > 0 && <Burst key={burst} color={color} />}
      </motion.span>
      <span className="text-sm font-semibold">{name}</span>
      <span className="-mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{kind}</span>
    </button>
  );
}
