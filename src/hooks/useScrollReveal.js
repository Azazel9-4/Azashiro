import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref to attach to any element + a boolean `visible`.
 * @param {number} threshold - 0 to 1, how much of element must be visible (default 0.15)
 * @param {number} delay     - extra delay in ms before triggering (default 0)
 */
export default function useScrollReveal(threshold = 0.15, delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(true)
          }
          observer.unobserve(el) // only animate once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay])

  return { ref, visible }
}
