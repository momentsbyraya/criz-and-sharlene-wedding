import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const EntourageSection = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    gsap.set(contentRef.current.children, { opacity: 0, y: 20 })
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(contentRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        })
      },
      toggleActions: 'play none none reverse'
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative w-full py-12 sm:py-16"
      >
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6">
          <div ref={contentRef} className="flex flex-col items-center text-center">
            {/* Decorative flower with horizontal lines - vibrant light blue */}
            <div className="flex items-center justify-center gap-4 w-full max-w-md mb-6">
              <div className="flex-1 h-px bg-[#0A1F44]/60" />
              <img
                src="/assets/images/graphics/single-flower-2.png"
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                style={{ filter: 'hue-rotate(195deg) saturate(1.4) brightness(1.15)' }}
              />
              <div className="flex-1 h-px bg-[#0A1F44]/60" />
            </div>

            {/* Title - decorative serif */}
            <h2 className="font-foglihten text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-gray-800 mb-4">
              Entourage
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-albert text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Meet the special people who will be
              <br />
              part of our celebration
            </p>

            {/* Button - opens modal */}
            <button
              type="button"
              onClick={() => navigate('/entourage')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white/90 text-gray-700 font-albert text-sm sm:text-base hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            >
              View our entourage
              <Users className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default EntourageSection
