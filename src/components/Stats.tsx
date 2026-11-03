import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { stats } from "@/lib/site";

// One supporting line per stat (facts from the portfolio)
const notes = [
  "From Shopify to AI agents, since 2017.",
  "Storefronts, apps and platforms in production.",
  "UAE, Pakistan, USA, Canada, Mexico and the UK.",
  "From Liquid and Laravel to LangChain.",
];

export function Stats() {
  return (
    <section className="px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 border-y border-white/10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <BlurFade key={s.label} inView delay={i * 0.1}>
            <div className="h-full border-white/10 px-4 py-12 text-center sm:px-6 sm:py-16 lg:border-l lg:first:border-l-0 [&:nth-child(odd)]:border-r-0 max-lg:odd:border-r">
              <p className="text-[clamp(3.6rem,8.6vw,7.4rem)] font-semibold leading-none tracking-[-0.05em]">
                <NumberTicker value={s.value} className="text-glow" />
                <span className="text-glow">{s.suffix}</span>
              </p>
              <p className="mt-5 text-lg font-semibold">{s.label}</p>
              <p className="mx-auto mt-1.5 max-w-[16rem] text-sm leading-snug text-white/45">{notes[i]}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
