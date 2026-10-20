import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import land from 'world-atlas/land-110m.json'
import countries from 'world-atlas/countries-110m.json'
import { globeInput } from './globeInput'
import { regions } from '../data'

const R = 1.6
const W = 1024
const H = 512
const BASE_ROT = -2.1
const HOME: [number, number] = [24.86, 67.0] // Karachi

const ll = (lat: number, lon: number, r = R) => {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}
/** inverse of ll() for a point on the sphere (local space) */
const toLatLon = (v: THREE.Vector3): [number, number] => {
  const lat = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(v.y / v.length(), -1, 1)))
  let lon = THREE.MathUtils.radToDeg(Math.atan2(v.z, -v.x)) - 180
  lon = ((lon + 540) % 360) - 180
  return [lat, lon]
}
const px = (lon: number, lat: number): [number, number] => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]

function fillGeometry(ctx: CanvasRenderingContext2D, g: GeoJSON.Geometry) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []
  for (const poly of polys) {
    ctx.beginPath()
    for (const ring of poly) {
      ring.forEach(([lon, lat], i) => {
        const [x, y] = px(lon, lat)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
    }
    ctx.fill('evenodd')
  }
}

const newCtx = () => {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  return c.getContext('2d', { willReadFrequently: true })!
}

/** Rasterises land + the active countries, then samples an even Fibonacci lattice
 *  of the sphere against the masks. Returns dot positions split per region. */
function buildWorld(count: number) {
  const landCtx = newCtx()
  landCtx.fillStyle = '#fff'
  const lt = land as unknown as Topology
  const lf = feature(lt, lt.objects.land as never) as unknown as GeoJSON.Feature | GeoJSON.FeatureCollection
  ;('features' in lf ? lf.features.map((f) => f.geometry) : [lf.geometry]).forEach((g) => fillGeometry(landCtx, g))

  // country mask: red channel = (region index + 1) * 50
  const maskCtx = newCtx()
  const ct = countries as unknown as Topology
  const cf = feature(ct, ct.objects.countries as never) as unknown as GeoJSON.FeatureCollection
  for (const f of cf.features) {
    const idx = regions.findIndex((r) => r.id === Number(f.id))
    if (idx < 0) continue
    maskCtx.fillStyle = `rgb(${(idx + 1) * 50},0,0)`
    fillGeometry(maskCtx, f.geometry)
  }
  const landData = landCtx.getImageData(0, 0, W, H).data
  const maskData = maskCtx.getImageData(0, 0, W, H).data
  const at = (lon: number, lat: number) => {
    const [x, y] = px(lon, lat)
    return (Math.min(H - 1, Math.max(0, Math.floor(y))) * W + Math.min(W - 1, Math.max(0, Math.floor(x)))) * 4
  }

  const base: number[] = []
  const perRegion: number[][] = regions.map(() => [])
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = golden * i
    const lat = THREE.MathUtils.radToDeg(Math.asin(y))
    let lon = THREE.MathUtils.radToDeg(Math.atan2(rad * Math.sin(th), -(rad * Math.cos(th))))
    lon = ((lon + 540) % 360) - 180
    const o = at(lon, lat)
    if (landData[o + 3] <= 128) continue
    const v = ll(lat, lon, R * 1.002)
    const region = maskData[o + 3] > 128 ? Math.round(maskData[o] / 50) - 1 : -1
    ;(region >= 0 ? perRegion[region] : base).push(v.x, v.y, v.z)
  }
  const regionAt = (lat: number, lon: number) => {
    const o = at(lon, lat)
    return maskData[o + 3] > 128 ? Math.round(maskData[o] / 50) - 1 : -1
  }
  return { base: new Float32Array(base), perRegion: perRegion.map((a) => new Float32Array(a)), regionAt }
}

function dotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  g.beginPath()
  g.arc(32, 32, 28, 0, Math.PI * 2)
  g.fillStyle = '#fff'
  g.fill()
  return new THREE.CanvasTexture(c)
}

