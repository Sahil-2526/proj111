// src/BackgroundText.jsx
import React from 'react';

const BackgroundText = () => {
  return (
    <div className="absolute top-130 left-[35vw] md:left-[75vw] -translate-y-1/2 z-0 pointer-events-none select-none mix-blend-screen ">
      <div className="flex flex-col gap-4 opacity-40">
        {/* Main Text */}
        <h1 
          className="text-[12vh] md:text-[16vh] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FF007A] via-[#00F3FF] to-[#FF007A] drop-shadow-[0_0_20px_rgba(255,0,122,0.5)]"
          style={{ 
            writingMode: 'vertical-rl', 
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '0.1em'
          }}
        >
          AHOUBA
        </h1>
      </div>
    </div>
  );
};

export default BackgroundText;