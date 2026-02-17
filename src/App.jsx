import React, { useState, useRef, useEffect } from 'react';
import gsap from "gsap";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- EXTERNAL COMPONENTS ---
// Assuming Gatekeeper passes back '2d' or '3d' in its onSelect callback
import Gatekeeper from './LandingPageComponents/0Gatekeeper.jsx';

// --- COMING SOON VIEW (Dynamic 2D/3D) ---
const ComingSoonSection = ({ mode }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, 
      { filter: "blur(20px)", opacity: 0, scale: 0.8 },
      { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    );
  }, []);

  // Dynamic Content based on Mode
  const subTitle = mode === '3d' ? '3D EXPERIENCE' : '2D EXPERIENCE';
  const accentColor = mode === '3d' ? 'text-red-500' : 'text-cyan-500'; // Optional: Different color accent for 3D
  const gradientClass = mode === '3d' 
    ? "from-red-500 via-orange-500 to-yellow-600" 
    : "from-cyan-400 via-blue-500 to-purple-600";

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#05070a] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Anime VFX */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${mode === '3d' ? 'bg-red-500/10' : 'bg-cyan-500/10'} rounded-full blur-[120px] animate-pulse`} />
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 text-center px-4">
        <div className={`inline-block px-4 py-1 mb-6 border ${mode === '3d' ? 'border-red-500/30 bg-red-500/5' : 'border-cyan-500/30 bg-cyan-500/5'} backdrop-blur-md rounded-full`}>
          <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${mode === '3d' ? 'text-red-400' : 'text-cyan-400'}`}>
            Classified Transmission // {mode}
          </span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase leading-none">
          AHOUBA <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
            {mode === '3d' ? '3D' : '2D'}
          </span>
        </h1>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm">Initiating Launch On</p>
          <div className="relative group">
            <div className={`absolute -inset-2 ${mode === '3d' ? 'bg-red-500' : 'bg-cyan-500'} blur-xl opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
            <h2 className="relative text-5xl md:text-7xl font-black text-white italic">
              FEBRUARY <span className={mode === '3d' ? 'text-red-500' : 'text-cyan-500'}>30</span>
            </h2>
          </div>
          <p className="text-gray-600 font-mono text-xs mt-4 uppercase tracking-widest italic opacity-80">
            Ahouba {mode} is Incoming
          </p>
          <p className="text-gray-800 font-mono text-[10px] mt-2">ERROR: DATE_PARADOX_DETECTED // 2026</p>
        </div>
      </div>

      {/* Scanning Line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] ${mode === '3d' ? 'bg-red-500/30 shadow-[0_0_15px_red]' : 'bg-cyan-500/30 shadow-[0_0_15px_cyan]'} animate-[scan_4s_linear_infinite]`} />
      
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
const LandingPage = ({ appMode, setAppMode }) => {
  const handleSelect = (selectedMode) => {
    // Save preference to session storage
    sessionStorage.setItem('ahouba_mode', selectedMode);
    // Update state to render the correct view
    setAppMode(selectedMode);
  };

  // If mode is selected ('2d' or '3d'), show the Coming Soon view
  if (appMode) return <ComingSoonSection mode={appMode} />;

  // Otherwise show Gatekeeper
  return <Gatekeeper onSelect={handleSelect} />;
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
  // Initialize state from session storage (returns '2d', '3d', or null)
  const [appMode, setAppMode] = useState(() => {
    return sessionStorage.getItem('ahouba_mode'); 
  });
  
  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              appMode={appMode} 
              setAppMode={setAppMode} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;