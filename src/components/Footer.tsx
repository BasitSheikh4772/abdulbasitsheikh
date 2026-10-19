import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUp, ExternalLink, Mail, MapPin } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

type Props = { name: string; email: string; whatsapp: string; linkedin: string; links: string[][] }

const services = ['Shopify stores', 'WordPress & WooCommerce', 'Plugins & licensing', 'Custom web apps', 'AI chatbots', 'Cloud & DevOps']

function DubaiClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai', hour12: false })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono">{t || '--:--'} GST</span>
}

export default function Footer({ name, email, whatsapp, linkedin, links }: Props) {
  const social = [
    { label: 'Email', href: `mailto:${email}`, icon: <Mail size={18} /> },
    { label: 'WhatsApp', href: `https://wa.me/${whatsapp}`, icon: <WhatsAppIcon size={18} /> },
    { label: 'LinkedIn', href: linkedin, icon: <ExternalLink size={18} /> },
  ]
  return (
    <footer className="relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl text-sm font-bold text-white bg-gradient-to-br from-[#58a6ff] via-[#8957e5] to-[#f778ba] shadow-[0_0_24px_-4px_#8957e5]">AB</span>
              <span className="leading-tight">
                <span className="block font-semibold text-white text-lg">{name}</span>
                <span className="block text-xs text-slate-400">Full stack & AI engineer</span>
              </span>
            </a>
            <p className="mt-5 text-slate-400 leading-relaxed max-w-sm">Stores, apps and AI automations for growing brands, built end to end by one senior engineer.</p>

            <div className="mt-6 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-11 h-11 rounded-xl border border-line bg-[#161b22] text-slate-300 hover:text-white hover:border-slate-500 hover:-translate-y-0.5 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <a href="#contact" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              Start a project <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-[1fr_1fr_1.5fr] gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2.5 text-[#8b949e]">
                {services.map((x) => (
                  <li key={x}><a href="#services" className="hover:text-white transition-colors">{x}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Explore</h3>
              <ul className="space-y-2.5 text-[#8b949e]">
                {links.map(([l, h]) => (
                  <li key={h}><a href={h} className="hover:text-white transition-colors">{l}</a></li>
                ))}
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2.5 text-[#8b949e]">
                <li><a href={`mailto:${email}`} className="hover:text-white transition-colors break-words">{email}</a></li>
                <li><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp chat</a></li>
                <li className="flex items-center gap-2 pt-1"><MapPin size={14} /> UAE · Pakistan</li>
                <li className="text-xs">Local time: <DubaiClock /></li>
              </ul>
            </div>
          </div>
        </div>

        {/* oversized wordmark */}
        <div aria-hidden className="mt-16 select-none text-center font-display font-bold tracking-tighter leading-none text-[clamp(3.5rem,13vw,11rem)] bg-gradient-to-b from-white/[.14] to-transparent bg-clip-text text-transparent">
          ABDUL BASIT
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8b949e]">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-[#161b22] px-3 py-1.5 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
