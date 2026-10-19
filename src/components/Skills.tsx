import { motion } from 'framer-motion'
import { Bot, CloudCog, Database, Layout, Server, ShoppingBag, Smartphone, type LucideIcon } from 'lucide-react'
import {
  siAndroid, siAnthropic, siBigcommerce, siBootstrap, siCloudflare, siCodeigniter, siCss, siDart, siDigitalocean, siDjango,
  siDocker, siDotnet, siElementor, siFlask, siFlutter, siGit, siGooglecloud, siGreensock, siHtml5, siJavascript, siLangchain,
  siLaravel, siMongodb, siMoodle, siMysql, siNextdotjs, siNginx, siPaypal, siPhp, siPostgresql, siPython, siReact, siRedis,
  siSass, siShopify, siStripe, siSymfony, siTailwindcss, siTypescript, siWordpress,
} from 'simple-icons'
import { skills } from '../data'

type Icon = { title: string; path: string }

/** keyword (lower-case, matched as a substring of the skill label) -> brand icon. First match wins. */
const ICONS: [string, Icon][] = [
  ['shopify', siShopify], ['elementor', siElementor], ['gutenberg', siWordpress], ['wordpress', siWordpress],
  ['bigcommerce', siBigcommerce], ['moodle', siMoodle], ['react native', siReact], ['react', siReact], ['next.js', siNextdotjs],
  ['typescript', siTypescript], ['javascript', siJavascript], ['tailwind', siTailwindcss], ['gsap', siGreensock], ['sass', siSass],
  ['bootstrap', siBootstrap], ['html5', siHtml5], ['css3', siCss], ['laravel', siLaravel], ['php', siPhp], ['flask', siFlask], ['django', siDjango],
  ['python', siPython], ['symfony', siSymfony], ['codeigniter', siCodeigniter], ['.net', siDotnet], ['langchain', siLangchain],
  ['claude', siAnthropic], ['flutter', siFlutter], ['dart', siDart], ['android', siAndroid], ['gcp', siGooglecloud],
  ['digitalocean', siDigitalocean], ['cloudflare', siCloudflare], ['docker', siDocker], ['nginx', siNginx], ['git', siGit],
  ['mysql', siMysql], ['postgres', siPostgresql], ['mongo', siMongodb], ['redis', siRedis], ['stripe', siStripe], ['paypal', siPaypal],
]
const iconFor = (label: string) => ICONS.find(([k]) => label.toLowerCase().includes(k))?.[1]

/** badge text taken from the CV wording, shown only where the CV states a level */
const LEVEL: Record<string, string> = { 'Laravel (Expert)': 'Expert' }

type Meta = { icon: LucideIcon; color: string; span: string; blurb: string }
const META: Record<string, Meta> = {
  'E-commerce & CMS': { icon: ShoppingBag, color: '#3fb950', span: 'lg:col-span-2', blurb: 'Stores and content platforms that convert.' },
  'AI & Automation': { icon: Bot, color: '#a371f7', span: '', blurb: 'LLM apps, agents and workflow automation.' },
  Frontend: { icon: Layout, color: '#58a6ff', span: '', blurb: 'Fast, polished interfaces.' },
  Backend: { icon: Server, color: '#f778ba', span: '', blurb: 'Solid APIs and application logic.' },
  Mobile: { icon: Smartphone, color: '#ffa657', span: '', blurb: 'Cross-platform iOS and Android.' },
  'DevOps & Cloud': { icon: CloudCog, color: '#39c5cf', span: 'lg:col-span-2', blurb: 'Hosting, security and delivery pipelines.' },
  'Data & Integrations': { icon: Database, color: '#e3b341', span: '', blurb: 'Databases, payments and third-party APIs.' },
}

// bento order: wide cards share a row with a single card
const ORDER = ['E-commerce & CMS', 'AI & Automation', 'Frontend', 'Backend', 'Mobile', 'DevOps & Cloud', 'Data & Integrations']

export default function Skills() {
  const groups = ORDER.map((g) => skills.find((s) => s.group === g)).filter((g): g is (typeof skills)[number] => Boolean(g))
  return (
    <section id="skills" className="px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-3">Toolbox</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Skills & <span className="text-[#8b949e]">technologies</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-xl">The stack I use to design, build, ship and scale products, from storefronts to AI agents and cloud infrastructure.</p>
        </div>
        <p className="lg:col-span-4 lg:text-right font-mono text-sm text-slate-400">{skills.reduce((n, g) => n + g.items.length, 0)} skills · {skills.length} areas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, gi) => {
          const m = META[g.group]
          const Icon = m.icon
          return (
            <motion.article
              key={g.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.05 * (gi % 3) }}
              className={`group relative overflow-hidden rounded-xl border border-line p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${m.span} ${m.span ? 'md:col-span-2' : ''}`}
              style={{ background: `radial-gradient(520px circle at 100% 0%, ${m.color}1f, transparent 60%), #161b22` }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />
              <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `inset 0 0 0 1px ${m.color}77, 0 18px 50px -20px ${m.color}88` }} />

              <div className="flex items-start gap-4 mb-6">
                <span className="grid place-items-center w-12 h-12 rounded-xl shrink-0" style={{ background: `${m.color}22`, color: m.color, border: `1px solid ${m.color}55` }}>
                  <Icon size={22} />
                </span>
                <div className="min-w-0 grow">
                  <h3 className="font-display text-xl font-semibold leading-tight">{g.group}</h3>
                  <p className="text-sm text-slate-400 mt-1">{m.blurb}</p>
                </div>
                <span className="font-display text-3xl font-semibold leading-none" style={{ color: m.color }}>{String(g.items.length).padStart(2, '0')}</span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => {
                  const ic = iconFor(item)
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-md border border-line bg-black/25 px-3 py-1.5 text-[.8rem] text-slate-200 transition-colors hover:border-[var(--c)] hover:text-white"
                      style={{ ['--c' as string]: m.color }}
                    >
                      {ic && (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden style={{ color: m.color }}>
                          <path d={ic.path} />
                        </svg>
                      )}
                      {item}
                      {LEVEL[item] && (
                        <b className="ml-0.5 rounded px-1.5 py-px text-[.6rem] font-bold uppercase tracking-wider" style={{ background: `${m.color}26`, color: m.color }}>{LEVEL[item]}</b>
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
