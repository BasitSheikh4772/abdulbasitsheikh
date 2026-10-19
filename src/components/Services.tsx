import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Blocks, Bot, Check, CloudCog, Code2, GraduationCap, KeyRound, Plus, ShoppingBag, Smartphone, Users, MessageCircle, Tag } from 'lucide-react'
import { siDocker, siFlutter, siLangchain, siLaravel, siMoodle, siPhp, siShopify, siWordpress } from 'simple-icons'
import { faqs, process, profile, services } from '../data'
import AIMascot from './AIMascot'
import { PixelBg } from './PixelBg'

const icons = { shopping: ShoppingBag, blocks: Blocks, key: KeyRound, code: Code2, bot: Bot, mobile: Smartphone, cloud: CloudCog, lms: GraduationCap, team: Users }


type Brand = { title: string; path: string; hex: string }
const BRANDS: Record<string, Brand> = {
  shopify: siShopify, wordpress: siWordpress, plugins: siPhp, web: siLaravel, ai: siLangchain, mobile: siFlutter, devops: siDocker, lms: siMoodle,
}
/** brand colour, lightened when it would disappear on the dark card */
const brandColor = (hex: string) => {
  const n = parseInt(hex, 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.32 ? '#c9d1d9' : `#${hex}`
}

function ServiceIcon({ id, fallback: Fallback }: { id: string; fallback: typeof Users }) {
  const b = BRANDS[id]
  const c = b ? brandColor(b.hex) : '#58a6ff'
  return (
    <span className="grid place-items-center w-12 h-12 rounded-xl mb-5" style={{ background: `${c}1f`, border: `1px solid ${c}55`, color: c }}>
      {b ? (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" role="img" aria-label={b.title}>
          <path d={b.path} />
        </svg>
      ) : (
        <Fallback size={22} />
      )}
    </span>
  )
}

export const SERVICE_EVENT = 'select-service'



export function Services() {
  return (
    <section id="services" className="theme-light px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <PixelBg />
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
        <div className="max-w-2xl">
      <p className="eyebrow mb-3">Services</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">How I can <span className="text-[#8b949e]">help your business</span></h2>
          <p className="text-slate-400 max-w-2xl mb-0">From a high-converting store to a licensed WordPress plugin, an AI assistant or a full custom platform: one senior engineer who plans, builds and ships it. First-order starting prices are shown on every service.</p>
        </div>
        <AIMascot className="w-44 sm:w-56 lg:w-72 shrink-0 self-center lg:self-auto" />
      </div>
      {/* promotional pricing notice */}
      <div className="relative mb-8 overflow-hidden rounded-xl border border-line bg-[#161b22] px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        style={{ background: 'radial-gradient(520px circle at 0% 0%, rgba(88,166,255,.14), transparent 60%), radial-gradient(420px circle at 100% 100%, rgba(163,113,247,.12), transparent 60%), #161b22' }}>
        <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #58a6ff, #a371f7, transparent)' }} />
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/30"><Tag size={16} /></span>
          First-order offer
        </span>
        <p className="text-sm sm:text-[.95rem] text-slate-300 leading-relaxed">
          Clients who contact me <b className="text-white font-semibold">directly</b> (contact form, WhatsApp or email) get the starting prices below on their <b className="text-white font-semibold">first order</b>.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons]
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.06 * (i % 3) }}
              className="glass spot rounded-lg p-6 flex flex-col"
            >
              <ServiceIcon id={s.id} fallback={Icon} />
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.blurb}</p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6 grow">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><Check size={15} className="text-accent mt-0.5 shrink-0" />{p}</li>
                ))}
              </ul>
              <div className="mt-auto pt-5 border-t border-line flex items-end justify-between gap-3">
                <div>
                  <p className="text-[.65rem] uppercase tracking-wider text-slate-400">{s.price === 'Custom' ? 'Pricing' : 'First order from'}</p>
                  <p className="font-display text-3xl font-semibold leading-none mt-1 text-white">
                    {s.price}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">{s.unit}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5">{s.note}</p>
                </div>
                <a
                  href="#contact"
                  onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: s.title }))}
                  className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
                >
                  Get a quote <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>
      <p className="mt-6 text-xs text-slate-400 leading-relaxed max-w-3xl">
        * Promotional pricing applies to the first order of clients who contact me directly. Prices are starting points in USD; the final quote depends on scope, integrations and timeline, and pricing for later orders may differ.
      </p>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className="theme-light px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <PixelBg />
      <p className="eyebrow mb-3">Process</p>
      <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-12">Simple, transparent <span className="text-[#8b949e]">from day one</span></h2>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <motion.li
            key={p.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.08 * i }}
            className="glass spot rounded-lg p-6"
          >
            <span className="font-display text-5xl font-bold text-[#8b949e]">{p.step}</span>
            <h3 className="font-display text-xl font-semibold mt-3 mb-2">{p.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Questions, <span className="text-[#8b949e]">answered</span></h2>
          <p className="text-slate-400 leading-relaxed mb-8">Quick answers about services, pricing and how we work together.</p>

          <div className="rounded-xl border border-line bg-[#161b22] p-6">
            <p className="font-display font-semibold text-lg">Still have a question?</p>
            <p className="text-sm text-slate-400 mt-1.5 mb-5">Ask me directly on WhatsApp or by email and I will get back to you.</p>
            <div className="flex flex-wrap gap-2">
              <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm"><MessageCircle size={15} /> WhatsApp</a>
              <a href="#contact" className="btn-secondary btn-sm">Send a message</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map((f, i) => {
            const on = open === i
            return (
              <div
                key={f.q}
                className="rounded-xl border bg-[#161b22] overflow-hidden transition-colors"
                style={{ borderColor: on ? '#58a6ff88' : '#30363d', boxShadow: on ? '0 14px 40px -22px #58a6ff88' : undefined }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="w-full flex items-center gap-4 text-left px-5 sm:px-6 py-5"
                >
                  <span className="font-mono text-sm text-slate-400 w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="grow font-display text-lg font-semibold leading-snug">{f.q}</span>
                  <span className={`grid place-items-center w-8 h-8 rounded-lg border shrink-0 transition-colors ${on ? 'bg-accent/15 border-accent/50 text-accent' : 'border-line text-slate-400'}`}>
                    <Plus size={16} className={`transition-transform duration-300 ${on ? 'rotate-45' : ''}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.75rem] text-slate-400 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Engagement() {
  const models = [
    { t: 'Fixed-price project', d: 'A defined scope for one clear price, delivered in milestones. Best for new builds, redesigns and plugins.' },
    { t: 'Monthly retainer', d: 'Ongoing development, maintenance and cloud support for a predictable monthly fee.' },
    { t: 'Dedicated engineer', d: 'Embed me in your team as a lead or senior engineer for long-running products. Terms agreed per scope.' },
  ]
  return (
    <section id="engagement" className="px-5 sm:px-10 py-24 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">Ways to work together</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Flexible <span className="text-[#8b949e]">engagements</span></h2>
          <p className="text-slate-400 leading-relaxed">Starting prices are a guide. Every project gets a fixed written quote after a short discovery call.</p>
        </div>
        <ul className="lg:col-span-8 grid gap-4 md:grid-cols-3">
          {models.map((m, i) => (
            <li key={m.t} className="glass spot rounded-xl p-6">
              <span className="font-mono text-sm text-slate-400">0{i + 1}</span>
              <h3 className="font-display text-lg font-semibold mt-4 mb-2">{m.t}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{m.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
