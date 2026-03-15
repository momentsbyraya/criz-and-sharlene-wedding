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
      <Hero />

      {/* Flower Banner - Top (Where to go) */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Venue Section */}
          <Venue />
        </div>
      </div>

      {/* Flower Banner - Bottom (Where to go) */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/for%20flower-banner.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
        </div>
      </div>

      {/* Entourage Section - image grid (same design as EntourageModal) */}
      <EntourageSection />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />

          {/* RSVP Section */}
          <RSVPSection onOpenRSVP={onOpenRSVP} />

          {/* Love Story Section */}
          <LoveStory />

          {/* Gallery Section */}
          <Gallery />

          {/* Gifts Section */}
          <GiftRegistry />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Save The Date Counter Section */}
      <SaveTheDateCounter />
    </div>
  )
}

export default Home
