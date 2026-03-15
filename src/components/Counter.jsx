import React, { useRef } from 'react'

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)

  // No animation that starts hidden - numbers stay visible (fixes "time hiding" when state updates)

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ marginTop: '2rem' }}
    >
      {/* Countdown Timer */}
      <div ref={countdownRef} className="flex justify-center items-center space-x-3 px-4">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#7BA3C4' }}>
            {countdown.days}
          </div>
          <div className="text-xs sm:text-sm font-medium" style={{ color: '#7BA3C4', opacity: 0.9 }}>Days</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#7BA3C4' }}>:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#7BA3C4' }}>
            {countdown.hours}
          </div>
          <div className="text-xs sm:text-sm font-medium" style={{ color: '#7BA3C4', opacity: 0.9 }}>Hours</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#7BA3C4' }}>:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#7BA3C4' }}>
            {countdown.minutes}
          </div>
          <div className="text-xs sm:text-sm font-medium" style={{ color: '#7BA3C4', opacity: 0.9 }}>Minutes</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#7BA3C4' }}>:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#7BA3C4' }}>
            {countdown.seconds}
          </div>
          <div className="text-xs sm:text-sm font-medium" style={{ color: '#7BA3C4', opacity: 0.9 }}>Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default Counter 