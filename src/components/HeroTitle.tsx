"use client";

import { motion, type Variants } from "motion/react";

const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "70%", rotateX: -60, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

const lines: { text: string; accent?: boolean }[][] = [
  [{ text: "Full" }, { text: "stack" }, { text: "&" }, { text: "AI" }, { text: "engineer" }],
  [{ text: "building", accent: true }, { text: "products" }, { text: "that" }, { text: "ship." }],
];

// Word-by-word 3D reveal built with Motion variants
export function HeroTitle() {
  return (
    <h1 className="mx-auto max-w-5xl text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[1.06] tracking-[-0.04em] [perspective:900px]">
      {lines.map((ln, i) => (
        <motion.span key={i} variants={line} initial="hidden" animate="show" className="block">
          {ln.map((w) => (
            <span key={w.text} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
              <motion.span variants={word} className={`inline-block origin-bottom ${w.accent ? "serif-italic text-glow" : ""}`}>
                {w.text}
              </motion.span>
            </span>
          ))}
        </motion.span>
      ))}
    </h1>
  );
}
