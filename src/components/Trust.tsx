import { ArrowUpRight, MapPin, Clock } from 'lucide-react'
import { profile } from '../data'

const photos = import.meta.glob('/src/assets/profile.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const photo = Object.values(photos)[0]

const BRANDS = ['Obvi', 'Yaynuts', 'Sweetums', 'The Only Bean', 'Chocbox LA', 'Javvy Coffee', 'Grüns', 'Menerals', 'Noor Food Manufacturing', 'Idarul Ehsan', 'ScaleHouse']

/** Factual social proof: brands whose sites are shown in the Work section. */
export function BrandsStrip() {
  return (
    <section aria-label="Brands I have built for" className="border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-12">
        <p className="eyebrow mb-6">Brands I've built for</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {BRANDS.map((b) => (
            <li key={b}>
              <a href="#projects" className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#8b949e] hover:text-white transition-colors">
                {b}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Portrait card: shows /src/assets/profile.(jpg|png|webp) when present, otherwise a monogram. */
export function Portrait() {
  return (
    <aside className="rounded-xl border border-line overflow-hidden bg-[#161b22]" style={{ background: 'radial-gradient(420px circle at 0% 0%, rgba(137,87,229,.22), transparent 60%), radial-gradient(380px circle at 100% 100%, rgba(88,166,255,.16), transparent 60%), #161b22' }}>
      <div className="relative aspect-[4/5] grid place-items-center">
        {photo ? (
          <img src={photo} alt={`Portrait of ${profile.name}`} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <span className="grid place-items-center w-36 h-36 rounded-3xl text-5xl font-bold text-white bg-gradient-to-br from-[#58a6ff] via-[#8957e5] to-[#f778ba] shadow-[0_0_60px_-10px_#8957e5]">AB</span>
        )}
      </div>
      <div className="p-5 border-t border-line">
        <p className="font-display text-lg font-semibold">{profile.name}</p>
        <p className="text-sm text-slate-400">Senior Full Stack & AI Engineer</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li className="flex items-center gap-2"><MapPin size={15} className="text-accent" /> {profile.location}</li>
          <li className="flex items-center gap-2"><Clock size={15} className="text-accent" /> Gulf Standard Time (UTC+4)</li>
        </ul>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          Read recommendations on LinkedIn <ArrowUpRight size={14} />
        </a>
      </div>
    </aside>
  )
}
