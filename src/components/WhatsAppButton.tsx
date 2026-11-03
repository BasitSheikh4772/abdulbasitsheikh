"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siWhatsapp } from "simple-icons";
import { X } from "@/components/icons";
import { site } from "@/lib/site";

const link = site.socials.find((s) => s.label === "WhatsApp")?.href ?? "https://wa.me/971553769486";
const href = `${link}?text=${encodeURIComponent("Hi, I would like to talk about a project.")}`;

/** Floating WhatsApp button (bottom right, stacked just above the chat bubble). A small greeting appears once. */
export function WhatsAppButton() {
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setReady(true), 2600);
    let seen = false;
    try {
      seen = sessionStorage.getItem("nx-wa-hint") === "1";
    } catch {}
    const tip = seen ? undefined : setTimeout(() => setHint(true), 7000);
    return () => {
      clearTimeout(show);
      if (tip) clearTimeout(tip);
    };
  }, []);

  const closeHint = () => {
    setHint(false);
    try {
      sessionStorage.setItem("nx-wa-hint", "1");
    } catch {}
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-row-reverse items-end gap-3">
      <AnimatePresence>
        {ready && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with me on WhatsApp"
            initial={{ opacity: 0, scale: 0.4, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#2be07a] to-[#12a150] shadow-[0_14px_40px_-10px_rgba(37,211,102,0.75)] ring-1 ring-white/25"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.8s]" />
            <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white" role="img" aria-hidden>
              <path d={siWhatsapp.path} />
            </svg>
            <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-black opacity-0 shadow-xl transition group-hover:opacity-100">
              Chat on WhatsApp
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass relative mb-1 hidden max-w-[16rem] rounded-2xl p-4 pr-9 text-sm leading-snug sm:block"
          >
            <p className="font-semibold">Have a project in mind?</p>
            <p className="mt-1 text-white/60">Message me on WhatsApp. I reply fast.</p>
            <button aria-label="Dismiss" onClick={closeHint} className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
