import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref to attach to any element + a boolean `visible`.
 * `visible` flips true when the element enters the viewport and false
 * when it leaves, so the animation replays in both scroll directions.
 * @param {number} threshold - 0 to 1, how much of element must be visible (default 0.15)
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}