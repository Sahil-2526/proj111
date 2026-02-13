import React, { useState, useRef, useLayoutEffect, useEffect, memo } from 'react';
import gsap from "gsap";
import goku from "../assets/Frame3.jpg"; // Check your relative path to assets

// --- 1. TRIBAL PATHS ---
const TRIBAL_PATHS = {
  A: "M50 2 L65 30 L95 90 L75 80 L65 55 L35 55 L25 80 L5 90 L35 30 Z M40 45 L60 45 L50 25 Z",
  H: "M5 5 L30 15 L25 45 L75 35 L70 15 L95 5 L90 95 L65 85 L70 55 L30 65 L25 85 L10 95 Z",
  O: "M50 5 L85 25 L95 50 L85 75 L50 95 L15 75 L5 50 L15 25 Z M50 25 L75 50 L50 75 L25 50 Z",
  U: "M5 5 L30 15 L30 65 L50 95 L70 65 L70 15 L95 5 L85 80 L50 100 L15 80 Z",
  B: "M10 5 L60 5 L85 25 L55 45 L90 65 L60 95 L10 95 L20 50 Z M30 20 L30 40 L50 35 L50 25 Z M30 55 L30 80 L60 70 L55 60 Z"
};

// --- 2. LETTER COMPONENT ---
const TribalLetter = ({ char }) => {
  const path = TRIBAL_PATHS[char] || "";
  
  return (
    <div className="relative w-[12vh] h-[12vh] flex justify-center items-center pointer-events-auto hover:scale-110 transition-transform duration-300">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        style={{ filter: "drop-shadow(0 0 8px rgba(215, 125, 238, 0.8))" }} 
      >
        <defs>
          <filter id="glow-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={path} fill="transparent" stroke="#d77dee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow-noise)" />
        <path d={path} fill="transparent" stroke="rgba(0,0,0,0.8)" strokeWidth="1" />
      </svg>
    </div>
  );
};

// --- 3. ANIMATED SIDE TYPOGRAPHY (Named Export) ---
export const SideTypography = ({ isFirstPage }) => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isFirstPage) {
        gsap.to(containerRef.current, { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" });
        gsap.fromTo(".tribal-char", 
          { scale: 0, rotation: -90, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(2)", delay: 0.2 }
        );
        gsap.to(".tribal-char", {
            y: "random(-10, 10)", rotation: "random(-5, 5)", duration: "random(2, 4)",
            repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.2, from: "random" }
        });
      } else {
        gsap.to(containerRef.current, { x: 100, opacity: 0, duration: 0.5, ease: "power3.in" });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isFirstPage]);

  return (
    <div ref={containerRef} className="fixed top-0 right-[5vw] h-screen hidden md:flex flex-col justify-center items-center z-[55] pointer-events-none translate-x-20 opacity-0">
      <div className="flex flex-col items-center gap-3">
        {['A','H','O','U','B','A'].map((char, i) => (
          <div key={i} className="tribal-char transform origin-center"><TribalLetter char={char} /></div>
        ))}
      </div>
    </div>
  );
};

// --- 4. GOKU PAGE COMPONENT (Default Export) ---
const GokuPage = memo(({ sectionRef }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const desktopGradient = `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.68) 75%, rgba(0,0,0,1) 100%)`;
  const mobileGradient = `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.68) 5%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.68) 95%, rgba(0,0,0,0.8) 100%)`;

  const fixedPageStyle = {
    position: 'fixed', inset: 0, width: '100%', height: '100vh',
    willChange: 'opacity, transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden',
  };

  return (
    <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 10, opacity: 1 }}>
      <img src={goku} alt="Goku" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(0.8) brightness(0.75) contrast(1.7)' }} loading="eager" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: isMobile ? mobileGradient : desktopGradient }} />
    </div>
  );
});

export default GokuPage;