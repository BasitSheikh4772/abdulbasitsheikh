import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDown, Check, ExternalLink, Mail, MapPin } from 'lucide-react'
import { pillars, profile, regions, stats } from './data'
import Header from './components/Header'
import { PixelBg } from './components/PixelBg'
import { WhatsAppIcon } from './components/WhatsAppIcon'
import { globeInput } from './components/globeInput'

const loadScene = () => import('./components/Scene')
// desktop: begin fetching the 3D chunk right away so the globe appears quickly (phones wait, to protect load speed)
if (typeof window !== 'undefined' && window.innerWidth >= 800) void loadScene()
const Scene = lazy(loadScene)
const Projects = lazy(() => import('./components/Projects'))
const Footer = lazy(() => import('./components/Footer'))
const TechMarquee = lazy(() => import('./components/TechMarquee'))
const Portrait = lazy(() => import('./components/Trust').then((m) => ({ default: m.Portrait })))
const ContactForm = lazy(() => import('./components/ContactForm'))
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget'))

/** true one frame after first paint (+ optional delay) so the hero renders before anything else loads */
function useAfterPaint(delay = 0) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let t1 = 0
    let t2 = 0
    const fire = () => setReady(true)
    // normally one frame after first paint; the timer also covers background tabs, where animation frames are paused
    const id = requestAnimationFrame(() => {
      t1 = window.setTimeout(fire, delay)
    })
    t2 = window.setTimeout(fire, delay + 400)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [delay])
  return ready
}

/** true once the page has loaded and the browser is idle (or the visitor starts interacting): the heavy 3D scene waits for this */
function useWhenIdle(timeout = 1800) {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let done = false
    let timer = 0
    const fire = () => {
      if (!done) {
        done = true
        setIdle(true)
      }
    }
    const events = ['pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'] as const
    events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }))
    const go = () => {
      // wait `timeout` ms after load, then run when the browser is idle (requestIdleCallback alone fires almost immediately)
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o: { timeout: number }) => void }).requestIdleCallback
      timer = window.setTimeout(() => (ric ? ric(fire, { timeout: 1000 }) : fire()), timeout)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      events.forEach((e) => window.removeEventListener(e, fire))
      window.removeEventListener('load', go)
      clearTimeout(timer)
    }
  }, [timeout])
  return idle
}
const Experience = lazy(() => import('./components/Experience'))
const Skills = lazy(() => import('./components/Skills'))
const Credentials = lazy(() => import('./components/Credentials'))

/** reserves space while a lazy section loads so the page does not jump */
const Later = ({ h = 600, children }: { h?: number; children: React.ReactNode }) => (
  <Suspense fallback={<div style={{ minHeight: h }} aria-hidden />}>{children}</Suspense>
)

