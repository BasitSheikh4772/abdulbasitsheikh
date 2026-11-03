import { BlurFade } from "@/components/ui/blur-fade";
import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <BlurFade inView className="mx-auto mb-10 max-w-3xl sm:mb-16 text-center">
      <span className="glass mb-6 inline-block rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
        {eyebrow}
      </span>
      <h2 className="display text-4xl sm:text-6xl">{title}</h2>
      {text && <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{text}</p>}
    </BlurFade>
  );
}
