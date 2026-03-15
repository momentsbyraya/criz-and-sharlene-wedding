import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple } from '../data'
import { weddingConfig } from '../config/weddingConfig'

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)
  const clickMeRef = useRef(null)
  const coupleNameRef = useRef(null)

  // Animate text and envelope on mount
  useEffect(() => {
    // Set initial hidden states
    if (clickMeRef.current) gsap.set(clickMeRef.current, { opacity: 0, y: -30 })
    if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, scale: 0.8 })
    if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate "Click me!" text - fade in and slide down
    if (clickMeRef.current) {
      tl.to(clickMeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    // Animate envelope - fade in, scale up with bounce
    if (envelopeRef.current) {
      tl.to(envelopeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4")
    }

    // Animate couple name and date - fade in and slide up
    if (coupleNameRef.current) {
      tl.to(coupleNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
    }
  }, [])

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current
    
    if (envelope) {
      envelope.classList.add('active')
      // Letter translation: 0.3s delay + 0.8s duration = 1.1s total
      // Wait 1 second after letter finishes translating
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          // After zoom and fadeout animation completes, reveal invitation
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500) // Animation duration
        }
      }, 2100) // 1.1s (letter animation) + 1000ms (1 second wait)
    }
  }

  return (
    <div 
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
        style={{
        backgroundImage: 'url(/assets/images/graphics/textured-bg-2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <section className="cssletter flex flex-col items-center relative z-10 w-full py-8" style={{ minHeight: 'auto', height: 'auto' }}>
        {/* Click me text */}
        <div ref={clickMeRef} className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center click-me-container">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold" style={{ fontFamily: 'var(--letter-font)', color: '#7BA3C4' }}>
            Click me!
          </p>
        </div>
        <div className="envelope" ref={envelopeRef}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
              onError={(e) => {
                // Hide stamp if image doesn't exist
                e.target.style.display = 'none'
              }}
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter envelope-letter-centered">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">You are invited!</p>
            <img 
              src="/assets/images/graphics/cutlery-sketch.png" 
              alt="Cutlery sketch" 
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
              onError={(e) => {
                // Use ring-sketch as fallback if cutlery-sketch doesn't exist
                e.target.src = '/assets/images/graphics/ring-sketch.png'
              }}
            />
          </div>
        </div>
        {/* Couple name and date below envelope */}
        <div ref={coupleNameRef} className="mt-12 sm:mt-16 md:mt-20 text-center couple-name-container">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-script leading-tight"
            style={{ 
              color: '#7BA3C4', 
              fontSize: 'clamp(1.5rem, 4vw, 48px)',
              textShadow: 'none'
            }}
          >
            {couple.nickname}
          </h2>
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-script mt-1"
            style={{ 
              color: '#7BA3C4', 
              fontSize: 'clamp(1rem, 2.5vw, 30px)',
              textShadow: 'none'
            }}
          >
            {new Date(weddingConfig.wedding.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen
