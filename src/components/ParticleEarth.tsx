"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useScroll, useSpring } from "motion/react";

// Cities we serve (lat, lon): UAE, Pakistan, USA (NY + SF), Canada, Mexico, UK
const CITIES: [number, number][] = [
  [25.2, 55.27],
  [24.86, 67.0],
  [40.71, -74.0],
  [37.77, -122.42],
  [43.65, -79.38],
  [19.43, -99.13],
  [51.5, -0.12],
];

// Animated connection arcs between cities (indexes into CITIES)
const ARCS: [number, number][] = [
  [0, 2],
  [0, 6],
  [1, 3],
  [0, 4],
  [5, 2],
  [6, 2],
];

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const SPACING = 6.5; // px between particles
const GLOW = 120; // radius (px) of the cursor light
const NAMES = ["Dubai", "Karachi", "New York", "San Francisco", "Toronto", "Mexico City", "London"];
const TILT = 0.55; // how far the planet leans back towards the viewer

type Dot = { x: number; y: number; z: number; land: boolean; size: number; r: number; r2: number; r3: number };

// Extra canvas above the visible planet, so the atmosphere, flare and orbits fade out instead of being cut off
const HEAD = 240;

function toVec(lat: number, lon: number) {
  const c = Math.cos(lat);
  return { x: c * Math.sin(lon), y: Math.sin(lat), z: c * Math.cos(lon) };
}

const deg = (n: number) => (n * Math.PI) / 180;
const radiusFor = (w: number) => Math.min(Math.max(w * 0.8, 520), 1300);

/**
 * A planet rising over the horizon: only its top cap is drawn, so particle density can stay high
 * while the canvas stays small. Land comes from a black/white equirectangular mask.
 */
