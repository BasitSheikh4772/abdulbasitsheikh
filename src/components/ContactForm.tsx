import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react'
import { profile, services } from '../data'
import { SERVICE_EVENT } from './Services'

// Delivered straight to the inbox via FormSubmit (no backend needed).
// The very first submission triggers a one-time activation email to this address.
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`

type State = 'idle' | 'sending' | 'ok' | 'error' | 'inactive'

const field =
  'w-full rounded-lg bg-ink/60 border border-line px-4 py-3 text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition'

export default function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [service, setService] = useState('')

  // "Get a quote" on a service card pre-selects it here
  useEffect(() => {
    const on = (e: Event) => setService((e as CustomEvent<string>).detail)
    window.addEventListener(SERVICE_EVENT, on)
    return () => window.removeEventListener(SERVICE_EVENT, on)
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('_honey')) return // bot trap
    setState('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })
      const json = await res.json().catch(() => ({}))
      if (json.success === 'false' || json.success === false) {
        // FormSubmit asks the inbox owner to confirm the address once, on the first message
        setState(/activat/i.test(String(json.message)) ? 'inactive' : 'error')
        return
      }
      if (!res.ok) throw new Error('failed')
      setState('ok')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass spot rounded-lg p-6 sm:p-8 text-left grid gap-4" aria-label="Contact form">
      {/* routing metadata */}
      <input type="hidden" name="source" value="myportfolio" />
      <input type="hidden" name="_subject" value="New message from myportfolio" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1.5 text-xs text-slate-400">
          Name
          <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-1.5 text-xs text-slate-400">
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-xs text-slate-400">
        What do you need?
        <select name="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
          <option value="">Select a service (optional)</option>
          {services.map((x) => (
            <option key={x.id} value={x.title}>{x.title}</option>
          ))}
          <option value="Something else">Something else</option>
          {service && !services.some((x) => x.title === service) && service !== 'Something else' && <option value={service}>{service}</option>}
        </select>
      </label>
      <label className="grid gap-1.5 text-xs text-slate-400">
        Message
        <textarea required name="message" rows={5} placeholder="Tell me about your project, goals and timeline…" className={`${field} resize-y`} />
      </label>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-primary w-full"
      >
        {state === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs text-slate-400">Your details are used only to reply to your enquiry. No spam, ever.</p>

      <div role="status" aria-live="polite" className="text-sm min-h-5">
        {state === 'ok' && (
          <p className="text-accent inline-flex items-center gap-2"><CheckCircle2 size={16} /> Thanks! Your message is on its way.</p>
        )}
        {state === 'inactive' && (
          <p className="text-amber-400 inline-flex items-start gap-2">
            <TriangleAlert size={16} className="mt-0.5 shrink-0" /> Form is waiting for its one-time email activation. Please message me on WhatsApp or email in the meantime.
          </p>
        )}
        {state === 'error' && (
          <p className="text-amber-400 inline-flex items-center gap-2">
            <TriangleAlert size={16} /> Couldn't send. Please email me at {profile.email}.
          </p>
        )}
      </div>
    </form>
  )
}
