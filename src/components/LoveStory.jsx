import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const storyModalRef = useRef(null)
  const storyOverlayRef = useRef(null)

  // Split content into paragraphs (smaller paras for narrow wrap beside polaroids)
  const paragraphs = loveStory.content.split('\n\n').filter(p => p.trim())

  // Six polaroids: text chunks wrap beside each image, then continue below
  const CHUNK_SPLITS = [0, 3, 6, 8, 11, 14, paragraphs.length]
  const getChunk = (i) => paragraphs.slice(CHUNK_SPLITS[i], CHUNK_SPLITS[i + 1])

  // Polaroid order matters: 1 = top, 6 = bottom (used by the modal layout)
  const polaroidImages = [
    '/assets/images/prenup/1st%20-%20our%20story.jpg',
    '/assets/images/prenup/2nd%20-%20our%20story%20(sharlene%20POV).jpg',
    '/assets/images/prenup/3rd%20-%20our%20story(sharlene%20POV).jpg',
    '/assets/images/prenup/4th%20-%20our%20story%20(criz%20POV).jpg',
    '/assets/images/prenup/5th%20-%20our%20story(criz%20POV).jpg',
    '/assets/images/prenup/6th%20-%20our%20story.jpg',
  ]

  useEffect(() => {
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

  // Animate story modal content when opened
  useEffect(() => {
    if (!isStoryModalOpen) return
    const flowEl = storyModalRef.current?.querySelector('.love-story-flow')
    if (flowEl) {
      gsap.set(flowEl, { opacity: 0, y: 16 })
      gsap.to(flowEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    }
  }, [isStoryModalOpen])

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

  // Handle keyboard: Escape closes story or image modal; arrows only in image modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) setIsModalOpen(false)
        else if (isStoryModalOpen) setIsStoryModalOpen(false)
      } else if (isModalOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault()
        if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
        else setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, isStoryModalOpen, polaroidImages.length])

  // Lock body scroll when story or image modal is open
  useEffect(() => {
    const open = isStoryModalOpen || isModalOpen
    if (open) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isStoryModalOpen, isModalOpen])

  // Image modal (lightbox) animations
  useEffect(() => {
    if (!isModalOpen) return
    if (overlayRef.current && contentRef.current) {
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.9 })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
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
            border: '2px solid #F8FAFC',
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
    <div
      ref={sectionRef}
      className="relative w-full max-w-5xl mx-auto pb-10 sm:pb-12 md:pb-16 pt-6 sm:pt-8 md:pt-10"
    >
      <div className="text-center mb-10 sm:mb-14 md:mb-16">
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
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize love-story-title-white-gold"
          >
            {loveStory.title}
          </span>
        </h3>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {/* Teaser: 1 polaroid + short story hook */}
        <div className="love-story-teaser flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center text-left mb-8 sm:mb-10">
          <div className="flex-shrink-0">
            <Polaroid
              image={polaroidImages[0]}
              rotation={-3}
              index={0}
              size="normal"
            />
          </div>
          <div className="love-story-hook min-w-0 flex-1">
            <p className="font-foglihten text-lg sm:text-xl mb-2 capitalize love-story-title-white-gold">
              {paragraphs[0]}
            </p>
            <p className="text-xs sm:text-sm font-albert font-thin text-burgundy-dark leading-relaxed">
              {formatParagraph(paragraphs[1])}
            </p>
            <p className="text-xs sm:text-sm font-albert font-thin text-burgundy-dark leading-relaxed mt-2">
              {formatParagraph(paragraphs[2])}
            </p>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsStoryModalOpen(true)}
            className="love-story-open-btn love-story-open-btn-on-navy font-albert text-sm sm:text-base font-medium px-6 py-3 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-navy)]"
            aria-label="Read our love story"
          >
            Read our story
          </button>
        </div>
      </div>

      {/* Story modal: full story with polaroids and text */}
      {isStoryModalOpen && createPortal(
        <div
          ref={storyModalRef}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-start pt-14 pb-8 px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Our love story"
        >
          <div
            ref={storyOverlayRef}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsStoryModalOpen(false)}
            aria-hidden="true"
          />
          <div className="love-story-modal-panel relative z-10 w-full max-w-5xl max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl shadow-2xl bg-white/95 p-6 sm:p-8 md:p-10">
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close story"
            >
              <X className="w-5 h-5 text-burgundy-dark" />
            </button>
            <h4 className="font-foglihten text-2xl sm:text-3xl mb-6 text-center capitalize" style={{ color: 'var(--color-navy)' }}>
              {loveStory.title}
            </h4>
            <div className="love-story-flow relative z-10">
              {polaroidImages.map((image, index) => {
                const isLeft = index % 2 === 0
                const chunkParagraphs = getChunk(index)
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`love-story-polaroid-float ${isLeft ? 'love-story-polaroid-float-left' : 'love-story-polaroid-float-right'} ${!isLeft && index === 1 ? 'love-story-polaroid-clear-both' : ''}`}
                    >
                      <Polaroid
                        image={image}
                        rotation={isLeft ? -3 : 3}
                        index={index}
                        size="normal"
                        objectPosition={index === 3 || index === 4 ? '50% 28%' : undefined}
                      />
                    </div>
                    <div className="love-story-chunk">
                      {chunkParagraphs.map((paragraph, pIndex) => (
                        <p
                          key={`${index}-${pIndex}`}
                          className="love-story-paragraph text-xs sm:text-sm font-albert font-thin text-burgundy-dark leading-relaxed"
                        >
                          {formatParagraph(paragraph)}
                        </p>
                      ))}
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Full Screen Image Modal (polaroid lightbox) */}
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
