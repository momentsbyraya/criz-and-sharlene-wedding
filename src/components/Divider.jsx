import React from 'react'

const Divider = () => {
  return (
    <div className="flex justify-center items-center" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      {/* Left horizontal line */}
      <div className="w-16 h-px bg-burgundy-dark opacity-40"></div>
      
      <svg 
        className="w-4 h-4 mx-4"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flower petals */}
        <path 
          d="M50 20 Q45 30 40 35 Q30 40 35 50 Q40 45 50 50 Q60 45 65 50 Q70 40 60 35 Q55 30 50 20 Z" 
          fill="#7BA3C4" 
        />
        <path 
          d="M50 80 Q45 70 40 65 Q30 60 35 50 Q40 55 50 50 Q60 55 65 50 Q70 60 60 65 Q55 70 50 80 Z" 
          fill="#7BA3C4" 
        />
        <path 
          d="M20 50 Q30 45 35 40 Q40 30 50 35 Q45 40 50 50 Q45 60 50 65 Q40 70 35 60 Q30 55 20 50 Z" 
          fill="#7BA3C4" 
        />
        <path 
          d="M80 50 Q70 55 65 60 Q60 70 50 65 Q55 60 50 50 Q55 40 50 35 Q60 30 65 40 Q70 45 80 50 Z" 
          fill="#7BA3C4" 
        />
        {/* Flower center */}
        <circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="#7BA3C4" 
        />
      </svg>
      
      {/* Right horizontal line */}
      <div className="w-16 h-px bg-burgundy-dark opacity-40"></div>
    </div>
  )
}

export default Divider
