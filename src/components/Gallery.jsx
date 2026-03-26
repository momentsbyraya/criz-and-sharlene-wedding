import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery as galleryData } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const gridColumnPattern = [
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
]

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const imageRefs = useRef([])

  const galleryImages = (galleryData.images || []).filter(
    (src) => src !== galleryData.saveTheDateBackground
  )

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse',
      })
    }

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const isFromLeft = index % 2 === 0
        gsap.set(ref, { opacity: 0, x: isFromLeft ? -100 : 100, force3D: true })
        ScrollTrigger.create({
          trigger: ref,
          start: 'top 85%',
          animation: gsap.to(ref, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            force3D: true,
          }),
          toggleActions: 'play none none reverse',
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          (trigger.vars.trigger === titleRef.current ||
            imageRefs.current.includes(trigger.vars.trigger))
        ) {
          trigger.kill()
        }
      })
    }
  }, [galleryImages.length])

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    )
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (!isModalOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
      else if (e.key === 'ArrowLeft') prevImage()
      else if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isModalOpen, galleryImages.length])

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      return
    }

    document.body.style.overflow = 'hidden'
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    if (overlayRef.current && contentRef.current) {
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.9 })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div className="relative z-20 faq-section !py-8 sm:!py-10">
        <div className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <h3 ref={titleRef} className="relative inline-block px-6 py-3 text-center w-full">
            <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize faq-title-text !text-[#001F3F]">
              Our Moments
            </span>
          </h3>
        </div>
      </div>

      <div className="max-w-xs sm:max-w-md lg:max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4" style={{ gridAutoRows: '1fr' }}>
          {galleryImages.map((image, index) => {
            const isFirst = index === 0
            const isLast = index === galleryImages.length - 1
            // Match first & last: full row (span 3) + same max height + same crop behavior
            const fullWidthBanner = isFirst || isLast
            const gridColumn = fullWidthBanner
              ? 'span 3'
              : gridColumnPattern[index % gridColumnPattern.length]
            const tileClass =
              'cursor-pointer overflow-hidden max-h-[150px] lg:max-h-[250px] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,31,63,0.45)] focus-visible:ring-offset-2'
            const imagePositionClass = image.includes('1000082213.jpg')
              ? 'object-[50%_78%] sm:object-[50%_78%]'
              : 'object-[50%_32%] sm:object-center'
            return (
              <div
                key={`${image}-${index}`}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                role="button"
                tabIndex={0}
                className={tileClass}
                style={{
                  gridColumn,
                  height: '100%',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
                onClick={() => handleImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleImageClick(index)
                  }
                }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full h-full object-cover ${imagePositionClass} hover:scale-105 transition-transform duration-300`}
                  style={{ height: '100%', willChange: 'transform', backfaceVisibility: 'hidden' }}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />

            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              ref={contentRef}
              className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-white text-sm font-albert">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default Gallery
