import React from 'react'

const DEFAULT_TEXT = 'THIS IS HALF DONE FOR CLIENT APPROVAL ONLY'

/**
 * Watermark layout (Tailwind + inline styles):
 *
 * - Outer: fixed full viewport, z-0, overflow hidden — clips anything outside the screen.
 * - Each ROW: absolutely positioned at `top: X%`, centered with `left: 50%` + translate,
 *   then rotated (~-28deg). Width is ~240vw so the diagonal band is wider than the viewport.
 * - Per row, a flex row with `justify-between` places copies at the LEFT and RIGHT edges of
 *   that band and spaces the rest evenly between — so they spread across the full width
 *   instead of bunching in the middle (`justify-center` was causing the “clustered” look).
 * - Few copies per row (COPIES_PER_ROW) keeps each phrase far apart; more rows cover height.
 */
const ROWS = 14
const COPIES_PER_ROW = 9

const Watermark = ({ text = DEFAULT_TEXT }) => {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.45] sm:opacity-50">
        {Array.from({ length: ROWS }, (_, row) => {
          const topPct = ROWS <= 1 ? 50 : 5 + (row * (90 / (ROWS - 1)))
          const staggerX = row % 2 === 0 ? 0 : '6vw'
          return (
            <div
              key={row}
              className="absolute left-1/2 flex min-w-[240vw] max-w-none flex-nowrap justify-between gap-x-6 sm:gap-x-10 md:gap-x-14 select-none font-sans text-[0.6rem] font-bold uppercase tracking-[0.24em] text-neutral-900/[0.07] sm:text-[0.7rem] sm:text-neutral-900/[0.08] md:text-xs md:text-neutral-900/[0.09]"
              style={{
                top: `${topPct}%`,
                left: '50%',
                transform: `translate(calc(-50% + ${staggerX}), -50%) rotate(-28deg)`,
                textShadow: '0 0 1px rgba(255,255,255,0.25)',
              }}
            >
              {Array.from({ length: COPIES_PER_ROW }, (_, i) => (
                <span key={i} className="inline-block shrink-0 whitespace-nowrap px-0.5 sm:px-1">
                  {text}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Watermark
