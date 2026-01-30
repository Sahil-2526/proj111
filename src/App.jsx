import React, { useState, useRef } from 'react';
import Navbar from './NavBar';
import GlitchMenu from './GlitchMenu';
import OverlayMenu from './OverlayMenu';
import BackgroundText from './backgroundText.jsx';
import SpringSection from './SpringSection.jsx';
import SummerSection from './SummerSection.jsx';
import AutumnSection from './AutumnSection.jsx';
import CircleRevealTransition from './PageTransition.jsx';
import goku from "./assets/Frame3.jpg";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Transition trigger refs (ONLY 4 TRANSITIONS NOW)
  const transition1Ref = useRef(null);
  const transition2Ref = useRef(null);
  const transition3Ref = useRef(null);
  const transition4Ref = useRef(null);
  
  // Fixed page refs (ONLY 5 PAGES NOW)
  const gokuSectionRef = useRef(null);
  const spaceSectionRef = useRef(null);
  const springSectionRef = useRef(null);
  const summerSectionRef = useRef(null);
  const autumnSectionRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* SCROLL CONTAINER - REDUCED HEIGHT (5 pages, 4 transitions) */}
      <div className="relative w-full" style={{ height: '1100vh' }}>
        {/* Page 1 viewing area (100vh) */}
        <div className="h-screen" />
        
        {/* Gap before transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Transition 1→2 (100vh) */}
        <div ref={transition1Ref} className="h-screen" />
        
        {/* Gap after transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Page 2 viewing area (100vh) */}
        <div className="h-screen" />
        
        {/* Gap before transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Transition 2→3 (100vh) */}
        <div ref={transition2Ref} className="h-screen" />
        
        {/* Gap after transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Page 3 viewing area (100vh) */}
        <div className="h-screen" />
        
        {/* Gap before transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Transition 3→4 (100vh) */}
        <div ref={transition3Ref} className="h-screen" />
        
        {/* Gap after transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Page 4 viewing area (100vh) */}
        <div className="h-screen" />
        
        {/* Gap before transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Transition 4→5 (100vh) */}
        <div ref={transition4Ref} className="h-screen" />
        
        {/* Gap after transition (50vh) */}
        <div style={{ height: '50vh' }} />
        
        {/* Page 5 viewing area (100vh) */}
        <div className="h-screen" />
      </div>

      {/* FIXED PAGES */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        
        {/* NAVBAR + MENU BUTTON */}
        <div className="fixed top-0 left-0 right-0 z-[1000]">
          <Navbar toggleMenu={toggleMenu} />
          <GlitchMenu onClick={toggleMenu} isOpen={isMenuOpen} />
        </div>
        
        {/* OVERLAY MENU - FIXED PROP NAME */}
        <OverlayMenu isOpen={isMenuOpen} closeMenu={closeMenu} />

        {/* PAGE 1: GOKU */}
        <div 
          ref={gokuSectionRef} 
          className="fixed inset-0 w-full h-screen"
          style={{ zIndex: 10, opacity: 1 }}
        >
          <BackgroundText />
          <img src={goku} alt="Goku" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* PAGE 2: SPACE */}
        <div 
          ref={spaceSectionRef} 
          className="fixed inset-0 w-full h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2e1a3e] to-[#0d1b2a]"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            <h1 className="relative z-10 text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              COSMIC VOID
            </h1>
          </div>
        </div>

        {/* PAGE 3: SPRING */}
        <div 
          ref={springSectionRef} 
          className="fixed inset-0 w-full h-screen"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <SpringSection />
        </div>

        {/* PAGE 4: SUMMER */}
        <div 
          ref={summerSectionRef} 
          className="fixed inset-0 w-full h-screen"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <SummerSection />
        </div>

        {/* PAGE 5: AUTUMN (FINAL PAGE) */}
        <div 
          ref={autumnSectionRef} 
          className="fixed inset-0 w-full h-screen"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <AutumnSection />
        </div>

        {/* ===== TRANSITIONS (ONLY 4) ===== */}
        
        {/* Transition 1→2: TOP-LEFT */}
        <CircleRevealTransition 
          color1="#f06292" 
          color2="#1a0b2e" 
          triggerRef={transition1Ref}
          currentSectionRef={gokuSectionRef}
          nextSectionRef={spaceSectionRef}
          originPosition="top-left"
          isDual={false}
          delay={0.25}
        />

        {/* Transition 2→3: BOTTOM-RIGHT */}
        <CircleRevealTransition 
          color1="#2e1a3e" 
          color2="#fce4ec" 
          triggerRef={transition2Ref}
          currentSectionRef={spaceSectionRef}
          nextSectionRef={springSectionRef}
          originPosition="bottom-right"
          isDual={false}
          delay={0.25}
        />

        {/* Transition 3→4: TOP-RIGHT */}
        <CircleRevealTransition 
          color1="#f8bbd0" 
          color2="#fff9e6" 
          triggerRef={transition3Ref}
          currentSectionRef={springSectionRef}
          nextSectionRef={summerSectionRef}
          originPosition="top-right"
          isDual={false}
          delay={0.25}
        />

        {/* Transition 4→5: BOTTOM-LEFT */}
        <CircleRevealTransition 
          color1="#ffe0b2" 
          color2="#d7ccc8" 
          triggerRef={transition4Ref}
          currentSectionRef={summerSectionRef}
          nextSectionRef={autumnSectionRef}
          originPosition="bottom-left"
          isDual={false}
          delay={0.25}
        />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </>
  );
}

export default App;
