import React from 'react'
import { themeConfig } from '../config/themeConfig'

const Footer = () => {
  const handleFooterClick = () => {
    window.open('https://www.facebook.com/profile.php?id=61571540978411', '_blank', 'noopener,noreferrer')
  }

  return (
    <footer 
      className="w-full pb-4 transition-colors duration-300 cursor-pointer"
      style={{ backgroundColor: 'var(--footer-bg)' }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-charcoal)' }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--footer-bg)' }}
      onMouseDown={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-charcoal)' }}
      onClick={handleFooterClick}
    >
      {/* Divider line on top */}
      <div className="w-full h-px bg-white/30 mb-4"></div>
      
      {/* Footer text - white on dark navy */}
      <div className="text-center">
        <p className="text-sm sm:text-base font-albert font-thin text-white transition-colors duration-300 hover:!text-[#E5E7EB] active:!text-[#E5E7EB]">
          Made with <ion-icon name="heart" className="inline-block mx-1 align-middle" style={{ fontSize: '1em', verticalAlign: 'middle' }}></ion-icon> by Moments by Raya
        </p>
      </div>
    </footer>
  )
}

export default Footer

