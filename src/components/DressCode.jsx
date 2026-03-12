import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import Line from './Line'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const dressCodeDescRef = useRef(null)
  const category1Ref = useRef(null)
  const category2Ref = useRef(null)

  // Dress code color palette (fallback for guests when not in data)
  const BURGUNDY = '#800020'
  const ROSE_GOLD = '#B76E79'
  const BLUSH_PINK = '#F4C2C2'
  const DUSTY_ROSE = '#C08081'
  const defaultGuestColors = [BURGUNDY, ROSE_GOLD, BLUSH_PINK, DUSTY_ROSE]

  useEffect(() => {
    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Dress Code description text animation
    if (dressCodeDescRef.current) {
      gsap.set(dressCodeDescRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: dressCodeDescRef.current,
        start: "top 85%",
        animation: gsap.to(dressCodeDescRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.12 }),
        toggleActions: "play none none reverse"
      })
    }

    // Category 1 animation - animate image and content separately
    if (category1Ref.current) {
      const category1Container = category1Ref.current
      const flexContainer = category1Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category1Image = flexContainer.querySelector('.dresscode-image-container')
        const category1Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (category1Image) {
          gsap.set(category1Image, { opacity: 0, x: -30 })
        }
        if (category1Content) {
          gsap.set(category1Content, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: category1Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category1Image) {
              gsap.to(category1Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category1Content) {
              gsap.to(category1Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Category 2 animation - animate image and content separately
    if (category2Ref.current) {
      const category2Container = category2Ref.current
      const flexContainer = category2Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category2Image = flexContainer.querySelector('.dresscode-image-container')
        const category2Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (category2Image) {
          gsap.set(category2Image, { opacity: 0, x: 30 })
        }
        if (category2Content) {
          gsap.set(category2Content, { opacity: 0, x: -30 })
        }
        
      ScrollTrigger.create({
          trigger: category2Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category2Content) {
              gsap.to(category2Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category2Image) {
              gsap.to(category2Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === dressCodeDescRef.current ||
          trigger.vars.trigger === category1Ref.current ||
          trigger.vars.trigger === category2Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative">
      {/* Dress Code Title */}
      <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
        <div>
          {/* Single Flower 1 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-1.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize dress-code-title-text"
            >
              Dress Code
            </span>
          </h3>
          {/* General Dress Code Description */}
          <p ref={dressCodeDescRef} className="text-base sm:text-lg font-albert font-thin italic dress-code-description">
            {dresscode.mainDressCode?.description || "Formal attire with these colors on our special day."}
          </p>
        </div>
      </div>

      {/* Dress Code Content */}
      <div className="flex flex-col lg-custom:flex-row gap-3 lg-custom:gap-4 items-stretch">
        {/* Principal Sponsors Category */}
        {dresscode.sections && dresscode.sections[0] && (() => {
          const section = dresscode.sections[0];
          return (
            <div className="relative overflow-visible flex-1">
              <div className="relative overflow-visible">
                <div 
                  ref={category1Ref}
                  className="transition-opacity duration-500 ease-in-out"
                >
                  {/* Category Image and Details - Side by side on mobile, stacked on 992px+ */}
                  <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                    {/* Category Details - First category: right aligned on mobile, left aligned on 992px+ */}
                    <div className="w-1/2 lg-custom:w-full flex flex-col text-right lg-custom:text-left order-1 lg-custom:order-2">
                      {/* Category Name and Description Container */}
                      <div className="w-full">
                        {/* Category Name */}
                        <div className="text-lg sm:text-xl md:text-2xl font-boska text-burgundy-dark mb-3 text-right lg-custom:text-left">
                          {section.title}
                        </div>

                        {/* Ninong & Ninang (card-style) */}
                        {section.ninong && (
                          <div className="mb-4 text-right lg-custom:text-left">
                            <p className="text-sm sm:text-base font-albert text-burgundy-dark mb-1">
                              <span className="font-medium">Ninong</span>{' '}
                              <span className="font-thin italic">{section.ninong.description}</span>
                            </p>
                            <div className="dresscode-swatches-overlap justify-end lg-custom:justify-start flex mt-1.5">
                              {(section.ninong.colors || []).map((color, index) => (
                                <div key={index} className="dresscode-swatch-circle" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </div>
                        )}
                        {section.ninang && (
                          <div className="text-right lg-custom:text-left">
                            <p className="text-sm sm:text-base font-albert text-burgundy-dark mb-1">
                              <span className="font-medium">Ninang</span>{' '}
                              <span className="font-thin italic">{section.ninang.description}</span>
                            </p>
                            <div className="dresscode-swatches-overlap justify-end lg-custom:justify-start flex mt-1.5">
                              {(section.ninang.colors || []).map((color, index) => (
                                <div key={index} className="dresscode-swatch-circle" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Fallback: single description when no ninong/ninang */}
                        {!section.ninong && !section.ninang && section.description && (
                          <p className="text-sm sm:text-base font-albert font-thin italic text-burgundy-dark">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Category Image - First category: right on mobile, top on desktop */}
                    {section.image && (
                      <div className="w-1/2 lg-custom:w-full order-2 lg-custom:order-1">
                        <div className="w-full relative dresscode-image-container">
                          <img 
                            src={section.image} 
                            alt={section.title} 
                            className="w-full h-full object-cover rounded"
              />
            </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
                </div>
              );
            })()}
            
        {/* Vertical Divider - Hidden on mobile, shown on 992px and above */}
        {dresscode.sections && dresscode.sections.length > 1 && (
          <>
            <div className="hidden lg-custom:block w-px bg-burgundy-dark opacity-40 self-stretch"></div>
            <div className="lg-custom:hidden w-full">
              <Line />
            </div>
          </>
        )}

        {/* Guests Category */}
        {dresscode.sections && dresscode.sections[1] && (() => {
          const section = dresscode.sections[1];
              return (
            <div className="relative overflow-visible flex-1">
              <div className="relative overflow-visible">
                <div 
                  ref={category2Ref}
                  className="text-center transition-opacity duration-500 ease-in-out"
                >
                  {/* Category Image and Details - Side by side on mobile, stacked on 992px+ */}
                  <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                    {/* Category Image - Second category: left on mobile, top on desktop */}
                    {section.image && (
                      <div className="w-1/2 lg-custom:w-full">
                        <div className="w-full relative dresscode-image-container">
                          <img 
                            src={section.image} 
                            alt={section.title} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Category Details - Second category: left aligned on mobile, bottom on desktop */}
                    <div className="w-1/2 lg-custom:w-full flex flex-col justify-between text-left lg-custom:text-left dresscode-image-container">
                      {/* Category Name and Description Container */}
                      <div>
                        {/* Category Name */}
                        <div className="text-lg sm:text-xl md:text-2xl font-boska text-burgundy-dark mb-2 text-left">
                          {section.title}
                        </div>

                        {/* Guest description */}
                        {(section.description || section.shortDescription) && (
                          <p className="text-sm sm:text-base font-albert font-thin italic text-burgundy-dark mb-3 text-left">
                            {section.description || section.shortDescription}
                          </p>
                        )}

                        {/* Color Palette label + overlapping swatches */}
                        {(section.colors && section.colors.length) ? (
                          <div className="text-left">
                            <p className="text-xs sm:text-sm font-albert font-medium text-burgundy-dark uppercase tracking-wide mb-1.5">Color Palette</p>
                            <div className="dresscode-swatches-overlap flex mb-1.5">
                              {(section.colors || defaultGuestColors).map((color, index) => (
                                <div key={index} className="dresscode-swatch-circle" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                            {section.colorPaletteLabel && (
                              <p className="text-xs sm:text-sm font-albert italic text-burgundy-dark">{section.colorPaletteLabel}</p>
                            )}
                          </div>
                        ) : (
                          <div className="dresscode-swatches-overlap flex">
                            {defaultGuestColors.map((color, index) => (
                              <div key={index} className="dresscode-swatch-circle" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                      </div>
                    </div>
                </div>
              );
            })()}
      </div>
    </div>
  )
}

export default DressCode
