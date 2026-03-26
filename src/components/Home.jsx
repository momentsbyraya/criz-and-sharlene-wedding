import React from 'react'
import Hero from './Hero'
import Venue from './Venue'
import Schedule from './Schedule'
import EntourageSection from './EntourageSection'
import RSVPSection from './RSVPSection'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import GiftRegistry from './GiftRegistry'
import DressCode from './DressCode'
import FAQ from './FAQ'
import SaveTheDateCounter from './SaveTheDateCounter'
import Divider from './Divider'
import './pages/Details.css'

const Home = ({ onOpenRSVP }) => {
  return (
    <div className="relative w-full bg-transparent">
      {/* Hero Section */}
      <div className="bg-midnight-mist">
        <Hero />
      </div>

      {/* Flower Banner - Top (Where to go) */}
      <div className="relative section-mist" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner%20%282%29.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 section-mist">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Venue Section */}
          <Venue />
        </div>
      </div>

      {/* Flower Banner - Bottom (Where to go) */}
      <div className="relative section-mist" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner%20%282%29.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center section-navy">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
        </div>
      </div>

      {/* Entourage Section - image grid (same design as EntourageModal) */}
      <div className="section-mist">
        <EntourageSection />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 section-navy">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />

          {/* RSVP Section */}
          <RSVPSection onOpenRSVP={onOpenRSVP} />
        </div>
      </div>

      {/* Love Story: full-width within navy (not constrained by RSVP column) */}
      <div className="relative z-20 w-full section-navy px-4 sm:px-6 lg:px-8">
        <LoveStory />
      </div>

      <div className="relative z-20 flex items-center justify-center section-navy">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="section-separator-navy" aria-hidden />

          {/* Gallery Section */}
          <Gallery />

          <hr className="section-separator-navy" aria-hidden />

          {/* Gifts Section */}
          <GiftRegistry />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-mist">
        <FAQ />
      </div>

      {/* Save The Date Counter Section */}
      <div className="bg-midnight-mist">
        <SaveTheDateCounter />
      </div>
    </div>
  )
}

export default Home
