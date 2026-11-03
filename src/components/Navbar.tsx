"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { motion } from "motion/react";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false); // scrolled down past the top and not scrolling back up
  const [hovered, setHovered] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setScrolled(false);
      else if (y > last + 4) setScrolled(true);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Apple-style: the bar folds into a small pill once you scroll down, and unfolds on hover / focus.
  const collapsed = desktop && scrolled && !hovered;

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <motion.nav
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
        initial={false}
        animate={{ maxWidth: collapsed ? 232 : 896 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="glass mx-auto flex h-14 w-full items-center justify-between overflow-hidden rounded-full pl-5 pr-2"
      >
        <a href="#top" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
          <Logo size={30} className="shrink-0 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-110" />
          {site.name}
        </a>

        <motion.ul
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: collapsed ? 0.12 : 0.3, delay: collapsed ? 0 : 0.1 }}
          className="hidden items-center gap-1 text-sm text-muted-foreground md:flex"
          style={{ pointerEvents: collapsed ? "none" : "auto" }}
          onMouseLeave={() => setHover(null)}
        >
          {links.map((l) => (
            <li key={l.href} className="relative" onMouseEnter={() => setHover(l.href)}>
              {hover === l.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <a href={l.href} className="relative block rounded-full px-4 py-2 transition hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a
          href="#contact"
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: collapsed ? 0.12 : 0.3, delay: collapsed ? 0 : 0.1 }}
          style={{ pointerEvents: collapsed ? "none" : "auto" }}
          className="hidden shrink-0 whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:scale-[1.03] md:block"
        >
          Hire me
        </motion.a>

        <button aria-label="Toggle menu" className="grid h-10 w-10 place-items-center md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {open && (
        <ul className="glass mx-auto mt-2 max-w-4xl rounded-3xl p-2 md:hidden">
          {[...links, { href: "#contact", label: "Contact" }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-muted-foreground hover:bg-white/8 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
