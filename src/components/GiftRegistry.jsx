import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const giftTitleRef = useRef(null)
  const giftDescRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const { paymentMethods } = paymentMethodsData

  const monetaryGiftImages = [
    { src: '/assets/images/monetary-gifts/pnb.jpeg', alt: 'PNB Payment' },
    { src: '/assets/images/monetary-gifts/landabnk.jpeg', alt: 'Landbank Payment' },
    { src: '/assets/images/monetary-gifts/gotyme.jpeg', alt: 'GoTyme Payment' }
  ]

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  useEffect(() => {
    // Gift Registry: animate title, then description text, then rest
    if (giftRegistryRef.current) {
      if (giftTitleRef.current) gsap.set(giftTitleRef.current, { opacity: 0, y: 24 })
      if (giftDescRef.current) gsap.set(giftDescRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: "top 80%",
        onEnter: () => {
          if (giftTitleRef.current) {
            gsap.to(giftTitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
          }
          if (giftDescRef.current) {
            gsap.to(giftDescRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 })
          }
        },
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Gift Registry Section */}
      <div className="relative gift-registry-section mb-24 sm:mb-32 md:mb-40 lg:mb-48">
        <div ref={giftRegistryRef} className="text-center relative z-10">
          {/* Single Flower 2 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-2.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 ref={giftTitleRef} className="relative inline-block px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none gift-registry-title-text"
              style={{ fontStyle: 'italic' }}
            >
              A notes on gifts...
            </span>
          </h3>
          <div className="w-full max-w-3xl mx-auto mb-4">
            <div className="w-full h-px bg-burgundy-tan opacity-40"></div>
          </div>
          <p ref={giftDescRef} className="text-base sm:text-lg font-albert font-thin text-burgundy-dark max-w-3xl mx-auto leading-relaxed text-center mb-6">
            Your presence is the greatest gift. If you wish to honor us, we would be grateful for a <strong>monetary gift</strong> to help us start our new life together.
          </p>
          
          {/* Payment Method Images - Scrollable Row */}
          <div className="w-full overflow-x-auto overflow-y-hidden gift-registry-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-4 px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              {monetaryGiftImages.map((image, index) => (
                <img 
                  key={index}
                  src={image.src} 
                  alt={image.alt} 
                  className="h-48 sm:h-56 md:h-64 flex-shrink-0 object-contain border border-gray-300 rounded p-2 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Full Screen Modal */}
      {selectedImage && createPortal(
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeImageModal}
          />
          
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>,
        document.body
      )}

      {/* Gift Registry Modal */}
      {isGiftModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGiftModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800 modal-methods-title">Methods</h3>
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="flex items-center justify-center">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-center">
                      {/* BPI QR Code Image */}
                      {method.image && (
                        <div className="flex items-center justify-center">
                          <img 
                            src={method.image} 
                            alt="BPI QR Code" 
                            className="w-full max-w-md h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry
