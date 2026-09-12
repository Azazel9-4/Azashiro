import { useEffect, useRef, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

/**
 * Avatar - Subtle Cyber Hologram Micro-Glitch
 * A snappy 180ms tactical scanline & slice flicker that switches images smoothly.
 */
export default function Avatar({
  normalSrc,
  altSrc,
  alt = 'Profile photo',
  altPosition = 'center',
  altScale = 1,
  normalPosition = 'top',
  style = {},
}) {
  const isMobile = useMediaQuery('(max-width: 720px)')
  const [active, setActive] = useState(false)
  const [glitching, setGlitching] = useState(false)

  const scrollStartRef = useRef(null)
  const glitchTimerRef = useRef(null)

  const triggerGlitch = (toActive) => {
    setActive(toActive)
    setGlitching(true)

    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    // Quick 180ms micro-burst then resolves rock-solid
    glitchTimerRef.current = setTimeout(() => {
      setGlitching(false)
    }, 180)
  }

  useEffect(() => {
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current)
    }
  }, [])

  // Mobile: Scroll > 10px auto-reverts back to your photo
  useEffect(() => {
    if (!isMobile || !active) return

    scrollStartRef.current = window.scrollY
    const REVERT_THRESHOLD = 10

    const onScroll = () => {
      if (scrollStartRef.current === null) return
      if (Math.abs(window.scrollY - scrollStartRef.current) > REVERT_THRESHOLD) {
        triggerGlitch(false)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile, active])

  const handleEnter = () => !isMobile && triggerGlitch(true)
  const handleLeave = () => !isMobile && triggerGlitch(false)
  const handleTap = () => isMobile && triggerGlitch(!active)

  const currentSrc = active ? altSrc : normalSrc
  const currentPos = active ? altPosition : normalPosition
  const currentScale = active ? altScale : 1

  return (
    <div
      role={isMobile ? 'button' : undefined}
      aria-label={isMobile ? 'Tap to switch avatar' : undefined}
      tabIndex={isMobile ? 0 : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTap}
      onKeyDown={(e) => e.key === 'Enter' && handleTap()}
      className={`micro-glitch-avatar ${isMobile && !active ? 'avatar-pulse' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
    >
      <style>{`
        /* Base Portrait */
        .micro-glitch-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          display: block;
          filter: ${active ? 'none' : 'grayscale(20%)'};
          transition: filter 0.2s ease;
        }

        /* Subtle Horizontal Slice Clones (Only exist during the 180ms burst) */
        .slice-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          pointer-events: none;
        }

        /* Slice 1: Upper-mid horizontal strip with faint cyan tint */
        .slice-top {
          clip-path: inset(28% 0 48% 0);
          animation: micro-slice-top 0.18s steps(2) forwards;
          opacity: 0.85;
          filter: drop-shadow(-1.5px 0 #00f0ff);
        }

        /* Slice 2: Lower horizontal strip with faint amber tint */
        .slice-bottom {
          clip-path: inset(62% 0 16% 0);
          animation: micro-slice-bottom 0.18s steps(2) forwards;
          opacity: 0.85;
          filter: drop-shadow(1.5px 0 var(--amber, #f59e0b));
        }

        @keyframes micro-slice-top {
          0% { transform: translateX(0); }
          35% { transform: translateX(-2.5px); }
          70% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }

        @keyframes micro-slice-bottom {
          0% { transform: translateX(0); }
          35% { transform: translateX(2.5px); }
          70% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        /* Fast 1-Pass Tactical Scanline */
        .micro-scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.7),
            var(--amber, #f59e0b),
            transparent
          );
          pointer-events: none;
          z-index: 5;
          animation: scanline-pass 0.18s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }

        @keyframes scanline-pass {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }

        /* Subtle amber border feedback on Aizen */
        .active-rim {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px transparent;
          transition: box-shadow 0.25s ease;
          z-index: 6;
        }

        .active-rim.is-active {
          box-shadow: inset 0 0 6px 1px rgba(245, 158, 11, 0.35);
        }
      `}</style>

      {/* 1. Main Clean Portrait (Instantly resolves with zero blur) */}
      <img
        src={currentSrc}
        alt={active ? 'Aizen Sosuke' : alt}
        className="micro-glitch-img"
        style={{
          objectPosition: currentPos,
          transform: `scale(${currentScale})`,
        }}
      />

      {/* 2. Micro Slice Layers (Only present for 180ms during transition) */}
      {glitching && (
        <>
          <img
            src={currentSrc}
            alt=""
            aria-hidden="true"
            className="slice-layer slice-top"
            style={{
              objectPosition: currentPos,
              transform: `scale(${currentScale})`,
            }}
          />
          <img
            src={currentSrc}
            alt=""
            aria-hidden="true"
            className="slice-layer slice-bottom"
            style={{
              objectPosition: currentPos,
              transform: `scale(${currentScale})`,
            }}
          />
          {/* Faint holographic scanline sweep */}
          <div className="micro-scanline" />
        </>
      )}

      {/* 3. Subtle amber border accent while Aizen is active */}
      <div className={`active-rim ${active ? 'is-active' : ''}`} />
    </div>
  )
}