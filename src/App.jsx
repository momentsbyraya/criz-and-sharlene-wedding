import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Footer from './components/Footer'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import Loader from './components/Loader'
import OpeningScreen from './components/OpeningScreen'
import ScrollToTop from './components/ScrollToTop'
import Watermark from './components/Watermark'
import { AudioProvider, useAudio } from './contexts/AudioContext'

const Details = lazy(() => import('./components/pages/Details'))
const Entourage = lazy(() => import('./components/pages/Entourage'))
const Moments = lazy(() => import('./components/pages/Moments'))

function AppContent() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Preload critical images and resources
  useEffect(() => {
    const preloadImages = async () => {
      // Keep this list small — every URL here downloads before the envelope (Vercel/Netlify bandwidth).
      // Hero video is YouTube by default; do not preload the large MP4. Gallery below uses OUR MOMENTS slides.
      const criticalImages = [
        '/assets/images/prenup/1000082213.jpg',
        '/assets/images/prenup/OUR%20MOMENTS-Slide%201.jpg',
        '/assets/images/graphics/dusty-blue.png',
        '/assets/images/graphics/flower-1.png',
        '/assets/images/graphics/flower-3.png',
        '/assets/images/graphics/flower-4.png',
        '/assets/images/graphics/textured-bg-2.png',
        '/assets/images/graphics/bg-1.png',
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
            resolve()
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
              // Hero may be <img> or a div with CSS background-image
              const heroEl = document.querySelector('[data-hero="true"]')
              if (heroEl instanceof HTMLImageElement) {
                const heroImg = heroEl
                if (heroImg.complete && heroImg.naturalHeight > 0) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        observer.disconnect()
                        resolve()
                      }
                    })
                  }, { threshold: 0.1 })
                  observer.observe(heroImg)
                  setTimeout(() => {
                    observer.disconnect()
                    resolve()
                  }, 2000)
                } else {
                  heroImg.onload = () => {
                    setTimeout(() => resolve(), 100)
                  }
                  heroImg.onerror = () => resolve()
                  setTimeout(() => resolve(), 2000)
                }
              } else if (heroEl) {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      observer.disconnect()
                      resolve()
                    }
                  })
                }, { threshold: 0.1 })
                observer.observe(heroEl)
                setTimeout(() => {
                  observer.disconnect()
                  resolve()
                }, 2000)
              } else {
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
    // Reveal invitation first; Hero handles synced video + music playback.
    setShowInvitation(true)
    navigate('/')
  }

  return (
    <div className="App relative min-h-screen pastel-watercolor-bg">
      <Watermark />
      <div className="relative z-10 min-h-screen">
        <DynamicTitle />
        <ScrollToTop />
        {/* Loader - shows while preloading */}
        {isLoading && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
            <Loader />
          </div>
        )}
        {/* Opening screen - envelope with "Click me!"; shows after loading until user opens */}
        {!isLoading && !showInvitation && (
          <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
        )}
        {/* Main content - shows after invitation is opened (stamp clicked) */}
        {!isLoading && showInvitation && (
          <>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home onOpenRSVP={() => setIsRSVPModalOpen(true)} />} />
                <Route path="/details" element={<Details />} />
                <Route path="/entourage" element={<Entourage />} />
                <Route path="/moments" element={<Moments />} />
              </Routes>
            </Suspense>
            <Footer />
          </>
        )}
        <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
      </div>
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