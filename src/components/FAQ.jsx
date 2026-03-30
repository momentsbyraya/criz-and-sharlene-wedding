import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Clock, ArrowLeft, ArrowRight, ChevronDown, UtensilsCrossed, Palette, Users, Mail, Baby, Car, Camera, Gift, Heart } from 'lucide-react'
import { faq as faqData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)
  const faqItems = faqData
  const totalFaqs = faqItems?.faqData?.length ?? 0
  const hiddenCount = Math.max(0, totalFaqs - 3)

  // Helper function to get icon and clean text for FAQ questions
  const getFaqIconAndText = (question) => {
    // Map question text patterns to icons
    const questionIconMap = {
      'Wedding Ceremony Location': MapPin,
      'Wedding Reception Location': UtensilsCrossed,
      'What time is the wedding?': Clock,
      'What is the wedding theme and dress code?': Palette,
      'Do you have a gift preference?': Gift,
      'Can I bring a plus one?': Users,
      'What to wear?': Palette,
      'Is it okay to wear white?': Palette,
      "Where's the reception?": UtensilsCrossed,
      'Is RSVP required?': Mail,
      'What if I did not RSVP but will attend the wedding?': Mail,
      'Are children allowed?': Baby,
      'Can I bring my kid(s) with me?': Baby,
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

  useEffect(() => {
    // Title stays visible; animate the currently-rendered FAQ items
    if (faqRef.current && faqTitleRef.current) {
      gsap.set(faqTitleRef.current, { opacity: 1, y: 0 })
      const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
      if (faqItemsContainer) {
        const items = Array.from(faqItemsContainer.children).filter(child => child.tagName === 'DIV')
        if (items.length > 0) {
          gsap.set(items, { opacity: 0, y: 18 })
          gsap.to(items, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.1 })
        }
      }
    }
  }, [showAll])

  return (
    <div className="relative z-20 faq-section">
      <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
        <h3 ref={faqTitleRef} className="faq-title-block relative inline-block px-6 py-3 pt-8 sm:pt-10 mb-10 sm:mb-12 text-center w-full">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize faq-title-text"
          >
            Frequently Asked Questions
          </span>
        </h3>
        {faqItems && faqItems.faqData && (
          <div className="space-y-6 max-w-[600px] mx-auto">
            {(showAll ? faqItems.faqData : faqItems.faqData.slice(0, 3)).map((item, index) => {
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
                  {index < (showAll ? faqItems.faqData.length : Math.min(3, faqItems.faqData.length)) - 1 && (
                    <div className="h-px bg-burgundy-cream/30 mt-6"></div>
                  )}
                </div>
              )
            })}

            {totalFaqs > 3 && (
              <div className="pt-3">
                <button
                  type="button"
                  className="faq-more-toggle w-full flex items-center justify-center gap-3 py-3"
                  onClick={() => setShowAll((v) => !v)}
                  aria-label={showAll ? 'Show fewer FAQs' : `Show ${hiddenCount} more FAQs`}
                >
                  <span className="faq-more-line" aria-hidden="true" />
                  <span className="faq-more-text font-albert text-xs sm:text-sm">
                    {showAll ? 'Show less' : `+${hiddenCount} more FAQs`}
                  </span>
                  <span className="faq-more-icon" aria-hidden="true">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
                  </span>
                  <span className="faq-more-line" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ
