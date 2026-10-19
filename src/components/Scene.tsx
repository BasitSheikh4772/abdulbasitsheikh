import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Globe from './Globe'
import * as THREE from 'three'

function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      // keep every star behind the globe: points near the camera blow up into big squares
      arr[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 3
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.02
    ref.current.rotation.x = window.scrollY * 0.0002
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.13} color="#9fb4ff" sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  )
}

export default function Scene() {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const small = typeof window !== 'undefined' && window.innerWidth < 800

  // the globe belongs to the hero: fade it out as the page scrolls, and stop rendering once it is off screen
  useEffect(() => {
    const onScroll = () => {
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.75))
      if (wrap.current) wrap.current.style.opacity = String(fade * (window.innerWidth < 800 ? 0.7 : 1))
      setVisible(fade > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={wrap} className="scene-in fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, small ? 1.25 : 1.5]} camera={{ position: [0, 0, 20.6], fov: 18 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[-4, 4, 6]} intensity={1.6} color="#ffffff" />
        <Globe />
        <Particles count={small ? 600 : 1400} />
      </Canvas>
    </div>
  )
}
