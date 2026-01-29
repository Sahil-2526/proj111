import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import eva from "./assets/pokemon.png"
import gndm from "./assets/gandam.png"

gsap.registerPlugin(ScrollTrigger);

const SecondSection = () => {
  const sectionRef = useRef(null);
  const leftCharacterRef = useRef(null);
  const rightCharacterRef = useRef(null);
  const messageRef = useRef(null);
  const pinkOverlayRef = useRef(null);  // NEW: Pink layer
  const blackOverlayRef = useRef(null); // NEW: Black layer

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. PINK TO BLACK FADE TRANSITION ---
      // Pink fades out first
      gsap.fromTo(
        pinkOverlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Black fades out after pink
      gsap.fromTo(
        blackOverlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // --- 2. LEFT CHARACTER SWIPE ---
      gsap.fromTo(
        leftCharacterRef.current,
        { x: -400, opacity: 0, rotation: -5 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 10%",
            scrub: 2,
          },
        }
      );

      // --- 3. RIGHT CHARACTER SWIPE ---
      gsap.fromTo(
        rightCharacterRef.current,
        { x: 400, opacity: 0, rotation: 5 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 10%",
            scrub: 2,
          },
        }
      );

      // --- 4. CENTER MESSAGE FADE & SCALE ---
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0b2e] to-[#0d1b2a] -z-10"></div>

      {/* --- DOUBLE-LAYER FADE TRANSITION (PINK → BLACK) --- */}
      {/* Layer 1: Pink Overlay (Fades first) */}
      <div
        ref={pinkOverlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#FF007A] via-[#8B0045] to-[#4a0826] z-10 pointer-events-none"
      ></div>

      {/* Layer 2: Black Overlay (Fades second) */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 bg-black z-[11] pointer-events-none"
      ></div>

      {/* --- LEFT CHARACTER --- */}
      <div
        ref={leftCharacterRef}
        className="absolute top-0 left-0 h-full w-[35vw] md:w-[25vw] z-20 pointer-events-none"
      >
        <img
          src={eva}
          alt="Left Character"
          className="w-full h-full object-contain object-left-top drop-shadow-[0_0_40px_rgba(255,0,122,0.6)]"
        />
        {/* PLACEHOLDER */}
        <div className="absolute top-10 left-10 w-32 h-[80vh] bg-gradient-to-b from-[#FF007A] to-[#00F3FF] rounded-lg shadow-[0_0_50px_rgba(255,0,122,0.8)]"></div>
      </div>

      {/* --- RIGHT CHARACTER --- */}
      <div
        ref={rightCharacterRef}
        className="absolute top-0 right-0 h-full w-[35vw] md:w-[25vw] z-20 pointer-events-none"
      >
        <img
          src={gndm}
          alt="Right Character"
          className="h-[100vh] object-contain drop-shadow-[0_0_40px_rgba(0,243,255,0.6)]  object-cover"
        />
        {/* PLACEHOLDER */}
      </div>

      {/* --- CENTER MESSAGE CARD --- */}
      <div
        ref={messageRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-[90vw] w-[500px]"
      >
        <div className="relative p-8 bg-[#050b14]/85 backdrop-blur-md border border-[#00F3FF]/40 shadow-[0_0_30px_rgba(0,243,255,0.2)] overflow-hidden">
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#00F3FF]"></div>
          <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#00F3FF]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 border-b border-[#00F3FF]/20 pb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00F3FF] text-[#00F3FF] shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-[#00F3FF] tracking-[0.3em] text-xl md:text-2xl font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.9)]">
              SYSTEM MESSAGE
            </h2>
          </div>

          {/* Message Content */}
          <div className="text-base md:text-lg leading-relaxed text-gray-300 font-mono space-y-4">
            <p className="text-white font-bold text-xl md:text-2xl tracking-wide">
              The journey begins here.
            </p>
            <p className="text-[#00F3FF]/90">
              You have entered the <span className="text-[#FF007A] font-bold">Event Dimension</span>.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Scroll to explore the unknown...
            </p>
          </div>

          {/* Animated Accent Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* --- AMBIENT EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00F3FF] rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
