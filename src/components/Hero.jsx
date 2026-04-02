import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Play } from 'lucide-react'
import { couple, audio as audioConfig } from '../data'
import { useAudio } from '../contexts/AudioContext'

const HERO_POSTER_URL = '/assets/images/prenup/1000082213.jpg'
// Self-hosted MP4 (uses Vercel bandwidth). Omit if using YouTube only.
const HERO_VIDEO_FALLBACK =
  '/assets/images/graphics/Final%20Video%20for%201st%20part%20%281%29.mp4'
const HERO_VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL?.trim() || HERO_VIDEO_FALLBACK
// YouTube hero background (default: your Short). Override with VITE_HERO_YOUTUBE_ID; use VITE_HERO_YOUTUBE_DISABLED=1 for self-hosted MP4 only.
const HERO_YOUTUBE_DISABLED =
  import.meta.env.VITE_HERO_YOUTUBE_DISABLED === 'true' ||
  import.meta.env.VITE_HERO_YOUTUBE_DISABLED === '1'
const HERO_YOUTUBE_DEFAULT_ID = 'dTNETpTAXDM'
const HERO_YOUTUBE_ID = HERO_YOUTUBE_DISABLED
  ? ''
  : import.meta.env.VITE_HERO_YOUTUBE_ID?.trim() || HERO_YOUTUBE_DEFAULT_ID
// Shorts are 9:16; default embed math is 16:9 and letterboxes them. Enable portrait "cover" sizing:
// VITE_HERO_YOUTUBE_SHORTS=true — or we auto-enable for known Shorts IDs below.
const HERO_YOUTUBE_SHORTS_EXPLICIT =
  import.meta.env.VITE_HERO_YOUTUBE_SHORTS === 'true' ||
  import.meta.env.VITE_HERO_YOUTUBE_SHORTS === '1'
const HERO_YOUTUBE_SHORTS_KNOWN_IDS = new Set(['dTNETpTAXDM'])
const heroYoutubeIsPortrait =
  HERO_YOUTUBE_SHORTS_EXPLICIT ||
  (HERO_YOUTUBE_ID && HERO_YOUTUBE_SHORTS_KNOWN_IDS.has(HERO_YOUTUBE_ID))

// object-cover–style box for iframe: landscape 16:9 vs portrait 9:16
const YOUTUBE_COVER_BOX_LANDSCAPE = {
  width: 'max(100vw, 177.77vh)',
  height: 'max(100vh, 56.25vw)',
}
const YOUTUBE_COVER_BOX_PORTRAIT = {
  width: 'max(100vw, 56.25vh)',
  height: 'max(100vh, 177.78vw)',
}

/** Background MP3 always cues here (synced with hero video restarts). Matches `loopStart` in audio.json. */
const BG_MUSIC_START_SEC =
  typeof audioConfig.loopStart === 'number' ? audioConfig.loopStart : 12

const HERO_VISIBILITY_RATIO = 0.12

