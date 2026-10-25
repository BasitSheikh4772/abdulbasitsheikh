import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import AIMascotFlat from './AIMascotFlat'

type Look = { x: number; y: number } // -1..1 pointer offset from the mascot centre

const PURPLE = '#8b5cf6'
const CYAN = '#38e1ff'

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.35, 'rgba(255,255,255,.4)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

/** The 3D mascot: glossy purple shell, glass visor with a cyan rim, ear pods and glowing eyes. */
function Mascot({ look }: { look: React.MutableRefObject<Look> }) {
  const root = useRef<THREE.Group>(null)
  const eyes = useRef<THREE.Group>(null)
  const shadow = useRef<THREE.Sprite>(null)
  const blinkAt = useRef(2.2)
  const glow = useMemo(() => glowTexture(), [])

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    const g = root.current
    const e = eyes.current
    if (!g || !e) return
    const { x, y } = look.current
    // head turns and tilts toward the cursor, eyes slide a little further so it feels alive
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.6, 5, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, y * 0.38, 5, dt)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -x * 0.05, 5, dt)
    const bob = Math.sin(t * 1.3)
    g.position.y = bob * 0.09 + 0.08
    e.position.x = THREE.MathUtils.damp(e.position.x, x * 0.14, 9, dt)
    e.position.y = THREE.MathUtils.damp(e.position.y, -y * 0.08, 9, dt)

    // blink every few seconds
    if (t > blinkAt.current) {
      const k = (t - blinkAt.current) / 0.16
      e.scale.y = k < 1 ? 1 - Math.sin(k * Math.PI) * 0.92 : 1
      if (k >= 1) blinkAt.current = t + 2.4 + Math.random() * 3
    } else {
      e.scale.y = 1
    }

    if (shadow.current) {
      const s = 1 - bob * 0.06
      shadow.current.scale.set(2.7 * s, 0.46 * s, 1)
      ;(shadow.current.material as THREE.SpriteMaterial).opacity = 0.5 - bob * 0.06
    }
  })

  const shell = { color: PURPLE, roughness: 0.26, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.1 } as const

  return (
    <>
      <sprite ref={shadow} position={[0, -1.5, 0]}>
        <spriteMaterial map={glow} color="#7c4dff" transparent depthWrite={false} />
      </sprite>

      <group ref={root}>
        {/* head shell */}
        <RoundedBox args={[2.1, 1.7, 1.55]} radius={0.62} smoothness={8}>
          <meshPhysicalMaterial {...shell} />
        </RoundedBox>

        {/* ear pods */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 1.22, -0.02, 0]} rotation={[0, 0, s * -0.04]}>
            <mesh scale={[0.78, 1, 1.05]}>
              <capsuleGeometry args={[0.24, 0.5, 10, 24]} />
              <meshPhysicalMaterial color="#a98bff" roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} />
            </mesh>
            <mesh position={[s * 0.08, 0, 0.2]} scale={[0.5, 1, 1]}>
              <capsuleGeometry args={[0.08, 0.34, 6, 14]} />
              <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.55} />
            </mesh>
          </group>
        ))}

        {/* visor: cyan rim behind, glossy dark glass in front */}
        <RoundedBox args={[1.74, 1.08, 0.3]} radius={0.5} smoothness={8} position={[0, -0.02, 0.69]}>
          <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.4} />
        </RoundedBox>
        <RoundedBox args={[1.66, 1.0, 0.34]} radius={0.46} smoothness={8} position={[0, -0.02, 0.72]}>
          <meshPhysicalMaterial color="#070a18" roughness={0.08} metalness={0.35} clearcoat={1} clearcoatRoughness={0.04} />
        </RoundedBox>

        {/* eyes */}
        <group ref={eyes} position={[0, -0.02, 0.93]}>
          {[-0.36, 0.36].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh>
                <capsuleGeometry args={[0.105, 0.3, 10, 20]} />
                <meshBasicMaterial color="#7df0ff" toneMapped={false} />
              </mesh>
              <sprite scale={[0.85, 0.95, 1]} position={[0, 0, -0.04]}>
                <spriteMaterial map={glow} color={CYAN} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
              </sprite>
            </group>
          ))}
        </group>
      </group>

      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} />
      <directionalLight position={[-4, -1, 3]} intensity={0.9} color="#8aa8ff" />
      <pointLight position={[0, 0, 3.2]} intensity={6} distance={6} color={CYAN} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 3]} scale={[9, 3, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#8aa8ff" position={[-5, 1, 2]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#d291ff" position={[5, -1, 2]} scale={[3, 6, 1]} />
      </Environment>
    </>
  )
}

/** Real-time 3D AI mascot. Follows the cursor, blinks, floats, and pauses itself when off screen. */
export default function AIMascot({ className = '' }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const look = useRef<Look>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [webgl] = useState(hasWebGL)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect()
      if (!r) return
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(320, window.innerWidth * 0.35)
      const dy = (e.clientY - (r.top + r.height / 2)) / Math.max(260, window.innerHeight * 0.35)
      look.current = { x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) }
    }
    const onLeave = () => (look.current = { x: 0, y: 0 })
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { rootMargin: '120px' })
    if (box.current) io.observe(box.current)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      io.disconnect()
    }
  }, [])

  if (!webgl) return <AIMascotFlat className={className} />

  return (
    <div ref={box} className={`${className} aspect-[260/220]`} aria-hidden>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 6.1], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, -0.1, 0)}
      >
        <Mascot look={look} />
      </Canvas>
    </div>
  )
}
