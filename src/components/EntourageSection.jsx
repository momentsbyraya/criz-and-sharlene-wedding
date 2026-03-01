import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage, couple } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EntourageSection = () => {
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

  useEffect(() => {
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
    
    // Animate all collected rows sequentially when section comes into view
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

  const officiatingMinister = entourage.entourageList.find(item => item.category === "Officiating Minister")
  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const matron = entourage.entourageList.find(item => item.category === "Matron")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const flowerBoys = entourage.entourageList.find(item => item.category === "Flower Boys")
  const hereComesTheBride = entourage.entourageList.find(item => item.category === "Here comes the bride")
  const veilSponsors = entourage.entourageList.find(item => item.category === "Veil Sponsors")
  const cordSponsors = entourage.entourageList.find(item => item.category === "Cord Sponsors")
  const candleSponsors = entourage.entourageList.find(item => item.category === "Candle Sponsors")
  const juniorFlowerGirls = entourage.entourageList.find(item => item.category === "Junior Flower Girls")
  const littleFlowerGirls = entourage.entourageList.find(item => item.category === "Little Flower Girls")
  const flowerGirls = entourage.entourageList.find(item => item.category === "Flower Girls")
  const littleBride = entourage.entourageList.find(item => item.category === "Little Bride")

  return (
    <section
      id="entourage"
      data-section="entourage"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/beige-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35
        }}
      ></div>
      
      {/* Flower Banner - Top */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div>
      <div className="relative z-20 flex items-center justify-center py-8 sm:py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Section Header - Centered */}
          <div className="w-full text-center py-2 mb-10">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase" style={{ lineHeight: '0.8', color: themeConfig.text.burntOrange || '#5A1E2A' }}>
                ENTOURAGE
              </span>
            </h2>
          </div>

          {/* Entourage content - formal layout */}
          <div id="entourage-details">
            <div className="pt-2 pb-4 space-y-10">

          {/* PARENTS - Two columns: Parents of the Groom | Parents of the Bride */}
          <div ref={parentsRef} className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-3 text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Parents of the Groom</p>
              <div className="space-y-1 text-right">
                {entourage.parents.groom.father && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.groom.father}</p>}
                {entourage.parents.groom.mother && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.groom.mother}</p>}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-3 text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Parents of the Bride</p>
              <div className="space-y-1 text-left">
                {entourage.parents.bride.father && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.bride.father}</p>}
                {entourage.parents.bride.mother && <p className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark">{entourage.parents.bride.mother}</p>}
              </div>
            </div>
          </div>

          {/* PRINCIPAL SPONSORS - Two equal columns: Ninong | Ninang */}
          {principalSponsors && (() => {
            const ninongs = principalSponsors.ninong || []
            const ninangs = principalSponsors.ninang || []
            return (
              <div ref={principalSponsorsRef}>
                <h3 className="text-lg sm:text-xl md:text-2xl imperial-script-regular mb-6 text-center" style={{ color: themeConfig.text.burntOrange }}>Principal sponsors</h3>
                <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Ninong</p>
                    <div className="space-y-1.5">
                      {ninongs.map((name, index) => (
                        <p key={index} className="ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Ninang</p>
                    <div className="space-y-1.5">
                      {ninangs.map((name, index) => (
                        <p key={index} className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* BEST MAN | MAID OF HONOR - Side by side */}
          <div className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
            {bestman && (
              <div ref={bestmanRef} className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Best Man</p>
                {bestman.names && bestman.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                ))}
              </div>
            )}
            {(maidOfHonor || matron) && (
              <div ref={maidOfHonorRef} className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Maid of Honor</p>
                {(maidOfHonor || matron)?.names && (maidOfHonor || matron).names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                ))}
              </div>
            )}
          </div>

          {/* SECONDARY SPONSORS - Centered section title */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl imperial-script-regular mb-8 text-center" style={{ color: themeConfig.text.burntOrange }}>Secondary sponsors</h3>

            {/* To Light Our Path / Candle - Centered block */}
            {candleSponsors && (
              <div ref={candleSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Candle</p>
                {candleSponsors.names && candleSponsors.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                ))}
              </div>
            )}

            {/* To Clothe Us One / Veil - Centered block */}
            {veilSponsors && (
              <div ref={veilSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Veil</p>
                {veilSponsors.names && veilSponsors.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                ))}
              </div>
            )}

            {/* To Bind Us Together / Cord - Centered block */}
            {cordSponsors && (
              <div ref={cordSponsorsRef} className="mb-8 flex flex-col gap-1 justify-center items-center">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Cord</p>
                {cordSponsors.names && cordSponsors.names.map((name, index) => (
                  <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                ))}
              </div>
            )}

            {/* GROOMSMEN | BRIDESMAIDS - Two columns */}
            {secondarySponsors && (
              <div ref={secondarySponsorsRef} className="flex flex-row gap-6 sm:gap-10 justify-center items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-right uppercase" style={{ color: themeConfig.text.sageGreen }}>Groomsmen</p>
                  <div className="space-y-1.5">
                    {secondarySponsors.groomsmen && secondarySponsors.groomsmen.map((name, index) => (
                      <p key={index} className="groomsmen-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-left uppercase" style={{ color: themeConfig.text.sageGreen }}>Bridesmaids</p>
                  <div className="space-y-1.5">
                    {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                      <p key={index} className="bridesmaids-item text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RING BEARER - Centered */}
          {ringBearer && (
            <div ref={ringBearerRef} className="flex flex-col gap-1 justify-center items-center">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Ring Bearer</p>
              {ringBearer.names && ringBearer.names.map((name, index) => (
                <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
              ))}
            </div>
          )}

          {/* BIBLE BEARER - Centered */}
          {bibleBearer && (
            <div ref={bibleBearerRef} className="flex flex-col gap-1 justify-center items-center">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Bible Bearer</p>
              {bibleBearer.names && bibleBearer.names.map((name, index) => (
                <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
              ))}
            </div>
          )}

          {/* COIN BEARER - Centered */}
          {coinBearer && (
            <div ref={coinBearerRef} className="flex flex-col gap-1 justify-center items-center">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Coin Bearer</p>
              {coinBearer.names && coinBearer.names.map((name, index) => (
                <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
              ))}
            </div>
          )}

          {/* FLOWER GIRLS - Centered */}
          {flowerGirls && (
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-[10px] sm:text-[13px] md:text-[15px] caudex-bold mb-2 text-center uppercase" style={{ color: themeConfig.text.sageGreen }}>Flower Girls</p>
              {flowerGirls.names && flowerGirls.names.map((name, index) => (
                <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] font-poppins uppercase text-burgundy-dark text-center">{name}</p>
              ))}
            </div>
          )}

            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Flower Banner - Bottom */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>
    </section>
  )
}

export default EntourageSection
