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

  // country mask: (region index + 1) is split over red (low 4 bits) and green (high bits), 16 steps apart,
  // so any number of regions can be told apart
  const maskCtx = newCtx()
  const ct = countries as unknown as Topology
  const cf = feature(ct, ct.objects.countries as never) as unknown as GeoJSON.FeatureCollection
  for (const f of cf.features) {
    const idx = regions.findIndex((r) => r.id === Number(f.id))
    if (idx < 0) continue
    maskCtx.fillStyle = `rgb(${((idx + 1) & 15) * 16},${((idx + 1) >> 4) * 16},0)`
    fillGeometry(maskCtx, f.geometry)
  }
  const landData = landCtx.getImageData(0, 0, W, H).data
  const maskData = maskCtx.getImageData(0, 0, W, H).data
  const at = (lon: number, lat: number) => {
    const [x, y] = px(lon, lat)
    return (Math.min(H - 1, Math.max(0, Math.floor(y))) * W + Math.min(W - 1, Math.max(0, Math.floor(x)))) * 4
  }

  const regionIdx = (o: number) => (maskData[o + 3] > 128 ? Math.round(maskData[o] / 16) + Math.round(maskData[o + 1] / 16) * 16 - 1 : -1)
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
    const region = regionIdx(o)
    ;(region >= 0 && region < regions.length ? perRegion[region] : base).push(v.x, v.y, v.z)
  }
  const regionAt = (lat: number, lon: number) => {
    const idx = regionIdx(at(lon, lat))
    return idx < regions.length ? idx : -1
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

/** soft radial glow used for arc heads, trails and end points */
function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.25, 'rgba(255,255,255,.55)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

const ARC = '#ff6fd8'
const ARC_HEAD = '#ffd0f4'

function Arc({ a, b, delay, glow }: { a: THREE.Vector3; b: THREE.Vector3; delay: number; glow: THREE.Texture }) {
  const { curve, tube } = useMemo(() => {
    const dist = a.distanceTo(b)
    const mid = a.clone().add(b).multiplyScalar(0.5)
    mid.normalize().multiplyScalar(R * (1.12 + dist * 0.22))
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 80, 0.0048, 4, false),
      new THREE.MeshBasicMaterial({ color: ARC, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    return { curve, tube }
  }, [a, b])
  const dur = 3.6
  const head = useRef<THREE.Sprite>(null)
  const trail = useRef<(THREE.Sprite | null)[]>([])
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime + delay) % dur) / dur
    const fade = Math.sin(Math.min(1, t * 1.15) * Math.PI) // fades in and out over each trip
    head.current?.position.copy(curve.getPoint(t))
    head.current?.scale.setScalar(0.17 * (0.5 + fade))
    trail.current.forEach((s, i) => {
      if (!s) return
      s.position.copy(curve.getPoint(Math.max(0, t - (i + 1) * 0.028)))
      s.scale.setScalar(0.12 - i * 0.017)
      ;(s.material as THREE.SpriteMaterial).opacity = fade * (0.7 - i * 0.12)
    })
  })
  return (
    <group>
      <primitive object={tube} />
      <sprite ref={head}>
        <spriteMaterial map={glow} color={ARC_HEAD} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {[0, 1, 2, 3, 4].map((i) => (
        <sprite key={i} ref={(el) => void (trail.current[i] = el)}>
          <spriteMaterial map={glow} color={ARC} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}
    </group>
  )
}

/** glowing end point with a slow pulse */
function Marker({ pos, glow, size = 0.2 }: { pos: THREE.Vector3; glow: THREE.Texture; size?: number }) {
  const halo = useRef<THREE.Sprite>(null)
  const p = useMemo(() => pos.clone().multiplyScalar(1.004), [pos])
  useFrame(({ clock }) => {
    const k = (clock.elapsedTime * 0.8 + pos.x * 3) % 1
    halo.current?.scale.setScalar(size * (1 + k * 2.2))
    if (halo.current) (halo.current.material as THREE.SpriteMaterial).opacity = (1 - k) * 0.45
  })
  return (
    <group position={p}>
      <sprite scale={size * 0.42}>
        <spriteMaterial map={glow} color="#ffd9f5" transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <sprite ref={halo}>
        <spriteMaterial map={glow} color={ARC} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
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
  // deep indigo body, electric-blue limb light from the upper left, magenta fill from the lower right
  fragment: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main(){
      vec3 n = normalize(vN);
      float rim = pow(1.0 - max(dot(n, normalize(vV)), 0.0), 2.3);
      float a = clamp(dot(n, normalize(vec3(-0.75, 0.55, 0.55))) * 0.5 + 0.5, 0.0, 1.0);
      float b = clamp(dot(n, normalize(vec3(0.8, -0.5, 0.45))) * 0.5 + 0.5, 0.0, 1.0);
      vec3 col = mix(vec3(0.015, 0.025, 0.12), vec3(0.07, 0.11, 0.46), pow(a, 1.5));
      col = mix(col, vec3(0.24, 0.09, 0.52), pow(b, 2.0) * 0.75);
      col += vec3(0.16, 0.4, 1.0) * rim * (0.22 + 1.05 * pow(a, 2.2));
      col += vec3(0.8, 0.26, 0.95) * rim * pow(b, 2.0) * 0.95;
      gl_FragColor = vec4(col, 1.0);
    }`,
}

// soft atmosphere: only the part of the back faces that sticks out past the planet is visible
const haloShader = {
  vertex: /* glsl */ `
    varying vec3 vN;
    void main(){
      vN = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragment: /* glsl */ `
    varying vec3 vN;
    void main(){
      float k = clamp(-vN.z / 0.6, 0.0, 1.0);          // 1 at the planet limb, 0 at the halo edge
      float g = pow(k, 2.4);
      float side = smoothstep(-0.55, 0.65, vN.x * 0.75 - vN.y * 0.45);
      vec3 col = mix(vec3(0.16, 0.4, 1.0), vec3(0.85, 0.28, 0.95), side);
      gl_FragColor = vec4(col * g * 0.8, g * 0.75);
    }`,
}

const ACTIVE = '#b9c8ff'
const ACTIVE_HOT = '#ff9be6'

const CITIES: Record<string, [number, number]> = {
  newYork: [40.7, -74], sanFrancisco: [37.8, -122.4], houston: [29.8, -95.4], miami: [25.8, -80.2], toronto: [43.7, -79.4],
  mexicoCity: [19.4, -99.1], saoPaulo: [-23.5, -46.6], london: [51.5, -0.1], paris: [48.9, 2.35], istanbul: [41, 29],
  lagos: [6.5, 3.4], nairobi: [-1.3, 36.8], riyadh: [24.7, 46.7], dubai: [25.2, 55.3], mumbai: [19, 72.9],
  singapore: [1.35, 103.8], tokyo: [35.7, 139.7], sydney: [-33.9, 151.2],
}
/** decorative network traffic between world cities, like the GitHub globe */
const LINKS: [string, string][] = [
  ['newYork', 'london'], ['sanFrancisco', 'tokyo'], ['dubai', 'london'], ['houston', 'mexicoCity'], ['miami', 'saoPaulo'],
  ['dubai', 'singapore'], ['london', 'lagos'], ['newYork', 'dubai'], ['toronto', 'paris'], ['mumbai', 'sydney'],
  ['istanbul', 'nairobi'], ['singapore', 'tokyo'], ['riyadh', 'london'], ['sanFrancisco', 'newYork'],
]

export default function Globe() {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const body = useRef<THREE.Mesh>(null)
  const regionPts = useRef<(THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null)[]>([])
  const hovered = useRef(-1)
  const world = useMemo(() => buildWorld(52000), [])
  const tex = useMemo(() => dotTexture(), [])
  const glow = useMemo(() => glowTexture(), [])
  const home = useMemo(() => ll(HOME[0], HOME[1]), [])
  const centers = useMemo(() => regions.map((r) => ll(r.center[0], r.center[1])), [])
  const links = useMemo(() => LINKS.map(([x, y]) => [ll(...CITIES[x]), ll(...CITIES[y])] as const), [])
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
    // desktop: the globe fills the right ~46% of the hero, like the GitHub landing page.
    // mobile: only the top cap rises from the bottom edge, so it never sits behind the headline.
    const scale = wide ? THREE.MathUtils.clamp((0.46 * halfW) / R, 0.7, 1.5) : THREE.MathUtils.clamp((halfW * 1.1) / R, 0.55, 1.25)
    const tx = wide ? halfW - R * scale - 0.25 - sy * 0.8 : 0
    const ty = wide ? -0.15 + sy * 0.8 : -halfH - R * scale * 0.08 + sy * 0.8
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
      m.size = THREE.MathUtils.damp(m.size, hot ? 0.135 : 0.1, 10, dt)
      m.color.set(hot ? ACTIVE_HOT : ACTIVE)
    })
  })

  return (
    <group ref={group}>
      {/* atmosphere halo behind the planet */}
      <mesh>
        <sphereGeometry args={[R * 1.25, 64, 64]} />
        <shaderMaterial vertexShader={haloShader.vertex} fragmentShader={haloShader.fragment} side={THREE.BackSide} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* planet body: deep indigo, electric-blue rim */}
      <mesh ref={body}>
        <sphereGeometry args={[R * 0.995, 64, 64]} />
        <shaderMaterial vertexShader={oceanShader.vertex} fragmentShader={oceanShader.fragment} />
      </mesh>
      <group ref={spin} rotation={[0, BASE_ROT, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[world.base, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#9db2ff" map={tex} alphaMap={tex} transparent opacity={0.8} alphaTest={0.4} sizeAttenuation depthWrite={false} />
        </points>

        {/* active countries */}
        {world.perRegion.map((arr, i) => (
          <points key={regions[i].id} ref={(el) => void (regionPts.current[i] = el as never)}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[arr, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color={ACTIVE} map={tex} alphaMap={tex} transparent alphaTest={0.4} sizeAttenuation depthWrite={false} />
          </points>
        ))}

        {/* home -> every country with work, then decorative traffic between world cities */}
        {regions.map((r, i) => (r.id === 586 ? null : <Arc key={r.id} a={home} b={centers[i]} delay={i * 0.7} glow={glow} />))}
        {links.map(([x, y], i) => (
          <Arc key={i} a={x} b={y} delay={i * 0.95 + 0.4} glow={glow} />
        ))}
        <Marker pos={home} glow={glow} size={0.3} />
        {regions.map((r, i) => (r.id === 586 ? null : <Marker key={r.id} pos={centers[i]} glow={glow} />))}
        {links.map(([x, y], i) => (
          <group key={i}>
            <Marker pos={x} glow={glow} size={0.1} />
            <Marker pos={y} glow={glow} size={0.1} />
          </group>
        ))}
      </group>
    </group>
  )
}
