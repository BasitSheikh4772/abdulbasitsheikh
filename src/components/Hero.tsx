import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { ParticleEarth } from "@/components/ParticleEarth";
import { HeroTitle } from "@/components/HeroTitle";
import { companies } from "@/lib/site";

const trusted = [companies[0], companies[1], companies[3], companies[6], companies[8]];

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pt-32 text-center sm:pt-36">
      <Particles className="absolute inset-0 -z-20" quantity={90} ease={80} size={0.5} color="#ffffff" refresh />

      {/* Planet rising over the horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[calc(48svh+240px)] min-h-[620px]">
        <div className="absolute inset-x-0 bottom-0 top-[40%] bg-[radial-gradient(ellipse_60%_55%_at_50%_100%,rgba(99,102,241,0.35),transparent_70%)]" />
        <ParticleEarth className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#000_240px)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <BlurFade delay={0.1}>
          <a
            href="#contact"
            className="glass group mx-auto inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-sm transition hover:bg-white/10"
          >
            <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-black">
              Open
            </span>
            Open to new opportunities
            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </a>
        </BlurFade>

        <div className="mt-8">
          <HeroTitle />
        </div>

        <BlurFade delay={0.5}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground/75 sm:text-xl">
            Senior full stack and AI engineer with 9+ years across Shopify, WordPress, Laravel, React and cloud
            infrastructure. I design, build and ship products that perform.
          </p>
        </BlurFade>

        <BlurFade delay={0.65}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact">
              <ShimmerButton background="rgba(5,9,26,0.9)" shimmerColor="#8b9bff" className="h-14 gap-2 px-8 text-base font-medium">
                Get in touch <ArrowRight size={18} />
              </ShimmerButton>
            </a>
            <a href="#work" className="glass inline-flex h-14 items-center gap-2 rounded-full px-8 font-medium transition hover:bg-white/10">
              View my work
            </a>
          </div>
          <p className="mt-4 text-sm text-foreground/50">UAE · Pakistan · Working with clients worldwide</p>
        </BlurFade>
      </div>

      {/* Trusted-by row, sitting on the planet */}
      <BlurFade delay={1}>
        <div className="mt-auto flex flex-col items-center gap-4 pb-8 pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">Previously building at</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trusted.map((c) => (
              <span
                key={c.name}
                tabIndex={0}
                aria-label={c.name}
                className="glass group flex cursor-default items-center rounded-full p-1.5 text-sm text-foreground/80 outline-none transition-colors duration-500 hover:bg-white/10 focus-visible:bg-white/10"
              >
                <Image src={c.logo} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full bg-white object-contain" />
                {/* name unfolds on hover (grid 0fr → 1fr animates the width) */}
                <span className="grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grid-cols-[1fr] group-hover:opacity-100 group-focus:grid-cols-[1fr] group-focus:opacity-100 max-sm:grid-cols-[1fr] max-sm:opacity-100">
                  <span className="overflow-hidden whitespace-nowrap">
                    <span className="block pl-2.5 pr-3">{c.name}</span>
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
