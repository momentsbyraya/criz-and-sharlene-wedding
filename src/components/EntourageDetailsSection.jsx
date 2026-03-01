import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

// Helper function to remove middle initial from name
const removeMiddleInitial = (name) => {
  return name.replace(/\s+[A-Z]\.\s+/g, ' ').replace(/\s+/g, ' ').trim()
}

const EntourageDetailsSection = () => {
  const sectionRef = useRef(null)
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
  const flowerGirlsRef = useRef(null)

  const principalSponsors = entourage.entourageList.find(item => item.category === 'Principal Sponsors')
  const secondarySponsors = entourage.entourageList.find(item => item.category === 'Secondary Sponsors')
  const bestman = entourage.entourageList.find(item => item.category === 'Bestman')
  const maidOfHonor = entourage.entourageList.find(item => item.category === 'Maid of Honor') || entourage.entourageList.find(item => item.category === 'Matron')
  const bibleBearer = entourage.entourageList.find(item => item.category === 'Bible Bearer')
  const ringBearer = entourage.entourageList.find(item => item.category === 'Ring Bearer')
  const coinBearer = entourage.entourageList.find(item => item.category === 'Coin Bearer')
  const flowerGirls = entourage.entourageList.find(item => item.category === 'Flower Girls')

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    if (headerRef.current) {
      tl.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    }

    if (groomRef.current) {
      const groomName = groomRef.current.querySelector('p.font-poppins')
      const brideName = groomRef.current.parentElement?.querySelector('[class*="flex-1"]:last-child')?.querySelector('p.font-poppins')
      if (groomName && brideName) {
        gsap.set([groomName, brideName], { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: groomRef.current,
          start: 'top 85%',
          onEnter: () => gsap.to([groomName, brideName], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
          toggleActions: 'play none none reverse'
        })
      }
    }

    if (parentsRef.current) {
      const groomParentsDiv = parentsRef.current.querySelector('[class*="flex-1"]:first-child')
      const brideParentsDiv = parentsRef.current.querySelector('[class*="flex-1"]:last-child')
      if (groomParentsDiv && brideParentsDiv) {
        const groomNames = groomParentsDiv.querySelectorAll('p.font-poppins')
        const brideNames = brideParentsDiv.querySelectorAll('p.font-poppins')
        const maxLen = Math.max(groomNames.length, brideNames.length)
        const rows = []
        for (let i = 0; i < maxLen; i++) {
          const row = []
          if (groomNames[i]) row.push(groomNames[i])
          if (brideNames[i]) row.push(brideNames[i])
          if (row.length) rows.push(row)
        }
        rows.forEach(row => gsap.set(row, { opacity: 0, y: 20 }))
        ScrollTrigger.create({
          trigger: parentsRef.current,
          start: 'top 85%',
          onEnter: () => {
            rows.forEach((row, i) => {
              gsap.to(row, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.12 })
            })
          },
          toggleActions: 'play none none reverse'
        })
      }
    }

    if (principalSponsorsRef.current) {
      const ninong = principalSponsorsRef.current.querySelectorAll('.ninong-item')
      const ninang = principalSponsorsRef.current.querySelectorAll('.ninang-item')
      const maxLen = Math.max(ninong.length, ninang.length)
      const rows = []
      for (let i = 0; i < maxLen; i++) {
        const row = []
        if (ninong[i]) row.push(ninong[i])
        if (ninang[i]) row.push(ninang[i])
        if (row.length) rows.push(row)
      }
      rows.forEach(row => gsap.set(row, { opacity: 0, y: 20 }))
      ScrollTrigger.create({
        trigger: principalSponsorsRef.current,
        start: 'top 85%',
        onEnter: () => {
          rows.forEach((row, i) => {
            gsap.to(row, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.12 })
          })
        },
        toggleActions: 'play none none reverse'
      })
    }

    if (secondarySponsorsRef.current) {
      const groomsmen = secondarySponsorsRef.current.querySelectorAll('.groomsmen-item')
      const bridesmaids = secondarySponsorsRef.current.querySelectorAll('.bridesmaids-item')
      const maxLen = Math.max(groomsmen.length, bridesmaids.length)
      const rows = []
      for (let i = 0; i < maxLen; i++) {
        const row = []
        if (groomsmen[i]) row.push(groomsmen[i])
        if (bridesmaids[i]) row.push(bridesmaids[i])
        if (row.length) rows.push(row)
      }
      rows.forEach(row => gsap.set(row, { opacity: 0, y: 20 }))
      ScrollTrigger.create({
        trigger: secondarySponsorsRef.current,
        start: 'top 85%',
        onEnter: () => {
          rows.forEach((row, i) => {
            gsap.to(row, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.12 })
          })
        },
        toggleActions: 'play none none reverse'
      })
    }

    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef, flowerGirlsRef].filter(r => r.current)
    if (bearerRefs.length) {
      const container = bearerRefs[0].current.parentElement
      if (container) {
        bearerRefs.forEach(ref => {
          const names = ref.current?.querySelectorAll('p.font-poppins')
          if (names) gsap.set(Array.from(names), { opacity: 0, y: 20 })
        })
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          onEnter: () => {
            bearerRefs.forEach((ref, sectionIndex) => {
              const names = ref.current?.querySelectorAll('p.font-poppins')
              if (names) {
                gsap.to(Array.from(names), {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  delay: sectionIndex * 0.2,
                  stagger: 0.08
                })
              }
            })
          },
          toggleActions: 'play none none reverse'
        })
      }
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  const textColor = themeConfig.text.burgundyDark || '#5A1E2A'
  }, [])

  const accentColor = themeConfig.text.burgundyDark || '#5A1E2A'

  return (
    <section
      ref={sectionRef}
      id="entourage"
      data-section="entourage"
      className="relative w-full py-12"
    >
      <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
        <h2 ref={headerRef} className="text-2xl sm:text-3xl md:text-4xl mb-8 font-boska text-center" style={{ color: accentColor }}>
          Entourage
        </h2>

        {/* Groom and Bride */}
        <div ref={groomRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
          <div className="flex-1">
            <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-right uppercase" style={{ color: accentColor }}>Name Of Groom</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-right text-burgundy-dark whitespace-nowrap overflow-hidden text-ellipsis">{removeMiddleInitial(entourage.couple.groom.name)}</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-left uppercase" style={{ color: accentColor }}>Name Of Bride</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-left text-burgundy-dark whitespace-nowrap overflow-hidden text-ellipsis">{removeMiddleInitial(entourage.couple.bride.name)}</p>
          </div>
        </div>

        {/* Parents */}
        <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
          <div className="flex-1">
            <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-right uppercase" style={{ color: accentColor }}>Parents of the Groom</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-right text-burgundy-dark">{entourage.parents.groom.father}</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-right text-burgundy-dark">{entourage.parents.groom.mother}</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-left uppercase" style={{ color: accentColor }}>Parents of the Bride</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-left text-burgundy-dark">{entourage.parents.bride.father}</p>
            <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-left text-burgundy-dark">{entourage.parents.bride.mother}</p>
          </div>
        </div>

        {/* Principal Sponsors */}
        {principalSponsors && (
          <div ref={principalSponsorsRef} className="mb-6">
            <h3 className="text-base sm:text-lg imperial-script-regular mb-4 text-center" style={{ color: accentColor }}>Principal sponsors</h3>
            <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-right uppercase" style={{ color: accentColor }}>NINONG</p>
                <div className="space-y-2">
                  {principalSponsors.ninong?.map((name, index) => (
                    <p key={index} className="ninong-item text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-right whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-left uppercase" style={{ color: accentColor }}>NINANG</p>
                <div className="space-y-2">
                  {principalSponsors.ninang?.map((name, index) => (
                    <p key={index} className="ninang-item text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-left whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Sponsors */}
        {secondarySponsors && (
          <div ref={secondarySponsorsRef} className="mb-6">
            <h3 className="text-base sm:text-lg imperial-script-regular mb-4 text-center" style={{ color: accentColor }}>Secondary sponsors</h3>
            <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center mb-4">
              {bestman && (
                <div ref={bestmanRef} className="flex-1">
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-right uppercase" style={{ color: accentColor }}>Bestman</p>
                  {bestman.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-right">{name}</p>
                  ))}
                </div>
              )}
              {maidOfHonor && (
                <div ref={maidOfHonorRef} className="flex-1">
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-left uppercase" style={{ color: accentColor }}>{maidOfHonor.category === 'Matron' ? 'Matron' : 'Maid Of Honor'}</p>
                  {maidOfHonor.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-left">{name}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start">
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-right uppercase" style={{ color: accentColor }}>Groomsmen</p>
                <div className="space-y-2">
                  {secondarySponsors.groomsmen?.map((name, index) => (
                    <p key={index} className="groomsmen-item text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-right whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-left uppercase" style={{ color: accentColor }}>Bridesmaids</p>
                <div className="space-y-2">
                  {secondarySponsors.bridesmaid?.map((name, index) => (
                    <p key={index} className="bridesmaids-item text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-left whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bible / Ring / Coin Bearer & Flower Girls */}
        {(bibleBearer || ringBearer || coinBearer || flowerGirls) && (
          <div className="mb-6">
            <div className="flex flex-col gap-4 justify-center items-center mt-4">
              {bibleBearer && (
                <div ref={bibleBearerRef}>
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-center uppercase" style={{ color: accentColor }}>Bible Bearer</p>
                  {bibleBearer.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                  ))}
                </div>
              )}
              {ringBearer && (
                <div ref={ringBearerRef}>
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-center uppercase" style={{ color: accentColor }}>Ring Bearer</p>
                  {ringBearer.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                  ))}
                </div>
              )}
              {coinBearer && (
                <div ref={coinBearerRef}>
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-center uppercase" style={{ color: accentColor }}>Coin Bearer</p>
                  {coinBearer.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                  ))}
                </div>
              )}
              {flowerGirls && (
                <div ref={flowerGirlsRef}>
                  <p className="text-[10px] sm:text-sm md:text-base alice-regular mb-2 text-center uppercase" style={{ color: accentColor }}>Flower Girls</p>
                  {flowerGirls.names?.map((name, index) => (
                    <p key={index} className="text-[10px] sm:text-sm md:text-base font-poppins uppercase text-burgundy-dark text-center">{name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default EntourageDetailsSection
