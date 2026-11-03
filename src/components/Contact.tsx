"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from "@/components/icons";
import { BorderBeam } from "@/components/ui/border-beam";
import { Particles } from "@/components/ui/particles";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const serviceOptions = ["Shopify / WordPress", "Web app", "Mobile app", "AI & automation", "Cloud / DevOps", "Full-time role", "Something else"];
const budgetOptions = ["Under $1k", "$1k – $5k", "$5k – $20k", "$20k+", "Not sure yet"];

type Form = { name: string; email: string; message: string; budget: string; services: string[] };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const empty: Form = { name: "", email: "", message: "", budget: "", services: [] };

/** A field whose label floats up when you type, like the inputs in Apple's own forms */
function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const shared = cn(
    "peer w-full rounded-2xl border bg-white/[0.06] px-4 pb-2.5 pt-6 text-[15px] text-white outline-none transition duration-200 placeholder:text-transparent",
    "focus:border-accent/70 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(139,155,255,0.16)]",
    error ? "border-rose-400/60" : "border-white/12",
  );
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " rows={5} className={cn(shared, "resize-none")} aria-invalid={!!error} />
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " autoComplete={autoComplete} className={shared} aria-invalid={!!error} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-[1.15rem] origin-left text-[15px] text-white/45 transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-2 pt-1.5 text-xs text-rose-300">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />;
}

export function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const sent = useRef({ name: "", email: "" });

  // Scroll story (large screens): a giant word zooms past, then the form card rises into place.
  const section = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });
  const wordScale = useTransform(p, [0, 0.3], [1, 9]);
  const wordOpacity = useTransform(p, [0.04, 0.26], [1, 0]);
  const cardScale = useTransform(p, [0.1, 0.44], [0.62, 1]);
  const cardY = useTransform(p, [0.1, 0.44], [170, 0]);
  const cardOpacity = useTransform(p, [0.1, 0.32], [0, 1]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggleService = (s: string) => setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Tell me a little more, at least a sentence.";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      // static site: the enquiry goes straight to my inbox through FormSubmit
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Portfolio enquiry from ${form.name.trim()}`,
          _replyto: form.email.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          needs: form.services.join(", "),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      sent.current = { name: form.name.trim().split(" ")[0], email: form.email.trim() };
      setForm(empty);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const contacts = [
    { icon: <Mail size={20} />, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={20} />, label: "Call or WhatsApp", value: site.phone, href: site.socials.find((s) => s.label === "WhatsApp")?.href ?? `tel:${site.phone}` },
    { icon: <MapPin size={20} />, label: "Based in", value: site.location, href: undefined },
  ];

  return (
    <section id="contact" ref={section} className="relative overflow-x-clip px-5 py-20 lg:h-[230vh] lg:py-0">
      <div className="relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:justify-center lg:overflow-hidden">
        {desktop && (
          <motion.h2
            style={{ scale: wordScale, opacity: wordOpacity }}
            className="pointer-events-none absolute inset-0 z-10 grid place-items-center text-center text-[clamp(3rem,15vw,14rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-[#d6d6d9]"
          >
            Let&apos;s talk
          </motion.h2>
        )}
        <motion.div
          style={desktop ? { scale: cardScale, y: cardY, opacity: cardOpacity } : undefined}
          className="glass relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] p-7 sm:p-14 [@media(max-height:780px)]:lg:p-10">
          <Particles className="absolute inset-0" quantity={40} color="#c7d2fe" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-[110px]" />
          <div className="relative grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            {/* left: the invitation */}
            <div className="flex flex-col">
              <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
                Let&apos;s build something great. <span className="text-white/40">Tell me what you are dreaming up.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-snug text-white/55">I read every message and reply within one business day, usually sooner.</p>

              <ul className="mt-10 space-y-3">
                {contacts.map((c) => {
                  const inner = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-accent ring-1 ring-white/10">{c.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-white/40">{c.label}</span>
                        <span className="block truncate font-medium">{c.value}</span>
                      </span>
                      {c.href && <ArrowUpRight size={18} className="text-white/30 transition group-hover:text-white" />}
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="group flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/[0.05]">
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-2">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* right: the form, or the thank-you */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 160, damping: 20 }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  >
                    <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none">
                      <motion.circle cx="40" cy="40" r="34" stroke="#8b9bff" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} />
                      <motion.path d="M26 41l10 10 19-21" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }} />
                    </svg>
                    <h3 className="mt-8 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]">Message sent.</h3>
                    <p className="mx-auto mt-3 max-w-sm text-white/55">
                      Thanks{sent.current.name ? `, ${sent.current.name}` : ""}. I will reply to <span className="text-white">{sent.current.email}</span> within one business day.
                    </p>
                    <button onClick={() => setStatus("idle")} className="glass mt-8 cursor-pointer rounded-full px-6 py-3 text-sm font-medium transition hover:bg-white/10">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
                      <Field label="Your name" name="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" />
                      <Field label="Email address" name="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />
                    </div>

                    {/* what do you need */}
                    <div>
                      <p className="mb-3 px-1 text-sm font-medium text-white/70">What do you need?</p>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((s) => {
                          const on = form.services.includes(s);
                          return (
                            <motion.button
                              key={s}
                              type="button"
                              layout
                              whileTap={{ scale: 0.94 }}
                              onClick={() => toggleService(s)}
                              aria-pressed={on}
                              className={cn(
                                "flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                                on ? "border-transparent bg-white text-black" : "border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white",
                              )}
                            >
                              <AnimatePresence initial={false}>
                                {on && (
                                  <motion.span initial={{ width: 0, opacity: 0, scale: 0.4 }} animate={{ width: 14, opacity: 1, scale: 1 }} exit={{ width: 0, opacity: 0, scale: 0.4 }} className="grid place-items-center overflow-hidden">
                                    <Check size={14} strokeWidth={3} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {s}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* budget */}
                    <div>
                      <p className="mb-3 px-1 text-sm font-medium text-white/70">Estimated budget</p>
                      <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => set("budget", form.budget === b ? "" : b)}
                            className={cn("relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors", form.budget === b ? "text-black" : "text-white/60 hover:text-white")}
                          >
                            {form.budget === b && <motion.span layoutId="budget-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                            <span className="relative">{b}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field label="Tell me about your project" name="message" textarea value={form.message} onChange={(v) => set("message", v)} error={errors.message} />

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileTap={{ scale: 0.98 }}
                      className="group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-base font-semibold text-black transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-80"
                    >
                      {status === "sending" ? (
                        <Spinner />
                      ) : (
                        <>
                          Send message <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                          Something went wrong and your message was not sent. Please try again, or email me at {site.email}.
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="px-1 text-center text-xs text-white/35">Your details are only used to reply to your enquiry.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
          <BorderBeam size={220} duration={10} colorFrom="#8b9bff" colorTo="#22d3ee" />
        </motion.div>
      </div>
    </section>
  );
}
