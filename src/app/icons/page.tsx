import * as Icons from "@/components/icons";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nexora icon set" };

const entries = Object.entries(Icons).filter(([k]) => /^[A-Z]/.test(k)) as [string, React.ComponentType<{ size?: number }>][];

// Preview page for the custom icon set. Hover a tile to see each icon's animation.
export default function IconSet() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        Nexora icons. <span className="text-white/40">Duotone, drawn on scroll, alive on hover.</span>
      </h1>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {entries.map(([name, Icon]) => (
          <button
            key={name}
            className="group flex cursor-pointer flex-col items-center gap-5 rounded-3xl border border-white/10 bg-[#0a0b12] px-4 py-9 text-accent transition hover:border-accent/40 hover:bg-white/[0.04]"
          >
            <Icon size={44} />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">{name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