function Arc({ a, b, delay, color }: { a: THREE.Vector3; b: THREE.Vector3; delay: number; color: string }) {
  const { curve, tube } = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    mid.normalize().multiplyScalar(R * (1 + a.distanceTo(b) * 0.2))
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 90, 0.0045, 6, false), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 }))
    return { curve, tube }
  }, [a, b, color])
  const head = useRef<THREE.Mesh>(null)
  const tail = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime + delay) % 3.4) / 3.4
    head.current?.position.copy(curve.getPoint(t))
    tail.current?.position.copy(curve.getPoint(Math.max(0, t - 0.035)))
  })
  return (
    <group>
      <primitive object={tube} />
      <mesh ref={head}>
        <sphereGeometry args={[0.026, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={tail}>
        <sphereGeometry args={[0.017, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Marker({ pos, color }: { pos: THREE.Vector3; color: string }) {
  const ring = useRef<THREE.Mesh>(null)
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos])
  useFrame(({ clock }) => {
    if (!ring.current) return
    const k = (clock.elapsedTime * 0.7) % 1
    ring.current.scale.setScalar(1 + k * 3.2)
    ;(ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.75
  })
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[0.038, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.062, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

const oceanShader = {
  vertex: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main(){
      vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragment: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main(){
      vec3 n = normalize(vN);
      vec3 L = normalize(vec3(-0.55, 0.65, 0.75));
      float lit = clamp(dot(n, L) * 0.5 + 0.5, 0.0, 1.0);
      vec3 shadow = vec3(0.03, 0.07, 0.22);    // #081238
      vec3 light  = vec3(0.13, 0.33, 0.78);    // #2154c7
      vec3 col = mix(shadow, light, pow(lit, 1.35));
      // gentle brightening toward the limb on the lit side only (no outer halo)
      float rim = pow(1.0 - max(dot(n, normalize(vV)), 0.0), 3.0) * lit * 0.35;
      col += vec3(0.35, 0.55, 1.0) * rim;
      gl_FragColor = vec4(col, 1.0);
    }`,
}

const ACTIVE = '#3fb950'
const ACTIVE_HOT = '#aff5b4'

export default function Globe() {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const body = useRef<THREE.Mesh>(null)
  const regionPts = useRef<(THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null)[]>([])
  const hovered = useRef(-1)
  const world = useMemo(() => buildWorld(52000), [])
  const tex = useMemo(() => dotTexture(), [])
  const home = useMemo(() => ll(HOME[0], HOME[1]), [])
  const centers = useMemo(() => regions.map((r) => ll(r.center[0], r.center[1])), [])
  const ray = useMemo(() => new THREE.Raycaster(), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])

  useFrame((state, dt) => {
    const g = group.current
    const s = spin.current
    if (!g || !s) return
    const sy = window.scrollY / Math.max(1, window.innerHeight)
    const wide = state.size.width > 800
    const halfH = Math.tan(THREE.MathUtils.degToRad(9)) * 20.6
    const halfW = halfH * (state.size.width / state.size.height)
    // desktop: globe sits to the right of the hero text. mobile: only the top cap rises from the bottom edge,
    // so it never sits behind the headline.
    const scale = wide ? 1.0 : THREE.MathUtils.clamp((halfW * 1.1) / R, 0.55, 1.25)
    const tx = wide ? halfW * 0.64 - sy * 0.8 : 0
    const ty = wide ? sy * 0.8 : -halfH - R * scale * 0.08 + sy * 0.8
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 3, dt)
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 3, dt)
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, scale * Math.max(0.5, 1 - sy * 0.12), 3, dt))

    const inp = globeInput
    // pause the idle spin while a country is hovered so the tooltip stays put
    const idle = !inp.dragging && hovered.current < 0
    if (!inp.dragging) {
      inp.vy = THREE.MathUtils.damp(inp.vy, 0, 2.2, dt)
      inp.vx = THREE.MathUtils.damp(inp.vx, 0, 2.2, dt)
      inp.rotY += inp.vy * dt + (idle ? dt * 0.12 : 0)
      inp.rotX = THREE.MathUtils.clamp(inp.rotX + inp.vx * dt, -0.9, 0.9)
    }
    s.rotation.y = inp.rotY + BASE_ROT
    g.rotation.x = 0.38 + inp.rotX
    g.rotation.z = 0.1

    // hover: ray -> sphere -> lat/lon -> country mask
    let next = -1
    if (inp.pointer && !inp.dragging && body.current) {
      ndc.set((inp.pointer.x / window.innerWidth) * 2 - 1, -(inp.pointer.y / window.innerHeight) * 2 + 1)
      ray.setFromCamera(ndc, state.camera)
      g.updateMatrixWorld(true)
      const hit = ray.intersectObject(body.current, false)[0]
      if (hit) {
        const [lat, lon] = toLatLon(s.worldToLocal(hit.point.clone()))
        next = world.regionAt(lat, lon)
      }
    }
    if (next !== hovered.current) {
      hovered.current = next
      inp.onHover?.(next >= 0 ? { region: next } : null)
    }
    regionPts.current.forEach((p, i) => {
      if (!p) return
      const m = p.material as THREE.PointsMaterial
      const hot = i === hovered.current
      m.size = THREE.MathUtils.damp(m.size, hot ? 0.147 : 0.118, 10, dt)
      m.color.set(hot ? ACTIVE_HOT : ACTIVE)
    })
  })

  return (
    <group ref={group}>
      {/* ocean: deep blue in shadow, vivid blue where the light from the upper left hits it */}
      <mesh ref={body}>
        <sphereGeometry args={[R * 0.995, 64, 64]} />
        <shaderMaterial vertexShader={oceanShader.vertex} fragmentShader={oceanShader.fragment} />
      </mesh>
      <group ref={spin} rotation={[0, BASE_ROT, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[world.base, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.1} color="#e4efff" map={tex} alphaMap={tex} transparent alphaTest={0.4} sizeAttenuation depthWrite={false} />
        </points>

        {/* active countries */}
        {world.perRegion.map((arr, i) => (
          <points key={regions[i].id} ref={(el) => void (regionPts.current[i] = el as never)}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[arr, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.118} color={ACTIVE} map={tex} alphaMap={tex} transparent alphaTest={0.4} sizeAttenuation depthWrite={false} />
          </points>
        ))}

        {regions.map((r, i) => (r.id === 586 ? null : <Arc key={r.id} a={home} b={centers[i]} delay={i * 1.2} color={ACTIVE} />))}
        <Marker pos={home} color="#ffffff" />
        {regions.map((r, i) => (r.id === 586 ? null : <Marker key={r.id} pos={centers[i]} color={ACTIVE} />))}
      </group>
    </group>
  )
}