export function ParticleEarth({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const spin = useMotionValue(-1.0);
  const pointerX = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let land: Uint8Array | null = null;
    const MW = 800, MH = 400;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = true;
    let cancelled = false;
    let W = 0, H = 0, dpr = 1, R = 0, cx = 0, cy = 0;
    let mx = -9999, my = -9999; // cursor position in canvas pixels

    const build = () => {
      if (!land || !W) return;
      const total = Math.round((4 * Math.PI * R * R) / (SPACING * SPACING));
      const out: Dot[] = [];
      for (let i = 0; i < total; i++) {
        const y = 1 - (2 * (i + 0.5)) / total;
        if (y < 0.05) break; // only the northern cap can ever be on screen
        const lat = Math.asin(y);
        const lon = ((GOLDEN * i) % (Math.PI * 2)) - Math.PI;
        const px = Math.min(MW - 1, Math.floor(((lon + Math.PI) / (Math.PI * 2)) * MW));
        const py = Math.min(MH - 1, Math.floor(((Math.PI / 2 - lat) / Math.PI) * MH));
        const isLand = land[py * MW + px] === 1;
        if (!isLand && Math.random() > 0.22) continue;
        out.push({ ...toVec(lat, lon), land: isLand, size: isLand ? 1.1 + Math.random() * 0.5 : 0.8, r: Math.random(), r2: Math.random(), r3: Math.random() });
      }
      dots = out;
    };

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      R = radiusFor(W);
      cx = W / 2;
      cy = HEAD + (H - HEAD) * 0.2 + R; // the planet's top edge sits 20% below the visible part of the canvas
      build();
    };

    const draw = (time: number) => {
      if (!W || !dots.length) return;
      // scrolling past the hero blows the planet apart into drifting particles
      const blast = Math.max(0, Math.min(1, scrollY.get() / (window.innerHeight * 0.85)));
      const e = blast * blast;
      const fade = 1 - blast;
      const a = spin.get() + scrollY.get() * 0.0014 + tiltX.get() * 0.25;
      const ca = Math.cos(a), sa = Math.sin(a);
      const ct = Math.cos(TILT), st = Math.sin(TILT);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const project = (d: { x: number; y: number; z: number }) => {
        const x1 = d.x * ca + d.z * sa;
        const z1 = -d.x * sa + d.z * ca;
        const y2 = d.y * ct - z1 * st;
        const z2 = d.y * st + z1 * ct;
        return { sx: cx + x1 * R, sy: cy - y2 * R, z: z2 };
      };

      // planet body
      const body = ctx.createRadialGradient(cx, cy - R * 0.9, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(30,40,120,0.55)");
      body.addColorStop(0.35, "rgba(10,16,52,0.9)");
      body.addColorStop(1, "rgba(4,6,20,1)");
      ctx.globalAlpha = fade;
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // glowing atmosphere rim (gradient starts at the centre so the planet interior stays transparent)
      const rim = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.12);
      rim.addColorStop(0, "rgba(99,102,241,0)");
      rim.addColorStop(0.87, "rgba(99,102,241,0)");
      rim.addColorStop(0.885, "rgba(190,245,255,0.8)");
      rim.addColorStop(0.9, "rgba(126,231,255,0.4)");
      rim.addColorStop(0.95, "rgba(99,102,241,0.14)");
      rim.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
      ctx.fill();

      // particles: ocean first (indigo), land on top (cyan). Back-facing and off-screen dots are skipped.
      // The cursor lights up the surface around it, and a scanning ring climbs the globe now and then.
      const band = ((time / 5200) % 1) * 1.3 - 0.15;
      for (const pass of [false, true]) {
        ctx.fillStyle = pass ? "#8af0ff" : "#7d8bff";
        for (const d of dots) {
          if (d.land !== pass) continue;
          let x = d.x;
          let y = d.y;
          let z = d.z;
          if (e > 0.0005) {
            // blast: every particle flies outwards at its own speed and drifts sideways
            const k = 1 + e * (0.25 + d.r * 2.4);
            x = x * k + (d.r2 - 0.5) * e * 1.5;
            y = y * k + (d.r3 - 0.25) * e * 1.3;
            z = z * k + (d.r - 0.5) * e * 1.5;
          }
          const x1 = x * ca + z * sa;
          const z1 = -x * sa + z * ca;
          const sy = cy - (y * ct - z1 * st) * R;
          const sx = cx + x1 * R;
          const zz = y * st + z1 * ct;
          if (zz <= -e * 0.9 || sy > H + 4 || sy < -4 || sx < -4 || sx > W + 4) continue;
          const zc = zz > 0.15 ? zz : 0.15;
          let alpha = pass ? 0.45 + 0.55 * zc : 0.15 + 0.3 * zc;
          let size = d.size * (1 - 0.3 * blast);
          const dx = sx - mx;
          const dy = sy - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < GLOW * GLOW) {
            const k = 1 - Math.sqrt(d2) / GLOW;
            alpha += k * 0.6;
            size += k * 1.7;
          }
          const bb = d.y - band;
          if (bb * bb < 0.0009) {
            const k = 1 - Math.abs(bb) / 0.03;
            alpha += k * 0.5;
            size += k * 0.9;
          }
          alpha *= 1 - 0.8 * blast * blast;
          ctx.globalAlpha = alpha > 1 ? 1 : alpha;
          ctx.fillRect(sx, sy, size, size);
        }
      }

      // sunrise flare where the light grazes the top of the globe
      ctx.globalCompositeOperation = "lighter";
      const flare = ctx.createRadialGradient(cx, cy - R, 0, cx, cy - R, R * 0.32);
      flare.addColorStop(0, "rgba(200,245,255,0.38)");
      flare.addColorStop(0.4, "rgba(126,231,255,0.12)");
      flare.addColorStop(1, "rgba(99,102,241,0)");
      ctx.globalAlpha = fade;
      ctx.fillStyle = flare;
      ctx.fillRect(cx - R * 0.4, cy - R * 1.35, R * 0.8, R * 0.7);
      ctx.globalCompositeOperation = "source-over";

      // two satellites on tilted orbits, with fading trails
      const orbit = (tilt: number, yaw: number, speed: number, phase: number, radius: number, color: string) => {
        const pos = (t: number) => {
          const ox = Math.cos(t) * radius;
          const oy = Math.sin(t) * Math.sin(tilt) * radius;
          const oz = Math.sin(t) * Math.cos(tilt) * radius;
          const x1 = ox * Math.cos(yaw) + oz * Math.sin(yaw);
          const z1 = -ox * Math.sin(yaw) + oz * Math.cos(yaw);
          const y2 = oy * ct - z1 * st;
          const z2 = oy * st + z1 * ct;
          return { sx: cx + x1 * R, sy: cy - y2 * R, z: z2, hidden: z2 < 0 && Math.hypot(x1, y2) < 1 };
        };
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.16;
        ctx.setLineDash([2, 7]);
        ctx.beginPath();
        let pen = false;
        for (let k = 0; k <= 160; k++) {
          const q = pos((k / 160) * Math.PI * 2);
          if (q.hidden) {
            pen = false;
            continue;
          }
          if (pen) ctx.lineTo(q.sx, q.sy);
          else ctx.moveTo(q.sx, q.sy);
          pen = true;
        }
        ctx.stroke();
        ctx.setLineDash([]);
        const t0 = (time / 1000) * speed + phase;
        for (let k = 0; k < 16; k++) {
          const q = pos(t0 - k * 0.035);
          if (q.hidden) continue;
          ctx.globalAlpha = (1 - k / 16) * 0.85;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(q.sx, q.sy, k === 0 ? 3 : 2 - k * 0.09, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      if (blast < 0.5) {
        orbit(0.5, 0.35, 0.16, 0.6, 1.2, "#8af0ff");
        orbit(0.9, -0.5, -0.11, 2.4, 1.32, "#b4bcff");
      }

      // city markers and arcs belong to the intact planet
      if (blast > 0.3) {
        ctx.globalAlpha = 1;
        return;
      }
      // city markers
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#8af0ff";
      CITIES.forEach(([lat, lon], i) => {
        const p = project(toVec(deg(lat), deg(lon)));
        if (p.z < 0.05 || p.sy > H || p.sy < 0) return;
        const pulse = (time / 1600 + i * 0.27) % 1;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = (1 - pulse) * 0.7;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3 + pulse * 15, 0, Math.PI * 2);
        ctx.stroke();
        if (p.z > 0.35) {
          ctx.font = "11px ui-monospace, SFMono-Regular, monospace";
          ctx.globalAlpha = 0.75 * p.z;
          ctx.fillStyle = "#d6f3ff";
          ctx.fillText(NAMES[i].toUpperCase(), p.sx + 10, p.sy - 9);
          ctx.fillStyle = "#ffffff";
        }
      });

      // travelling arcs between cities
      ARCS.forEach(([ia, ib], i) => {
        const A = toVec(deg(CITIES[ia][0]), deg(CITIES[ia][1]));
        const B = toVec(deg(CITIES[ib][0]), deg(CITIES[ib][1]));
        const dot = Math.max(-1, Math.min(1, A.x * B.x + A.y * B.y + A.z * B.z));
        const om = Math.acos(dot);
        if (om < 0.01) return;
        const head = ((time / 4200 + i * 0.17) % 1) * 1.35;
        const tail = Math.max(0, head - 0.4);
        const steps = 28;
        let prev: { sx: number; sy: number; z: number } | null = null;
        for (let k = 0; k <= steps; k++) {
          const t = tail + ((Math.min(head, 1) - tail) * k) / steps;
          const w1 = Math.sin((1 - t) * om) / Math.sin(om);
          const w2 = Math.sin(t * om) / Math.sin(om);
          const lift = 1 + 0.28 * Math.sin(Math.PI * t);
          const pt = project({
            x: (A.x * w1 + B.x * w2) * lift,
            y: (A.y * w1 + B.y * w2) * lift,
            z: (A.z * w1 + B.z * w2) * lift,
          });
          if (prev && pt.z > 0 && prev.z > 0) {
            const fade = (k / steps) * (head > 1 ? Math.max(0, 1.35 - head) / 0.35 : 1);
            ctx.globalAlpha = Math.max(0, fade) * 0.9;
            ctx.strokeStyle = "#8af0ff";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(prev.sx, prev.sy);
            ctx.lineTo(pt.sx, pt.sy);
            ctx.stroke();
          }
          prev = pt;
        }
      });
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const img = new Image();
    img.src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/earth-water.png`;
    img.onload = () => {
      if (cancelled) return;
      const off = document.createElement("canvas");
      off.width = MW;
      off.height = MH;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, MW, MH);
      const px = octx.getImageData(0, 0, MW, MH).data;
      land = new Uint8Array(MW * MH);
      for (let i = 0; i < MW * MH; i++) land[i] = px[i * 4] < 110 ? 1 : 0;
      fit();
      if (reduce) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    const spinAnim = reduce ? null : animate(spin, spin.get() + Math.PI * 2, { duration: 120, ease: "linear", repeat: Infinity });
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      // rebuild only on real width changes (height tweaks do not change the planet)
      if (!land) return;
      if (Math.abs(canvas.clientWidth - lastW) > 40 || !lastW) {
        lastW = canvas.clientWidth;
        fit();
      }
      if (reduce) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      spinAnim?.stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [spin, pointerX, tiltX, scrollY]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
