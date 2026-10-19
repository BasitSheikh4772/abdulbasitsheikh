import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

type Props = { links: string[][]; active: string; whatsapp: string }

/** Floating glass header: sliding hover pill, active marker, availability chip, mobile menu. */
export default function Header({ links, active, whatsapp }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const lit = hover ?? active

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3">
      <div
        className={`glass-nav mx-auto max-w-6xl rounded-2xl flex items-center gap-3 pl-3 pr-2.5 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}
        style={{ background: scrolled ? 'rgba(13,17,23,.82)' : 'rgba(22,27,34,.45)' }}
      >
        {/* brand */}
        <a href="#top" className="flex items-center gap-3 shrink-0 group" aria-label="Abdul Basit, home">
          <span className="relative grid place-items-center w-9 h-9 rounded-xl text-[.8rem] font-bold text-white bg-gradient-to-br from-[#58a6ff] via-[#8957e5] to-[#f778ba] shadow-[0_0_20px_-4px_#8957e5] group-hover:scale-105 transition-transform">
            AB
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block font-semibold text-white">Abdul Basit</span>
            <span className="block text-[.68rem] text-slate-400">Full stack & AI engineer</span>
          </span>
        </a>

        {/* nav */}
        <nav className="hidden md:flex items-center mx-auto gap-0.5" aria-label="Primary" onMouseLeave={() => setHover(null)}>
          {links.map(([label, href]) => {
            const id = href.slice(1)
            return (
              <a
                key={href}
                href={href}
                onMouseEnter={() => setHover(id)}
                onFocus={() => setHover(id)}
                onBlur={() => setHover(null)}
                className={`relative px-4 py-2 text-sm rounded-xl transition-colors ${lit === id ? 'text-white' : 'text-slate-300'}`}
              >
                {lit === id && (
                  <motion.span layoutId="nav-lit" className="absolute inset-0 rounded-xl bg-white/[.09] ring-1 ring-white/10" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                )}
                <span className="relative">{label}</span>
              </a>
            )
          })}
        </nav>

        {/* actions */}
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid place-items-center w-10 h-10 rounded-xl border border-line text-[#25d366] bg-black/20 hover:bg-[#25d366]/10 hover:border-[#25d366]/50 transition-colors"
          >
            <WhatsAppIcon size={18} />
          </a>
          <a
            href="#contact"
            className="group/cta relative inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold text-white bg-[#238636] border border-white/10 hover:bg-[#2ea043] transition-colors shadow-[0_0_24px_-6px_#3fb950]"
          >
            Hire me
            <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden grid place-items-center w-10 h-10 rounded-xl border border-line bg-black/20"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden glass-nav mx-auto max-w-6xl mt-2 rounded-2xl p-2"
            aria-label="Mobile"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl ${active === href.slice(1) ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`}
              >
                {label}
                <ArrowRight size={15} className="text-slate-400" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
