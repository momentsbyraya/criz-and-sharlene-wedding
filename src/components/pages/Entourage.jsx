import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { entourage, couple } from '../../data'
import { themeConfig } from '../../config/themeConfig'
import './Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const flowerBoysRef = useRef(null)
  const hereComesTheBrideRef = useRef(null)
  const veilSponsorsRef = useRef(null)
  const cordSponsorsRef = useRef(null)
  const candleSponsorsRef = useRef(null)
  const juniorFlowerGirlsRef = useRef(null)
  const littleFlowerGirlsRef = useRef(null)
  const flowersContainerRef = useRef(null)

  useLayoutEffect(() => {
    const pageLoadTime = performance.now()
    console.log('Current page: Entourage')
    console.log('Page load time:', pageLoadTime, 'ms')
    
    // Start falling flowers animation immediately when page opens
    // The first flower (delay-0) starts immediately, others follow with their delays
    const startAnimations = () => {
      const animationStartTime = performance.now()
      const timeSincePageLoad = ((animationStartTime - pageLoadTime) / 1000).toFixed(2)
      
      if (flowersContainerRef.current) {
        const flowers = flowersContainerRef.current.querySelectorAll('.falling-flower')
        console.log('Found flowers:', flowers.length)
        
        if (flowers.length > 0) {
          let delayZeroFound = false
          flowers.forEach((flower, index) => {
            // Remove any existing animation delay for delay-0 to start immediately
            if (flower.classList.contains('delay-0')) {
              delayZeroFound = true
              
              // Force restart animation by removing and re-adding
              flower.style.animation = 'none'
              void flower.offsetWidth // Force reflow
              
              // Set initial transform to start delay-0 flowers at top of viewport (immediately visible)
              // Start from 0vh instead of -100vh so they're visible right away
              flower.style.transform = 'translateY(0vh) rotate(0deg)'
              flower.style.opacity = '0.6'
              flower.style.animationDelay = '0s'
              flower.style.animationPlayState = 'running'
              
              // Re-apply animation - it will continue from the current transform
              const speedClass = flower.classList.toString().match(/speed-(slow|medium|fast)/)?.[1] || 'medium'
              const duration = speedClass === 'slow' ? 15 : speedClass === 'fast' ? 8 : 12
              
              // Create custom keyframes that start from 0vh (visible) instead of -100vh
              const animationName = `fallingSnowVisible-${speedClass}`
              if (!document.getElementById(`style-${animationName}`)) {
                const style = document.createElement('style')
                style.id = `style-${animationName}`
                style.textContent = `
                  @keyframes ${animationName} {
                    0% {
                      transform: translateY(0vh) rotate(0deg);
                      opacity: 0.6;
                    }
                    90% {
                      opacity: 0.6;
                    }
                    100% {
                      transform: translateY(100vh) rotate(360deg);
                      opacity: 0;
                    }
                  }
                `
                document.head.appendChild(style)
              }
              
              flower.style.animation = `${animationName} ${duration}s linear infinite`
              
              // Check computed styles to verify what's actually applied
              const computedStyle = window.getComputedStyle(flower)
              const computedDelay = computedStyle.animationDelay
              const computedPlayState = computedStyle.animationPlayState
              const computedOpacity = computedStyle.opacity
              const computedTop = computedStyle.top
              const computedTransform = computedStyle.transform
              
              console.log(`Flower ${index} (delay-0): Animation started at ${timeSincePageLoad}s`)
              console.log(`  - Computed animation-delay: ${computedDelay}`)
              console.log(`  - Computed animation-play-state: ${computedPlayState}`)
              console.log(`  - Computed opacity: ${computedOpacity}`)
              console.log(`  - Computed top: ${computedTop}`)
              console.log(`  - Computed transform: ${computedTransform}`)
              console.log(`  - Element visible: ${flower.offsetParent !== null}`)
            } else {
              const delay = flower.classList.toString().match(/delay-(\d+)/)?.[1] || 'unknown'
              flower.style.animationPlayState = 'running'
              
              // Check computed styles for other flowers too
              const computedStyle = window.getComputedStyle(flower)
              const computedDelay = computedStyle.animationDelay
              
              console.log(`Flower ${index} (delay-${delay}): Animation play state set at ${timeSincePageLoad}s`)
              console.log(`  - Computed animation-delay: ${computedDelay}`)
            }
            // Trigger reflow to ensure animation starts
            void flower.offsetWidth
          })
          
          if (!delayZeroFound) {
            console.warn('WARNING: No delay-0 flower found!')
          }
          
          console.log(`Snow effect started after: ${timeSincePageLoad}sec`)
        } else {
          console.warn('No flowers found in container!')
        }
      } else {
        console.warn('Flowers container ref is null!')
      }
    }
    
    // Try immediately
    console.log('Attempting to start animations immediately...')
    startAnimations()
    
    // Also try on next frame in case DOM isn't ready
    requestAnimationFrame(() => {
      console.log('Attempting to start animations on next frame...')
      startAnimations()
    })
  }, [])

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }
    
    // Set initial hidden states for all name elements to prevent flash
    const allNameElements = sectionRef.current?.querySelectorAll('p.font-poppins, .ninong-item, .ninang-item, .groomsmen-item, .bridesmaids-item')
    if (allNameElements && allNameElements.length > 0) {
      gsap.set(allNameElements, { opacity: 0, y: 20 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.6 }
      )
    }

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )


    // Collect all names from Parents down to Flower Girls for sequential row-by-row animation
    const allNameRows = []
    let currentTime = 0
    
    // Parents section - collect rows
    if (parentsRef.current) {
      const groomParents = parentsRef.current.querySelectorAll('.flex-1:first-child p.font-poppins')
      const brideParents = parentsRef.current.querySelectorAll('.flex-1:last-child p.font-poppins')
      
      if (groomParents.length > 0 && brideParents.length > 0) {
        const maxLength = Math.max(groomParents.length, brideParents.length)
        gsap.set([...groomParents, ...brideParents], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomParents[i]) row.push(groomParents[i])
          if (brideParents[i]) row.push(brideParents[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Bestman and Maid of Honor - collect rows (right after Parents)
    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')
      
      if (bestmanNames.length > 0 || maidOfHonorNames.length > 0) {
        const maxLength = Math.max(bestmanNames.length, maidOfHonorNames.length)
        gsap.set([...bestmanNames, ...maidOfHonorNames], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (bestmanNames[i]) row.push(bestmanNames[i])
          if (maidOfHonorNames[i]) row.push(maidOfHonorNames[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Principal Sponsors - collect rows
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      if (ninongElements && ninangElements && ninongElements.length > 0) {
        const maxLength = Math.max(ninongElements.length, ninangElements.length)
        gsap.set([...ninongElements, ...ninangElements], { opacity: 0, y: 20 })
        
        // Collect paired rows
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (ninongElements[i]) row.push(ninongElements[i])
          if (ninangElements[i]) row.push(ninangElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
    }
    }

        // Collect unpaired ninangs
        const unpairedNinangs = principalSponsorsRef.current?.querySelectorAll('.mt-4 .ninang-item')
        if (unpairedNinangs && unpairedNinangs.length > 0) {
          gsap.set(unpairedNinangs, { opacity: 0, y: 20 })
          Array.from(unpairedNinangs).forEach(ninang => {
            allNameRows.push({ elements: [ninang], time: currentTime })
            currentTime += 0.1
      })
    }
      }
    }

    // Secondary Sponsors - collect Candle, Veil, Cord Sponsors (single column - one name per row)
    const sponsorRefs = [candleSponsorsRef, veilSponsorsRef, cordSponsorsRef].filter(ref => ref.current)
    sponsorRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })
    
    // Bible Bearer, Ring Bearer, Coin Bearer, Flower Boys - collect (single column - one name per row)
    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef, flowerBoysRef].filter(ref => ref.current)
      bearerRefs.forEach(ref => {
        const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })
    
    // Groomsmen + Bridesmaids - collect rows
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      if (groomsmenElements && bridesmaidsElements && groomsmenElements.length > 0) {
        const maxLength = Math.max(groomsmenElements.length, bridesmaidsElements.length)
        gsap.set([...groomsmenElements, ...bridesmaidsElements], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomsmenElements[i]) row.push(groomsmenElements[i])
          if (bridesmaidsElements[i]) row.push(bridesmaidsElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Junior Flower Girls - collect (single column - one name per row)
    if (juniorFlowerGirlsRef.current) {
      const names = juniorFlowerGirlsRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
              })
      }
    }

    // Little Flower Girls - collect (single column - one name per row)
    if (littleFlowerGirlsRef.current) {
      const names = littleFlowerGirlsRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    // Here comes the bride - collect (single column - one name per row)
    if (hereComesTheBrideRef.current) {
      const names = hereComesTheBrideRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }
    
    // Animate all collected rows sequentially when any section comes into view
    if (allNameRows.length > 0 && parentsRef.current) {
        ScrollTrigger.create({
        trigger: parentsRef.current,
          start: "top 80%",
          onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements, time }) => {
            masterTl.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }, time)
            })
          },
          toggleActions: "play none none reverse"
        })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const bannerBearer = entourage.entourageList.find(item => item.category === "Banner Bearer")
  const flowerGirls = entourage.entourageList.find(item => item.category === "Flower Girls")
  const flowerBoys = entourage.entourageList.find(item => item.category === "Flower Boys")
  const hereComesTheBride = entourage.entourageList.find(item => item.category === "Here comes the bride")
  const veilSponsors = entourage.entourageList.find(item => item.category === "Veil Sponsors")
  const cordSponsors = entourage.entourageList.find(item => item.category === "Cord Sponsors")
  const candleSponsors = entourage.entourageList.find(item => item.category === "Candle Sponsors")
  const juniorFlowerGirls = entourage.entourageList.find(item => item.category === "Junior Flower Girls")
  const littleFlowerGirls = entourage.entourageList.find(item => item.category === "Little Flower Girls")

  return (
    <>
      {/* Falling Snow Effect - Flower-3 (fixed to viewport, independent of scroll) */}
      <div ref={flowersContainerRef}>
        {[...Array(20)].map((_, i) => {
          const leftPosition = `${(i * 5) % 100}%`
          const sizeClass = i % 3 === 0 ? 'size-small' : i % 3 === 1 ? 'size-medium' : 'size-large'
          const speedClass = i % 3 === 0 ? 'speed-slow' : i % 3 === 1 ? 'speed-medium' : 'speed-fast'
          const delayClass = `delay-${i % 15}`
          const isDelayZero = (i % 15) === 0

          return (
            <div
              key={`falling-flower-${i}`}
              className={`falling-flower ${sizeClass} ${speedClass} ${delayClass}`}
              style={{ 
                left: leftPosition,
                ...(isDelayZero && {
                  animationDelay: '0s',
                  opacity: '0.6',
                  animationPlayState: 'running'
                })
              }}
            >
              <img 
                src="/assets/images/graphics/flower-3.png" 
                alt="Falling flower"
              />
            </div>
          )
        })}
      </div>

      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative w-full overflow-hidden px-6 py-32 sm:py-40 md:py-44 lg:py-52"
        style={{ 
          opacity: 0, 
          transform: 'translateX(100%)'
        }}
      >
        {/* Flower Banner - Top (absolute, full viewport width, container matches image size) */}
        <div
          className="absolute top-0 flex items-center justify-center"
          style={{ left: 0, width: '100vw' }}
        >
        <img 
            src="/assets/images/graphics/flower-banner.png" 
            alt="Flower banner"
            style={{ width: '100vw', height: 'auto', display: 'block' }}
        />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center py-12">
          <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                {/* Couple Names */}
                <div className="flex flex-col items-center justify-center">
                  {/* Groom's Name */}
                  <div>
                    <p className="font-tebranos text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-tight" style={{ color: '#7BA3C4' }}>
                      {couple.groom.firstName}
                    </p>
                    <p className="font-ballet text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight -mt-4" style={{ color: themeConfig.text.light }}>
                      {couple.groom.lastName}
                    </p>
                  </div>
                  <p className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl uppercase leading-tight my-1" style={{ color: '#7BA3C4' }}>
                    AND
                  </p>
                  {/* Bride's Name */}
                  <div>
                    <p className="font-tebranos text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-tight" style={{ color: '#7BA3C4' }}>
                      {couple.bride.firstName}
                    </p>
                    <p className="font-ballet text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight -mt-4" style={{ color: themeConfig.text.light }}>
                      {couple.bride.lastName}
                    </p>
                  </div>
                </div>
                {/* NUPTIALS */}
                <div className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase mt-8" style={{ lineHeight: '0.8', color: '#7BA3C4' }}>
                  NUPTIALS
                </div>
              </h2>
            </div>

            {/* Formal entourage layout */}
            <div className="space-y-10">
              {/* PARENTS - Two columns */}
              <div ref={parentsRef} className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-3 text-right uppercase" style={{ color: '#7BA3C4' }}>Parents of the Groom</p>
                  <div className="space-y-1 text-right">
                    {entourage.parents.groom.father && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.groom.father}</p>}
                    {entourage.parents.groom.mother && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.groom.mother}</p>}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-3 text-left uppercase" style={{ color: '#7BA3C4' }}>Parents of the Bride</p>
                  <div className="space-y-1 text-left">
                    {entourage.parents.bride.father && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.bride.father}</p>}
                    {entourage.parents.bride.mother && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.bride.mother}</p>}
                  </div>
                </div>
              </div>

              {/* PRINCIPAL SPONSORS - Two columns */}
              {principalSponsors && (
                <div ref={principalSponsorsRef}>
                  <h3 className="text-lg sm:text-xl md:text-2xl imperial-script-regular font-bold mb-6 text-center" style={{ color: '#7BA3C4' }}>Principal sponsors</h3>
                  <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: '#7BA3C4' }}>Ninong</p>
                      <div className="space-y-1.5">
                        {(principalSponsors.ninong || []).map((name, index) => (
                          <p key={index} className="ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: '#7BA3C4' }}>Ninang</p>
                      <div className="space-y-1.5">
                        {(principalSponsors.ninang || []).map((name, index) => (
                          <p key={index} className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BEST MAN | MAID OF HONOR */}
              <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                {bestman && (
                  <div ref={bestmanRef} className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: '#7BA3C4' }}>Best Man</p>
                    {bestman.names && bestman.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                    ))}
                  </div>
                )}
                {maidOfHonor && (
                  <div ref={maidOfHonorRef} className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: '#7BA3C4' }}>Maid of Honor</p>
                    {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* SECONDARY SPONSORS - Centered title, then three centered blocks, then Groomsmen|Bridesmaids */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl imperial-script-regular font-bold mb-8 text-center" style={{ color: '#7BA3C4' }}>Secondary sponsors</h3>

                {candleSponsors && (
                  <div ref={candleSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Candle</p>
                    {candleSponsors.names && candleSponsors.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
                {veilSponsors && (
                  <div ref={veilSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Veil</p>
                    {veilSponsors.names && veilSponsors.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
                {cordSponsors && (
                  <div ref={cordSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Cord</p>
                    {cordSponsors.names && cordSponsors.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}

                {secondarySponsors && (
                  <div ref={secondarySponsorsRef} className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: '#7BA3C4' }}>Groomsmen</p>
                      <div className="space-y-1.5">
                        {secondarySponsors.groomsmen && secondarySponsors.groomsmen.map((name, index) => (
                          <p key={index} className="groomsmen-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: '#7BA3C4' }}>Bridesmaids</p>
                      <div className="space-y-1.5">
                        {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                          <p key={index} className="bridesmaids-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FLOWER GIRLS */}
              {flowerGirls && (
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Flower Girls</p>
                  {flowerGirls.names && flowerGirls.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                  ))}
                </div>
              )}

              {/* COIN BEARER | BIBLE BEARER - Two columns */}
              <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                {coinBearer && (
                  <div ref={coinBearerRef} className="flex-1 min-w-0 flex flex-col gap-1 items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Coin Bearer</p>
                    {coinBearer.names && coinBearer.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
                {bibleBearer && (
                  <div ref={bibleBearerRef} className="flex-1 min-w-0 flex flex-col gap-1 items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Bible Bearer</p>
                    {bibleBearer.names && bibleBearer.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* RING BEARER | BANNER BEARER - Two columns */}
              <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                {ringBearer && (
                  <div ref={ringBearerRef} className="flex-1 min-w-0 flex flex-col gap-1 items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Ring Bearer</p>
                    {ringBearer.names && ringBearer.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
                {bannerBearer && (
                  <div className="flex-1 min-w-0 flex flex-col gap-1 items-center">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: '#7BA3C4' }}>Banner Bearer</p>
                    {bannerBearer.names && bannerBearer.names.map((name, index) => (
                      <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
        </div>

        {/* Flower Banner - Bottom (absolute, full viewport width, container matches image size, flipped vertically) */}
        <div
          className="absolute bottom-0 flex items-center justify-center"
          style={{ left: 0, width: '100vw' }}
        >
          <img 
            src="/assets/images/graphics/flower-banner.png" 
            alt="Flower banner" 
            style={{ width: '100vw', height: 'auto', display: 'block', transform: 'scaleY(-1)', transformOrigin: 'center' }}
          />
        </div>
      </section>
      
      {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
      <button
        ref={backButtonRef}
        onClick={() => {
          // Slide out page to the left before navigating
          if (sectionRef.current) {
            gsap.to(sectionRef.current, {
              x: '-100%',
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                navigate('/')
              }
            })
          } else {
            navigate('/')
          }
        }}
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-burgundy-dark text-white rounded-full shadow-lg hover:bg-burgundy-wine hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
    </>
  )
}

export default Entourage
