import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const PhotoUpload = () => {
  const photoUploadRef = useRef(null)

  useEffect(() => {
    // Photo Upload animation
    if (photoUploadRef.current) {
      ScrollTrigger.create({
        trigger: photoUploadRef.current,
        start: "top 80%",
        animation: gsap.fromTo(photoUploadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === photoUploadRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="mt-20 relative pb-12 sm:pb-16" style={{ overflow: 'visible' }}>
      <div className="relative" style={{ overflow: 'visible' }}>
        <div className="relative" style={{ overflow: 'visible' }}>
          <div 
            ref={photoUploadRef} 
            className="text-center transition-opacity duration-500 ease-in-out"
            style={{ overflow: 'visible' }}
          >
            {/* Upload Title */}
            <div>
              {/* Single Flower 2 Image */}
              <div className="flex justify-center mb-4">
                <img 
                  src="/assets/images/graphics/single-flower-2.png" 
                  alt="Flower decoration" 
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
              <h3 className="relative inline-block px-6 upload-title">
                <span 
                  className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize upload-title-text"
                >
                  OH SNAP!
                </span>
              </h3>
            </div>

            {/* QR Code Image and Details Side by Side */}
            <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-stretch lg-custom:items-center lg-custom:justify-center" style={{ overflow: 'visible' }}>
              {/* QR Code Image - 50% width on mobile, full width on 992px+ */}
              <div className="w-1/2 lg-custom:w-full lg-custom:flex lg-custom:justify-center">
                <div className="w-full relative upload-qr-container" style={{ maxWidth: '350px' }}>
                  <div className="bg-white p-4 rounded-lg shadow-md w-full h-full flex items-center justify-center">
                    <img 
                      src="/assets/images/qr/qr-code.png" 
                      alt="Upload QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Upload Details - 50% width on mobile, full width on 992px+ */}
              <div className="w-1/2 lg-custom:w-full lg-custom:h-fit lg-custom:flex lg-custom:flex-col lg-custom:justify-center lg-custom:items-center flex flex-col justify-between text-left lg-custom:text-center py-4 sm:py-6 upload-content-container" style={{ overflow: 'visible' }}>
                {/* Description */}
                <p className="text-sm sm:text-base font-albert font-thin text-burgundy-dark mb-4 text-left lg-custom:text-center">
                  Share your photos and videos from our special day.
                </p>

                {/* Hashtags */}
                <div className="mb-4 text-left lg-custom:text-center" style={{ overflow: 'visible', width: '100%' }}>
                  <p className="text-sm sm:text-base font-albert font-medium text-burgundy-dark whitespace-nowrap" style={{ overflow: 'visible' }}>
                    #GlennAndNicole
                  </p>
                  <p className="text-sm sm:text-base font-albert font-medium text-burgundy-dark whitespace-nowrap" style={{ overflow: 'visible' }}>
                    #GlennAndNicole
                  </p>
                </div>

                {/* Upload Button */}
                <div className="flex justify-start lg-custom:justify-center items-center">
                  <SecondaryButton
                    href="https://drive.google.com/drive/folders/14m2Rlxcuv1RA91gJhROGJxZhRHCRJYE2?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={ArrowRight}
                  >
                    Upload Photos
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoUpload
