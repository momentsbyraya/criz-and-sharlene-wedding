import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { couple, schedule as scheduleData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const scheduleTitleRef = useRef(null)
  const scheduleDescRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  useEffect(() => {
    // Schedule title animation
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Schedule description text animation
    if (scheduleDescRef.current) {
      gsap.set(scheduleDescRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: scheduleDescRef.current,
        start: "top 85%",
        animation: gsap.to(scheduleDescRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 }),
        toggleActions: "play none none reverse"
      })
    }

    // Timeline line expansion from top to bottom
    if (lineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Events animate in with stagger
    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('div.flex.items-center')
      if (eventItems.length > 0) {
        gsap.set(eventItems, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: eventsRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(eventItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2
            })
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === scheduleTitleRef.current ||
          trigger.vars.trigger === scheduleDescRef.current ||
          trigger.vars.trigger === timelineRef.current ||
          trigger.vars.trigger === eventsRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative program-section bg-burgundy-wine">
      {/* Program Title */}
      <div ref={scheduleTitleRef} className="relative z-10 mb-12 sm:mb-16 program-title-container">
        <h3 className="px-6 py-3">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize program-title-text"
          >
            Order of Events
          </span>
        </h3>
        <p ref={scheduleDescRef} className="text-sm sm:text-base md:text-lg font-albert text-burgundy-cream text-center mt-4 mx-auto px-4 program-description">
          Join us as we celebrate this special day together
        </p>
      </div>

      {/* Vertical Timeline */}
      <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto z-10 timeline-container">
        {/* Central Vertical Line - Light Grey */}
        <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-burgundy-cream opacity-50 transform -translate-x-1/2"></div>

        {/* Timeline Events */}
        <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
           {scheduleData.events.map((event, index) => {
             const isLeft = event.position === 'left'
             return (
               <div key={index} className="flex items-center relative min-h-[60px]">
                 {isLeft ? (
                   <>
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                         {event.time}
              </div>
              <div className="border-b border-dashed border-burgundy-cream opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                         {event.description}
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-burgundy-cream rounded-full z-10"></div>
                     <div className="w-1/2 pl-6 text-left"></div>
                   </>
                 ) : (
                   <>
                     <div className="w-1/2 pr-6 text-right"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-burgundy-cream rounded-full z-10"></div>
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                         {event.time}
              </div>
              <div className="border-b border-dashed border-burgundy-cream opacity-50 mb-1"></div>
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                         {event.description}
              </div>
            </div>
                   </>
                 )}
          </div>
             )
           })}
        </div>
      </div>
    </div>
  )
}

export default Schedule
