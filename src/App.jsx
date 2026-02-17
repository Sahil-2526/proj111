import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import gsap from "gsap";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- EXTERNAL COMPONENTS ---
import Gatekeeper from './LandingPageComponents/0Gatekeeper.jsx';

// --- COMING SOON VIEW ---
const ComingSoonSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, 
      { filter: "blur(20px)", opacity: 0, scale: 0.8 },
      { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#05070a] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Anime VFX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 text-center px-4">
        <div className="inline-block px-4 py-1 mb-6 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md rounded-full">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-cyan-400">Classified Transmission</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase leading-none">
          AHOUBA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            PROJECT
          </span>
        </h1>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm">Initiating Launch On</p>
          <div className="relative group">
            <div className="absolute -inset-2 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <h2 className="relative text-5xl md:text-7xl font-black text-white italic">
              FEBRUARY <span className="text-cyan-500">30</span>
            </h2>
          </div>
          <p className="text-gray-600 font-mono text-xs mt-4 uppercase tracking-widest italic opacity-80">
            Ahouba is Incoming
          </p>
          <p className="text-gray-800 font-mono text-[10px] mt-2">ERROR: DATE_PARADOX_DETECTED // 2026</p>
        </div>
      </div>

      {/* Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 shadow-[0_0_15px_cyan] animate-[scan_4s_linear_infinite]" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0% }
          100% { top: 100% }
        }
      `}} />
    </div>
  );
};

// --- LANDING PAGE COMPONENT ---
const LandingPage = ({ gatePassed, setGatePassed }) => {
  const handleSelect = (mode) => {
    if (mode === '3d') {
      window.location.href = 'https://3d.ahouba.com';
    } else {
      sessionStorage.setItem('ahouba_gate_passed', 'true');
      setGatePassed(true);
    }
  };

  // If gate not passed, show Gatekeeper
  if (!gatePassed) return <Gatekeeper onSelect={handleSelect} />;

  return <ComingSoonSection />;
};

// --- SCROLL RESET HELPER ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- MAIN APP COMPONENT ---
function App() {
  const [gatePassed, setGatePassed] = useState(() => {
    return sessionStorage.getItem('ahouba_gate_passed') === 'true';
  });
  
  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              gatePassed={gatePassed} 
              setGatePassed={setGatePassed} 
            />
          } 
        />
        {/* All other routes removed to keep it focused on the incoming project */}
      </Routes>
    </Router>
  );
}

export default App;