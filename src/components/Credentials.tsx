import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../data'
import { GlowBg } from './PixelBg'

const ISSUER: Record<string, { color: string; short: string }> = {
  AWS: { color: '#ff9900', short: 'AWS' },
  Google: { color: '#4285f4', short: 'G' },
  IBM: { color: '#4589ff', short: 'IBM' },
}

const edColor = (org: string) => (org.includes('NED') ? '#58a6ff' : '#f778ba')
const edShort = (org: string) => (org.includes('NED') ? 'NED' : 'GMI')

function Card({ color, children, i }: { color: string; children: React.ReactNode; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.07 * i }}
      className="group relative overflow-hidden rounded-xl border border-line p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: `radial-gradient(420px circle at 100% 0%, ${color}1f, transparent 60%), #161b22` }}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${color}77, 0 18px 50px -20px ${color}88` }} />
      {children}
    </motion.li>
  )
}

export default function Credentials() {
  return (
    <section id="credentials" className="px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <GlowBg alt />
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-3">Education & credentials</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Learning <span className="text-[#8b949e]">never stops</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-xl">Formal engineering education plus industry certifications in cloud architecture, UX and software engineering.</p>
        </div>
        <p className="lg:col-span-4 lg:text-right font-mono text-sm text-slate-400">{education.length} diplomas · {certifications.length} certifications</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* education */}
        <div>
          <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold mb-5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#58a6ff]/15 text-[#58a6ff] border border-[#58a6ff]/40"><GraduationCap size={18} /></span>
            Education
          </h3>
          <ol className="space-y-4">
            {education.map((e, i) => {
              const c = edColor(e.org)
              return (
                <Card key={e.title} color={c} i={i}>
                  <div className="flex items-center gap-4">
                    <span className="grid place-items-center w-14 h-14 rounded-xl shrink-0 font-display font-bold" style={{ background: `${c}22`, color: c, border: `1px solid ${c}55` }}>
                      {edShort(e.org)}
                    </span>
                    <div className="min-w-0 grow">
                      <h4 className="font-display text-lg font-semibold leading-snug">{e.title}</h4>
                      <p className="text-sm text-slate-300 mt-0.5">{e.org}</p>
                    </div>
                    {e.period && (
                      <span className="shrink-0 self-start font-mono text-xs rounded-full border px-2.5 py-1" style={{ color: c, borderColor: `${c}55`, background: `${c}14` }}>{e.period}</span>
                    )}
                  </div>
                </Card>
              )
            })}
          </ol>
        </div>

        {/* certifications */}
        <div>
          <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold mb-5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/40"><Award size={18} /></span>
            Certifications
          </h3>
          <ol className="space-y-4">
            {certifications.map((cert, i) => {
              const m = ISSUER[cert.org] ?? { color: '#8b949e', short: cert.org.slice(0, 3).toUpperCase() }
              return (
                <Card key={cert.title} color={m.color} i={i}>
                  <div className="flex items-center gap-4">
                    <span className="grid place-items-center w-14 h-14 rounded-xl shrink-0 font-display font-bold text-sm" style={{ background: `${m.color}22`, color: m.color, border: `1px solid ${m.color}55` }}>
                      {m.short}
                    </span>
                    <div className="min-w-0 grow">
                      <h4 className="font-display text-lg font-semibold leading-snug">{cert.title}</h4>
                      <p className="text-sm text-slate-300 mt-0.5">Issued by {cert.org}</p>
                    </div>
                    <Award size={22} className="shrink-0 self-start opacity-70" style={{ color: m.color }} />
                  </div>
                </Card>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
