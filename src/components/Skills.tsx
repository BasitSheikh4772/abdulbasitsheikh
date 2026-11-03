"use client";

import dynamic from "next/dynamic";
import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Bot, Database, LibraryBig, MessageSquareText, Plug, Rocket, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { skillIcons } from "./skillIcons";
import { skillGroups, type SkillGroup } from "@/lib/profile";

// WebGL mascot: client only, falls back to the flat version when WebGL is missing
const AIMascot = dynamic(() => import("./AIMascot"), {
  ssr: false,
  loading: () => <div className="aspect-[260/220] w-44 sm:w-56" aria-hidden />,
});

/** keyword (lower-case, matched inside the skill label) -> logo keys. First match wins; up to 3 logos are shown. */
const LOGOS: [string, string[]][] = [
  ["motion", ["motion"]],
  ["magic ui", ["magicui"]],
  ["shadcn", ["shadcn"]],
  ["three.js", ["threejs", "react"]],
  ["shopify", ["shopify"]],
  ["woocommerce", ["wordpress", "woocommerce"]],
  ["elementor", ["elementor"]],
  ["gutenberg", ["wordpress", "react"]],
  ["wordpress", ["wordpress"]],
  ["bigcommerce", ["bigcommerce"]],
  ["magento", ["magento"]],
  ["moodle", ["moodle"]],
  ["react.js", ["react"]],
  ["next.js", ["nextjs"]],
  ["javascript", ["javascript", "typescript"]],
  ["tailwind", ["tailwind"]],
  ["gsap", ["gsap"]],
  ["sass", ["sass"]],
  ["bootstrap", ["bootstrap"]],
  ["html5", ["html5", "css3"]],
  ["laravel", ["laravel"]],
  ["core php", ["php"]],
  ["python", ["python", "flask", "django"]],
  ["c# /", ["csharp", "dotnet"]],
  ["symfony", ["symfony"]],
  ["codeigniter", ["codeigniter"]],
  ["fastapi", ["fastapi"]],
  ["n8n", ["n8n"]],
  ["langchain", ["langchain"]],
  ["claude", ["claude", "openai"]],
  ["react native", ["react"]],
  ["flutter", ["flutter", "dart"]],
  ["android", ["android"]],
  ["aws", ["aws"]],
  ["gcp", ["gcp"]],
  ["azure", ["azure"]],
  ["digitalocean", ["digitalocean"]],
  ["cloudflare", ["cloudflare"]],
  ["docker", ["docker"]],
  ["nginx", ["nginx"]],
  ["lamp", ["linux", "nginx"]],
  ["git", ["git", "github", "gitlab"]],
  ["mysql", ["mysql", "mariadb"]],
  ["postgres", ["postgresql"]],
  ["mongo", ["mongodb"]],
  ["redis", ["redis"]],
  ["stripe", ["stripe", "paypal"]],
  ["twilio", ["twilio"]],
  ["jwt", ["jwt"]],
];

/** skills without a brand logo get a symbolic icon */
const SYMBOLS: [string, LucideIcon][] = [
  ["llm", Bot],
  ["rag", LibraryBig],
  ["chatbots", MessageSquareText],
  ["prompt", Sparkles],
  ["rest api", Plug],
  ["deployment", Rocket],
  ["cloud server", ShieldCheck],
];

const logosFor = (label: string) => LOGOS.find(([k]) => label.toLowerCase().includes(k))?.[1]?.filter((k) => skillIcons[k]).slice(0, 3);
const symbolFor = (label: string): LucideIcon => SYMBOLS.find(([k]) => label.toLowerCase().includes(k))?.[1] ?? Database;

/** three overlapping logos that stand for a whole skill area */
const GROUP_LOGOS: Record<string, string[]> = {
  ecom: ["shopify", "wordpress", "bigcommerce"],
  ai: ["langchain", "claude", "openai"],
  frontend: ["react", "nextjs", "tailwind"],
  backend: ["laravel", "php", "python"],
  mobile: ["flutter", "react", "android"],
  devops: ["aws", "docker", "cloudflare"],
  data: ["postgresql", "mongodb", "redis"],
};

