import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

// recep1 as main (first) image, then recep2–6
const VENUE_CAROUSEL_IMAGES = [
  '/assets/images/venues/recep1.jpg',
  '/assets/images/venues/recep2.jpg',
  '/assets/images/venues/recep3.jpg',
  '/assets/images/venues/recep4.jpg',
  '/assets/images/venues/recep5.jpg',
  '/assets/images/venues/recep6.jpg',
]

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const goPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? VENUE_CAROUSEL_IMAGES.length - 1 : prev - 1))
  }
  const goNext = () => {
    setCurrentSlide((prev) => (prev === VENUE_CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImage = venueContainer.querySelector('.venue-image-container')
      const venueContent = venueContainer.querySelector('.venue-details')
      const venueTextBlocks = venueContent ? venueContent.querySelectorAll('.venue-details > div:not(:last-child), .venue-details > div:last-child') : []
      if (venueImage) gsap.set(venueImage, { opacity: 0, x: -30 })
      if (venueContent) gsap.set(venueContent, { opacity: 0, x: 30 })
      if (venueTextBlocks.length) gsap.set(venueTextBlocks, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: venueRef.current,
        start: "top 75%",
        onEnter: () => {
          if (venueImage) gsap.to(venueImage, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          if (venueContent) gsap.to(venueContent, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          if (venueTextBlocks.length) {
            gsap.to(venueTextBlocks, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12, delay: 0.35 })
          }
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text">
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div ref={venueRef} className="relative overflow-visible flex flex-col items-center w-full max-w-2xl mx-auto">
        {/* Carousel - main image (recep1 first) */}
        <div className="venue-image-container w-full aspect-[4/3] sm:aspect-[5/3] relative overflow-hidden rounded-xl border-2 border-burgundy-wine/20 bg-white/90 flex-shrink-0">
          {VENUE_CAROUSEL_IMAGES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${reception.name} view ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}
            />
          ))}
          {/* Prev / Next */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-burgundy-wine/30 flex items-center justify-center shadow-md transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-burgundy-dark" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-burgundy-wine/30 flex items-center justify-center shadow-md transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-burgundy-dark" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {VENUE_CAROUSEL_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="venue-details w-full flex flex-col gap-4 px-2 mt-6 text-center max-w-md mx-auto">
          <div className="text-lg sm:text-xl font-boska text-burgundy-dark">
            {reception.name}
          </div>
          <div className="text-sm sm:text-base font-albert font-thin text-burgundy-dark space-y-1">
            <p>Ceremony: {ceremony.time}</p>
            <p>Reception: {reception.time}</p>
          </div>
          <div className="flex justify-center">
            <SecondaryButton
              href={reception.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={ArrowRight}
            >
              Get Direction
            </SecondaryButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
