"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { site } from "@/lib/site";

/**
 * Apple-style loading screen, the same move as the "Full stack" section: a giant word on black,
 * a hairline of progress, then the word zooms past you and the page appears behind it.
 * It plays once per visit.
 */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("nx-intro") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";

    // progress runs for at least 1.6s and never finishes before the page itself has loaded
    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const counter = animate(0, 100, { duration: 1.7, ease: [0.4, 0, 0.2, 1], onUpdate: (v) => setPct(Math.round(v)) });
    let cancelled = false;
    Promise.race([Promise.all([counter.finished, loaded]), new Promise((r) => setTimeout(r, 6000))]).then(() => {
      if (cancelled) return;
      setPct(100);
      setLeaving(true);
    });

    return () => {
      cancelled = true;
      counter.stop();
      document.documentElement.style.overflow = "";
    };
  }, []);

  const finish = () => {
    document.documentElement.style.overflow = "";
    try {
      sessionStorage.setItem("nx-intro", "1");
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="preloader"
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.5, delay: leaving ? 0.45 : 0 }}
          onAnimationComplete={() => leaving && finish()}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-black"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={leaving ? { scale: 9, opacity: 0, filter: "blur(0px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={leaving ? { duration: 0.95, ease: [0.65, 0, 0.35, 1] } : { duration: 0.9, ease: "easeOut" }}
            className="select-none text-[clamp(3rem,17vw,15rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-[#d6d6d9]"
          >
            {site.name}
          </motion.h1>

          <motion.div animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.25 }} className="absolute inset-x-0 bottom-[12vh] mx-auto w-[min(70vw,22rem)]">
            <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{pct}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
