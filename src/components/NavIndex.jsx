import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { themeConfig } from '../config/themeConfig'
import { couple } from '../data'
import Counter from './Counter'
import { getTimeUntilWedding } from '../utils/countdown'
import './NavIndex.css'

const NavIndex = ({ onOpenRSVP }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const coupleNameRef = useRef(null)
  const envelopeRef = useRef(null)
  const flower1Ref = useRef(null)
  const flower3Ref = useRef(null)
  const flower4Ref = useRef(null)
  const ovalContainerRef = useRef(null)
  const polaroidRef = useRef(null)
  const rsvpContainerRef = useRef(null)
  const detailsContainerRef = useRef(null)

  // Countdown state
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  // Pages/Sections to navigate to - matching the pages folder
  const sections = []

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate elements one after another when on home page
    if (location.pathname === '/') {
      // Set all elements to start hidden
      if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })
      if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, y: 30 })
      if (flower1Ref.current) gsap.set(flower1Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (flower3Ref.current) gsap.set(flower3Ref.current, { opacity: 0, scale: 0, transform: 'translate(-50%, 80%) scale(0)' })
      if (flower4Ref.current) gsap.set(flower4Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (ovalContainerRef.current) gsap.set(ovalContainerRef.current, { opacity: 0, y: 30 })
      if (polaroidRef.current) gsap.set(polaroidRef.current, { opacity: 0, y: 30 })
      if (rsvpContainerRef.current) gsap.set(rsvpContainerRef.current, { opacity: 0, y: 30 })
      if (detailsContainerRef.current) gsap.set(detailsContainerRef.current, { opacity: 0, y: 30 })
      
      // Small delay to ensure opening screen is fully gone
      setTimeout(() => {
        // Animate elements one after another
        const tl = gsap.timeline({ delay: 0.2 })
            
            // Envelope - show first
            if (envelopeRef.current) {
              tl.fromTo(envelopeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              )
            }
            
            // Flower 1 - animate after envelope
            if (flower1Ref.current) {
              tl.fromTo(flower1Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 25, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.3"
              )
            }
            
            // Couple's name - simple slide in
            if (coupleNameRef.current) {
              tl.fromTo(coupleNameRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Oval container - simple slide in
            if (ovalContainerRef.current) {
              tl.fromTo(ovalContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Polaroid image - simple slide in
            if (polaroidRef.current) {
              tl.fromTo(polaroidRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Flower 4 - top right of polaroid - keep animation
            if (flower4Ref.current) {
              tl.fromTo(flower4Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.5"
              )
            }
            
            // Flower 3 - bottom left of polaroid
            if (flower3Ref.current) {
              tl.fromTo(flower3Ref.current,
                { opacity: 0, scale: 0, transform: 'translate(-50%, 80%) scale(0)' },
                { opacity: 1, scale: 1, transform: 'translate(-50%, 80%) scale(1)', duration: 0.6, ease: "back.out(1.7)" },
                "-=0.4"
              )
            }
            
            // RSVP container - simple slide in
            if (rsvpContainerRef.current) {
              tl.fromTo(rsvpContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Details container - simple slide in
            if (detailsContainerRef.current) {
              tl.fromTo(detailsContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
      }, 300) // Small delay to ensure smooth transition
    }
  }, [location.pathname])

  const handleNavigation = (section) => {
    // If it's RSVP, open modal instead of navigating
    if (section.isModal && section.id === 'rsvp' && onOpenRSVP) {
      onOpenRSVP()
      return
    }

    // Scroll to top immediately
    window.scrollTo(0, 0)

    // Slide out animation before navigation
    if (navRef.current) {
      gsap.to(navRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          navigate(section.path)
          // Ensure scroll to top after navigation
          setTimeout(() => window.scrollTo(0, 0), 0)
        }
      })
    } else {
      navigate(section.path)
      // Ensure scroll to top after navigation
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat nav-index-bg" />
      
      {/* Blurry White Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm nav-index-overlay" />
      
      <div 
        ref={navRef}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
      >

        {/* Container 2: Rest of the Content */}
        <div className="relative">
          {/* Midnight Blue Envelope Image */}
        <div ref={envelopeRef} className="flex justify-center relative envelope-container">
          <img 
            src="/assets/images/graphics/dusty-blue.png" 
            alt="Wedding Invitation" 
            className="w-[60vw] h-auto object-contain"
          />
           {/* Flower 1 - Bottom Left */}
           <img 
             ref={flower1Ref}
             src="/assets/images/graphics/flower-1.png" 
             alt="Flower decoration" 
             className="absolute bottom-[0%] -left-[10%] w-[35vw] h-auto object-contain flower-1-rotate flower-1-container"
           />
        </div>

        {/* Container with border radius 50% and Polaroid Image */}
        <div className="flex justify-start items-start gap-6 relative oval-polaroid-container">
          {/* Oval Container */}
          <div 
            ref={ovalContainerRef}
            className="rounded-[50%] p-1 cursor-pointer transition-transform duration-300 hover:scale-105 oval-container"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/entourage')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/entourage')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            <div className="rounded-[50%] w-full h-full p-1 oval-border">
              <div className="rounded-[50%] w-full h-full flex flex-col items-center justify-center relative oval-border">
                {/* Text Content */}
                <div className="text-center px-4">
                  <p className="nanum-myeongjo-regular text-burgundy-dark mb-2 oval-text-for">
                    FOR THE
                  </p>
                  <p className="imperial-script-regular mb-4 underline oval-text-entourage">
                    Entourage
                  </p>
                  <p className="nanum-myeongjo-regular text-burgundy-dark oval-text-click">
                    CLICK HERE
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Polaroid Container Wrapper */}
          <div 
            className="relative polaroid-wrapper"
          >
            {/* Flower 4 - Top Right (under the image and container) */}
            <img 
              ref={flower4Ref}
              src="/assets/images/graphics/flower-4.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain flower-4"
            />
            
             {/* Rectangle Container with Thick Border */}
            <div 
              ref={polaroidRef}
               className="bg-white relative polaroid-container border-8 flex flex-col p-2"
               style={{ borderColor: '#7BA3C4', transform: 'none' }}
             >
              {/* Date, Month, Year at Top */}
              <div className="flex justify-between items-center w-full mb-2">
                <p className="font-boska polaroid-text-date uppercase text-burgundy-dark">
                  {couple.wedding.day}
                  <span className="polaroid-text-date-superscript align-top">th</span>
                </p>
                <p className="font-boska polaroid-text-date uppercase text-burgundy-dark">
                  {couple.wedding.month}
                </p>
                <p className="font-boska polaroid-text-date uppercase text-burgundy-dark">
                  {couple.wedding.year}
                </p>
              </div>
              
              {/* Please join us text */}
              <p className="imperial-script-regular text-center polaroid-text-invitation text-burgundy-dark mb-2">
                Please join us for the<br />
                wedding of
              </p>
              
              {/* Couple's Name */}
              <div className="text-center flex-1 flex flex-col items-center justify-center">
                {/* Groom's Name */}
                <div>
                  <p className="font-tebranos polaroid-text-name uppercase leading-tight" style={{ color: '#7BA3C4' }}>
                    {couple.groom.firstName}
                  </p>
                  <p className="font-ballet polaroid-text-name leading-tight -mt-4" style={{ color: themeConfig.text.light }}>
                    {couple.groom.lastName}
                  </p>
                </div>
                <p className="caudex-bold polaroid-text-and uppercase text-burgundy-dark leading-tight my-1">
                  AND
                </p>
                {/* Bride's Name */}
                <div>
                  <p className="font-tebranos polaroid-text-name uppercase leading-tight" style={{ color: '#7BA3C4' }}>
                    {couple.bride.firstName}
                  </p>
                  <p className="font-ballet polaroid-text-name leading-tight -mt-4" style={{ color: themeConfig.text.light }}>
                    {couple.bride.lastName}
                  </p>
                </div>
              </div>
              
              {/* Flower 3 - Bottom Left */}
              <img 
                ref={flower3Ref}
                src="/assets/images/graphics/flower-3.png" 
                alt="Flower decoration" 
                className="absolute bottom-0 left-0 h-auto object-contain flower-3"
              />
            </div>
          </div>
        </div>

        {/* Rectangle Container - Longer than wider */}
        <div className="flex justify-start items-start gap-6 relative rsvp-details-container">
          <div 
            ref={rsvpContainerRef}
            className="bg-white flex flex-col cursor-pointer transition-transform duration-300 relative rsvp-container"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.1)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'
            }}
            onClick={() => {
              if (onOpenRSVP) {
                onOpenRSVP()
              }
            }}
          >
            {/* Kindly RSVP Text */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
              <p className="nanum-myeongjo-regular text-center uppercase rsvp-text-kindly">
                Kindly
              </p>
              <p className="text-center rsvp-text-container">
                <span className="imperial-script-regular rsvp-text-r">R</span>
                <span className="nanum-myeongjo-regular rsvp-text-svp">SVP</span>
              </p>
            </div>
          </div>
          
          {/* New Container - Wider than long */}
          <div 
            ref={detailsContainerRef}
            className="bg-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 relative details-container"
            onClick={() => {
              window.scrollTo(0, 0)
              // Slide out animation before navigation
              if (navRef.current) {
                gsap.to(navRef.current, {
                  x: '-100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    navigate('/details')
                    setTimeout(() => window.scrollTo(0, 0), 0)
                  }
                })
              } else {
                navigate('/details')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }
            }}
          >
            {/* Text Content */}
            <div className="text-center px-4 relative z-10">
              <p className="nanum-myeongjo-regular text-burgundy-dark details-text-view">
                VIEW THE
              </p>
                <p className="imperial-script-regular underline details-text-details">
                  Details
                </p>
            </div>
          </div>
        </div>


          {/* Navigation Boxes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {sections.map((section) => {
              const isActive = location.pathname === section.path
              const isCountdown = section.id === 'counter'
              
              // For countdown, render as non-clickable div
              if (isCountdown) {
                return (
                  <div
                    key={section.id}
                    className="group relative opacity-70 cursor-default"
                  >
                    {/* Box with Section Name */}
                    <div 
                      className="px-4 py-6 rounded-lg border-2 text-center min-h-[80px] flex items-center justify-center bg-white border-burgundy-dark/30 text-burgundy-dark shadow-sm"
                    >
                      <span className="text-sm sm:text-base font-albert font-medium">
                        {section.name}
                      </span>
                    </div>
                  </div>
                )
              }
              
              // For other sections, render as clickable button
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavigation(section)}
                  className={`group relative transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 scale-105' 
                      : 'opacity-90 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={section.isModal ? `Open ${section.name} modal` : `Navigate to ${section.name}`}
                >
                  {/* Box with Section Name */}
                  <div 
                    className={`px-4 py-6 rounded-lg border-2 transition-all duration-300 text-center min-h-[80px] flex items-center justify-center ${
                      isActive
                        ? 'bg-burgundy-dark border-burgundy-dark text-white shadow-lg'
                        : 'bg-white border-burgundy-dark/40 text-burgundy-dark hover:border-burgundy-dark/60 hover:bg-white shadow-md'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-albert font-medium">
                      {section.name}
                    </span>
                  </div>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-dark rounded-full border-2 border-white" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Container 3: Counter */}
        <div className="relative">
          <Counter countdown={countdown} />
        </div>
      </div>
    </div>
  )
}

export default NavIndex

