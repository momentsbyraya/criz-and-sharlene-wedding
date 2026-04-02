import React from 'react'
import { Heart } from 'lucide-react'

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
          Made with{' '}
          <Heart className="inline-block mx-1 align-middle w-[1em] h-[1em] fill-current text-red-300" aria-hidden />
          {' '}by Moments by Raya
        </p>
      </div>
    </footer>
  )
}

export default Footer

