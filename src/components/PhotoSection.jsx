import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const PhotoSection = ({ 
  images = [], // Array of { src, alt, label }
  paragraph, 
  backgroundTexts = [] 
}) => {
  const photoSectionRef = useRef(null)
  const middlePhotoRef = useRef(null)
  const leftPhotoRef = useRef(null)
  const rightPhotoRef = useRef(null)
  const defaultTexts = ['Forever', 'Always', 'Together', 'Love', 'Us']
  const texts = backgroundTexts.length > 0 ? backgroundTexts : defaultTexts
  
  // Default images if none provided
  const defaultImages = [
    { src: '/assets/images/couple-1.jpg', alt: 'Photo 1', label: 'Memories' },
    { src: '/assets/images/couple-2.jpg', alt: 'Photo 2', label: 'Together' },
    { src: '/assets/images/couple-3.jpg', alt: 'Photo 3', label: 'Love' }
  ]
  const displayImages = images.length > 0 ? images : defaultImages
  
  useEffect(() => {
    // Set initial states
    if (middlePhotoRef.current) {
      gsap.set(middlePhotoRef.current, { opacity: 0, y: 50 })
    }
    if (leftPhotoRef.current) {
      gsap.set(leftPhotoRef.current, { opacity: 0, x: -100 })
    }
    if (rightPhotoRef.current) {
      gsap.set(rightPhotoRef.current, { opacity: 0, x: 100 })
    }
    
    // Scroll-triggered animations
    if (photoSectionRef.current) {
      ScrollTrigger.create({
        trigger: photoSectionRef.current,
        start: "top 75%",
        onEnter: () => {
          // 1. Animate middle photo first - fade in and slide up from bottom
          if (middlePhotoRef.current) {
            gsap.to(middlePhotoRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            })
          }
          
          // 2. Animate left photo (first polaroid) - slide in from left
          if (leftPhotoRef.current) {
            gsap.to(leftPhotoRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.3
            })
          }
          
          // 3. Animate right photo (last polaroid) - slide in from right
          if (rightPhotoRef.current) {
            gsap.to(rightPhotoRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.3
            })
          }
        }
      })
    }
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === photoSectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])
  
  return (
    <div ref={photoSectionRef} className="relative w-full pt-32 pb-12 overflow-hidden">
      {/* Background Handwriting Text */}
      {texts.length > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.3
          }}
        >
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '5%',
              left: '-5%',
              transform: 'rotate(-5deg)'
            }}
          >
            {texts[0] || texts[0]}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '25%',
              right: '-8%',
              transform: 'rotate(8deg)'
            }}
          >
            {texts[1] || texts[0]}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              bottom: '25%',
              left: '-8%',
              transform: 'rotate(-8deg)'
            }}
          >
            {texts[2] || texts[0]}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '-5%',
              transform: 'rotate(5deg)'
            }}
          >
            {texts[3] || texts[0]}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-3deg)'
            }}
          >
            {texts[4] || texts[0]}
          </p>
          {/* Additional right side text elements */}
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '15%',
              right: '-3%',
              transform: 'rotate(12deg)'
            }}
          >
            {texts[0] || 'Forever'}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '40%',
              right: '-6%',
              transform: 'rotate(-10deg)'
            }}
          >
            {texts[1] || 'Always'}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              bottom: '40%',
              right: '-4%',
              transform: 'rotate(15deg)'
            }}
          >
            {texts[2] || 'Together'}
          </p>
          <p 
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#800000] whitespace-nowrap"
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '-2%',
              transform: 'rotate(-8deg)'
            }}
          >
            {texts[3] || 'Love'}
          </p>
        </div>
      )}
      
      {/* Polaroid Photos Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
        <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex justify-center items-center mb-6">
          {/* Back Photo - Tilted left */}
          {displayImages[0] && (
            <div 
              ref={leftPhotoRef}
              className="absolute -top-6 -left-8 sm:left-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform -rotate-12 opacity-90"
              style={{
                border: '4px solid white',
                borderTop: '4px solid white'
              }}
            >
              <div 
                className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${displayImages[0].src})`,
                  borderTop: '4px solid white',
                  borderLeft: '4px solid white',
                  borderRight: '4px solid white'
                }}
              ></div>
              <div className="p-2 text-center">
                <div className="text-sm sm:text-lg text-[#800000] font-handwritten">
                  {displayImages[0].label || 'Memories'}
                </div>
              </div>
            </div>
          )}
          
          {/* Front Photo - Center, slightly tilted right */}
          {displayImages[1] && (
            <div 
              ref={middlePhotoRef}
              className="relative w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform rotate-3 hover:scale-105 transition-transform duration-300"
              style={{
                border: '4px solid white',
                borderTop: '4px solid white'
              }}
            >
              <div 
                className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${displayImages[1].src})`,
                  borderTop: '4px solid white',
                  borderLeft: '4px solid white',
                  borderRight: '4px solid white'
                }}
              ></div>
              <div className="p-2 text-center">
                <div className="text-sm sm:text-lg text-[#800000] font-handwritten">
                  {displayImages[1].label || 'Together'}
                </div>
              </div>
            </div>
          )}
          
          {/* Right Photo - Tilted right */}
          {displayImages[2] && (
            <div 
              ref={rightPhotoRef}
              className="absolute -top-4 -right-8 sm:right-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform rotate-6"
              style={{
                border: '4px solid white',
                borderTop: '4px solid white'
              }}
            >
              <div 
                className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${displayImages[2].src})`,
                  borderTop: '4px solid white',
                  borderLeft: '4px solid white',
                  borderRight: '4px solid white'
                }}
              ></div>
              <div className="p-2 text-center">
                <div className="text-sm sm:text-lg text-[#800000] font-handwritten">
                  {displayImages[2].label || 'Love'}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Paragraph */}
        {paragraph && (
          <p className="text-base sm:text-lg font-albert font-thin text-burgundy-dark text-center max-w-xl mx-auto leading-relaxed">
            {paragraph}
          </p>
        )}
      </div>
    </div>
  )
}

export default PhotoSection
