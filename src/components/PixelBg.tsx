/** decorative tech dot-grid behind a section, fading out from one top corner */
export const PixelBg = ({ side = 'right' }: { side?: 'left' | 'right' }) => <span className={`pixel-fade ${side === 'left' ? 'left' : ''}`} aria-hidden />

/** soft blue / purple glow in the corners of a section */
export const GlowBg = ({ alt = false }: { alt?: boolean }) => <span className={`section-glow ${alt ? 'alt' : ''}`} aria-hidden />
