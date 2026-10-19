import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import {
  siCloudflare, siDocker, siFlutter, siGooglecloud, siLaravel, siLangchain, siMysql, siNextdotjs, siNodedotjs,
  siPostgresql, siPython, siReact, siShopify, siTailwindcss, siTypescript, siWordpress,
} from 'simple-icons'

const logos = [
  siShopify, siReact, siNextdotjs, siLaravel, siWordpress, siNodedotjs, siPython, siLangchain,
  siTypescript, siDocker, siFlutter, siTailwindcss, siPostgresql, siMysql, siCloudflare, siGooglecloud,
]

/** Logo strip modelled on github.com's "trusted by" row: muted logos, edge fade, play/pause control. */
export default function TechMarquee() {
  const [paused, setPaused] = useState(false)
  const row = [...logos, ...logos]
  return (
    <div className="relative border-y border-line bg-[#010409]" aria-label="Technologies I work with">
      <div className="overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
        <ul
          className="flex w-max items-center gap-20 animate-[marquee_60s_linear_infinite]"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {row.map((l, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap text-[#8b949e]" aria-hidden={i >= logos.length}>
              <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" role="img" aria-label={l.title}>
                <path d={l.path} />
              </svg>
              <span className="font-semibold text-2xl tracking-tight">{l.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play logo animation' : 'Pause logo animation'}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-[#21262d]/90 border border-line text-slate-200 hover:bg-[#30363d] transition-colors"
      >
        {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      </button>
    </div>
  )
}