const COLORS: Record<string, string> = {
  ecom: "#3fb950",
  ai: "#a371f7",
  frontend: "#58a6ff",
  backend: "#f778ba",
  mobile: "#ffa657",
  devops: "#39c5cf",
  data: "#e3b341",
};

// bento order: the two big groups are wide and share a row with one single card
const ORDER = ["ecom", "ai", "frontend", "backend", "mobile", "devops", "data"];
const WIDE = new Set(["ecom", "devops"]);

function Logo({ name, size }: { name: string; size: number }) {
  const ic = skillIcons[name];
  if (!ic) return null;
  return <svg viewBox={`0 0 ${ic.w} ${ic.h}`} width={size} height={size} role="img" aria-label={name} dangerouslySetInnerHTML={{ __html: ic.body }} />;
}

/** light tile so dark logos (GitHub, Next.js, Laravel...) stay visible on the dark cards */
const Tile = ({ children }: { children: ReactNode }) => <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#eef2f7]">{children}</span>;

function Card({ g, i }: { g: SkillGroup; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const color = COLORS[g.id];

  // cursor spotlight that follows the mouse across the card
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <BlurFade inView delay={0.05 * (i % 3)} className={WIDE.has(g.id) ? "md:col-span-2" : ""}>
      <div
        ref={ref}
        onMouseMove={onMove}
        style={{ "--c": color, "--mx": "100%", "--my": "0%" } as CSSProperties}
        className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 sm:p-7"
      >
        <span aria-hidden className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(520px circle at 100% 0%, ${color}22, transparent 60%)` }} />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent 70%)` }} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(320px circle at var(--mx) var(--my), ${color}26, transparent 70%)`, boxShadow: `inset 0 0 0 1px ${color}55` }}
        />

        <div className="relative">
          <div className="mb-6 flex flex-wrap items-start gap-x-4 gap-y-3">
            <span className="flex shrink-0 pl-1" aria-hidden>
              {GROUP_LOGOS[g.id].map((n, k) => (
                <span key={n} className="-ml-2.5 grid h-11 w-11 place-items-center rounded-full bg-[#eef2f7] ring-[3px] ring-[#0d0f18] first:ml-0" style={{ zIndex: 3 - k }}>
                  <Logo name={n} size={24} />
                </span>
              ))}
            </span>
            <div className="min-w-[10rem] grow basis-[10rem]">
              <h3 className="text-xl font-semibold leading-tight tracking-tight">{g.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            </div>
            <span className="display text-4xl leading-none" style={{ color }}>
              {String(g.items.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="flex flex-wrap gap-2">
            {g.items.map((it) => {
              const keys = logosFor(it.name);
              const Symbol = symbolFor(it.name);
              return (
                <li
                  key={it.name}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/25 py-1.5 pl-1.5 pr-3 text-[.8rem] text-white/80 transition-colors hover:border-[var(--c)] hover:text-white"
                >
                  {keys && keys.length > 0 ? (
                    <span className="flex gap-1">
                      {keys.map((k) => (
                        <Tile key={k}>
                          <Logo name={k} size={16} />
                        </Tile>
                      ))}
                    </span>
                  ) : (
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md" style={{ background: `${color}26`, color }}>
                      <Symbol size={14} />
                    </span>
                  )}
                  {it.name}
                  {it.expert && (
                    <b className="ml-0.5 rounded px-1.5 py-px font-mono text-[.6rem] font-bold uppercase tracking-wider" style={{ background: `${color}26`, color }}>
                      Expert
                    </b>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </BlurFade>
  );
}

export function Skills() {
  const groups = ORDER.map((id) => skillGroups.find((g) => g.id === id)).filter((g): g is SkillGroup => !!g);
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" className="px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
          <BlurFade inView className="lg:col-span-8">
            <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">Toolbox</span>
            <h2 className="display text-4xl sm:text-6xl">
              Skills & <span className="serif-italic text-glow">technologies</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              The stack I use to design, build, ship and scale products, from storefronts to AI agents and cloud infrastructure.
            </p>
          </BlurFade>
          <div className="flex flex-col items-center gap-3 lg:col-span-4 lg:items-end">
            <AIMascot className="w-44 sm:w-56" />
            <p className="font-mono text-sm text-muted-foreground">
              {total} skills · {skillGroups.length} areas
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Card key={g.id} g={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
