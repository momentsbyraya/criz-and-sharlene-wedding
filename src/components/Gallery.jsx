import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { gallery as galleryData } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  const images = galleryData.images || []

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item')
      items.forEach((item, index) => {
        const img = item.querySelector('img')
        gsap.set([item, img], { opacity: 0 })
        gsap.set(item, { y: 24, scale: 0.94 })
        if (img) gsap.set(img, { scale: 0.92 })
        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(item, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: index * 0.05 })
            if (img) gsap.to(img, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: index * 0.05 + 0.08 })
          },
          toggleActions: 'play none none reverse'
        })
      })
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === titleRef.current || (gridRef.current && gridRef.current.contains(trigger.vars?.trigger))) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-10 sm:mb-14">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/graphics/single-flower-1.png"
            alt=""
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 className="relative inline-block px-6 py-3">
          <span
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize"
            style={{ color: themeConfig.text.burgundyDark || '#5A1E2A' }}
          >
            {galleryData.title || 'Gallery'}
          </span>
        </h3>
      </div>

      {/* Image Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="gallery-item aspect-square rounded-lg overflow-hidden border-2 border-burgundy-wine/20 hover:border-burgundy-wine/50 transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy-wine/50"
            onClick={() => setLightboxImage(src)}
            aria-label={`View photo ${index + 1}`}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
              style={['DE_00781.jpg', 'DE_00506-2.jpg', 'DE_00468.jpg'].some((f) => src.includes(f)) ? { objectPosition: '50% 20%' } : undefined}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.classList.add('bg-burgundy-cream')
              }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged"
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default Gallery
