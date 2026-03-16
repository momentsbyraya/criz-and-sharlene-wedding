import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

const EntourageModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const [fullscreenImage, setFullscreenImage] = useState(null) // reserved for when images are added

  /* Placeholder slots until entourage images are added */
  const entouragePlaceholders = [
    { label: 'Entourage' },
    { label: 'Secondary Sponsors' }
  ]

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      duration: 0.3, 
      ease: "power2.out" 
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  // Close fullscreen when modal closes
  useEffect(() => {
    if (!isOpen) setFullscreenImage(null)
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`relative ${themeConfig.paragraph.background} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300/50 flex-shrink-0">
          <h2 className="text-2xl font-leckerli font-light text-gray-900/70">Entourage</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content - Placeholder until entourage images are added */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-6">
            {entouragePlaceholders.map((item, index) => (
              <div
                key={index}
                className="relative w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/80 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]"
                aria-label={`${item.label} – to be added`}
              >
                <span className="text-gray-400 font-albert text-sm uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="text-gray-500 font-albert text-base sm:text-lg">
                  To be added
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen overlay – used when entourage images are added later */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setFullscreenImage(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setFullscreenImage(null)}
          aria-label="Close fullscreen"
        >
          <button
            type="button"
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={fullscreenImage.src}
            alt={fullscreenImage.alt}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>,
    document.body
  )
}

export default EntourageModal
