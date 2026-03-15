import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const SWIPE_THRESHOLD_PX = 50

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const Venue = () => {
  const venueSectionRef = useRef(null)
  const venueTitleRef = useRef(null)
  const carouselTrackRef = useRef(null)
  const carouselViewportRef = useRef(null)
  const touchStartX = useRef(0)
  const dragOffset = useRef(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const ceremonyImage = ceremony.images?.[0] ?? '/assets/images/venues/ceremony-1.jpg'
  const receptionImage = reception.images?.[0] ?? '/assets/images/venues/reception-1.jpg'

  const eventSlides = [
    {
      title: 'Ceremony',
      image: ceremonyImage,
      location: ceremony.name,
      time: ceremony.time,
      googleMapsUrl: ceremony.googleMapsUrl,
      backgroundColor: '#E8F2FC',
      accentColor: '#9EC9F5',
    },
    {
      title: 'Reception',
      image: receptionImage,
      location: reception.name,
      time: reception.time ?? '',
      googleMapsUrl: reception.googleMapsUrl,
      backgroundColor: '#FDE8EF',
      accentColor: '#F8C8DC',
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = (index) => {
    const next = Math.max(0, Math.min(index, eventSlides.length - 1))
    setActiveIndex(next)
  }

  const goPrev = () => goToSlide(activeIndex - 1)
  const goNext = () => goToSlide(activeIndex + 1)

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    dragOffset.current = 0
  }
  const handleTouchMove = (e) => {
    const x = e.touches[0].clientX
    dragOffset.current = touchStartX.current - x
    if (carouselTrackRef.current && carouselViewportRef.current) {
      const base = -activeIndex * (100 / eventSlides.length)
      const percentPerPx = 100 / eventSlides.length / carouselViewportRef.current.offsetWidth
      const percent = base + dragOffset.current * percentPerPx
      carouselTrackRef.current.style.transition = 'none'
      carouselTrackRef.current.style.transform = `translate3d(${percent}%, 0, 0)`
    }
  }
  const handleTouchEnd = () => {
    const nextIndex =
      dragOffset.current >= SWIPE_THRESHOLD_PX
        ? Math.min(activeIndex + 1, eventSlides.length - 1)
        : dragOffset.current <= -SWIPE_THRESHOLD_PX
          ? Math.max(activeIndex - 1, 0)
          : activeIndex
    setActiveIndex(nextIndex)
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = ''
      carouselTrackRef.current.style.transform = `translate3d(${-nextIndex * (100 / eventSlides.length)}%, 0, 0)`
    }
    dragOffset.current = 0
  }

  // Mouse drag
  const [isDragging, setIsDragging] = useState(false)
  const mouseStartX = useRef(0)

  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    setIsDragging(true)
    mouseStartX.current = e.clientX
    dragOffset.current = 0
  }
  const handleMouseMove = (e) => {
    if (!isDragging || !carouselViewportRef.current) return
    dragOffset.current = mouseStartX.current - e.clientX
    const base = -activeIndex * (100 / eventSlides.length)
    const percentPerPx = 100 / eventSlides.length / carouselViewportRef.current.offsetWidth
    const percent = base + dragOffset.current * percentPerPx
    carouselTrackRef.current.style.transition = 'none'
    carouselTrackRef.current.style.transform = `translate3d(${percent}%, 0, 0)`
  }
  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const nextIndex =
      dragOffset.current >= SWIPE_THRESHOLD_PX
        ? Math.min(activeIndex + 1, eventSlides.length - 1)
        : dragOffset.current <= -SWIPE_THRESHOLD_PX
          ? Math.max(activeIndex - 1, 0)
          : activeIndex
    setActiveIndex(nextIndex)
    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = ''
      carouselTrackRef.current.style.transform = `translate3d(${-nextIndex * (100 / eventSlides.length)}%, 0, 0)`
    }
    dragOffset.current = 0
  }

  useEffect(() => {
    const onMouseMove = (e) => handleMouseMove(e)
    const onMouseUp = () => handleMouseUp()
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging, activeIndex])

  // ScrollTrigger entrance
  useEffect(() => {
    if (!venueSectionRef.current) return
    if (venueTitleRef.current) gsap.set(venueTitleRef.current, { opacity: 0, y: 24 })
    if (carouselViewportRef.current) gsap.set(carouselViewportRef.current, { opacity: 0, y: 28 })

    ScrollTrigger.create({
      trigger: venueSectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (venueTitleRef.current) {
          gsap.to(venueTitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        }
        if (carouselViewportRef.current) {
          gsap.to(carouselViewportRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.2 })
        }
      },
      toggleActions: 'play none none reverse',
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === venueSectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <div ref={venueSectionRef} className="relative">
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize" style={{ color: '#7BA3C4' }}>
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div className="relative w-full max-w-md mx-auto mt-6 px-2">
        {/* One card visible - swipeable viewport */}
        <div
          ref={carouselViewportRef}
          className="relative overflow-hidden w-full touch-pan-y select-none"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div
            ref={carouselTrackRef}
            className="flex transition-transform duration-300 ease-out will-change-transform"
            style={{
              width: `${eventSlides.length * 100}%`,
              transform: `translate3d(${-activeIndex * (100 / eventSlides.length)}%, 0, 0)`,
            }}
          >
            {eventSlides.map((slide) => (
              <div
                key={slide.title}
                className="flex-shrink-0 w-full max-w-full px-1"
                style={{ width: `${100 / eventSlides.length}%`, minWidth: `${100 / eventSlides.length}%` }}
              >
                <div
                  className="flex flex-col rounded-lg overflow-hidden shadow-sm"
                  style={{ backgroundColor: slide.backgroundColor }}
                >
                  {/* Image */}
                  <div
                    className="relative w-full aspect-[3/4] max-h-72 sm:max-h-80"
                    style={{ backgroundColor: slide.backgroundColor }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.location}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                  {/* Card body - slide background and accent */}
                  <div className="p-4 sm:p-5 text-center" style={{ backgroundColor: hexToRgba(slide.backgroundColor, 0.88) }}>
                    <h4
                      className="font-foglihten text-xl sm:text-2xl uppercase tracking-wide"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.title}
                    </h4>
                    <div className="mt-2 text-base sm:text-lg font-boska" style={{ color: slide.accentColor }}>
                      {slide.location}
                    </div>
                    {slide.time && (
                      <p className="text-sm font-albert font-thin mt-1" style={{ color: slide.accentColor }}>
                        {slide.time}
                      </p>
                    )}
                    <div className="mt-4 flex justify-center">
                      <a
                        href={slide.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-all duration-300 hover:opacity-80 underline"
                        style={{ color: slide.accentColor }}
                      >
                        Get Direction
                        <ArrowRight className="w-4 h-4" style={{ color: slide.accentColor }} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow buttons - desktop (use active slide accent) */}
        {eventSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full shadow-md items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors"
              style={{
                color: eventSlides[activeIndex].accentColor,
                backgroundColor: 'rgba(255,255,255,0.95)',
              }}
              aria-label="Previous venue"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === eventSlides.length - 1}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full shadow-md items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors"
              style={{
                color: eventSlides[activeIndex].accentColor,
                backgroundColor: 'rgba(255,255,255,0.95)',
              }}
              aria-label="Next venue"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Pagination dots - match slide accent colors */}
        {eventSlides.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {eventSlides.map((slide, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  backgroundColor: i === activeIndex ? slide.accentColor : slide.backgroundColor,
                  transform: i === activeIndex ? 'scale(1.2)' : 'scale(1)',
                }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Venue
