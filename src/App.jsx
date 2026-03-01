import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Footer from './components/Footer'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
// import OpeningScreen from './components/OpeningScreen'
import Loader from './components/Loader'
import Watermark from './components/Watermark'
import ScrollToTop from './components/ScrollToTop'
import Details from './components/pages/Details'
import Entourage from './components/pages/Entourage'
import Moments from './components/pages/Moments'
import { AudioProvider, useAudio } from './contexts/AudioContext'

function AppContent() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false) // Set to false to show opening screen
  const [isLoading, setIsLoading] = useState(true)
  const { play } = useAudio()
  const navigate = useNavigate()

  // Preload critical images and resources
  useEffect(() => {
    const preloadImages = async () => {
      const criticalImages = [
        // Hero image - most important
        '/assets/images/prenup/prenup5.jpg',  // Hero image
        // NavIndex images - all prenup photos used on home page
        '/assets/images/prenup/Proposal 5.jpg',  // Polaroid image
        '/assets/images/prenup/Proposal 1.jpg',  // RSVP container
        '/assets/images/prenup/Proposal 2.jpg',  // Moments polaroid 1
        '/assets/images/prenup/Proposal 4.jpg',  // Moments polaroid 2
        '/assets/images/prenup/prenup11.jpg',   // Save The Date countdown background
        // NavIndex graphics - all decorative elements
        '/assets/images/graphics/dusty-blue.png',
        '/assets/images/graphics/flower-1.png',
        '/assets/images/graphics/flower-3.png',
        '/assets/images/graphics/flower-4.png',
        '/assets/images/graphics/textured-bg-2.png',
        '/assets/images/graphics/bg-1.png'
      ]

      // Preload fonts
      const preloadFonts = async () => {
        if (document.fonts && document.fonts.ready) {
          try {
            await document.fonts.ready
          } catch (e) {
            console.warn('Font loading error:', e)
          }
        }
      }

      // Preload images with proper error handling and decoding
      const imagePromises = criticalImages.map((src) => {
        return new Promise((resolve) => {
          if (src.endsWith('.mp4')) {
            // For video, preload it properly
            const video = document.createElement('video')
            video.preload = 'auto'
            video.oncanplaythrough = () => resolve()
            video.onerror = () => resolve() // Resolve even on error to not block
            video.src = src
          } else {
            const img = new Image()
            img.onload = () => {
              // Try to decode the image to ensure it's ready for rendering
              if (img.decode) {
                img.decode()
                  .then(() => resolve())
                  .catch(() => resolve()) // Resolve even if decode fails
              } else {
                resolve()
              }
            }
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`)
              resolve() // Resolve even on error to not block loading
            }
            img.src = src
            // Set a timeout for each image (15 seconds max per image)
            setTimeout(() => resolve(), 15000)
          }
        })
      })

      // Start font preloading
      const fontPromise = preloadFonts()

      // Wait for all critical resources to load
      // Use Promise.allSettled to ensure we don't block on individual failures
      const results = await Promise.allSettled([
        Promise.all(imagePromises),
        fontPromise
      ])

      // Check if critical images loaded successfully
      const imageResults = results[0]
      if (imageResults.status === 'fulfilled') {
        console.log('All critical images loaded')
      } else {
        console.warn('Some images failed to load:', imageResults.reason)
      }

      // Additional delay to ensure browser has processed all resources
      // This helps prevent lag when NavIndex first renders
      await new Promise(resolve => setTimeout(resolve, 300))

      // Wait for hero image to be visible in the viewport
      const waitForHeroVisible = () => {
        return new Promise((resolve) => {
          const checkHero = () => {
            // Check if we're on the home page
            if (window.location.pathname === '/' || window.location.pathname === '') {
              // Look for hero image
              const heroImg = document.querySelector('img[src="/assets/images/prenup/prenup5.jpg"]')
              if (heroImg) {
                // Check if image is loaded and visible
                if (heroImg.complete && heroImg.naturalHeight > 0) {
                  // Use Intersection Observer to check if hero is visible
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        observer.disconnect()
                        resolve()
                      }
                    })
                  }, { threshold: 0.1 })
                  
                  observer.observe(heroImg)
                  
                  // Fallback timeout
                  setTimeout(() => {
                    observer.disconnect()
                    resolve()
                  }, 2000)
                } else {
                  // Image not loaded yet, wait for load event
                  heroImg.onload = () => {
                    setTimeout(() => resolve(), 100)
                  }
                  heroImg.onerror = () => resolve() // Resolve even on error
                  setTimeout(() => resolve(), 2000) // Fallback timeout
                }
              } else {
                // Hero image not found, resolve anyway
                resolve()
              }
            } else {
              // Not on home page, resolve immediately
              resolve()
            }
          }
          
          // Wait a bit for DOM to be ready
          if (document.readyState === 'complete') {
            checkHero()
          } else {
            window.addEventListener('load', checkHero)
            setTimeout(() => resolve(), 3000) // Fallback timeout
          }
        })
      }

      await waitForHeroVisible()

      // Hide loader
      setIsLoading(false)
    }

    preloadImages()
  }, [])

  const handleEnvelopeOpen = async () => {
    // Start playing music when invitation is revealed (user interaction allows auto-play)
    await play()
    setShowInvitation(true)
    navigate('/')
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      <DynamicTitle />
      <Watermark />
      <ScrollToTop />
      {/* Loader - shows while preloading */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
          <Loader />
        </div>
      )}
      {/* OpeningScreen - shows after loading, before invitation */}
      {/* {!isLoading && !showInvitation && (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      )} */}
      {/* Main content - shows after invitation is opened (stamp clicked) */}
      {!isLoading && (
        <>
          <Routes>
            <Route path="/" element={<Home onOpenRSVP={() => setIsRSVPModalOpen(true)} />} />
            <Route path="/details" element={<Details />} />
            <Route path="/entourage" element={<Entourage />} />
            <Route path="/moments" element={<Moments />} />
          </Routes>
          <Footer />
        </>
      )}
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}

export default App 