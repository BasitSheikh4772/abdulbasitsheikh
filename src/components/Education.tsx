import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHead } from "./SectionHead";
import { certifications, education } from "@/lib/profile";

function Badge({ text }: { text: string }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent-2/20 font-mono text-xs font-bold text-white ring-1 ring-white/15">
      {text}
    </span>
  );
}

export function Education() {
  return (
    <section id="education" className="px-5 py-16 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Education & credentials"
          title={
            <>
              Learning <span className="serif-italic text-glow">never stops</span>
            </>
          }
          text="Formal engineering education plus industry certifications in cloud architecture, UX and software engineering."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <BlurFade inView>
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">Education</h3>
              <ul className="mt-6 space-y-5">
                {education.map((e) => (
                  <li key={e.title} className="flex items-center gap-4">
                    <Badge text={e.abbr} />
                    <div>
                      <p className="font-semibold leading-snug">{e.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {e.school}
                        {e.period && ` · ${e.period}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.12}>
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">Certifications</h3>
              <ul className="mt-6 space-y-5">
                {certifications.map((c) => (
                  <li key={c.title} className="flex items-center gap-4">
                    <Badge text={c.abbr} />
                    <div>
                      <p className="font-semibold leading-snug">{c.title}</p>
                      <p className="text-sm text-muted-foreground">Issued by {c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
