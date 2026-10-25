import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { experience, experienceSpans } from '../data'
import { PixelBg } from './PixelBg'

const COUNTRY = { PK: '#58a6ff', AE: '#a371f7', US: '#3fb950' } as const
type Code = keyof typeof COUNTRY
const NAMES: Record<Code, string> = { PK: 'Pakistan', AE: 'UAE', US: 'United States' }

const countryOf = (place: string): Code => (place.endsWith('UAE') ? 'AE' : place.endsWith('PK') ? 'PK' : 'US')
const nowYear = () => {
  const d = new Date()
  return d.getFullYear() + d.getMonth() / 12
}
const duration = (start: number, end: number) => {
  const m = Math.max(1, Math.round((end - start) * 12))
  const y = Math.floor(m / 12)
  const r = m % 12
  return [y ? `${y} yr${y > 1 ? 's' : ''}` : '', r ? `${r} mo` : ''].filter(Boolean).join(' ')
}
const initials = (org: string) =>
  org.replace(/\(.*?\)/g, '').split(/[\s—-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
const shortOrg = (org: string) => org.replace(/ — .*/, '').replace(/ \(.*?\)/, '')
const shortRole = (role: string) =>
  role.replace('Senior', 'Sr.').replace('Software Engineer', 'Engineer').replace(' & DevOps Engineer', ' & DevOps').replace(' (Contractual)', '')

const FIRST = 2017

// real company logos: drop files into src/assets/companies/ (see the README there)
const logoFiles = import.meta.glob('/src/assets/companies/*.{png,jpg,jpeg,webp,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const slug = (org: string) => shortOrg(org).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const logoFor = (org: string) => {
  const key = slug(org)
  return Object.entries(logoFiles).find(([path]) => path.split('/').pop()!.replace(/\.[^.]+$/, '') === key)?.[1]
}

export default function Experience() {
  const [hover, setHover] = useState<number | null>(null)
  const [filter, setFilter] = useState<Code | 'ALL'>('ALL')
  const chart = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(720) // real pixel width of the bar area, so labels can tell if they fit

  useEffect(() => {
    const el = chart.current
    if (!el) return
    const ro = new ResizeObserver(() => setCw(el.clientWidth))
    ro.observe(el)
    setCw(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const now = nowYear()
  const last = Math.ceil(now) + 0.2
  const span = last - FIRST
  const years = Array.from({ length: Math.floor(now) - FIRST + 1 }, (_, i) => FIRST + i)
  const pct = (y: number) => `${((y - FIRST) / span) * 100}%`

  const rows = experience.map((e, i) => ({ ...e, i, code: countryOf(e.place), span: experienceSpans[e.org] ?? [FIRST, FIRST + 1] }))
  const visible = (c: Code) => filter === 'ALL' || filter === c
  const dim = (i: number, c: Code) => !visible(c) || (hover !== null && hover !== i)

  return (
    <section id="experience" className="theme-light px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <PixelBg side="left" />
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Where I've <span className="text-[#8b949e]">worked</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-xl">
            Since 2017 I have worked across agencies, product teams and international clients, growing from web developer to lead engineer.
          </p>
        </div>
        <dl className="lg:col-span-5 grid grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
          {[['10', 'Roles'], ['3', 'Countries'], ['9+', 'Years']].map(([v, l]) => (
            <div key={l} className="bg-[#161b22] p-5">
              <dt className="font-display text-3xl font-semibold text-white">{v}</dt>
              <dd className="text-xs text-slate-400 mt-1">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4" role="group" aria-label="Filter by country">
        {(['ALL', 'PK', 'AE', 'US'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            aria-pressed={filter === k}
            className={`inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
              filter === k ? 'bg-white/10 border-slate-400 text-white' : 'border-line text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {k !== 'ALL' && <i className="w-2.5 h-2.5 rounded-sm" style={{ background: COUNTRY[k] }} />}
            {k === 'ALL' ? 'All roles' : NAMES[k]}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400 hidden sm:block">Hover a bar or card to link them</span>
      </div>

      {/* career timeline */}
      <div className="glass rounded-lg p-5 sm:p-6 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[10.5rem_1fr]">
            <div />
            <div className="relative h-6 mb-1">
              {years.map((y) => (
                <span key={y} className="absolute text-[.65rem] font-mono text-slate-400 -translate-x-1/2" style={{ left: pct(y) }}>{y}</span>
              ))}
            </div>

            <ul>
              {rows.map((r) => (
                <li
                  key={r.i}
                  onMouseEnter={() => setHover(r.i)}
                  onMouseLeave={() => setHover(null)}
                  className={`h-9 flex items-center text-xs pr-3 truncate transition-opacity ${dim(r.i, r.code) ? 'opacity-30' : 'text-slate-200'}`}
                >
                  {shortOrg(r.org)}
                </li>
              ))}
            </ul>

            <div className="relative" ref={chart}>
              {years.map((y) => (
                <i key={y} className="absolute top-0 bottom-0 w-px bg-line/60" style={{ left: pct(y) }} />
              ))}
              {/* today marker */}
              <i className="absolute top-0 bottom-0 w-px bg-gh-green/70" style={{ left: pct(now) }} />
              <span className="absolute -top-7 -translate-x-1/2 text-[.6rem] font-bold uppercase tracking-wider text-gh-green" style={{ left: pct(now) }}>Today</span>

              {rows.map((r) => {
                const [a, b] = r.span
                const end = b ?? now
                const c = COUNTRY[r.code]
                const label = shortRole(r.role)
                const textPx = label.length * 5.9 + 20
                const barPx = ((end - a) / span) * cw
                const inside = barPx >= textPx
                // too narrow for its title: put the title beside the bar, on the right if there is room, otherwise on the left
                const room = cw - ((end - FIRST) / span) * cw >= textPx + 10
                return (
                  <div key={r.i} className="relative h-9">
                    <motion.button
                      type="button"
                      onMouseEnter={() => setHover(r.i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(r.i)}
                      onBlur={() => setHover(null)}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.05 * r.i }}
                      aria-label={`${r.role}, ${r.org}, ${r.period}`}
                      className="absolute top-1.5 h-6 rounded origin-left text-left px-2 text-[10px] font-semibold text-[#0d1117] overflow-hidden whitespace-nowrap transition-opacity"
                      style={{
                        left: pct(a),
                        width: `${((end - a) / span) * 100}%`,
                        minWidth: 8,
                        background: c,
                        opacity: dim(r.i, r.code) ? 0.18 : 1,
                        boxShadow: hover === r.i || b === null ? `0 0 16px ${c}` : undefined,
                      }}
                    >
                      {inside && label}
                    </motion.button>
                    {!inside && (
                      <span
                        className="absolute top-1.5 h-6 flex items-center text-[10px] font-semibold text-slate-200 whitespace-nowrap pointer-events-none transition-opacity"
                        style={room ? { left: `calc(${pct(end)} + 6px)`, opacity: dim(r.i, r.code) ? 0.25 : 1 } : { right: `calc(100% - ${pct(a)} + 6px)`, opacity: dim(r.i, r.code) ? 0.25 : 1 }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* role cards: featured current role + grid */}
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {rows.filter((r) => visible(r.code)).map((r) => {
          const [a, b] = r.span
          const end = b ?? now
          const c = COUNTRY[r.code]
          const active = hover === r.i
          const current = b === null
          return (
            <motion.li
              layout
              key={r.i}
              onMouseEnter={() => setHover(r.i)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              className={`group relative overflow-hidden rounded-xl border bg-[#161b22] transition-all duration-300 ${current ? 'lg:col-span-3 p-7 sm:p-8' : 'p-6 hover:-translate-y-1'}`}
              style={{
                borderColor: active || current ? `${c}88` : '#30363d',
                boxShadow: active ? `0 18px 50px -18px ${c}88` : current ? `0 0 60px -28px ${c}` : undefined,
                background: `radial-gradient(520px circle at 100% 0%, ${c}${current ? '26' : '14'}, transparent 60%), #161b22`,
              }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />

              <div className={`flex ${current ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'} gap-5`}>
                <div className="flex items-start justify-between gap-3">
                  {logoFor(r.org) ? (
                    <span
                      className={`grid place-items-center rounded-xl shrink-0 bg-white overflow-hidden ${current ? 'w-16 h-16 p-2' : 'w-12 h-12 p-1.5'}`}
                      style={{ border: `1px solid ${c}55` }}
                    >
                      <img src={logoFor(r.org)} alt={`${shortOrg(r.org)} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                    </span>
                  ) : (
                    <span
                      className={`grid place-items-center rounded-xl shrink-0 font-display font-bold ${current ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-sm'}`}
                      style={{ background: `${c}22`, color: c, border: `1px solid ${c}55` }}
                    >
                      {initials(r.org)}
                    </span>
                  )}
                  {!current && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 border border-line rounded-full pl-1.5 pr-2.5 py-1 bg-black/20">
                      <b className="text-[.6rem] font-bold tracking-wider px-1.5 py-0.5 rounded" style={{ background: `${c}26`, color: c }}>{r.code}</b>
                      {r.place.split(',')[0]}
                    </span>
                  )}
                </div>

                <div className="grow min-w-0">
                  {current && (
                    <span className="inline-flex items-center gap-1.5 mb-2 text-[.65rem] font-semibold uppercase tracking-wider text-gh-green border border-gh-green/40 rounded-full px-2.5 py-0.5">
                      <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gh-green opacity-70" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gh-green" /></span>
                      Current role
                    </span>
                  )}
                  <h3 className={`font-display font-semibold leading-snug ${current ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{r.role}</h3>
                  <p className="text-slate-300 mt-1">{r.org}</p>
                  {current && (
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
                      <b className="text-[.6rem] font-bold tracking-wider px-1.5 py-0.5 rounded" style={{ background: `${c}26`, color: c }}>{r.code}</b>
                      {r.place}
                    </p>
                  )}
                </div>

                {current && (
                  <div className="sm:text-right">
                    <p className="font-display text-4xl font-semibold text-white leading-none">{duration(a, end)}</p>
                    <p className="font-mono text-xs mt-2" style={{ color: c }}>{r.period}</p>
                  </div>
                )}
              </div>

              {!current && (
                <div className="mt-6 pt-4 border-t border-line/80 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-xl font-semibold text-white leading-none">{duration(a, end)}</p>
                    <p className="font-mono text-[.7rem] mt-1.5" style={{ color: c }}>{r.period}</p>
                  </div>
                  {/* mini timeline: where this role sits in the 2017 → today career */}
                  <div className="relative w-28 h-1.5 rounded-full bg-white/10 mb-1" aria-hidden>
                    <i
                      className="absolute top-0 h-full rounded-full"
                      style={{ left: pct(a), width: `${Math.max(((end - a) / span) * 100, 4)}%`, background: c, boxShadow: `0 0 10px ${c}` }}
                    />
                  </div>
                </div>
              )}
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
