import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

const RSVP_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdTRbY7EWsMAr9A4vksM7ckJUhkH8ZAERJ6_b66XyaY6loYuA/viewform?embedded=true'
const RSVP_FORM_SHORT_URL = 'https://forms.gle/g1oSXqATq6vDNTLN6'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      // Prevent layout shift from scrollbar
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
    // Modal exit animation
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
        className={`relative ${themeConfig.paragraph.background} rounded-2xl shadow-2xl max-w-3xl lg:max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300/50 flex-shrink-0">
          <h2 className="text-2xl font-leckerli font-light text-gray-900/70">RSVP</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col flex-1 min-h-0">
          <div className="px-4 pt-2 pb-1 sm:px-6 text-center">
            <a
              href={RSVP_FORM_SHORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-albert text-[#001F3F] hover:underline"
            >
              Open RSVP form in a new tab
            </a>
          </div>
          <div className="flex-1 w-full min-h-0 bg-white">
            <iframe
              title="RSVP — Criz & Sharlene"
              src={RSVP_FORM_EMBED_URL}
              className="w-full h-[65vh] sm:h-[70vh] max-h-[75vh] min-h-[480px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal 