import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './NavBar';
import GlitchMenu from './GlitchMenu';
import OverlayMenu from './OverlayMenu';
import BackgroundText from './backgroundText.jsx';
import SecondSection from './SecondSection';
import SpringSection from './SpringSection';     // NEW
import SummerSection from './SummerSection';     // NEW
import AutumnSection from './AutumnSection';     // NEW
import goku from "./assets/Frame3.jpg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstSectionRef = useRef(null);
  const purpleOverlayRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        purpleOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: firstSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, firstSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* --- SECTION 1: GOKU BACKGROUND --- */}
      <div 
        ref={firstSectionRef}
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${goku})` }}
      >
        <div 
          ref={purpleOverlayRef}
          className="absolute inset-0 bg-[#1A0C2E] pointer-events-none z-[5]"
        ></div>
        <BackgroundText />
        <Navbar />
        <GlitchMenu onClick={toggleMenu} isOpen={isMenuOpen} />
        <OverlayMenu isOpen={isMenuOpen} closeMenu={toggleMenu} />
      </div>

      {/* --- SECTION 2: TRANSITION SECTION --- */}
      <SecondSection />

      {/* --- SECTION 3: SPRING (NEBULA BLOOM) --- */}
      <SpringSection />

      {/* --- SECTION 4: SUMMER (SOLAR CORONA) --- */}
      {/* <SummerSection /> */}

      {/* --- SECTION 5: AUTUMN (VOID WIND) --- */}
      {/* <AutumnSection /> */}

      {/* Add more sections as needed */}
    </div>
  );
}

export default App;
