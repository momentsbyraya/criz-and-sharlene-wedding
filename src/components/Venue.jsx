import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const carouselRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const venueSlides = [
    { src: '/assets/images/venues/reception.JPG', alt: 'Ceremony Venue', venue: ceremony },
    { src: '/assets/images/venues/ceremony.JPG', alt: 'Reception Venue', venue: reception }
  ]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % venueSlides.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + venueSlides.length) % venueSlides.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (diff > minSwipe) nextImage()
    else if (diff < -minSwipe) prevImage()
  }

  useEffect(() => {
    // Venue Title animation
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

    // Venue animation - animate image and content
    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImage = venueContainer.querySelector('.venue-image-container')
      const venueContent = venueContainer.querySelector('.venue-details-mobile, .venue-details-desktop')
      if (venueImage) {
        gsap.set(venueImage, { opacity: 0, x: -30 })
      }
      if (venueContent) {
        gsap.set(venueContent, { opacity: 0, x: 30 })
      }
      ScrollTrigger.create({
        trigger: venueRef.current,
        start: "top 75%",
        onEnter: () => {
          if (venueImage) {
            gsap.to(venueImage, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          }
          if (venueContent) {
            gsap.to(venueContent, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          }
        }
      })
    }

    // Cleanup function
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
      {/* Venue Title */}
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venue Container */}
      <div ref={venueRef} className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div className="text-center transition-opacity duration-500 ease-in-out">
            {/* ——— Mobile: Carousel (1 slide) + dynamic location info ——— */}
            <div className="md:hidden flex flex-col gap-6 items-center">
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={prevImage}
                  className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Previous location"
                >
                  <ChevronLeft className="w-8 h-8 text-burgundy-wine" />
                </button>

                <div
                  className="w-full max-w-[220px] sm:max-w-[240px] aspect-square relative venue-image-container overflow-hidden rounded-full"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {venueSlides.map((slide, index) => (
                      <div
                        key={index}
                        className={`min-w-full aspect-square flex-shrink-0 ${index === 1 ? 'flex items-center justify-center p-4' : ''}`}
                      >
                        {index === 1 ? (
                          <span className="text-center text-sm sm:text-base font-boska text-burgundy-dark leading-tight">
                            {reception.name}
                          </span>
                        ) : (
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {venueSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex ? 'bg-burgundy-wine w-6' : 'bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextImage}
                  className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Next location"
                >
                  <ChevronRight className="w-8 h-8 text-burgundy-wine" />
                </button>
              </div>

              {/* Dynamic content: updates with current slide */}
              <div className="venue-details-mobile w-full flex flex-col gap-4 px-2">
                <div className="text-lg sm:text-xl font-boska text-burgundy-dark text-center">
                  {venueSlides[currentIndex].venue.name}
                </div>
                <div className="text-sm sm:text-base font-albert font-thin text-burgundy-dark text-center space-y-1">
                  {currentIndex === 0 ? (
                    <p>Ceremony: {ceremony.time}</p>
                  ) : (
                    <p>Reception: {reception.time} onwards</p>
                  )}
                </div>
                {currentIndex === 0 && (
                  <div className="flex justify-center">
                    <SecondaryButton
                      href={venueSlides[currentIndex].venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ArrowRight}
                    >
                      Get Direction
                    </SecondaryButton>
                  </div>
                )}
              </div>
            </div>

            {/* ——— Tablet/Desktop: Two circular images side by side, each with full info ——— */}
            <div className="hidden md:flex venue-details-desktop gap-6 lg:gap-8 w-full max-w-[640px] lg:max-w-[760px] xl:max-w-[840px] mx-auto justify-center items-stretch">
              {venueSlides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col gap-4 min-w-0 max-w-[320px] lg:max-w-[380px]"
                >
                  <div className="w-full aspect-square relative venue-image-container flex-shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-white/90 border-2 border-burgundy-wine/20">
                    {index === 1 ? (
                      <span className="text-center text-base sm:text-lg lg:text-xl font-boska text-burgundy-dark leading-tight px-4">
                        {reception.name}
                      </span>
                    ) : (
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-center flex-1">
                    <div className="text-lg sm:text-xl lg:text-2xl font-boska text-burgundy-dark">
                      {slide.venue.name}
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-burgundy-dark space-y-1">
                      {index === 0 ? (
                        <p>Ceremony: {ceremony.time}</p>
                      ) : (
                        <p>Reception: {reception.time} onwards</p>
                      )}
                    </div>
                    {index === 0 && (
                      <div className="flex justify-center mt-2">
                        <SecondaryButton
                          href={slide.venue.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          icon={ArrowRight}
                        >
                          Get Direction
                        </SecondaryButton>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
