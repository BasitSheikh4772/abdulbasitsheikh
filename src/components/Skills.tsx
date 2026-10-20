import { motion } from 'framer-motion'
import { Bot, Database, LibraryBig, MessageSquareText, Plug, Sparkles, type LucideIcon } from 'lucide-react'
import { skills } from '../data'
import AIMascot from './AIMascot'
import { GlowBg } from './PixelBg'
import { skillIcons } from './skillIcons'

/** keyword (lower-case, matched inside the skill label) -> logo keys. First match wins; up to 3 logos are shown. */
const LOGOS: [string, string[]][] = [
  ['shopify', ['shopify']],
  ['woocommerce', ['wordpress', 'woocommerce']],
  ['elementor', ['elementor']],
  ['gutenberg', ['wordpress', 'react']],
  ['bigcommerce', ['bigcommerce']],
  ['magento', ['magento']],
  ['moodle', ['moodle']],
  ['react.js', ['react']],
  ['next.js', ['nextjs']],
  ['javascript', ['javascript', 'typescript']],
  ['tailwind', ['tailwind']],
  ['gsap', ['gsap']],
  ['sass', ['sass']],
  ['bootstrap', ['bootstrap']],
  ['html5', ['html5', 'css3']],
  ['laravel', ['laravel']],
  ['core php', ['php']],
  ['python', ['python', 'flask', 'django']],
  ['c# /', ['csharp', 'dotnet']],
  ['symfony', ['symfony']],
  ['codeigniter', ['codeigniter']],
  ['langchain', ['langchain']],
  ['claude', ['claude', 'openai']],
  ['react native', ['react']],
  ['flutter', ['flutter', 'dart']],
  ['android', ['android']],
  ['aws ses', ['aws']],
  ['aws', ['aws']],
  ['gcp', ['gcp']],
  ['azure', ['azure']],
  ['digitalocean', ['digitalocean']],
  ['cloudflare', ['cloudflare']],
  ['docker', ['docker']],
  ['nginx', ['nginx']],
  ['lamp', ['linux', 'nginx']],
  ['git', ['git', 'github', 'gitlab']],
  ['mysql', ['mysql', 'mariadb']],
  ['postgres', ['postgresql']],
  ['mongo', ['mongodb']],
  ['redis', ['redis']],
  ['stripe', ['stripe', 'paypal']],
  ['twilio', ['twilio']],
  ['jwt', ['jwt']],
]

/** skills that have no brand logo get a clear symbolic icon instead */
const SYMBOLS: [string, LucideIcon][] = [
  ['llm', Bot],
  ['rag', LibraryBig],
  ['chatbots', MessageSquareText],
  ['prompt', Sparkles],
  ['rest api', Plug],
]

const logosFor = (label: string) => LOGOS.find(([k]) => label.toLowerCase().includes(k))?.[1]
const symbolFor = (label: string): LucideIcon => SYMBOLS.find(([k]) => label.toLowerCase().includes(k))?.[1] ?? Database

/** three overlapping logos that represent a whole skill area */
const GROUP_LOGOS: Record<string, string[]> = {
  'E-commerce & CMS': ['shopify', 'wordpress', 'bigcommerce'],
  'AI & Automation': ['langchain', 'claude', 'openai'],
  Frontend: ['react', 'nextjs', 'tailwind'],
  Backend: ['laravel', 'php', 'python'],
  Mobile: ['flutter', 'react', 'android'],
  'DevOps & Cloud': ['aws', 'docker', 'cloudflare'],
  'Data & Integrations': ['postgresql', 'mongodb', 'redis'],
}

function Logo({ name, size }: { name: string; size: number }) {
  const ic = skillIcons[name]
  if (!ic) return null
  return (
    <svg viewBox={`0 0 ${ic.w} ${ic.h}`} width={size} height={size} role="img" aria-label={name} dangerouslySetInnerHTML={{ __html: ic.body }} />
  )
}

