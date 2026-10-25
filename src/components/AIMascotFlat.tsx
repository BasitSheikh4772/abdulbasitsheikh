import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Original AI assistant mascot (purple helmet, dark visor, glowing cyan eyes).
 * The whole head tilts toward the cursor in 3D and the eyes track it.
 */
export default function AIMascotFlat({ className = '' }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const nx = useMotionValue(0) // -1..1 pointer offset from the mascot centre
  const ny = useMotionValue(0)
  const sx = useSpring(nx, { stiffness: 120, damping: 16 })
  const sy = useSpring(ny, { stiffness: 120, damping: 16 })

  const rotateY = useTransform(sx, (v) => v * 22)
  const rotateX = useTransform(sy, (v) => -v * 18)
  const eyeX = useTransform(sx, (v) => v * 9)
  const eyeY = useTransform(sy, (v) => v * 6)
  const shiftX = useTransform(sx, (v) => v * 8)
  const shiftY = useTransform(sy, (v) => v * 6)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect()
      if (!r) return
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(320, window.innerWidth * 0.35)
      const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(260, window.innerHeight * 0.35)
      nx.set(Math.max(-1, Math.min(1, dx)))
      ny.set(Math.max(-1, Math.min(1, dy)))
    }
    const onLeave = () => {
      nx.set(0)
      ny.set(0)
    }
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [nx, ny])

  return (
    <div ref={box} className={className} style={{ perspective: 800 }} aria-hidden>
      <motion.div style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformStyle: 'preserve-3d' }} className="animate-[bob_5s_ease-in-out_infinite]">
        <svg viewBox="0 0 260 220" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="m-head" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c9a8ff" />
              <stop offset=".5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#5b3bd6" />
            </linearGradient>
            <linearGradient id="m-ear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9c2ff" />
              <stop offset="1" stopColor="#7c4ddf" />
            </linearGradient>
            <linearGradient id="m-visor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#141a33" />
              <stop offset="1" stopColor="#070a16" />
            </linearGradient>
            <radialGradient id="m-shine" cx=".3" cy=".15" r=".8">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <filter id="m-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="m-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* ground shadow */}
          <ellipse cx="130" cy="206" rx="72" ry="8" fill="#8b5cf6" opacity=".35" filter="url(#m-soft)" />

          {/* ear pods */}
          <rect x="10" y="84" width="34" height="64" rx="17" fill="url(#m-ear)" />
          <rect x="216" y="84" width="34" height="64" rx="17" fill="url(#m-ear)" />

          {/* head */}
          <rect x="28" y="28" width="204" height="160" rx="70" fill="url(#m-head)" />
          <rect x="28" y="28" width="204" height="160" rx="70" fill="url(#m-shine)" />

          {/* goggle brows */}
          <rect x="52" y="44" width="62" height="26" rx="13" fill="#fff" opacity=".22" />
          <rect x="146" y="44" width="62" height="26" rx="13" fill="#fff" opacity=".22" />

          {/* visor */}
          <rect x="52" y="64" width="156" height="88" rx="44" fill="url(#m-visor)" />
          <rect x="52.5" y="64.5" width="155" height="87" rx="43.5" fill="none" stroke="#7ee7ff" strokeOpacity=".28" />

          {/* eyes */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <rect x="94" y="88" width="20" height="38" rx="10" fill="#2fd8ff" filter="url(#m-glow)" />
            <rect x="146" y="88" width="20" height="38" rx="10" fill="#2fd8ff" filter="url(#m-glow)" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}
