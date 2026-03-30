import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CAROUSEL_SPEED_PX_PER_SEC = 36
const CAROUSEL_RESUME_DELAY_MS = 2500

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const giftTitleRef = useRef(null)
  const giftDescRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const { paymentMethods } = paymentMethodsData

  // Infinite carousel (mobile): refs for track, width, scroll position, and pause timeout
  const carouselTrackRef = useRef(null)
  const carouselFirstSetRef = useRef(null)
  const setWidthRef = useRef(0)
  const scrollOffsetRef = useRef(0)
  const rafRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)
  const touchStartOffsetRef = useRef(0)
  const didHorizontalRef = useRef(false)
  const carouselViewportRef = useRef(null)

  const handleMethodClick = (method) => {
    setSelectedImage(method)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Infinite carousel: measure first set width, auto-scroll loop, touch handlers
  useEffect(() => {
    const measureSetWidth = () => {
      if (carouselFirstSetRef.current) {
        setWidthRef.current = carouselFirstSetRef.current.offsetWidth
      }
    }
    measureSetWidth()
    requestAnimationFrame(measureSetWidth)
    const resizeObserver = new ResizeObserver(measureSetWidth)
    if (carouselFirstSetRef.current) {
      resizeObserver.observe(carouselFirstSetRef.current)
    }

    const tick = () => {
      const setWidth = setWidthRef.current
      const track = carouselTrackRef.current
      if (!track || setWidth <= 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (!isCarouselPaused) {
        scrollOffsetRef.current += (CAROUSEL_SPEED_PX_PER_SEC / 60)
        if (scrollOffsetRef.current >= setWidth) {
          scrollOffsetRef.current -= setWidth
        }
        if (scrollOffsetRef.current < 0) {
          scrollOffsetRef.current += setWidth
        }
      }
      track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
      resizeObserver.disconnect()
    }
  }, [isCarouselPaused])

  const handleCarouselTouchStart = (e) => {
    setIsCarouselPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
    touchStartOffsetRef.current = scrollOffsetRef.current
    didHorizontalRef.current = false
  }

  const handleCarouselTouchMove = (e) => {
    const setWidth = setWidthRef.current
    const track = carouselTrackRef.current
    if (!track || setWidth <= 0) return
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    const dx = Math.abs(x - touchStartXRef.current)
    const dy = Math.abs(y - touchStartYRef.current)
    if (!didHorizontalRef.current && (dx > 10 || dy > 10)) {
      didHorizontalRef.current = dx > dy
    }
    if (didHorizontalRef.current && dx > 2) {
      e.preventDefault()
    }
    const delta = touchStartXRef.current - x
    let next = touchStartOffsetRef.current + delta
    while (next >= setWidth) next -= setWidth
    while (next < 0) next += setWidth
    scrollOffsetRef.current = next
    track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
  }

  const carouselTouchMoveRef = useRef(handleCarouselTouchMove)
  carouselTouchMoveRef.current = handleCarouselTouchMove

  useEffect(() => {
    const viewport = carouselViewportRef.current
    if (!viewport) return
    const onTouchMove = (e) => {
      carouselTouchMoveRef.current(e)
    }
    viewport.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => viewport.removeEventListener('touchmove', onTouchMove)
  }, [])

  const handleCarouselTouchEnd = () => {
    const setWidth = setWidthRef.current
    if (setWidth > 0) {
      let o = scrollOffsetRef.current
      o = ((o % setWidth) + setWidth) % setWidth
      scrollOffsetRef.current = o
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
      }
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsCarouselPaused(false)
    }, CAROUSEL_RESUME_DELAY_MS)
  }

  const handleCarouselMouseDown = (e) => {
    if (e.button !== 0) return
    setIsCarouselPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    touchStartXRef.current = e.clientX
    touchStartOffsetRef.current = scrollOffsetRef.current
    const onMouseMove = (e2) => {
      const setWidth = setWidthRef.current
      const track = carouselTrackRef.current
      if (!track || setWidth <= 0) return
      const delta = touchStartXRef.current - e2.clientX
      let next = touchStartOffsetRef.current + delta
      touchStartOffsetRef.current = next
      touchStartXRef.current = e2.clientX
      while (next >= setWidth) next -= setWidth
      while (next < 0) next += setWidth
      scrollOffsetRef.current = next
      track.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
    }
    const onMouseUp = () => {
      const setWidth = setWidthRef.current
      if (setWidth > 0) {
        let o = scrollOffsetRef.current
        o = ((o % setWidth) + setWidth) % setWidth
        scrollOffsetRef.current = o
        if (carouselTrackRef.current) {
          carouselTrackRef.current.style.transform = `translate3d(${-scrollOffsetRef.current}px, 0, 0)`
        }
      }
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      pauseTimeoutRef.current = setTimeout(() => setIsCarouselPaused(false), CAROUSEL_RESUME_DELAY_MS)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  useEffect(() => {
    // Gift Registry: animate title, then description, then cards one by one
    if (giftRegistryRef.current) {
      if (giftTitleRef.current) gsap.set(giftTitleRef.current, { opacity: 0, y: 24 })
      if (giftDescRef.current) gsap.set(giftDescRef.current, { opacity: 0, y: 20 })
      const cards = cardsContainerRef.current?.querySelectorAll('.gift-registry-card') || []
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 28 })
      })
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
          // Animate cards one by one with stagger
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              delay: 0.5 + i * 0.25,
            })
          })
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
          
          {/* Mobile: infinite auto-scroll carousel with swipe */}
          <div
            ref={carouselViewportRef}
            className="gift-carousel-viewport md:hidden overflow-hidden touch-pan-y"
            onTouchStart={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
            onMouseDown={handleCarouselMouseDown}
          >
            <div
              ref={carouselTrackRef}
              className="gift-carousel-track flex gap-4 flex-nowrap will-change-transform"
            >
              <div ref={carouselFirstSetRef} className="flex gap-4 flex-shrink-0">
                {(paymentMethods || []).map((method, index) => (
                  <div
                    key={`a-${index}`}
                    className="gift-carousel-card flex-shrink-0 w-[85vw] min-w-[260px] max-w-[280px]"
                  >
                    <div
                      className="w-full h-48 flex items-center justify-center border border-gray-300 rounded p-2 cursor-pointer hover:opacity-90 transition-opacity select-none bg-gray-50 text-gray-500 font-medium text-sm sm:text-base"
                      onClick={() => handleMethodClick(method)}
                    >
                      {method.image ? (
                        <img
                          src={method.image}
                          alt={method.name || 'QR code'}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">QR code here</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-shrink-0">
                {(paymentMethods || []).map((method, index) => (
                  <div
                    key={`b-${index}`}
                    className="gift-carousel-card flex-shrink-0 w-[85vw] min-w-[260px] max-w-[280px]"
                  >
                    <div
                      className="w-full h-48 flex items-center justify-center border border-gray-300 rounded p-2 cursor-pointer hover:opacity-90 transition-opacity select-none bg-gray-50 text-gray-500 font-medium text-sm sm:text-base"
                      onClick={() => handleMethodClick(method)}
                    >
                      {method.image ? (
                        <img
                          src={method.image}
                          alt={method.name || 'QR code'}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">QR code here</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: static row (visible from md up) */}
          <div
            ref={cardsContainerRef}
            className="hidden md:block w-full overflow-x-auto overflow-y-hidden gift-registry-scroll -mx-4 sm:mx-0 px-4 sm:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            <div className="flex gap-4 sm:gap-4 md:gap-6 min-w-min justify-center">
              {(paymentMethods || []).map((method, index) => (
                <div
                  key={index}
                  className="gift-registry-card flex-shrink-0 snap-center snap-always w-[85vw] min-w-[260px] max-w-[280px] sm:max-w-none sm:w-auto"
                >
                  <div
                    className="w-full h-48 sm:h-56 md:h-64 flex items-center justify-center border border-gray-300 rounded p-2 cursor-pointer hover:opacity-90 transition-opacity bg-gray-50 text-gray-500 font-medium text-sm sm:text-base"
                    onClick={() => handleMethodClick(method)}
                  >
                    {method.image ? (
                      <img
                        src={method.image}
                        alt={method.name || 'QR code'}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">QR code here</span>
                    )}
                  </div>
                </div>
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

          {/* Content Container */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            {selectedImage?.image ? (
              <img
                src={selectedImage.image}
                alt={selectedImage.name || 'QR code'}
                className="max-w-[90vw] max-h-[80vh] object-contain"
              />
            ) : (
              <span className="text-white text-xl sm:text-2xl font-medium">QR code</span>
            )}
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
