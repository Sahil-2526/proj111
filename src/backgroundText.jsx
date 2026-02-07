import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const BackgroundText = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text entrance
      gsap.fromTo(textRef.current.children, 
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
      <div ref={textRef} className="text-center text-white/90">
        {/* MAIN TITLE */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-[-0.05em] mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
          GOKU
        </h1>
        
        {/* SUBTITLE */}
        <div className="text-xl md:text-2xl lg:text-3xl font-light tracking-widest uppercase opacity-80 mb-8">
          <span className="block">Dragon Ball</span>
          <span className="block">Super Saiyan</span>
        </div>
        
        {/* POWER LEVEL */}
        <div className="text-4xl md:text-5xl font-mono font-bold text-yellow-400 tracking-wider drop-shadow-lg animate-pulse">
          POWER LEVEL: 9000+
        </div>
      </div>
    </div>
  );
};

export default BackgroundText;
