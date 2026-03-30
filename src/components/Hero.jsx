import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple } from '../data'

const HERO_POSTER_URL = '/assets/images/prenup/1000082213.jpg'
// Keep spaces URL-encoded so the browser can reliably load the file.
const HERO_VIDEO_URL = '/assets/images/graphics/1st%20part.mp4'

const Hero = () => {
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    // Format as "May 30, 2026"
    return `${month} ${day}, ${year}`
  }

  // Hero display names: no middle names (Arreola, Capuchino) for a cleaner look
  const groomName = { first: 'Criz Mar', last: 'Castro' }
  const brideName = { first: 'Sharlene', last: 'Tagal' }

  // Note: venue line removed from bottom date section per request.

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })

    // Create timeline for sequential animations
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Groom's name
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 2. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 3. Bride's name
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(brideLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 4. Date
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // (No play button on purpose)
  }, [])

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* Audio Element */}
      {/* Music is handled globally by `AudioProvider` (started when envelope opens) */}
      
      <div className="absolute inset-0">
        {/* Full-bleed looping video background */}
        <video
          data-hero="true"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 z-0 w-full h-full object-cover object-center"
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER_URL}
        />
        {/* Light navy vignette at top/bottom only — keeps names & date readable; center stays full photo */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,31,63,0.55) 0%, rgba(0,31,63,0.18) 22%, transparent 42%, transparent 58%, rgba(0,31,63,0.2) 78%, rgba(0,31,63,0.55) 100%)',
          }}
          aria-hidden
        />
      </div>
      
      {/* Couple Names, Date and Venue at Top */}
      <div className="absolute top-0 left-0 right-0 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Groom's Name - white text */}
            <div>
              <p ref={groomFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#FFFFFF' }}>
                {groomName.first}
              </p>
              <p ref={groomLastNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight -mt-2 sm:-mt-3" style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {groomName.last}
              </p>
            </div>
            <p ref={andRef} className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3" style={{ color: '#FFFFFF' }}>
              AND
            </p>
            {/* Bride's Name - white text */}
            <div>
              <p ref={brideFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#FFFFFF' }}>
                {brideName.first}
              </p>
              <p ref={brideLastNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight -mt-2 sm:-mt-3" style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {brideName.last}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Date and Venue at Bottom Center */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-foglihten" style={{ color: '#FFFFFF' }}>
              {formatDate()}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
