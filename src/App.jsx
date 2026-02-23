import React, { useState, useLayoutEffect, useEffect, useRef, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Main Landing Sections
import Navbar from './NewPagesComponent/Navbar.jsx';
import Gatekeeper from './NewPagesComponent/Gatekeeper.jsx';
import MangaMenu from './NewPagesComponent/Menu.jsx'; 
import Home from './NewPagesComponent/Home.jsx';
import Footer from './NewPagesComponent/Footer.jsx';

// Separate Pages
import EventPage from './OtherPages/EventPage.jsx';
// Lazy Load for performance
const ComingSoon = React.lazy(() => import('./NewPagesComponent/ComingSoon.jsx'));

// Lazy Load local sections
const About = React.lazy(() => import('./NewPagesComponent/About.jsx'));
const Event = React.lazy(() => import('./NewPagesComponent/Event.jsx')); 
const People = React.lazy(() => import('./NewPagesComponent/People.jsx'));
const Sponsors = React.lazy(() => import('./NewPagesComponent/Sponsors.jsx'));

import backgroundImage from './assets/black_clover.webp';

// ==========================================
// MAIN LANDING COMPONENT
// ==========================================
const MainLanding = ({ gatePassed, handleSelect, imageLoaded, setImageLoaded, mainContentRef }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!gatePassed) return;
    
    let ctx = gsap.context(() => {
      const revealContent = () => {
        gsap.to(mainContentRef.current, { 
          opacity: 1, 
          visibility: "visible", 
          duration: 0.8, 
          ease: "power2.out" 
        });

        const pendingScroll = sessionStorage.getItem('pendingScroll');
        if (pendingScroll) {
          setTimeout(() => {
            document.getElementById(pendingScroll)?.scrollIntoView({ behavior: "smooth" });
            sessionStorage.removeItem('pendingScroll');
          }, 200);
        }
      };

      const img = new Image();
      img.src = backgroundImage;
      
      if (img.complete) {
        setImageLoaded(true);
        revealContent();
      } else {
        img.onload = () => {
          setImageLoaded(true);
          revealContent();
        };
      }
    });

    return () => ctx.revert();
  }, [gatePassed, location.pathname, setImageLoaded, mainContentRef]);

  if (!gatePassed) return <Gatekeeper onSelect={handleSelect} />;

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden selection:bg-yellow-500 selection:text-black font-['Orbitron']">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: imageLoaded ? 0.6 : 0, 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div ref={mainContentRef} className="relative z-10 opacity-0 invisible w-full">
        <Navbar />
        
        {/* HOME SECTION */}
        <section id="home" className="w-full h-auto md:h-screen flex items-center justify-center pt-24 pb-0 md:py-0">
          <Home />
        </section>

        <Suspense fallback={<div className="py-20 text-center text-white/20 uppercase tracking-widest animate-pulse">Initializing Node...</div>}>
          
          {/* ABOUT SECTION */}
          <section id="about" className="w-full h-auto md:h-screen flex items-center justify-center pt-0 pb-0 md:py-0">
            <About />
          </section>
          
          {/* EVENT SECTION - Adjusted margin for better mobile gap */}
          <section id="event" className="w-full h-auto py-0 -mt-20 md:mt-0 md:mb-0 md:py-0">
            <Event />
          </section>

          {/* PEOPLE SECTION - Redirected logic is handled via Menu/Buttons */}
          <section id="people" className="w-full h-auto py-4 mt-20 md:mt-30 md:py-0">
            <People />
          </section>

          {/* SPONSORS SECTION */}
          <section id="sponsors" className="w-full h-auto pt-0 pb-10 md:py-0">
            <Sponsors />
          </section>

          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

// ==========================================
// ROOT APP COMPONENT
// ==========================================
function App() {
  const [gatePassed, setGatePassed] = useState(() => sessionStorage.getItem('ahouba_gate_passed') === 'true');
  const [imageLoaded, setImageLoaded] = useState(false);
  const mainContentRef = useRef(null);

  const handleSelect = useCallback((mode) => {
    if (mode === '3d') {
      window.location.href = 'https://3d.ahouba.com';
    } else {
      sessionStorage.setItem('ahouba_gate_passed', 'true');
      setGatePassed(true);
    }
  }, []);

  return (
    <Router>
       {/* Persistence: Menu stays active across all routes */}
       <MangaMenu />
      <Routes>
        <Route path="/" element={
          <MainLanding 
            gatePassed={gatePassed} 
            handleSelect={handleSelect} 
            imageLoaded={imageLoaded} 
            setImageLoaded={setImageLoaded}
            mainContentRef={mainContentRef} 
          />
        } />
        
        {/* EVENT SUB-PAGE */}
        <Route path="/EventPage" element={<EventPage />} />
        
        {/* COMING SOON REDIRECTS (Workshop, Merch, etc.) */}
        <Route path="/ComingSoon" element={
            <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center text-white">LOADING SEAL...</div>}>
                <ComingSoon />
            </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;