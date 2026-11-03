import { ScrollReveal } from "@/components/ScrollReveal";
import { LogoOrbit } from "@/components/LogoOrbit";
import { companies } from "@/lib/site";

export function Companies() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto mb-6 max-w-5xl px-6 text-center">
        <ScrollReveal
          className="text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
          lead="Teams I have built with."
          tail="Spin the ring to meet the companies I have shipped for."
        />
      </div>
      <LogoOrbit companies={companies} />
    </section>
  );
}
