import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { profile } from '../data'
import { WhatsAppIcon } from './WhatsAppIcon'

const link = (text: string) => `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`



export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  function send(e: FormEvent) {
    e.preventDefault()
    window.open(link(msg.trim() || 'Hi Abdul, I found your portfolio and would like to talk.'), '_blank', 'noopener,noreferrer')
    setMsg('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-[45] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="w-[min(92vw,22rem)] rounded-lg overflow-hidden border border-line shadow-2xl shadow-black/50 bg-panel"
            role="dialog"
            aria-label="Chat on WhatsApp"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-[#075e54] text-white">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-white/15 font-display font-bold">AB</span>
              <div className="grow leading-tight">
                <p className="font-semibold text-sm">Abdul Basit</p>
                <p className="text-xs text-white/75">Chat on WhatsApp</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="p-1.5 rounded-full hover:bg-white/15">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 bg-[#0b141a] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.04),transparent_60%)]">
              <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-[#202c33] px-3.5 py-2.5 text-sm text-slate-100">
                Hi 👋 How can I help you? Send me a message and I'll reply on WhatsApp.
              </div>
            </div>
            <form onSubmit={send} className="flex items-center gap-2 p-3 border-t border-line bg-panel">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message…"
                aria-label="Your message"
                className="grow rounded-full bg-ink/70 border border-line px-4 py-2.5 text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#25d366]"
              />
              <button type="submit" aria-label="Send on WhatsApp" className="grid place-items-center w-10 h-10 rounded-full bg-[#25d366] text-[#04210f] hover:brightness-110 transition">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        aria-expanded={open}
        className="relative grid place-items-center w-14 h-14 rounded-full bg-[#25d366] text-white shadow-lg shadow-[#25d366]/30 hover:scale-105 transition-transform"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />}
        <span className="relative">{open ? <X size={26} /> : <WhatsAppIcon />}</span>
      </button>
    </div>
  )
}
