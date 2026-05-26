import useScrollReveal from '../hooks/useScrollReveal'

/**
 * Reveal
 * Wrap any element/section with this to get a fade+slide-up animation on scroll.
 *
 * Props:
 *   delay     - ms delay before animating (use for staggered children, e.g. 0, 100, 200)
 *   direction - 'up' | 'down' | 'left' | 'right' (default 'up')
 *   distance  - px to travel (default 32)
 *   threshold - intersection threshold (default 0.12)
 *   style     - extra styles on the wrapper div
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 32,
  threshold = 0.12,
  style = {},
}) {
  const { ref, visible } = useScrollReveal(threshold, delay)

  const translate = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }[direction]

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : translate,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
