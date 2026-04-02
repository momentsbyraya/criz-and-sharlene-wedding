import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useAudio } from '../../contexts/AudioContext'
import { gallery } from '../../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const prenupImages = gallery.images ?? []

const storyHeroSrc = prenupImages[0] ?? ''
const ferlStorySrc = prenupImages[1] ?? storyHeroSrc
const photo2013Src = prenupImages[2] ?? storyHeroSrc
const endPhoto4Src = prenupImages[3] ?? storyHeroSrc

const momentsFaceFocusPositions = [
  '50% 58%',
  '50% 34%',
  '50% 36%',
  '50% 28%',
  '50% 34%',
  '50% 62%',
  '50% 56%',
  '50% 38%',
]

const Moments = () => {
  const navigate = useNavigate()
  const { pause, play, isPlaying, audioRef } = useAudio()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const polaroidScrollRef = useRef(null)
  const threePhotosScrollRef = useRef(null)
  const titleRef = useRef(null)
  const firstParagraphRef = useRef(null)
  const secondParagraphRef = useRef(null)
  const textBeforeImagesRef = useRef(null)
  const polaroidContainerRef = useRef(null)
  const thirdParagraphRef = useRef(null)
  const ferl1949Ref = useRef(null)
  const fourthParagraphRef = useRef(null)
  const threePhotosRowRef = useRef(null)
  const momentsTitleRef = useRef(null)
  const momentsGridRef = useRef(null)
  const pImagesGridRef = useRef(null)
  const galleryScrollContainerRef = useRef(null)
  const galleryImagesRef = useRef(null)
  const endPhoto4Ref = useRef(null)
  const ry211ImageRef = useRef(null)
  const photo2013Ref = useRef(null)
  const finalParagraphRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const videoModalRef = useRef(null)
  const wasPlayingBeforeVideo = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isDraggingThreePhotos, setIsDraggingThreePhotos] = useState(false)
  const [startXThreePhotos, setStartXThreePhotos] = useState(0)
  const [scrollLeftThreePhotos, setScrollLeftThreePhotos] = useState(0)

  // Our Moments Gallery images (requested order)
  // 1 = Slide 1 (top) ... 8 = Slide 14
  const galleryImages = [
    '/assets/images/prenup/OUR%20MOMENTS-Slide%201.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%202.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%203.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%204.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%205.jpg',
    '/assets/images/prenup/slide%206%20%282%29.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%207.jpg',
    '/assets/images/prenup/OUR%20MOMENTS-Slide%208.jpg',
  ]

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

    // Our Story title animation on load
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.7 }
      )
    }

    // First paragraph animation on load
    if (firstParagraphRef.current) {
      gsap.fromTo(firstParagraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
      )
    }

    // Scroll to center the 2nd photo on load
    if (polaroidScrollRef.current) {
      setTimeout(() => {
        const container = polaroidScrollRef.current
        if (container) {
          const scrollWidth = container.scrollWidth
          const clientWidth = container.clientWidth
          // Center the 2nd photo (index 1)
          // Each photo is 200px wide + 16px gap (gap-4)
          const photoWidth = 200
          const gap = 16
          const secondPhotoIndex = 1
          // Calculate the position of the 2nd photo's center
          const secondPhotoCenter = (secondPhotoIndex * (photoWidth + gap)) + (photoWidth / 2)
          // Scroll to center the photo in the viewport
          const scrollPosition = secondPhotoCenter - (clientWidth / 2)
          container.scrollTo({
            left: Math.max(0, Math.min(scrollPosition, scrollWidth - clientWidth)),
            behavior: 'smooth'
          })
        }
      }, 800) // Delay to allow page animation to complete
    }

    // Scroll animations for paragraphs with slide-in effect
    const paragraphRefs = [
      { ref: secondParagraphRef, direction: 'left' },
      { ref: thirdParagraphRef, direction: 'right' },
      { ref: finalParagraphRef, direction: 'left' }
    ]

    paragraphRefs.forEach(({ ref, direction }) => {
      if (ref.current) {
        const xValue = direction === 'left' ? -50 : 50
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            x: xValue,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    })

    // Scroll animations for other elements
    const scrollElements = [
      { ref: textBeforeImagesRef },
      { ref: polaroidContainerRef },
      { ref: ferl1949Ref },
      { ref: fourthParagraphRef },
      { ref: threePhotosRowRef },
      { ref: photo2013Ref },
      { ref: momentsTitleRef },
      { ref: momentsGridRef },
      { ref: pImagesGridRef }
    ]

    scrollElements.forEach(({ ref }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    })


    // Gallery animations
    if (momentsGridRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: momentsGridRef.current,
          start: "top 50%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate Gallery heading
      if (momentsTitleRef.current) {
        tl.fromTo(momentsTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
      }

      // Animate gallery images container - slide from right
      if (galleryImagesRef.current) {
        tl.fromTo(galleryImagesRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        )
      }
    }

    // Scroll animation for R&Y-209 photo after gallery
    if (endPhoto4Ref.current) {
      gsap.fromTo(
        endPhoto4Ref.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: endPhoto4Ref.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Function to handle video modal open
  const handleVideoOpen = () => {
    // Pause background music when video opens - check actual audio state
    if (audioRef.current && !audioRef.current.paused) {
      wasPlayingBeforeVideo.current = true
      pause()
    } else {
      wasPlayingBeforeVideo.current = false
    }
    
    setIsVideoOpen(true)
  }

  // Function to handle video modal close
  const handleVideoClose = () => {
    setIsVideoOpen(false)
    
    // Resume music when video closes (if it was playing before)
    if (wasPlayingBeforeVideo.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.log('Could not resume music:', error)
          })
        }
        wasPlayingBeforeVideo.current = false
      }, 300)
    }
  }

  // Gallery drag handlers
  const handleGalleryMouseDown = (e) => {
    if (!galleryScrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - galleryScrollContainerRef.current.offsetLeft)
    setScrollLeft(galleryScrollContainerRef.current.scrollLeft)
    galleryScrollContainerRef.current.style.cursor = 'grabbing'
    galleryScrollContainerRef.current.style.userSelect = 'none'
  }

  const handleGalleryMouseLeave = () => {
    setIsDragging(false)
    if (galleryScrollContainerRef.current) {
      galleryScrollContainerRef.current.style.cursor = 'grab'
      galleryScrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleGalleryMouseUp = () => {
    setIsDragging(false)
    if (galleryScrollContainerRef.current) {
      galleryScrollContainerRef.current.style.cursor = 'grab'
      galleryScrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleGalleryMouseMove = (e) => {
    if (!isDragging || !galleryScrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - galleryScrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    galleryScrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch events for mobile
  const handleGalleryTouchStart = (e) => {
    if (!galleryScrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - galleryScrollContainerRef.current.offsetLeft)
    setScrollLeft(galleryScrollContainerRef.current.scrollLeft)
  }

  const handleGalleryTouchMove = (e) => {
    if (!isDragging || !galleryScrollContainerRef.current) return
    const x = e.touches[0].pageX - galleryScrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    galleryScrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleGalleryTouchEnd = () => {
    setIsDragging(false)
  }

  // Gallery image click handler
  const handleGalleryImageClick = (image, index) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
  }

  // Gallery lightbox navigation - uses galleryImages to match gallery order
  const handleGalleryPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1
      setSelectedImage(galleryImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  const handleGalleryNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      const newIndex = selectedImageIndex + 1
      setSelectedImage(galleryImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  const handleGalleryClose = () => {
    setSelectedImage(null)
    setSelectedImageIndex(null)
  }

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Apply object-position to R&Y-211 image on desktop
  useEffect(() => {
    if (ry211ImageRef.current && !isMobile) {
      ry211ImageRef.current.style.objectPosition = '15% center'
    } else if (ry211ImageRef.current && isMobile) {
      ry211ImageRef.current.style.objectPosition = 'center center'
    }
  }, [isMobile])

  // Video modal rotation animation (only on screens smaller than 768px)
  useEffect(() => {
    if (isVideoOpen && videoModalRef.current) {
      // Set initial state
      gsap.set(videoModalRef.current, {
        rotation: 0,
        scale: 0.8,
        opacity: 0
      })
      
      // Animate to landscape (only on mobile)
      gsap.to(videoModalRef.current, {
        rotation: isMobile ? 90 : 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [isVideoOpen, isMobile])

  return (
    <>
      <section
        ref={sectionRef}
        id="moments"
        data-section="moments"
        className="relative w-full overflow-hidden min-h-screen"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/textured-bg-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Index Image at Top */}
        <div className="relative z-20 w-full flex flex-col items-center">
          <div className="relative w-screen group cursor-pointer" onClick={handleVideoOpen}>
            <img 
              src={storyHeroSrc} 
              alt="Index image" 
              className="w-full h-auto object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {/* Subtle Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 opacity-70 group-hover:opacity-100">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 ml-0.5" fill="rgba(255, 255, 255, 0.9)" />
              </div>
            </div>
          </div>
          
          {/* Our Story Title */}
          <div ref={titleRef} className="w-full max-w-4xl text-center pt-12 pb-6 px-4">
            <span className="nanum-myeongjo-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl inline-block" style={{ color: '#171717' }}>OUR</span>
            <span 
              className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block ml-2" 
              style={{ 
                lineHeight: '1.2',
                color: '#0A1F44',
                display: 'inline-block',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}
            >
              Story
            </span>
          </div>
          
          {/* First Paragraph */}
          {/* Love Story */}
            <div ref={firstParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16 mt-4">
              <div className="alice-regular font-black text-burgundy-dark leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
                <p className="mb-4">
                  At just 15 years old, the bride first encountered her future groom, a colleague of her father. On a lively evening, the groom graciously accompanied her father home from his birthday party. That night, as she studied, a gentle knock at the door sent her heart racing. When she opened it and saw him standing there, she flustered and quickly hid, a fleeting moment of magic passing between them, yet unacknowledged.
                </p>
              </div>
           </div>

           {/* Third Paragraph */}

           {/* FERL1949 Photo */}
           <div ref={ferl1949Ref} className="relative z-20 w-full max-w-2xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8 flex justify-center">
             <img
               src={ferlStorySrc}
               alt="Love story photo"
               className="w-full h-auto object-cover cursor-pointer"
               loading="lazy"
               decoding="async"
               onClick={() => {
                 const imageIndex = galleryImages.indexOf(ferlStorySrc)
                 setSelectedImage(ferlStorySrc)
                 setSelectedImageIndex(imageIndex !== -1 ? imageIndex : 0)
               }}
             />
           </div>

           {/* Story text after first photo */}
           <div ref={secondParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8">
             <div className="alice-regular font-black text-burgundy-dark leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
               <p className="mb-4">
                 Life led them down separate journeys but fate had other plans. Many years later, as she prepared to drive her first car, her father called upon the groom to lend a hand.
               </p>
             </div>
           </div>

            {/* FERL2103 Photo */}
            <div ref={photo2013Ref} className="relative z-20 w-full max-w-2xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8 flex justify-center mx-auto">
              <img
                src={photo2013Src}
                alt="2013 Photo"
                className="w-full h-auto object-cover cursor-pointer"
                loading="lazy"
                decoding="async"
                onClick={() => {
                  const imageIndex = galleryImages.indexOf(photo2013Src)
                  setSelectedImage(photo2013Src)
                  setSelectedImageIndex(imageIndex !== -1 ? imageIndex : 0)
                }}
              />
            </div>

           {/* Story text after second photo */}
           <div ref={thirdParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8">
             <div className="alice-regular font-black text-burgundy-dark leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
               <p className="mb-4">
                 That driving lesson blossomed into a beautiful connection filled with laughter, shared dreams, and rediscovery. Over the past five years, they have not only celebrated milestones but have also faced challenges that have made them better individuals. Supporting one another through thick and thin, they have both grown stronger and more compassionate, embodying the true essence of partnership.
               </p>
             </div>
           </div>

           {/* Moments Gallery Section */}
           <div 
             ref={momentsGridRef} 
             className="relative z-20 w-full flex flex-col mt-8"
             style={{
               backgroundColor: '#F8FAFC'
             }}
           >
             {/* Title - Full Width at Top */}
             <div className="relative z-20 w-full" style={{ border: 'none' }}>
               <h2 ref={momentsTitleRef} className="w-full text-center px-4" style={{
                 backgroundImage: 'url(/assets/images/graphics/bg-3.png)',
                     backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 color: '#FFFFFF',
                 paddingTop: '4rem',
                 paddingBottom: '4rem',
                 overflow: 'visible',
                 border: 'none',
                 outline: 'none'
               }}>
                 {/* Gold-1 Graphic Above Title */}
                 <div className="flex justify-center items-center w-full mb-4">
                   <img 
                     src="/assets/images/graphics/gold-1.png" 
                     alt="Decorative graphic" 
                     className="h-auto"
                     style={{ maxWidth: '120px', width: 'auto' }}
                 />
               </div>
                 <span 
                   className="stylish-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block" 
                   style={{
                     lineHeight: '1.2',
                     background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #B8860B 75%, #DAA520 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     filter: 'drop-shadow(0 2px 4px rgba(218, 165, 32, 0.3))',
                     display: 'inline-block',
                     paddingTop: '0.5rem',
                     paddingBottom: '0.5rem'
                   }}
                 >
                   Our Moments
                 </span>
               </h2>
               </div>

             {/* Content Container */}
             <div 
               className="w-full flex flex-col relative z-10"
                   style={{
                 backgroundImage: 'url(/assets/images/graphics/bg-3.png)',
                 backgroundSize: '100% 50%',
                 backgroundPosition: 'top center',
                 backgroundRepeat: 'no-repeat',
                 backgroundColor: '#F8FAFC'
               }}
             >
               {/* Horizontal Scrollable Images */}
               <div 
                 ref={galleryImagesRef}
                 className="w-full"
               >
                 <div 
                   ref={galleryScrollContainerRef}
                   className="w-full overflow-x-auto"
                   style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none',
                     cursor: 'grab'
                   }}
                   onMouseDown={handleGalleryMouseDown}
                   onMouseLeave={handleGalleryMouseLeave}
                   onMouseUp={handleGalleryMouseUp}
                   onMouseMove={handleGalleryMouseMove}
                   onTouchStart={handleGalleryTouchStart}
                   onTouchMove={handleGalleryTouchMove}
                   onTouchEnd={handleGalleryTouchEnd}
                 >
                   <style>{`
                     div::-webkit-scrollbar {
                       display: none;
                     }
                   `}</style>
                   <div className="flex gap-4 px-4" style={{ minHeight: '300px' }}>
                     {galleryImages.map((image, index) => (
                       <img
                         key={index}
                         src={image}
                         alt={`Gallery ${index + 1}`}
                         className="flex-shrink-0 object-cover cursor-pointer"
                         style={{
                           width: '300px',
                           height: '300px',
                          objectPosition: momentsFaceFocusPositions[index] || '50% 50%',
                           borderRadius: '0'
                         }}
                         width="300"
                         height="300"
                         draggable="false"
                         loading={index < 4 ? "eager" : "lazy"}
                         fetchPriority={index < 4 ? "high" : index < 8 ? "auto" : "low"}
                         decoding="async"
                         onClick={() => {
                           handleGalleryImageClick(image, index)
                         }}
                       />
                     ))}
               </div>
                 </div>
               </div>
             </div>

             {/* Image Slider Graphic - Bottom Right */}
             <img
               src="/assets/images/graphics/image-slider.png"
               alt="Image slider decoration"
               className="absolute bottom-0 right-0 w-32 sm:w-40 md:w-48 opacity-50"
               style={{ zIndex: 1 }}
               loading="lazy"
               decoding="async"
             />
           </div>

           {/* Story text before final photo */}
           <div ref={finalParagraphRef} className="relative z-20 w-full max-w-4xl px-8 sm:px-12 md:px-8 lg:px-16 mt-8 mx-auto">
             <div className="alice-regular font-black text-burgundy-dark leading-relaxed text-center" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
               <p className="mb-4">
                 Join us in celebrating their extraordinary journey—a tale of serendipity, unexpected love, and the joy of two hearts making each other better. Together, they are thrilled to say, "I do," as they embrace a future full of promise and adventure.
               </p>
             </div>
           </div>

           {/* R&Y-209 Photo - Full Width After Gallery */}
           <div ref={endPhoto4Ref} className="relative z-20 w-screen mt-8">
             <div className="relative">
               <img
                 src={endPhoto4Src}
                 alt="Love story photo"
                 className="w-full h-auto object-cover cursor-pointer"
                 loading="lazy"
                 decoding="async"
                 onClick={() => {
                   const imageIndex = galleryImages.indexOf(endPhoto4Src)
                   setSelectedImage(endPhoto4Src)
                   setSelectedImageIndex(imageIndex !== -1 ? imageIndex : 0)
                 }}
               />
             </div>
           </div>


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
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#0A1F44] text-white rounded-full shadow-lg hover:bg-[#2E2E2E] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      {/* Video Modal */}
      {isVideoOpen && createPortal(
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => {
            // Close when clicking the backdrop
            if (e.target === e.currentTarget) {
              handleVideoClose()
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleVideoClose()
            }}
            className="absolute top-4 right-4 z-[300] w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* YouTube Video Player */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/KSPPzvrdFyU?si=nA2owsm0AcwCZZ8x&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="max-w-full max-h-full"
              style={{ 
                width: '90%',
                height: '90%',
                maxWidth: '1000px',
                maxHeight: '562px',
                aspectRatio: '16/9',
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>,
        document.body
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60"
          onClick={handleGalleryClose}
        >
          {/* Close Icon - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleGalleryClose()
            }}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button - Left */}
          {selectedImageIndex !== null && selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGalleryPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Next Button - Right */}
          {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleGalleryNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Full Image */}
          <img
            src={selectedImage}
            alt="Gallery full view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  )
}

export default Moments
