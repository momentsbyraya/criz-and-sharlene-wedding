import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  // Split content into paragraphs
  const paragraphs = loveStory.content.split('\n\n').filter(p => p.trim())

  // Polaroid images - 6 in story (2+2+2) + 2 below last paragraph (moment 5 & 6 = unused prenup5, prenup6)
  const polaroidImages = [
    '/assets/images/prenup/prenup1.jpg',   // moment 1
    '/assets/images/prenup/prenup2.jpg',   // moment 2
    '/assets/images/prenup/prenup3.jpg',   // moment 3
    '/assets/images/prenup/prenup7.jpg',   // moment 4
    '/assets/images/prenup/prenup5.jpg',  // moment 5
    '/assets/images/prenup/prenup6.jpg',   // moment 6
    '/assets/images/prenup/prenup10.jpg',
    '/assets/images/prenup/prenup11.jpg',
  ]

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Animate story items
    const storyItems = sectionRef.current?.querySelectorAll('.story-item')
    storyItems?.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        animation: gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: index * 0.1 }
        ),
        toggleActions: "play none none reverse"
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === titleRef.current ||
          trigger.vars.trigger === sectionRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Function to format paragraph text with styled quote
  const formatParagraph = (text) => {
    // Match the quote pattern: "I found him whom my soul loveth" – Song of Solomon 3:4
    const quotePattern = /("I found him whom my soul loveth" – Song of Solomon 3:4)/
    const parts = text.split(quotePattern)
    
    return parts.map((part, i) => {
      if (quotePattern.test(part)) {
        return (
          <span key={i} className="font-bold italic">
            {part}
          </span>
        )
      }
      return part
    })
  }

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  // Modal navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, polaroidImages.length])

  // Modal animations
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.9 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  // Polaroid component
  const Polaroid = ({ image, rotation = 0, index, size = 'normal' }) => {
    const maxWidth = size === 'small' ? '150px' : '200px'
    return (
    <div 
      className="bg-white shadow-lg relative cursor-pointer"
      style={{
        border: '4px solid white',
        borderBottom: '12px solid white',
        transform: `rotate(${rotation}deg)`,
        maxWidth: maxWidth,
        width: '100%',
        padding: '2px 2px 8px 2px'
      }}
      onClick={() => handleImageClick(index)}
    >
      <div className="relative">
        <img 
          src={image}
          alt={`Love story moment ${index + 1}`}
          className="w-full aspect-square object-cover"
          style={{
            border: '2px solid #F3E8E2',
            borderBottom: 'none',
            display: 'block'
          }}
        />
        {/* Stamp overlay */}
        <img 
          src="/assets/images/graphics/stamp.png"
          alt="Stamp"
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: '-8%',
            width: '20%',
            height: 'auto',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div className="text-center mb-12 sm:mb-16">
        {/* Heart Image */}
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/graphics/heart.png" 
            alt="Heart decoration" 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 ref={titleRef} className="relative inline-block px-6 py-3">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize"
            style={{ color: themeConfig.text.wine }}
          >
            {loveStory.title}
          </span>
        </h3>
        {/* Center decorative curved line + dot */}
        <div className="flex justify-center my-8 sm:my-10 pointer-events-none" aria-hidden="true">
          <div className="relative" style={{ width: '140px', height: '100px' }}>
            <svg
              width="140"
              height="100"
              viewBox="0 0 140 100"
              fill="none"
              className="absolute inset-0"
              style={{ overflow: 'visible' }}
            >
              <path
                d="M 70 0 Q 100 25, 70 50 Q 40 75, 70 100"
                stroke="#5A1E2A"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 5"
                opacity="0.5"
              />
            </svg>
            <div
              className="absolute rounded-full"
              style={{
                width: '10px',
                height: '10px',
                left: '50%',
                bottom: 0,
                transform: 'translate(-50%, 50%)',
                backgroundColor: '#5A1E2A',
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          {/* Story content */}
          <div className="relative z-10 space-y-16 sm:space-y-20 md:space-y-24">
            {paragraphs.map((paragraph, index) => {
              // 6 images in story: para 0 → 2, para 1 → 2, para 2 (last) → 2
              const startImageIndex = index * 2
              const isLast = index === paragraphs.length - 1
              const imageCount = 2
              const imageIndices = Array.from({ length: imageCount }, (_, i) => startImageIndex + i)

              return (
                <div key={index} className="story-item relative">
                  {/* Curved connecting line and dot */}
                  {!isLast && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{ 
                      bottom: '-4rem',
                      width: '120px',
                      height: '8rem',
                      zIndex: 0
                    }}>
                      {/* Curved SVG line - S shape */}
                      <svg 
                        width="120" 
                        height="100%" 
                        viewBox="0 0 120 100" 
                        preserveAspectRatio="none"
                        className="absolute inset-0"
                        style={{ overflow: 'visible' }}
                      >
                        <path
                          d="M 60 0 Q 40 25, 60 50 T 60 100"
                          stroke="#5A1E2A"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4,4"
                          opacity="0.4"
                        />
                      </svg>
                      {/* Dot at bottom center */}
                      <div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: '#5A1E2A',
                          opacity: 0.45
                        }}
                      />
                    </div>
                  )}

                  {/* Each row: polaroids (if any) then paragraph */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    {imageCount > 0 && (
                      <div className="flex gap-4 sm:gap-6 justify-center flex-1">
                        {imageIndices.map((imgIdx, i) => polaroidImages[imgIdx] && (
                          <Polaroid
                            key={imgIdx}
                            image={polaroidImages[imgIdx]}
                            rotation={i === 0 ? -5 : 5}
                            index={imgIdx}
                            size="normal"
                          />
                        ))}
                      </div>
                    )}
                    <div className={`text-center sm:text-left ${imageCount > 0 ? 'flex-1' : 'w-full'}`}>
                      <p className="text-base sm:text-lg font-albert font-thin text-burgundy-dark leading-relaxed">
                        {formatParagraph(paragraph)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* 2 images below the last story paragraph */}
            <div className="story-item flex justify-center gap-6 sm:gap-8 mt-16 sm:mt-20">
              {polaroidImages[6] && (
                <Polaroid image={polaroidImages[6]} rotation={-4} index={6} />
              )}
              {polaroidImages[7] && (
                <Polaroid image={polaroidImages[7]} rotation={4} index={7} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isModalOpen && createPortal(
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
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

          {/* Next Button */}
          <button
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

          {/* Image Container */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <img 
              src={polaroidImages[currentImageIndex]}
              alt={`Love story image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-white text-sm font-albert">
              {currentImageIndex + 1} / {polaroidImages.length}
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default LoveStory
