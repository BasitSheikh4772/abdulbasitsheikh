"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function W({
  word,
  progress,
  range,
  to,
  className,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  to: number;
  className: string;
}) {
  const opacity = useTransform(progress, range, [0.14, to]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${className}`}>
      {word}
    </motion.span>
  );
}

/**
 * Apple-style scroll highlight: every word starts dim and lights up one by one as the heading
 * scrolls into view. `lead` ends bright white, `tail` ends in a softer grey.
 */
export function ScrollReveal({ lead, tail, className = "" }: { lead: string; tail?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.45"] });

  const leadWords = lead.split(" ");
  const tailWords = tail ? tail.split(" ") : [];
  const total = leadWords.length + tailWords.length;

  const word = (w: string, i: number, grey: boolean) => {
    const start = (i / total) * 0.85;
    const end = start + 0.15 + 0.05;
    return <W key={`${grey ? "t" : "l"}${i}`} word={w} progress={scrollYProgress} range={[start, Math.min(1, end)]} to={grey ? 0.42 : 1} className="text-white" />;
  };

  return (
    <h2 ref={ref} className={className}>
      {leadWords.map((w, i) => word(w, i, false))}
      {tailWords.map((w, i) => word(w, leadWords.length + i, true))}
    </h2>
  );
}
