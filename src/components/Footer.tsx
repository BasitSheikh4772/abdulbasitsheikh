import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-5 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 pb-6 text-sm text-muted-foreground sm:flex-row">
        <p>© 2026 {site.name}. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center gap-x-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="block py-2.5 transition hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p
        aria-hidden
        className="display text-glow pointer-events-none select-none text-center text-[clamp(4rem,22vw,20rem)] leading-[0.8] opacity-30 [mask-image:linear-gradient(to_bottom,#000_30%,transparent)]"
      >
        {site.name}
      </p>
    </footer>
  );
}
