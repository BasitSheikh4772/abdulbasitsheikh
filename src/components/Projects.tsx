import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Globe, Image as ImageIcon, X } from 'lucide-react'
import { projects, type Project } from '../data'

const snapshot = (p: Project) => `/projects/${p.id}.webp`
const host = (url: string) => new URL(url).host.replace(/^www\./, '')

type Kind = 'Store' | 'Feature' | 'Landing' | 'Website'
const KIND: Record<string, Kind> = {
  obvi: 'Store', origin: 'Store', yaynuts: 'Store', sweetums: 'Store', chocbox: 'Store', javvy: 'Store', onlybean: 'Landing',
  'yaynuts-bundle': 'Feature', 'sweetums-bundle': 'Feature', gruns: 'Landing', menerals: 'Landing',
  noor: 'Website', idarulehsan: 'Website', scalehouse: 'Website',
}
const KIND_COLOR: Record<Kind, string> = { Store: '#3fb950', Feature: '#a371f7', Landing: '#58a6ff', Website: '#ffa657' }
const KIND_LABEL: Record<Kind, string> = { Store: 'Storefronts', Feature: 'Custom features', Landing: 'Landing pages', Website: 'Websites' }

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const kind = KIND[p.id] ?? 'Website'
  const c = KIND_COLOR[kind]
  const frame = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  // on hover the poster glides down through the full-page snapshot, like scrolling the real site
  const scroll = () => {
    const f = frame.current
    const im = img.current
    if (!f || !im) return
    const shift = Math.max(0, im.getBoundingClientRect().height - f.getBoundingClientRect().height)
    im.style.transition = `transform ${Math.min(14, Math.max(3, shift / 220))}s cubic-bezier(.4,0,.2,1)`
    im.style.transform = `translateY(-${shift}px)`
  }
  const reset = () => {
    const im = img.current
    if (!im) return
    im.style.transition = 'transform .7s ease'
    im.style.transform = 'translateY(0)'
  }

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={scroll}
      onMouseLeave={reset}
      onFocus={scroll}
      onBlur={reset}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-line text-left transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-accent"
      style={{ background: `radial-gradient(520px circle at 100% 0%, ${c}18, transparent 60%), #161b22` }}
    >
      <span className="absolute inset-x-0 top-0 z-10 h-[3px]" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
      <span className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${c}88, 0 22px 60px -22px ${c}99` }} />

      {/* browser frame */}
      <div className="p-3 pb-0">
        <div className="overflow-hidden rounded-lg border border-line bg-[#0d1117]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-line bg-[#161b22]">
            <span className="flex gap-1.5">
              <i className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <i className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <i className="w-2 h-2 rounded-full bg-[#28c840]" />
            </span>
            <span className="grow truncate rounded bg-black/30 px-2.5 py-0.5 text-[.65rem] text-slate-400">{host(p.url)}</span>
            {p.frameable && (
              <span className="inline-flex items-center gap-1 text-[.6rem] font-semibold uppercase tracking-wider text-gh-green">
                <span className="w-1.5 h-1.5 rounded-full bg-gh-green" /> Live
              </span>
            )}
          </div>
          <div ref={frame} className="relative aspect-[16/10] overflow-hidden bg-white">
            <img
              ref={img}
              src={snapshot(p)}
              alt={`${p.name} website preview`}
              loading="lazy"
              draggable={false}
              className="absolute left-0 top-0 w-full h-auto will-change-transform"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/90 border border-line px-3 py-1 text-xs font-medium opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
              <Globe size={12} /> Open preview
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 grow">
        <span className="inline-flex w-fit items-center gap-2 text-[.65rem] font-bold uppercase tracking-wider rounded-full px-2.5 py-1" style={{ background: `${c}1f`, color: c }}>
          <i className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          {p.category}
        </span>
        <h3 className="font-display text-xl font-semibold leading-snug flex items-center gap-2">
          {p.name}
          <ArrowUpRight size={16} className="shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" style={{ color: c }} />
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[.7rem] px-2.5 py-1 rounded-md border border-line bg-black/20 text-slate-300">{t}</span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

function Preview({ p, onClose }: { p: Project; onClose: () => void }) {
  const [mode, setMode] = useState<'live' | 'snapshot'>('snapshot')
  const [framed, setFramed] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} preview`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="w-full max-w-6xl h-full max-h-[92vh] rounded-lg overflow-hidden border border-line bg-panel flex flex-col lg:flex-row"
      >
        <div className="flex flex-col grow min-h-0 min-w-0">
          {/* browser chrome */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-line bg-ink/60">
            <div className="hidden sm:flex gap-1.5">
              <i className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <i className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <i className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="grow truncate text-xs text-slate-400 bg-panel border border-line rounded-full px-4 py-1.5">{p.url}</div>
            <div className="flex rounded-full border border-line p-0.5 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setMode('snapshot')}
                className={`px-3 py-1 rounded-full inline-flex items-center gap-1 ${mode === 'snapshot' ? 'bg-accent text-ink font-medium' : 'text-slate-300'}`}
              >
                <ImageIcon size={12} /> Snapshot
              </button>
              <button
                type="button"
                disabled={!p.frameable}
                onClick={() => setMode('live')}
                title={p.frameable ? 'Load the live site' : 'This site blocks embedding — use "Visit live site"'}
                className={`px-3 py-1 rounded-full inline-flex items-center gap-1 disabled:opacity-35 disabled:cursor-not-allowed ${mode === 'live' ? 'bg-accent text-ink font-medium' : 'text-slate-300'}`}
              >
                <Globe size={12} /> Live
              </button>
            </div>
          </div>

          <div className="grow min-h-0 bg-white relative">
            {mode === 'live' && p.frameable ? (
              <>
                {!framed && <div className="absolute inset-0 grid place-items-center bg-ink text-slate-400 text-sm">Loading live site…</div>}
                <iframe
                  src={p.url}
                  title={`${p.name} live site`}
                  onLoad={() => setFramed(true)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="w-full h-full border-0"
                />
              </>
            ) : (
              <div className="w-full h-full overflow-y-auto overscroll-contain">
                <img src={snapshot(p)} alt={`${p.name} full-page snapshot`} className="w-full block" />
              </div>
            )}
          </div>
        </div>

        <aside className="lg:w-80 shrink-0 p-6 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-line overflow-y-auto">
          <button type="button" onClick={onClose} aria-label="Close preview" className="self-end -mt-2 -mr-2 p-2 rounded-full hover:bg-line transition-colors">
            <X size={18} />
          </button>
          <div className="-mt-6">
            <p className="eyebrow !text-[.62rem] mb-2">{p.category}</p>
            <h3 className="font-display text-2xl font-semibold leading-tight">{p.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{host(p.url)}</p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="text-[.7rem] px-2.5 py-1 rounded-full border border-line text-slate-300">{t}</span>
            ))}
          </div>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 btn-primary"
          >
            Visit live site <ArrowUpRight size={16} />
          </a>
          {!p.frameable && <p className="text-[.7rem] text-slate-400">This site blocks embedding in other pages, so the preview is a scrollable full-page snapshot.</p>}
        </aside>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [filter, setFilter] = useState<Kind | 'All'>('All')
  const kinds: (Kind | 'All')[] = ['All', 'Store', 'Feature', 'Landing', 'Website']
  const list = projects.filter((p) => filter === 'All' || KIND[p.id] === filter)
  const count = (k: Kind | 'All') => (k === 'All' ? projects.length : projects.filter((p) => KIND[p.id] === k).length)

  return (
    <section id="projects" className="relative px-5 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-10">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">Live projects <span className="text-[#8b949e]">showcase</span></h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl">Real stores and sites shipped for clients. Hover a card to scroll through the page, open it for a full preview, or jump straight to the live site.</p>
        </div>
        <p className="lg:col-span-4 lg:text-right font-mono text-sm text-slate-400">{list.length} of {projects.length} projects</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            aria-pressed={filter === k}
            className={`inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
              filter === k ? 'bg-white/10 border-slate-400 text-white' : 'border-line text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {k !== 'All' && <i className="w-2.5 h-2.5 rounded-sm" style={{ background: KIND_COLOR[k] }} />}
            {k === 'All' ? 'All projects' : KIND_LABEL[k]}
            <span className="font-mono text-xs text-slate-400">{count(k)}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
        ))}
      </div>
      {createPortal(<AnimatePresence>{open && <Preview p={open} onClose={() => setOpen(null)} />}</AnimatePresence>, document.body)}
    </section>
  )
}