/** light rounded tile so dark logos (GitHub, Next.js, Laravel...) stay visible on the dark cards */
const Tile = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`grid place-items-center rounded-md bg-[#eef2f7] shrink-0 ${className}`}>{children}</span>
)

/** badge text taken from the CV wording, shown only where the CV states a level */
const LEVEL: Record<string, string> = { 'Laravel (Expert)': 'Expert' }

type Meta = { color: string; span: string; blurb: string }
const META: Record<string, Meta> = {
  'E-commerce & CMS': { color: '#3fb950', span: 'lg:col-span-2', blurb: 'Stores and content platforms that convert.' },
  'AI & Automation': { color: '#a371f7', span: '', blurb: 'LLM apps, agents and workflow automation.' },
  Frontend: { color: '#58a6ff', span: '', blurb: 'Fast, polished interfaces.' },
  Backend: { color: '#f778ba', span: '', blurb: 'Solid APIs and application logic.' },
  Mobile: { color: '#ffa657', span: '', blurb: 'Cross-platform iOS and Android.' },
  'DevOps & Cloud': { color: '#39c5cf', span: 'lg:col-span-2', blurb: 'Hosting, security and delivery pipelines.' },
  'Data & Integrations': { color: '#e3b341', span: '', blurb: 'Databases, payments and third-party APIs.' },
}

// bento order: wide cards share a row with a single card
const ORDER = ['E-commerce & CMS', 'AI & Automation', 'Frontend', 'Backend', 'Mobile', 'DevOps & Cloud', 'Data & Integrations']

export default function Skills() {
  const groups = ORDER.map((g) => skills.find((s) => s.group === g)).filter((g): g is (typeof skills)[number] => Boolean(g))
  return (
    <section id="skills" className="px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <GlowBg />
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-3">Toolbox</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Skills & <span className="text-[#8b949e]">technologies</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-xl">The stack I use to design, build, ship and scale products, from storefronts to AI agents and cloud infrastructure.</p>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-3">
          <AIMascot className="w-40 sm:w-48" />
          <p className="font-mono text-sm text-slate-400">{skills.reduce((n, g) => n + g.items.length, 0)} skills · {skills.length} areas</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, gi) => {
          const m = META[g.group]
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
                {/* overlapping brand logos for this skill area */}
                <span className="flex shrink-0 pl-1" aria-hidden>
                  {GROUP_LOGOS[g.group].map((n, i) => (
                    <span
                      key={n}
                      className="grid place-items-center w-11 h-11 rounded-full bg-[#eef2f7] -ml-2.5 first:ml-0 ring-[3px] ring-[#161b22]"
                      style={{ zIndex: 3 - i }}
                    >
                      <Logo name={n} size={24} />
                    </span>
                  ))}
                </span>
                <div className="min-w-0 grow">
                  <h3 className="font-display text-xl font-semibold leading-tight">{g.group}</h3>
                  <p className="text-sm text-slate-400 mt-1">{m.blurb}</p>
                </div>
                <span className="font-display text-3xl font-semibold leading-none" style={{ color: m.color }}>{String(g.items.length).padStart(2, '0')}</span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => {
                  const keys = logosFor(item)?.filter((k) => skillIcons[k]).slice(0, 3)
                  const Symbol = symbolFor(item)
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2.5 rounded-md border border-line bg-black/25 pl-1.5 pr-3 py-1.5 text-[.8rem] text-slate-200 transition-colors hover:border-[var(--c)] hover:text-white"
                      style={{ ['--c' as string]: m.color }}
                    >
                      {keys && keys.length > 0 ? (
                        <span className="flex gap-1">
                          {keys.map((k) => (
                            <Tile key={k} className="w-6 h-6">
                              <Logo name={k} size={16} />
                            </Tile>
                          ))}
                        </span>
                      ) : (
                        <span className="grid place-items-center w-6 h-6 rounded-md shrink-0" style={{ background: `${m.color}26`, color: m.color }}>
                          <Symbol size={14} />
                        </span>
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
