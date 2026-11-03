"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

/**
 * A marquee you can play with: it scrolls on its own, slows down on hover, and can be grabbed,
 * dragged and flung. After release the momentum eases back to the base speed. Loops forever.
 * `speed` is px/second; use a negative number to run it the other way.
 */
export function DragMarquee({
  children,
  speed = 40,
  gap = 20,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  gap?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const copy = useRef<HTMLDivElement>(null);
  const setW = useRef(0);
  const s = useRef({ dragging: false, vel: -speed, moved: 0, hover: false });
  const items = Children.toArray(children);

  useEffect(() => {
    const el = copy.current;
    if (!el) return;
    const measure = () => (setW.current = el.offsetWidth + gap);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [gap]);

  useAnimationFrame((_, delta) => {
    const st = s.current;
    const dt = Math.min(delta, 50) / 1000;
    let nx = x.get();
    if (!st.dragging) {
      const target = -speed * (st.hover ? 0.2 : 1);
      st.vel += (target - st.vel) * Math.min(1, dt * 1.8); // momentum eases back to the base speed
      nx += st.vel * dt;
    }
    const w = setW.current;
    if (w > 0) nx = ((nx % w) - w) % w; // keep the track within one set so it loops seamlessly
    x.set(nx);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const st = s.current;
    st.dragging = true;
    st.moved = 0;
    let lastX = e.clientX;
    let lastT = performance.now();

    const move = (ev: PointerEvent) => {
      const now = performance.now();
      const dx = ev.clientX - lastX;
      const dtMs = Math.max(1, now - lastT);
      lastX = ev.clientX;
      lastT = now;
      st.moved += Math.abs(dx);
      x.set(x.get() + dx);
      const inst = (dx / dtMs) * 1000;
      st.vel = Math.max(-3500, Math.min(3500, st.vel * 0.6 + inst * 0.4));
    };
    const up = () => {
      st.dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerEnter={() => (s.current.hover = true)}
      onPointerLeave={() => (s.current.hover = false)}
      onClickCapture={(e) => {
        // a drag should not count as a click on the tile underneath
        if (s.current.moved > 6) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      className={`relative cursor-grab select-none overflow-hidden py-16 [touch-action:pan-y] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] active:cursor-grabbing ${className}`}
    >
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1, 2].map((i) => (
          <div key={i} ref={i === 0 ? copy : undefined} aria-hidden={i > 0} className="flex shrink-0" style={{ gap, paddingRight: gap }}>
            {items}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
