import React, { useEffect, useRef, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, ArrowLeft, ArrowRight, ChevronDown, UtensilsCrossed, Palette, Users, Mail, Baby, Car, Camera, Gift, Heart } from 'lucide-react'
import { themeConfig } from '../../config/themeConfig'
import { faq as faqData } from '../../data'
import ImageBanner from '../ImageBanner'
import Divider from '../Divider'
import Line from '../Line'
import SecondaryButton from '../SecondaryButton'
import PhotoSection from '../PhotoSection'
import Venue from '../Venue'
import Schedule from '../Schedule'
import EntourageDetailsSection from '../EntourageDetailsSection'
import DressCode from '../DressCode'
import './Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Details = () => {
  const navigate = useNavigate()
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerContentRef = useRef(null)
  const venueRef = useRef(null)
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)
  const photoSectionRef = useRef(null)
  const curvedDivider1Ref = useRef(null)
  const curvedDivider2Ref = useRef(null)
  const curvedDivider3Ref = useRef(null)
  const faqItems = faqData

  // Helper function to get icon and clean text for FAQ questions
  const getFaqIconAndText = (question) => {
    // Map question text patterns to icons
    const questionIconMap = {
      'Wedding Ceremony Location': MapPin,
      'Wedding Reception Location': UtensilsCrossed,
      'What time is the wedding?': Clock,
      'What is the wedding theme and dress code?': Palette,
      'Can I bring a plus one?': Users,
      'What to wear?': Palette,
      "Where's the reception?": UtensilsCrossed,
      'Is RSVP required?': Mail,
      'Are children allowed?': Baby,
      'Is parking available?': Car,
      'Can guests take photos or videos during the ceremony?': Camera,
      'Is there a gift registry?': Gift,
      'Final Reminder': Heart
    }
    
    // Check for exact match first
    if (questionIconMap[question]) {
      return { Icon: questionIconMap[question], text: question }
    }
    
    // Check for partial matches (in case of emoji prefixes or slight variations)
    for (const [key, Icon] of Object.entries(questionIconMap)) {
      if (question.includes(key) || key.includes(question.trim())) {
        return { Icon, text: question.replace(/^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/, '').trim() }
      }
    }
    
    // Remove any emoji at the start if present
    const emojiPattern = /^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/
    const cleanText = question.replace(emojiPattern, '').trim()
    
    return { Icon: null, text: cleanText }
  }

  // Helper function to parse answer text and convert phone numbers to clickable links
  const parseAnswerWithPhoneNumbers = (answer) => {
    // Phone number pattern: matches 10-11 digit numbers (Philippine format)
    const phonePattern = /(\d{10,11})/g
    
    const parts = []
    let lastIndex = 0
    let match
    
    while ((match = phonePattern.exec(answer)) !== null) {
      // Add text before the phone number
      if (match.index > lastIndex) {
        parts.push(answer.substring(lastIndex, match.index))
      }
      
      // Add the phone number as a link
      const phoneNumber = match[0]
      // Format phone number for tel: protocol (remove leading 0 and add country code for better compatibility)
      // Keep original format for display, but use international format for tel: link
      const telNumber = phoneNumber.startsWith('0') ? `+63${phoneNumber.slice(1)}` : phoneNumber
      parts.push(
        <a
          key={match.index}
          href={`tel:${telNumber}`}
          className="faq-phone-link"
          aria-label={`Call ${phoneNumber}`}
        >
          {phoneNumber}
        </a>
      )
      
      lastIndex = match.index + phoneNumber.length
    }
    
    // Add remaining text after the last phone number
    if (lastIndex < answer.length) {
      parts.push(answer.substring(lastIndex))
    }
    
    // If no phone numbers were found, return the original answer
    return parts.length > 0 ? parts : answer
  }

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (old-book-bg)
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.6 }
      )
    }

    // Scroll-triggered animations for individual elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header content (description and graphics) animation
    if (headerContentRef.current) {
      ScrollTrigger.create({
        trigger: headerContentRef.current,
        start: "top 80%",
        animation: gsap.fromTo(headerContentRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }







    // Photo Section animation
    if (photoSectionRef.current) {
      ScrollTrigger.create({
        trigger: photoSectionRef.current,
        start: "top 80%",
        animation: gsap.fromTo(photoSectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Curved Divider animations
    if (curvedDivider1Ref.current) {
      ScrollTrigger.create({
        trigger: curvedDivider1Ref.current,
        start: "top 85%",
        animation: gsap.fromTo(curvedDivider1Ref.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (curvedDivider2Ref.current) {
      ScrollTrigger.create({
        trigger: curvedDivider2Ref.current,
        start: "top 85%",
        animation: gsap.fromTo(curvedDivider2Ref.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (curvedDivider3Ref.current) {
      ScrollTrigger.create({
        trigger: curvedDivider3Ref.current,
        start: "top 85%",
        animation: gsap.fromTo(curvedDivider3Ref.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // FAQ section animation - title first, then items one after the other
    if (faqRef.current && faqTitleRef.current) {
      // Set initial states
      gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })
        
        ScrollTrigger.create({
          trigger: faqRef.current,
          start: "top 80%",
          onEnter: () => {
          // 1. Animate title first
          gsap.to(faqTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // 2. After title animation, find and animate items one after the other
              const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
              if (faqItemsContainer) {
                const faqItems = Array.from(faqItemsContainer.children).filter(child => child.tagName === 'DIV')
                
                if (faqItems.length > 0) {
                  // Set initial states for items
                  gsap.set(faqItems, { opacity: 0, y: 30 })
                  
                  // Animate items one after the other
            gsap.to(faqItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
                    stagger: 0.2
            })
                }
              }
          }
        })
      }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      id="details"
      data-section="details"
      className="relative pb-20 w-full overflow-hidden bg-white details-section"
    >
      {/* Flower Banner Image at Top */}
      <ImageBanner 
        src="/assets/images/graphics/flower-banner.png" 
        alt="Flower banner"
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 pb-32">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <div ref={headerContentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-burgundy-dark max-w-3xl mx-auto leading-relaxed">
                Join us as we exchange our vows
              </p>
              <Divider />
            </div>
          </div>

          {/* Venue Section */}
          <Venue />
                  </div>
                </div>
                
       {/* Flower Divider */}
       <div ref={curvedDivider1Ref} className="relative w-full h-16 sm:h-20 md:h-24 flex items-center justify-center">
         <img 
           src="/assets/images/graphics/flower-divider.png" 
           alt="Flower divider"
           className="w-full h-full object-contain"
           style={{ transform: 'scale(2.5) rotate(5deg)' }}
         />
            </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />

          {/* Entourage Section */}
          <EntourageDetailsSection />
                    </div>
                </div>

      {/* Curved Line Divider */}
      {/* <div ref={curvedDivider2Ref} className="relative w-full py-8 flex items-center justify-center">
        <svg 
          className="w-full h-16 sm:h-20 md:h-24" 
          viewBox="0 0 1200 100" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,50 Q300,20 600,50 T1200,50" 
            stroke="#7BA3C4" 
            strokeWidth="2" 
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div> */}
                    
      {/* Photo Section */}
      {/* <div ref={photoSectionRef}>
      <PhotoSection
        images={[
          { src: '/assets/images/couple-1.jpg', alt: 'Photo 1', label: 'Memories' },
          { src: '/assets/images/couple-2.jpg', alt: 'Photo 2', label: 'Together' },
          { src: '/assets/images/couple-3.jpg', alt: 'Photo 3', label: 'Love' }
        ]}
        paragraph="This is where our journey began, a moment captured in time that will forever hold a special place in our hearts."
        backgroundTexts={['Forever', 'Always', 'Together', 'Love', 'Us']}
      />
      </div> */}

      {/* Curved Line Divider */}
      {/* <div ref={curvedDivider3Ref} className="relative w-full py-8 flex items-center justify-center">
        <svg 
          className="w-full h-16 sm:h-20 md:h-24" 
          viewBox="0 0 1200 100" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,50 Q300,20 600,50 T1200,50" 
            stroke="#7BA3C4" 
            strokeWidth="2" 
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div> */}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />
        </div>
      </div>

      {/* Flower Divider - Flipped horizontally and vertically */}
      <div className="relative w-full h-16 sm:h-20 md:h-24 flex items-center justify-center my-8">
        <img 
          src="/assets/images/graphics/flower-divider.png" 
          alt="Flower divider" 
          className="w-full h-full object-contain"
          style={{ 
            transform: 'scale(2.5) rotate(5deg) scaleX(-1) scaleY(-1)',
            transformOrigin: 'center'
          }}
        />
      </div>

      {/* FAQ Section - Outside container */}
      <div className="relative z-20 mt-20 faq-section">
        <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <h3 ref={faqTitleRef} className="relative inline-block px-6 py-3 mb-12 text-center w-full">
            <span 
              className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase faq-title-text"
            >
              Frequently Asked Questions
            </span>
          </h3>
          {faqItems && faqItems.faqData && (
            <div className="space-y-6 max-w-[600px] mx-auto">
              {faqItems.faqData.map((item, index) => {
                const { text } = getFaqIconAndText(item.question)
                return (
                  <div key={index}>
                    <div className="mb-2">
                      <p className="text-base sm:text-lg font-albert text-burgundy-cream mb-2 faq-question-bold">
                        Q: {text}
                      </p>
                      <p className="text-sm sm:text-base font-albert font-thin text-burgundy-cream whitespace-pre-line">
                        A: {parseAnswerWithPhoneNumbers(item.answer)}
                      </p>
                    </div>
                    {index < faqItems.faqData.length - 1 && (
                      <div className="h-px bg-burgundy-cream/30 mt-6"></div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Graphics with horizontal lines */}
      <div className="mt-12 relative z-20">
        <Divider />
      </div>

    </section>


    
    {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
    <button
      ref={backButtonRef}
      onClick={() => {
        // Slide out page to the left before navigating
        if (sectionRef.current) {
          gsap.to(sectionRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              navigate('/')
            }
          })
        } else {
          navigate('/')
        }
      }}
      className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-burgundy-dark text-white rounded-full shadow-lg hover:bg-burgundy-tan hover:scale-110 transition-all duration-300 flex items-center justify-center group back-button"
      aria-label="Back to home"
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
    </button>
    </>
  )
}

export default Details





