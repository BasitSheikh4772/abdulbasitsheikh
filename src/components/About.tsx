import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MapPin } from "@/components/icons";
import { SectionHead } from "./SectionHead";
import { about } from "@/lib/profile";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="About me"
          title={
            <>
              Engineer, <span className="serif-italic text-glow">team lead</span>, problem solver.
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <BlurFade inView>
            <div className="glass relative h-full overflow-hidden rounded-[2rem] p-7 sm:p-10">
              <BorderBeam size={220} duration={9} colorFrom="#8b9bff" colorTo="#22d3ee" />
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-lg font-bold text-black">AB</span>
                <div>
                  <p className="text-lg font-semibold">{site.name}</p>
                  <p className="text-sm text-muted-foreground">Senior Full Stack & AI Engineer</p>
                </div>
              </div>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
                <MapPin size={16} /> {site.location} · {about.timezone}
              </p>
            </div>
          </BlurFade>

          <ul className="grid gap-4">
            {about.values.map((v, i) => (
              <BlurFade key={v.n} inView delay={0.1 + i * 0.1}>
                <li className="glass group flex h-full gap-5 rounded-3xl p-6 transition hover:bg-white/[0.07]">
                  <span className="font-mono text-sm text-accent">{v.n}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </li>
              </BlurFade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
