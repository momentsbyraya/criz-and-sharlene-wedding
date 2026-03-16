import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { gallery as galleryData } from '../data'
import './Gallery.css'

gsap.registerPlugin(ScrollTrigger)

const ANIMATION_TYPES = [
  'slideLeft',
  'slideRight',
  'scalePop',
  'fadeUp',
  'slideRight',
  'slideLeft',
  'scalePop',
  'fadeUp',
  'slideLeft',
  'slideRight',
  'scalePop',
  'fadeUp',
  'stackedSpread',
  'slideRight',
]

const getInitialState = (type) => {
  switch (type) {
    case 'slideLeft':
      return { opacity: 0, x: -56 }
    case 'slideRight':
      return { opacity: 0, x: 56 }
    case 'scalePop':
      return { opacity: 0, scale: 0.72 }
    case 'fadeUp':
      return { opacity: 0, y: 36 }
    case 'stackedSpread':
      return { opacity: 0, scale: 0.88, rotation: -3, y: 12 }
    default:
      return { opacity: 0, y: 24 }
  }
}

const getAnimationVars = (type) => {
  const common = { duration: 0.72, ease: 'power2.out' }
  switch (type) {
    case 'slideLeft':
    case 'slideRight':
      return { opacity: 1, x: 0, ...common }
    case 'scalePop':
      return { opacity: 1, scale: 1, ease: 'back.out(1.2)', duration: 0.65, ...common }
    case 'fadeUp':
      return { opacity: 1, y: 0, ...common }
    case 'stackedSpread':
      return { opacity: 1, scale: 1, rotation: 0, y: 0, ease: 'back.out(1.1)', duration: 0.7, ...common }
    default:
      return { opacity: 1, y: 0, ...common }
  }
}

const Gallery = () => {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  const images = (galleryData.images || []).slice(0, 14)

  useEffect(() => {
    if (!gridRef.current || images.length === 0) return

    const items = gridRef.current.querySelectorAll('.gallery-item')
    const triggers = []

    items.forEach((item, index) => {
      const type = ANIMATION_TYPES[index % ANIMATION_TYPES.length]
      const fromState = getInitialState(type)
      const toState = getAnimationVars(type)
      const delay = index * 0.06

      gsap.set(item, fromState)

      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(item, {
            ...toState,
            delay,
            overwrite: true,
            onStart: () => {
              item.style.willChange = 'transform, opacity'
            },
            onComplete: () => {
              item.style.willChange = 'auto'
            },
          })
        },
        once: true,
      })
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((t) => {
        if (gridRef.current?.contains(t.trigger)) t.kill()
      })
    }
  }, [images.length])

  return (
    <section ref={sectionRef} className="gallery-section" aria-label="Photo gallery">
      <h2 className="gallery-section-title font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center capitalize mb-8 sm:mb-10 love-story-title-white-gold">
        Our Moments
      </h2>
      <div ref={gridRef} className="gallery-grid">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="gallery-item"
            onClick={() => setLightboxImage(src)}
            aria-label={`View photo ${index + 1}`}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              loading="lazy"
              decoding="async"
              style={['DE_00781.jpg', 'DE_00506-2.jpg', 'DE_00468.jpg'].some((f) => src.includes(f)) ? { objectPosition: '50% 20%' } : undefined}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.classList.add('gallery-item--error')
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm sm:text-base pointer-events-none z-10 drop-shadow-md">
              Image Here
            </span>
          </button>
        ))}
      </div>

      {lightboxImage && (
        <div
          className="gallery-lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="gallery-lightbox-close"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged"
            className="gallery-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default Gallery
