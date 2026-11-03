import {
  siClaude,
  siCloudflare,
  siDocker,
  siFlutter,
  siGooglecloud,
  siLangchain,
  siLaravel,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShopify,
  siStripe,
  siTailwindcss,
  siTypescript,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";
import { Hand } from "@/components/icons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DragMarquee } from "@/components/DragMarquee";
import { TechTile } from "@/components/TechTile";

type Tech = { icon: SimpleIcon; name: string; kind: string };

// Row 1: building products. Row 2: AI, data and infrastructure.
const rowA: Tech[] = [
  { icon: siShopify, name: "Shopify", kind: "E-commerce" },
  { icon: siWordpress, name: "WordPress", kind: "CMS" },
  { icon: siWoocommerce, name: "WooCommerce", kind: "E-commerce" },
  { icon: siReact, name: "React", kind: "Frontend" },
  { icon: siNextdotjs, name: "Next.js", kind: "Frontend" },
  { icon: siTypescript, name: "TypeScript", kind: "Language" },
  { icon: siTailwindcss, name: "Tailwind", kind: "Styling" },
  { icon: siLaravel, name: "Laravel", kind: "Backend" },
  { icon: siPhp, name: "PHP", kind: "Backend" },
  { icon: siFlutter, name: "Flutter", kind: "Mobile" },
];

const rowB: Tech[] = [
  { icon: siClaude, name: "Claude", kind: "AI model" },
  { icon: siLangchain, name: "LangChain", kind: "AI agents" },
  { icon: siN8n, name: "n8n", kind: "Automation" },
  { icon: siPython, name: "Python", kind: "AI / Backend" },
  { icon: siNodedotjs, name: "Node.js", kind: "Backend" },
  { icon: siPostgresql, name: "PostgreSQL", kind: "Database" },
  { icon: siMysql, name: "MySQL", kind: "Database" },
  { icon: siRedis, name: "Redis", kind: "Cache" },
  { icon: siDocker, name: "Docker", kind: "DevOps" },
  { icon: siGooglecloud, name: "Google Cloud", kind: "Cloud" },
  { icon: siCloudflare, name: "Cloudflare", kind: "Edge" },
  { icon: siStripe, name: "Stripe", kind: "Payments" },
];

// Brands with near-black colours would vanish on a dark background
function brandColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 60 ? "#ffffff" : `#${hex}`;
}

const tile = (t: Tech) => <TechTile key={t.name} name={t.name} kind={t.kind} path={t.icon.path} color={brandColor(t.icon.hex)} />;

export function TechMarquee() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="mx-auto mb-4 max-w-5xl px-6 text-center">
        <ScrollReveal
          className="text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
          lead="Built with tools I trust."
          tail={`${rowA.length + rowB.length} technologies you can drag, fling and play with.`}
        />
        <p className="glass mx-auto mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70">
          <Hand size={15} className="text-accent-2" /> Drag the rows, hover to magnify, click an icon to pop it
        </p>
      </div>

      <DragMarquee speed={34} gap={24}>
        {rowA.map(tile)}
      </DragMarquee>
      <DragMarquee speed={-28} gap={24} className="-mt-10">
        {rowB.map(tile)}
      </DragMarquee>
    </section>
  );
}