const Hero = () => {
  const heroSectionRef = useRef(null)
  const videoRef = useRef(null)
  const youtubeWrapRef = useRef(null)
  const youtubePlayerRef = useRef(null)
  const { audioRef } = useAudio()
  /** After the first full playthrough, user must tap Play to watch again (no auto-loop). */
  const [awaitingManualReplay, setAwaitingManualReplay] = useState(false)
  const awaitingReplayRef = useRef(false)
  /** True when we paused because the hero left the viewport (resume on return; not used when awaiting manual replay). */
  const pausedByScrollRef = useRef(false)

  useEffect(() => {
    awaitingReplayRef.current = awaitingManualReplay
  }, [awaitingManualReplay])
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)

  const useYoutube = Boolean(HERO_YOUTUBE_ID)
  const youtubeCoverBoxStyle = heroYoutubeIsPortrait
    ? YOUTUBE_COVER_BOX_PORTRAIT
    : YOUTUBE_COVER_BOX_LANDSCAPE

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    return `${month} ${day}, ${year}`
  }

  const groomName = { first: 'Criz Mar', last: 'Castro' }
  const brideName = { first: 'Sharlene', last: 'Tagal' }

  useEffect(() => {
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.3 })

    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .to(
          groomLastNameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
    }

    if (andRef.current) {
      tl.to(
        andRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
    }

    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }).to(
        brideLastNameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
    }

    if (dateRef.current) {
      tl.to(
        dateRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
    }
  }, [])

  // Self-hosted video: always cue MP3 at loop start when the clip starts from t≈0 (no autoPlay — avoids racing the browser).
  useEffect(() => {
    if (useYoutube) return

    let isMounted = true
    const video = videoRef.current
    if (!video) return

    const startSyncedFromBeginning = async () => {
      const v = videoRef.current
      const audio = audioRef.current
      if (!v || !audio || !isMounted) return

      v.currentTime = 0
      audio.currentTime = BG_MUSIC_START_SEC
      await Promise.allSettled([v.play(), audio.play()])
    }

    const kickoff = () => {
      if (isMounted) void startSyncedFromBeginning()
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      kickoff()
    } else {
      video.addEventListener('loadeddata', kickoff, { once: true })
    }

    return () => {
      isMounted = false
      video.removeEventListener('loadeddata', kickoff)
    }
  }, [audioRef, useYoutube])

  // YouTube: load API, autoplay muted, restart from 0 + restart audio when clip ends.
  useEffect(() => {
    if (!useYoutube || !HERO_YOUTUBE_ID) return

    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !youtubeWrapRef.current || !window.YT?.Player) return

      youtubePlayerRef.current = new window.YT.Player(youtubeWrapRef.current, {
        videoId: HERO_YOUTUBE_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          origin: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            try {
              e.target.seekTo(0, true)
            } catch (_) {
              /* noop */
            }
            e.target.playVideo()
            const audio = audioRef.current
            if (audio) {
              audio.currentTime = BG_MUSIC_START_SEC
              audio.play().catch(() => {})
            }
          },
          onStateChange: (e) => {
            if (cancelled) return
            const YT = window.YT
            const st = e.data

            if (st === YT.PlayerState.ENDED) {
              const audio = audioRef.current
              if (audio) audio.pause()
              try {
                e.target.pauseVideo()
                e.target.seekTo(0, true)
              } catch (_) {
                /* noop */
              }
              if (!cancelled) {
                pausedByScrollRef.current = false
                setAwaitingManualReplay(true)
              }
              return
            }

            if (st === YT.PlayerState.PLAYING) {
              const audio = audioRef.current
              const p = youtubePlayerRef.current
              if (audio && p && typeof p.getCurrentTime === 'function') {
                try {
                  if (p.getCurrentTime() < 0.75) {
                    audio.currentTime = BG_MUSIC_START_SEC
                  }
                } catch (_) {
                  /* noop */
                }
                audio.play().catch(() => {})
              }
            }
          },
        },
      })
    }

    const priorReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      priorReady?.()
      if (!cancelled) createPlayer()
    }

    if (window.YT?.Player) {
      createPlayer()
    } else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      document.body.appendChild(tag)
    }

    return () => {
      cancelled = true
      try {
        youtubePlayerRef.current?.destroy?.()
      } catch (_) {
        /* noop */
      }
      youtubePlayerRef.current = null
    }
  }, [useYoutube, HERO_YOUTUBE_ID, audioRef])

  // Pause hero video + bg music off-screen; resume when hero is visible again (avoids video stalled while music plays).
  useEffect(() => {
    const root = heroSectionRef.current
    if (!root) return

    const pauseHeroMedia = () => {
      if (useYoutube) {
        try {
          youtubePlayerRef.current?.pauseVideo?.()
        } catch (_) {
          /* noop */
        }
      } else {
        videoRef.current?.pause?.()
      }
      const audio = audioRef.current
      if (audio && !audio.paused) {
        audio.pause()
      }
    }

    const resumeHeroMedia = () => {
      const audio = audioRef.current
      if (!audio) return

      if (useYoutube) {
        try {
          youtubePlayerRef.current?.playVideo?.()
        } catch (_) {
          /* noop */
        }
        audio.play().catch(() => {})
        return
      }

      const video = videoRef.current
      if (!video) return
      void Promise.allSettled([video.play(), audio.play()])
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        const visible =
          entry.isIntersecting && entry.intersectionRatio >= HERO_VISIBILITY_RATIO

        if (!visible) {
          pauseHeroMedia()
          if (!awaitingReplayRef.current) {
            pausedByScrollRef.current = true
          }
          return
        }

        if (pausedByScrollRef.current && !awaitingReplayRef.current) {
          pausedByScrollRef.current = false
          resumeHeroMedia()
        }
      },
      { threshold: [0, 0.05, 0.12, 0.25, 0.5, 0.75, 1] }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [useYoutube])

  const handleVideoPlay = () => {
    if (useYoutube) return
    const video = videoRef.current
    const audio = audioRef.current
    if (!video || !audio) return
    if (video.currentTime < 0.5) {
      audio.currentTime = BG_MUSIC_START_SEC
      if (!video.paused && audio.paused) {
        audio.play().catch(() => {})
      }
    }
  }

  const handleVideoPause = () => {
    if (useYoutube) return
    const audio = audioRef.current
    if (audio && !audio.paused) {
      audio.pause()
    }
  }

  const handleVideoEnded = () => {
    if (useYoutube) return
    const video = videoRef.current
    const audio = audioRef.current
    if (audio) audio.pause()
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    pausedByScrollRef.current = false
    setAwaitingManualReplay(true)
  }

  const handleHeroReplayClick = async () => {
    const audio = audioRef.current
    if (!audio) return

    pausedByScrollRef.current = false

    if (useYoutube) {
      const p = youtubePlayerRef.current
      if (p && typeof p.seekTo === 'function') {
        try {
          p.seekTo(0, true)
          p.playVideo()
        } catch (_) {
          /* noop */
        }
      }
      audio.currentTime = BG_MUSIC_START_SEC
      setAwaitingManualReplay(false)
      await audio.play().catch(() => {})
      return
    }

    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    audio.currentTime = BG_MUSIC_START_SEC
    setAwaitingManualReplay(false)
    await Promise.allSettled([video.play(), audio.play()])
  }

  return (
    <div ref={heroSectionRef} className="relative w-full" style={{ height: '100vh' }}>
      <div className="absolute inset-0">
        {useYoutube ? (
          <div
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
            data-hero="true"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={youtubeCoverBoxStyle}
            >
              <div ref={youtubeWrapRef} className="h-full w-full" />
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            data-hero="true"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 z-0 w-full h-full object-cover object-center"
            src={HERO_VIDEO_URL}
            muted
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
            playsInline
            preload="metadata"
            poster={HERO_POSTER_URL}
          />
        )}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,31,63,0.55) 0%, rgba(0,31,63,0.18) 22%, transparent 42%, transparent 58%, rgba(0,31,63,0.2) 78%, rgba(0,31,63,0.55) 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="absolute top-0 left-0 right-0 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <div>
              <p
                ref={groomFirstNameRef}
                className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {groomName.first}
              </p>
              <p
                ref={groomLastNameRef}
                className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight -mt-2 sm:-mt-3"
                style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                {groomName.last}
              </p>
            </div>
            <p
              ref={andRef}
              className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3"
              style={{ color: '#FFFFFF' }}
            >
              AND
            </p>
            <div>
              <p
                ref={brideFirstNameRef}
                className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {brideName.first}
              </p>
              <p
                ref={brideLastNameRef}
                className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight -mt-2 sm:-mt-3"
                style={{ color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                {brideName.last}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p
            ref={dateRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-foglihten"
            style={{ color: '#FFFFFF' }}
          >
            {formatDate()}
          </p>
        </div>
      </div>

      {awaitingManualReplay && (
        <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 md:right-8 z-[35] pointer-events-auto">
          <button
            type="button"
            onClick={() => void handleHeroReplayClick()}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A1F44] text-white shadow-lg ring-2 ring-white/30 transition-transform hover:scale-105 hover:bg-[#132f5c] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            aria-label="Play hero video again"
          >
            <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" aria-hidden />
          </button>
        </div>
      )}
    </div>
  )
}

export default Hero
