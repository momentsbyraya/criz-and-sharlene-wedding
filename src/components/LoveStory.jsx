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

  // Polaroid images - 1 per paragraph (6 paragraphs)
  const polaroidImages = [
    '/assets/images/couple-1.jpg',
    '/assets/images/couple-2.jpg',
    '/assets/images/couple-3.jpg',
    '/assets/images/couple-4.jpg',
    '/assets/images/couple-5.jpg',
    '/assets/images/couple-6.jpg',
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

    // Animate story items (rows), polaroid images, and paragraph text
    const storyItems = sectionRef.current?.querySelectorAll('.story-item')
    storyItems?.forEach((item, index) => {
      const polaroidWrapper = item.querySelector('.bg-white.shadow-lg')
      const textParagraph = item.querySelector('p.font-albert')
      gsap.set(item, { opacity: 0, y: 28 })
      if (polaroidWrapper) gsap.set(polaroidWrapper, { scale: 0.92 })
      if (textParagraph) gsap.set(textParagraph, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: item,
        start: "top 82%",
        onEnter: () => {
          gsap.to(item, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: index * 0.1 })
          if (polaroidWrapper) {
            gsap.to(polaroidWrapper, { scale: 1, duration: 0.6, ease: "back.out(1.2)", delay: index * 0.1 + 0.15 })
          }
          if (textParagraph) {
            gsap.to(textParagraph, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: index * 0.1 + 0.25 })
          }
        },
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

  // Polaroid component (objectPosition repositions image inside frame for better face visibility)
  const Polaroid = ({ image, rotation = 0, index, size = 'normal', objectPosition }) => {
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
            border: '2px solid #FFFBFB',
            borderBottom: 'none',
            display: 'block',
            ...(objectPosition && { objectPosition })
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
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          {/* Story content */}
          <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20">
            {paragraphs.map((paragraph, index) => {
              const photoLeft = index % 2 === 0
              const image = polaroidImages[index]

              return (
                <div
                  key={index}
                  className="story-item grid w-full gap-4 sm:gap-6 md:gap-8 items-center min-h-0"
                  style={{
                    gridTemplateColumns: photoLeft ? '2fr 3fr' : '3fr 2fr',
                  }}
                >
                  {photoLeft ? (
                    <>
                      <div className="flex justify-center items-center min-w-0">
                        {image && (
                          <Polaroid
                            image={image}
                            rotation={-3}
                            index={index}
                            size="normal"
                            objectPosition={index === 3 || index === 4 ? '50% 28%' : undefined}
                          />
                        )}
                      </div>
                      <div className="flex items-center min-w-0">
                        <p className="text-xs sm:text-sm font-albert font-thin text-burgundy-dark leading-relaxed text-left w-full">
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center min-w-0">
                        <p className="text-xs sm:text-sm font-albert font-thin text-burgundy-dark leading-relaxed text-right w-full">
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                      <div className="flex justify-center items-center min-w-0">
                        {image && (
                          <Polaroid
                            image={image}
                            rotation={3}
                            index={index}
                            size="normal"
                            objectPosition={index === 3 || index === 4 ? '50% 28%' : undefined}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
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