const links = [
  ['Work', '#projects'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

/** Invisible layer over the globe: drag to spin it, hover a lit-up country for details. */
function GlobeDragZone() {
  const last = useRef<{ x: number; y: number; t: number } | null>(null)
  const down = useRef<{ x: number; y: number } | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    globeInput.onHover = (h) => setHover(h ? h.region : null)
    return () => {
      globeInput.onHover = null
      globeInput.pointer = null
    }
  }, [])

  const end = () => {
    globeInput.dragging = false
    last.current = null
  }
  const r = hover === null ? null : regions[hover]

  return (
    <>
      <div
        aria-hidden
        className={`hidden md:block absolute right-0 top-0 h-full w-1/2 select-none ${r ? 'cursor-pointer' : 'cursor-grab'} active:cursor-grabbing`}
        style={{ touchAction: 'pan-y' }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          globeInput.dragging = true
          globeInput.vy = globeInput.vx = 0
          down.current = { x: e.clientX, y: e.clientY }
          last.current = { x: e.clientX, y: e.clientY, t: performance.now() }
        }}
        onPointerMove={(e) => {
          setPos({ x: e.clientX, y: e.clientY })
          const l = last.current
          if (!globeInput.dragging || !l) {
            globeInput.pointer = { x: e.clientX, y: e.clientY }
            return
          }
          const now = performance.now()
          const dt = Math.max(1, now - l.t) / 1000
          const dx = (e.clientX - l.x) * 0.0055
          const dy = (e.clientY - l.y) * 0.0055
          globeInput.rotY += dx
          globeInput.rotX = Math.max(-0.9, Math.min(0.9, globeInput.rotX + dy))
          globeInput.vy = dx / dt
          globeInput.vx = dy / dt
          last.current = { x: e.clientX, y: e.clientY, t: now }
        }}
        onPointerUp={(e) => {
          // a click (not a drag) on a lit-up country jumps to that country's projects
          const d = down.current
          if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6 && hover !== null && regions[hover].projects.length) {
            window.dispatchEvent(new CustomEvent('portfolio:country', { detail: regions[hover].flag }))
            // reuse the page's own in-page link handler so Lenis does the smooth scroll
            document.querySelector<HTMLAnchorElement>('a[href="#projects"]')?.click()
          }
          end()
        }}
        onPointerCancel={end}
        onPointerLeave={() => {
          globeInput.pointer = null
        }}
      />
      {r && !globeInput.dragging && (
        <div
          role="tooltip"
          className="glass-tip fixed z-[60] pointer-events-none w-64 rounded-lg p-4 text-sm"
          style={{ left: Math.min(pos.x + 18, window.innerWidth - 280), top: Math.max(8, Math.min(pos.y + 18, window.innerHeight - 380)) }}
        >
          <div className="flex items-center gap-2 font-display font-semibold text-base">
            <span className="text-[.65rem] font-bold tracking-wider px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">{r.flag}</span> {r.name}
          </div>
          <p className="text-[.7rem] uppercase tracking-widest text-accent mt-1">{r.role}</p>
          {r.projects.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold text-white">{r.projects.length} project{r.projects.length === 1 ? '' : 's'}</p>
              <ul className="mt-1.5 space-y-1 text-slate-300 text-xs">
                {r.projects.slice(0, 8).map((n) => (
                  <li key={n} className="flex items-center gap-2"><i className="w-1 h-1 rounded-full bg-accent shrink-0" />{n}</li>
                ))}
              </ul>
              {r.projects.length > 8 && <p className="text-xs text-slate-400 mt-1.5">+ {r.projects.length - 8} more</p>}
            </>
          )}
          {r.roles.length > 0 && (
            <p className="mt-3 text-[.7rem] leading-relaxed text-slate-400">
              <span className="text-slate-300">Roles:</span> {r.roles.slice(0, 3).join(', ')}{r.roles.length > 3 ? ` +${r.roles.length - 3}` : ''}
            </p>
          )}
          {r.projects.length > 0 && <p className="mt-3 text-[.65rem] uppercase tracking-widest text-accent">Click to see all projects</p>}
        </div>
      )}
    </>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [active, setActive] = useState('')
  const ready = useAfterPaint(120)
  const sceneOn = useWhenIdle(typeof window !== 'undefined' && window.innerWidth < 800 ? 4500 : 150)

  useEffect(() => {
    const ids = links.map(([, h]) => h.slice(1))
    const onScroll = () => {
      const y = window.innerHeight * 0.35
      let cur = ''
      for (const id of ids) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.top <= y && r.bottom > y) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // cards glow where the cursor is
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.spot')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduce ? null : new Lenis({ lerp: 0.09 })
    let raf = 0
    if (lenis) {
      raf = requestAnimationFrame(function loop(t) {
        lenis.raf(t)
        raf = requestAnimationFrame(loop)
      })
    }

    // every in-page link (#about, #projects, #top ...) glides to its section
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute('href')!
      const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash)
      if (target === null) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target, { offset: hash === '#top' ? 0 : -24, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
      else window.scrollTo({ top: target === 0 ? 0 : (target as HTMLElement).offsetTop, behavior: 'smooth' })
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])

  return (
    <>
      <div className="hero-wash" aria-hidden />
      {sceneOn && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      <motion.div style={{ scaleX: progress }} className="fixed top-0 inset-x-0 h-0.5 origin-left bg-gradient-to-r from-accent to-accent2 z-50" />

      <Header links={links} active={active} whatsapp={profile.whatsapp} />

      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">Skip to content</a>
      {ready && (
        <Suspense fallback={null}>
          <WhatsAppWidget />
        </Suspense>
      )}

      <main className="relative z-10" id="top">
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center px-5 sm:px-10 max-w-7xl mx-auto pt-24">
          <GlobeDragZone />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6 inline-flex w-fit items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-slate-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
            Open to new opportunities
          </motion.div>
          <motion.h1
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl"
          >
            Full stack engineer building <span className="grad-text">web, <span className="whitespace-nowrap">e-commerce</span> & AI products.</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300 leading-relaxed">
            I am Abdul Basit Sheikh, a senior full stack and AI engineer with 9+ years of experience across Shopify, WordPress, Laravel, React and cloud infrastructure. Here is a selection of the work I have shipped.
          </p>
          <motion.div initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">View my work</a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
          </motion.div>
          <motion.ul initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {['9+ years experience', '55 live projects', `Clients in ${regions.filter((r) => r.projects.length).length} countries`].map((t) => (
              <li key={t} className="inline-flex items-center gap-2"><Check size={14} className="text-accent" />{t}</li>
            ))}
          </motion.ul>
          <a href="#projects" aria-label="Scroll to my work" className="mt-16 text-slate-400 animate-bounce w-fit"><ArrowDown /></a>
        </section>

        {ready && (
          <Suspense fallback={<div style={{ minHeight: 1200 }} aria-hidden />}>
          <TechMarquee />

          <Projects />

          {/* ABOUT: GitLab-style numbered pillars + stats */}
          <section id="about" className="theme-light px-5 sm:px-10 py-28 max-w-7xl mx-auto">
            <PixelBg />
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-14">
              <div className="lg:col-span-4 order-2 lg:order-1 max-w-sm lg:max-w-none"><Portrait /></div>
              <div className="lg:col-span-8 order-1 lg:order-2">
                <p className="eyebrow mb-3">About me</p>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl mb-6">Engineer, team lead, <span className="text-[#8b949e]">problem solver.</span></h2>
                <p className="text-lg text-slate-400 leading-relaxed mb-6">{profile.summary}</p>
                <p className="text-slate-400 leading-relaxed">
                  Beyond day-to-day delivery I enjoy leading teams, tuning performance and exploring AI-assisted workflows that make software faster to build and easier to maintain.
                </p>
              </div>
            </div>
            <ol className="grid gap-px md:grid-cols-3 bg-[#30363d] border border-[#30363d] mb-14">
              {pillars.map((p) => (
                <li key={p.n} className="bg-[#161b22] p-8">
                  <span className="font-mono text-sm text-slate-400">{p.n}</span>
                  <h3 className="font-display text-xl font-semibold mt-6 mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
                </li>
              ))}
            </ol>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-t border-[#30363d] pt-10">
              {stats.map((st) => (
                <div key={st.label} className="pr-6">
                  <dt className="font-display text-6xl sm:text-7xl font-semibold tracking-tight text-white">{st.value}</dt>
                  <dd className="text-sm text-slate-400 mt-3 max-w-[14rem]">{st.label}</dd>
                </div>
              ))}
            </dl>
          </section>

          <Later h={700}><Skills /></Later>

          <Later h={900}><Experience /></Later>

          <Later h={500}><Credentials /></Later>

          {/* CONTACT */}
          <section id="contact" className="theme-light px-5 sm:px-10 py-28 max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">
            <PixelBg />
            <div className="lg:col-span-2">
              <p className="eyebrow mb-3">Contact</p>
              <h2 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-6 leading-tight">Let's <span className="text-[#8b949e]">connect</span></h2>
              <p className="text-slate-400 mb-8">Open to new opportunities, collaborations and conversations about interesting projects. Send me a message and I will reply by email, or reach me on WhatsApp.</p>
              <div className="grid gap-3 text-sm">
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-slate-300 hover:text-accent transition-colors"><Mail size={16} /> {profile.email}</a>
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-slate-300 hover:text-[#25d366] transition-colors"><WhatsAppIcon size={16} /> Chat on WhatsApp (Dubai)</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-slate-300 hover:text-accent transition-colors"><ExternalLink size={16} /> LinkedIn profile</a>
                <span className="inline-flex items-center gap-3 text-slate-400"><MapPin size={16} /> {profile.location}</span>
              </div>
            </div>
            <div className="lg:col-span-3"><ContactForm /></div>
          </section>

          <Footer name={profile.name} email={profile.email} whatsapp={profile.whatsapp} linkedin={profile.linkedin} links={links} />
          </Suspense>
        )}
      </main>
    </>
  )
}
