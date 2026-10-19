export type HoverInfo = { region: number } | null

/** State shared between the hero drag-zone (DOM) and the globe (WebGL). */
export const globeInput = {
  dragging: false,
  vy: 0,
  vx: 0,
  rotY: 0,
  rotX: 0,
  /** latest pointer position in client px (null when the cursor is off the globe zone) */
  pointer: null as { x: number; y: number } | null,
  /** set by the DOM layer; called by the globe when the hovered country changes */
  onHover: null as ((h: HoverInfo) => void) | null,
}
